 import React, { Component } from 'react'

export default class Horario extends Component {
  constructor(props){
    super(props);
    this.state={mostrar:false}
  }

  manejoOnClick = (e) => {
    if (e.target.id='horario'){
      this.setState((prevState) => {
        return {mostrar:!prevState.mostrar}
      })
    }
  }
  render() {

    console.log('mostrarHorario', this.state.mostrarHorario)
    var horarios='';
    if (this.props.horarios){
      const abierto = this.props.horarios.weekday_text.map((horario,index) => {
          return <div key={index} 
          className='row'>
                   {horario}
                   </div>
      })
      horarios=<div className='row'>
                <div className='col-4'><a id='horario' href='#' 
                onClick={this.manejoOnClick}>Horario</a></div>
                <div className={'col-4 '+(this.state.mostrar ? 'd-block' : 'd-none')}>
                  {abierto}</div>
               </div>
    }else
      horarios=<div className='row'>
                  <strong>Horario no disponible</strong>
                </div>;
    return (
      <div className='container my-2'>
          {horarios}
      </div>
    )
  }
}
