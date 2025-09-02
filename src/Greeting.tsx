type GreetingProp = {
    name:string
};

function Greeting({name}:GreetingProp){
  return (
  <h1>Hello,{name}</h1>
);
}
export default Greeting;