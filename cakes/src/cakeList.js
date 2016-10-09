import React, {Component} from 'react';

class CakeList extends Component{

    render(){
        return(
            <ul>{this.props.cakes.map((cake, i) => {
                return (
                    <li className="cake-item" key={i}>
                        <span>{cake.title}</span>
                        <div className="cake-image-container">
                            <img src={cake.image} alt={cake.title} />
                            <span>{cake.desc}</span>
                        </div>
                    </li>);
            })}</ul>);        
    }
}

export default CakeList;