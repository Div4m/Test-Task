import {useRef,useState,useEffect} from 'react'

function Ref(){
    const[inputValue,setValue] = useState("")
    let count= useRef(0)

    useEffect(()=>{
        count.current = count.current + 1;
    });

    return(
        <>
        <p>Input field:</p>
        <input type="text" value ={inputValue} onChange={(e)=> setValue(e.target.value)}/>
        <h2>render count:{count.current}</h2>
        </>
    );
}
export default Ref 
























    //     const inputElement = useRef<HTMLInputElement|null>(null);

//     const focusInput = ()=>{
//         inputElement.current?.focus();
//     };
//     return(
//         <>
//         <input type="text" ref={inputElement} />
//         <button onClick ={focusInput}>Focus Input</button>
//         </>
//     );
// }
