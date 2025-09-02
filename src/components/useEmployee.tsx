import { useState, useEffect } from "react";

export interface Emp {
  id: number;
  name: string;
  email: string;
  dep: string;
}
const data: Emp[]= [
        {id:1,name:"Dev",email:"dev2@gmail.com",dep:"Analytics"},
        {id:12,name:"Naman",email:"naman1@gmail.com",dep:"Finance"},
        {id:23,name:"Rahul",email:"rahul4@gmail.com",dep:"IT"},
        {id:34,name:"Shiv",email:"shiv@gamil.com",dep:"BDE"},
        {id:45,name:"Dharam",email:"dharam9@gmail.com",dep:"Marketing"},
        {id:56,name:"Ram",email:"ram32@gamil.com",dep:"QA"},
    ];

export function useEmployees() {
    const [employees, setEmployees] = useState<Emp[]>([]);

    useEffect(() => {
    setEmployees(data);
    }, []);

  
    return employees;
}