export interface IUserCreateDTO {
  user_id: string;
  first_name: string;
  last_name?: string | null;
  phone?: string;
  country_code?: string;
  email: string;
  password: string;
  role_id: string;
  profile_pic?: string;
  status?: boolean;
}

export interface IUserDTO {
  id: string;
  user_id: string;
  first_name: string;
  last_name?: string | null;
  phone?: string |null;
  country_code?: string | null;
  email: string;
  profile_pic?: string | null;
  status: boolean;
  role_id?: string;
  created_at: Date;
}