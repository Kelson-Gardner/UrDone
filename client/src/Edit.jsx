import { useState, useEffect } from "react";
import cookie from "cookie";
import './Edit.css';
import { useNavigate } from "react-router-dom";
import './Profile.css';

function Edit(){
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState("")

    async function checkOutProfile(){
        const res = await fetch("/get_my_profile/", {

            credentials: "same-origin",

        })
        const body = await res.json();

        setBio(body.profile.bio);
        setAge(body.profile.age);
        setEmail(body.profile.email);
        setUserName(body.profile.user_name);
    }

    async function updateProfile(e, age, bio){
        e.preventDefault();
        const res = await fetch("/get_my_profile/", {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                userName,
                email,
                age,
                bio
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken
            }
        })
        navigate("/home");
    }

    useEffect(() => {
        checkOutProfile();
    }, [])
    

    return(
    <div className="single-profile-container">
        <div className="edit-profile">
            <div className="profile-username">{userName}</div>
            <div className="email" >{email}</div>
            <form onSubmit={(event) => {
                updateProfile(event, event.target[0].value, event.target[1].value);
            }}>
            Age: <input type="number" className="edit-age" min="1" max="110" 
            defaultValue={age}></input>Bio: <textarea className="edit-bio" defaultValue={bio}></textarea>
            <button className="save-changes">Save Changes</button>
            </form>
        </div>
    </div>)
}

export default Edit