type Bok ={
    title:string;
    author:string;
}

import React from "react";

function Books({ title, author}:Bok){
    return(
        <div>
            <p>Title:{title}</p>
            <p>Author:{author}</p>
        </div>
    );
}
export default Books;