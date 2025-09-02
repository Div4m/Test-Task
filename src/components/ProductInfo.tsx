type Info = {
    name:string;
    price:number;
}

import React from "react"

class Product extends React.Component<Info>{

    render(){
        return(
            <div>
            <h2>product name is {this.props.name}</h2>
            <p>And price is {this.props.price}</p>
            </div>
        )
    }

}
export default Product;
