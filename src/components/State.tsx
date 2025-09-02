import { useState} from "react"

function FavriotColor(){

    const[color,setColor] = useState<string>("red")
    return(
        <div>
            <h2>my favroit color is {color}!</h2>
            <button onClick ={()=>setColor('blue')}>heloo</button>
        </div>
    )
    
}

export default FavriotColor



// function Counter(){
//     const [count,setCount]=useState<number>(0)
//     return(
//         <div>
//             <p>Count:{count}</p>
//             <button onClick={()=>setCount(prev => prev - 1 )}>Decrement</button>
//             <button onClick={()=>setCount(prev => prev + 1)}>Intcrement</button>
//         </div>
//     )
// }
// export default Counter