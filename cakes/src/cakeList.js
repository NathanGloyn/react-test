import React, {Component} from 'react';

class CakeList extends Component{

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
                                    <h3 className="title">{cake.title}</h3>
                                    <p>{cake.desc}</p>                        
                                </div>
                            </div>);
                    })}</div>);        
            }
        }
}

export default CakeList;