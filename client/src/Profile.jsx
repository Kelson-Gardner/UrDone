import { useState, useEffect } from "react";
import cookie from "cookie";
import './Edit.css';
import { useNavigate } from "react-router-dom";
import './Profile.css';
function Profile(){
    const navigate = useNavigate();
    const [profile, setProfile] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [userName, setUserName] = useState("");

    async function getUser(){
        const res = await fetch("/me/", {
          credentials: "same-origin",
        })
        const body = await res.json();
        const fullName = `${body.user.first_name} ${body.user.last_name}`;
        setUserName(fullName);
      }

    async function checkProfile(){
        const res = await fetch("/has_profile/", {
            credentials: "same-origin",      
        })
        const body = await res.json();
        if(body.profile){
            setProfile("");
        }
        else 
        setProfile(
            <div className="create-profile">
                <div className="title-create-profile">Add Your Info To Your Profile!</div>
            <form onSubmit={(event) => {
                createProfile(event, event.target[0].value, event.target[1].value);
                navigate("/home");
                setProfile("");
                }}>
                <div>

                Age: <input type="number" min="1" max="150" step="1" className="age-input"/>
                </div>
                <div>

                Bio: <textarea className="edit-bio" placeholder="Tell us about yourself!" onChange={(e) => {
                    getUser();
                }}></textarea>
                </div>
                <button className="save-changes">Save
                </button>
            </form>
            </div>
            );
    }

    async function createProfile(e, age, bio)
    {
        e.preventDefault();
        getUser();
        const res = await fetch("/create_profile/", {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                userName,
                bio,
                age
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken
            }
    })
        const body = await res.json()
        setProfiles([...profiles, body.profile]);
    }
    useEffect(() => {
        checkProfile();
        getUser();
    }, [])

    return (<div className="create-profile-container">{profile}</div>)
}

export default Profile