import React, { Component } from 'react';

 export default class Comentarios extends Component {
     constructor(props){
         super(props);
         this.state={mostrar:props.mostrarComentario}
     }

    manejoOnClick=(e) => {
        if(e.target.id='comentario'){
            this.setState((prevState)=>{
                return {mostrarComentario:!prevState.mostrarComentario}
            })

        }
    }
    render() {
        var Comentarios ='';
        if(this.props.reviews){
            const coment = this.props.reviews.map((review,index)=>{
                return < div key={index} className='col-10 offset-1 bg-primary pt-2 rounded'>
                    <div className='container '>
                  <div className= 'row mb-2 '><strong>{review.author_name}</strong></div>
                  <div className='row border  border-primary mb-2'><p>{review.text}</p></div>
                </div>
                </div>
            })
      
         Comentarios=<div className= 'row ' >
         <div className='col-8 pb-2 '><a id= 'comentario' href='#'
        onClick={this.manejoOnClick}>{(this.state.mostrarComentario? 'Ocultar Comentarios' :'Mostrar Comentarios')}</a></div>
        <div className={(this.state.mostrarComentario? 'd-block0':'d-none')}> 
        {coment}
        </div>
        </div>
  }else
  Comentarios=<div className='row'>
              <strong>Comentarios no disponibles</strong>
            </div>;

        return (
                <div >
   {Comentarios}
                </div>
                
        
        );
    }
}