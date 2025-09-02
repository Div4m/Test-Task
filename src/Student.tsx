type Pro ={
    name:string;
}
function Student(props:Pro){
    return(
        <div>
            <h1>I am first student: ,{props.name}</h1>
        </div>
    );
}
export default Student;
