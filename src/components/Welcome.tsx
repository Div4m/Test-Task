type Name = {
    user : string;
}
import React from "react"
class Welcome extends React.Component<Name>{
    constructor(props:Name){
        super(props);
    }
    render(){
        return(
            <div>
                <h2>User name is {this.props.user}</h2>
            </div>
        );
    }
}
export default Welcome;