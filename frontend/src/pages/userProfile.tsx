import {useState,useEffect} from 'react';
import { UserProfileApi } from '../api/userPro';
import { UserProfileData } from '../types/userType';
import "../css/userPro.css";


const UserProfile = () => {
    const [profile,setProfile] = useState<UserProfileData | null>(null);
    const [error,setError] = useState<string | null> (null);
    const [edit,setEdit] = useState<boolean>(false)
    const [formData,setFormData] = useState<Partial<UserProfileData>>({});


    const api = new UserProfileApi();

    useEffect(()=>{
        const fetchProfile = async()=>{
            try{
                const data = await api.getUserProfile();
                setProfile(data);
            }
            catch(error:any){
                setError(error.message);
            }
        };
        fetchProfile();
    },[]);

   

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleUpdate = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const updated = await api.updateUserProfile(formData);
            setProfile(updated);
            setEdit(false);
            alert("Profile Updated Succesfully");
        }
        catch(error:any){
            alert (error.message);
        }

    }
    if (error) return <p className='error-text'>{error}</p>;

    return(
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={profile?.profile_pic || "https://unsplash.com/photos/black-smartphone-beside-pen-rNYCrcjUnOA"}
          alt="Profile"
          className="profile-pic"
        />

        {edit ? (
          <form onSubmit={handleUpdate} className="profile-form">
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              placeholder="First Name"
              className='form-input'
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
              placeholder="Last Name"
              className ="form-input"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className = 'form-input'
            />
            <input
              type="text"
              name="profile_pic"
              value={formData.profile_pic || ""}
              onChange={handleChange}
              placeholder="Profile Picture URL"
              className = 'form-input'
            />
            <div className='button-group'>
            <button type="submit" className='button-save'>Save</button>
            <button type="button" onClick={() => setEdit(false)} className='button-cancel'>
              Cancel
            </button>
            </div>
          </form>
        ) : ( /// i want to understand this part
        <div className= "profile-info">
            <h2 className="profile-name">
              {profile?.first_name} {profile?.last_name}
            </h2>
            <p>
              <strong>Email:</strong> {profile?.email}
            </p>
            {profile?.country_code && (
              <p>
                <strong>Country Code:</strong> {profile?.country_code}
              </p>
            )}
            {profile?.phone && (
              <p>
                <strong>Phone:</strong> {profile?.phone}
              </p>
            )}
            {profile?.role && (
              <p>
                <strong>Role:</strong> {profile?.role}
              </p>
            )}
            <button onClick={() => setEdit(true)} className='button-edit'>Edit Profile</button>
        </div>
        )}
      </div>
    </div>
    )
  }
export default UserProfile;