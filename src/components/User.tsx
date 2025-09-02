
type Data ={
    name:string;
    email:string;

}


function User(props:Data){
    return(
        <div>
            <h1>helo,{props.name}</h1>
            <p>email:{props.email}</p>
            
        </div>
    )
}
export default User ;