export interface SignupData{
    profile_pic :string | null;    //File
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

export interface UserProfileData{
    user_id:string;
    role?:string;
    first_name:string;
    last_name?:string | null;
    email:string;
    country_code?:string | null;
    phone?:string | null;
    profile_pic?:string | null;
}