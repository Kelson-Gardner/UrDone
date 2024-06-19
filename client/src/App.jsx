import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
import TopNav from './TopNav';
import { Outlet, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { useParams } from 'react-router-dom';



function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const [user, setUser] = useState("")
  const [profile, setProfile] = useState(false);
  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", 
    });

    if (res.ok) {
      
      window.location = "/registration/sign_in/";
    } else {
     
    }
  }
  async function getUser(){
    const res = await fetch("/me/", {
      credentials: "same-origin",
    })
    const body = await res.json();
    setUser(body.user.first_name);
    navigate("/home");
  }
  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
  <TopNav />
    {profile === false ? <Profile /> : ""}
    <span className='outlet'>

  <Outlet />
    </span>
    </>
  )
}

export default App;
