import React, { Component } from 'react';
import './LugaresCercanos.css'
import Rating from './Rating'
export default class LugaresCercanos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nearplace: '',
            ver: false,
            seemore: false,
            morenearplace: ''
        }
    }
    manejoOnClick = (e) => {

        this.setState((prevState) => {
            return ({
                ver: !prevState.ver,
                seemore:false
            })});

    
        if (e.target.id === 'nearplace') {
            console.log('testeando', this.props.nearPlaces)
            var lugaresCercanos = [];
            var nearphotos = [];
            var rating = [];
            this.props.nearPlaces.map((nearplace, index) => {
                if (nearplace.photos) {
                    nearplace.photos.map((photo) => {
                        nearphotos[index] = photo.getUrl({ 'maxWidth': 180, 'maxHeight': 100 })
                    })
                }
                rating[index] = nearplace.rating;

                lugaresCercanos.push(
                    
                    <div key={index}
                        className='container cercanos mb-3  col-10 offset-1 decoration'>
                        <div className='row'>
                            <div className='col-5 offset-4 py-3'><strong>{nearplace.name}</strong></div>
                            <div className='col-4 offset-1 nearimages my-3' >
                                <img src={nearphotos[index]} alt='imagen no disponible' /></div>
                            <div className='col-6'>
                                <p>{nearplace.vicinity}</p>
                            </div>
                        </div>
                        <div className='row '>
                        
                            <div className='col-8 offset-5 positionrating'>
                        <Rating className='' placeRating={rating[index]} /></div>
                        </div>
                        
                        <a className='btn btn-primary mb-2' onClick={()=>this.props.findPlaceDetail(nearplace.place_id)}>Visitar Lugar</a>
                        
                    </div>) 
            });
            this.setState({
                nearplace: lugaresCercanos.slice(1, 6),
                 morenearplace: lugaresCercanos.slice(1, 16)
            })

        }

    }
    moreplace = (e) => {
        this.setState((prevState) => {
            return ({
                seemore: !prevState.seemore
            });
        });
    }

    render() {
        if (this.state.ver) {
            if (this.state.seemore) {
                return (
                    <div>
                        <div>
                            <a id='nearplace' href='#' className='btn btn-primary my-3'
                                onClick={this.manejoOnClick}> Ocultar lugares Cercanos</a>
                        </div>
                        {this.state.morenearplace}
                        <div class='row justify-content-end mr-3'>
                        <a id='moreplace' href='#' className='btn btn-primary my-5'
                            onClick={this.moreplace}> Mostrar menos lugares</a>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                    <div>
                        <a id='nearplace' href='#' className='btn btn-primary my-3'
                            onClick={this.manejoOnClick}> Ocultar lugares Cercanos</a>
                    </div>
                    {this.state.nearplace}
                    <div class='row justify-content-end mr-5'>
                    <a id='moreplace' href='#' className='btn btn-primary my-3 row justify-content-end '
                        onClick={this.moreplace}> Mostrar mas lugares</a>
                    </div>
                </div>
                );
            }
        }
        else {
            return (
                <div>
                    <a id='nearplace' href='#' className='btn btn-primary my-3'
                        onClick={this.manejoOnClick}> Buscar lugares Cercanos</a>
                </div>

            );
        }
    }
}
