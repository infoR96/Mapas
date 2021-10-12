import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import Place from './Place';
import Rating from './Rating';
import Horario from './Horario'
import Comentarios from './Comentarios';
import LugaresCercanos from './LugaresCercanos';
import Rutas from './Rutas';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      location: ''
    }
  }
  map = ''

  componentDidMount() {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( position => {
          this.setState( { latOrigin: position.coords.latitude, lngOrigin: position.coords.longitude } );
      } );
  }

    const googlePlaceAPILoad = setInterval(() => {
      if (window.google) {
        this.google = window.google;
        clearInterval(googlePlaceAPILoad);
        console.log('Load Place API', window.google);
        const mapCenter = new this.google.maps.LatLng(this.state.latOrigin, this.state.lngOrigin);
        this.showMap(mapCenter);
        this.directionsService = new this.google.maps.DirectionsService()
        this.directionsRender = new this.google.maps.DirectionsRenderer()
        this.start = new this.google.maps.LatLng(this.state.latOrigin, this.state.lngOrigin)
      };
    }, 100);
  }

  showMap(mapCenter) {
    this.map = new window.google.maps.Map(
      document.getElementById('map'), { zoom: 15, center: mapCenter });
    var marker = new window.google.maps.Marker({ position: mapCenter, map: this.map });
  }

  manejoOnClick = (e) => {
    const request = {
      query: document.getElementById('origen').value,
      fields: ['photos', 'formatted_address', 'name', 'place_id'],
    };
    this.service = new this.google.maps.places.PlacesService(this.map);
    this.service.findPlaceFromQuery(request, this.findPlaceResult);
  }

  findPlaceResult = (results, status) => {
    console.log('resultado', results)
    var placesTemp = []
    var placeId = ''
    if (status === 'OK') {

      results.map((place) => {
        var placePhotos = ['']
        const placeTemp = {
          id: place.place_id, name: place.name,
          address: place.formatted_address, photos: placePhotos
        }
        placeId = place.place_id;
        placesTemp.push(<Place placeData={placeTemp} />);
      })
    }
    if (placesTemp.length > 0)

      this.findPlaceDetail(placeId);
    else {
      const placeTemp = {
        id: 'N/A', name: <div className='mt-5'><strong className='text-center'>
          No hay resultados</strong></div>,
        address: '', photos: ['']
      }
      placesTemp.push(<Place placeData={placeTemp} />);
      this.setState({ places: placesTemp })
    }
  }

  findPlaceDetail = (placeIdFound) => {
    var request = {
      placeId: placeIdFound,
      fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address',
        'icon', 'id', 'name', 'permanently_closed', 'photo', 'place_id', 'plus_code', 'scope',
        'type', 'url', 'utc_offset', 'vicinity', 'geometry', 'rating', 'reviews', 'opening_hours']
    };
    this.service.getDetails(request, this.foundPlaceDatail);

  }

  foundPlaceDatail = (place, status) => {
    if (status === 'OK') {
      var placePhotos = ['']
      if (place.photos) {
        place.photos.map((placePhoto, index) => {
          placePhotos[index] = placePhoto.getUrl({ 'maxWidth': 160, 'maxHeight': 120 })
        })
      }
      const placeTemp = {
        id: place.place_id, name: place.name,
        address: place.formatted_address, photos: placePhotos
      }

      const placesTemp = <Place placeData={placeTemp} />;
      const placeHorarios = <Horario horarios={place.opening_hours} />
      var rating = ''
      if (place.rating) {
        rating = <Rating placeRating={place.rating} placeReviews={place.reviews} />
      }
      const PlacesComents = <Comentarios reviews={place.reviews} />
      const PlaceRutas = <Rutas  Destino={this.calcDestino}/>


      this.setState({
        places: placesTemp,
        placeRating: rating,
        placeHorarios: placeHorarios,
        placeComents: PlacesComents,
        location: place.geometry.location,
        placeRutas:PlaceRutas

      })
      this.showMap(place.geometry.location);
      this.nearPlace()
    }
  }
  calcDestino = (mode, e) => {
    this.directionsRender.setMap(this.map)
    const end = this.state.location
    const request = {
        origin: this.start,
        destination: end,
        travelMode: mode
    }
    this.directionsService.route(request, (result, status) => {
        if(status === "OK"){
            this.directionsRender.setDirections(result)
        }
    })
}
  //metodo para buscar lugares cercanos
  nearPlace = () => {
    const request = {
      location:  this.state.location,
      radius: '500'
    }
    console.log('into nearplace')

      this.service.nearbySearch(request, (results, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
         var nearPlace = <LugaresCercanos  findPlaceDetail={this.findPlaceDetail} nearPlaces={results}/>
        }
        this.setState({
          nearplace: nearPlace
        })
      })
  }
  

  render() {
    return (
      <div className="App" >

        <div className='container border rounded p-3 mt-4' style={{ width: '50%' }}>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 text-center'>
              <label><strong>Indica el lugar</strong></label>
            </div>
            <div className='col-4'></div>
          </div>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 py-2'><input id='origen' type='text' /></div>
            <div className='col-4'></div>
          </div>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 text-center'>
              <div className='btn btn-primary text-center' onClick={this.manejoOnClick}>Buscar Lugar</div>
            </div>
   
          </div>
          {this.state.places}
          {this.state.placeHorarios}
          {this.state.placeRating}
          {this.state.placeComents}
          {this.state.placeCercanos}
          {this.state.nearplace}
          {this.state.placeRutas}
          
          <div id="map"></div>

        </div>

      </div>
    );
  }
}

export default App;
