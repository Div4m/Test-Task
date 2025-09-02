import React,{ useEffect,useState } from "react";

function Effect(){
    const[count,setCount] = useState(0)
    const[cal,setCal] = useState(0)

    useEffect(()=>{
        setCal (()=>count*2);
        
    },[count])

    return(
    <div>
        <h2>before useEffect{count}</h2>
        <button onClick ={()=> setCount(()=> count + 1)} >Applying useEffect </button>
        <h2>cal:{cal}</h2>
    </div>
    )
}
export default Effect