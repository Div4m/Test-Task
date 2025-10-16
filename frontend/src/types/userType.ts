export interface SignupData{
    profile_pic :string;    //File
    first_name:string;
    last_name?:string;
    country_code?:string;
    phone?:string;
    email:string;
    password:string;
}

export interface LoginData{
    email:string;
    password:string;
}