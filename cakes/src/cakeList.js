import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

class CakeList extends Component{

    constructor(props){
        super(props);
        this.edit = this.edit.bind(this);
    }

    edit(index){
        this.props.onEdit(index);
    }

    render(){

        // Until our inital ajax call returns cakes will
        // be undefined so we don't attempt to render anything
        if(this.props.cakes === undefined){
            return null;
        }

        if(this.props.cakes.length === 0){
            return (
                <div>
                    <p>No cakes found</p>
                </div>
            );

        } else {
            return(
                <div>{this.props.cakes.map((cake, i) => {
                        return (
                            <div className="itemContainer" key={i}>
                                <div className="imageColumn">
                                    <div className="cake-image-container">
                                        <img src={cake.image} alt={cake.title} />
                                    </div>
                                </div>
                                <div className="textColumn">
                                    <div>
                                        <span className="title">{cake.title}</span>
                                        <a className="updateCakeLink" href="#" onClick={()=>this.edit(i)}><FontAwesome name="pencil" /></a>
                                    </div>
                                    <p className="desc">{cake.desc}</p>                        
                                </div>
                            </div>);
                    })}</div>);        
            }
        }
}

export default CakeList;