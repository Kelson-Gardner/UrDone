import { useState, useEffect } from "react";
import UserDropDown from "./UserDropDown";
import './TopNav.css';
import {Link, useNavigate} from 'react-router-dom';

function TopNav(){
    const [selected, setSelected] = useState("home");
    const [userFirstName, setUserFirstName] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userDropDown, setUserDropDown] = useState(false);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();
    
    async function getUser(){
        const res = await fetch("/me/", {
          credentials: "same-origin",
        })
        const body = await res.json();
        const fullName = `${body.user.first_name} ${body.user.last_name}`;
        setUserFullName(fullName);
        setUserFirstName(body.user.first_name);
        setUserId(body.user.id);
      }

function checkDropDown(){
    try{
    const elements = document.getElementsByClassName("userDropDownSelected");
    const dropDown = elements[0];
    dropDown.addEventListener("mouseout", (event) => {
        const relatedTarget = event.relatedTarget;
        if(!dropDown.contains(relatedTarget)){
            setUserDropDown(false);
        }
    });
    dropDown.removeEventListener("mouseout", (event) => {
        const relatedTarget = event.relatedTarget;
        if(!dropDown.contains(relatedTarget) || relatedTarget == "top-nav-bar"){
            setUserDropDown(false);
        }
    });
}
catch(error){
}
}
      useEffect(() => {
        getUser();
        checkDropDown();
      });

    return (
<>    
<div id="top-nav-bar">
    <h1 className="title" onClick={() => navigate("/home")}><span className="ur">Ur</span><span className="done">Done</span></h1>
    <nav>
      <ul id="nav-bar-links">
            <li><Link to="/home" href="#" className={selected === "home" ? 'selected' : "nav-bar-anchor"} onClick={() => setSelected("home")}><i className="material-icons">home</i></Link></li>
            <li><Link to="/add" href="#" className={selected === "add" ? 'selected' : "nav-bar-anchor"} onClick={() => setSelected("add")}><i className="material-icons">add</i></Link></li>
            <li><Link to="/menu" href="#" className={selected === "menu" ? 'selected' : "nav-bar-anchor"} onClick={() => setSelected("menu")}><i className="material-icons" >menu</i></Link></li>
      </ul>
    </nav>
    <div>Welcome, <span id="nav-username" onClick={() => setUserDropDown(true)}>{userFirstName}</span></div>
    </div>
    <UserDropDown className={userDropDown === true ? "userDropDownSelected" : "userDropDownHidden"} userName={userFullName} userId={userId}/>
    </>
    );
}

export default TopNav;