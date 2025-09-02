import React,{useState} from "react"

function Multiple(){
    
    const[info,setInfo] = useState<{name:string,age:number}>({
        name:"Divyansh",
        age:22
    })
    const updateAge = () => setInfo(prev => ({...prev,age:prev.age+1,name:"Ahan"}))
    return(
    <div>
        <p>My name is {info.name}</p>
        <p>and My age is {info.age}</p>
        <button onClick ={updateAge}>You can </button>
    </div>
);
}
export default Multiple