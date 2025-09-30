export interface User {
    id :string;
    user_id : string;
    first_name : string;
    last_name? : string |null;
    country_code? : string |null;
    phone? : string |null;
    email : string;
    password : string;//hashed password
    profile_pic? : string | null;
    status : boolean;
    role_id : number;
    created_at? : Date | null;
    updated_at? : Date | null; 
}


