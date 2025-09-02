import React,{useState} from "react"

function InputFeild(){
    const[text,setText]= useState<string>("")
    return(
    <div>
        <input type={text} onChange={e => setText(e.target.value)} placeholder ="type here..."/>
        <p>Typed :{text}</p>
    </div>
    );
}
export default InputFeild
