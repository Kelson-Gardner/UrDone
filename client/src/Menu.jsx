import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './Menu.css'


function Menu(){
    const [profiles, setProfiles] = useState([])
    const mainProfilesPage = <div className="outlet-container">

    <div className="profile-user-container" >{profiles.map((profile) => (
        <Link to={`/menu/${profile.user}`} className="link-to-profile-user" key={profile.id}><div key={profile.id} className="profile-user">@{profile.user_name}</div></Link>
        ))}</div>
        </div>
    
    async function getProfiles(){
        const res = await fetch("/create_profile/", {
            credentials: "same-origin"
        })
        const body = await res.json();
        setProfiles(body.profiles)
    }

    useEffect(() => {
        getProfiles();
    }, [])

    return(mainProfilesPage)
    }
    
    export default Menu;