import { useState } from "react";
import cookie from "cookie";
import {useNavigate} from 'react-router-dom';
import './Add.css';

function Add(){
    const [caption, setCaption] = useState("");
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("");

    async function getUser(){
        const res = await fetch("/me/", {
          credentials: "same-origin",
        })
        const body = await res.json();
        const fullName = `${body.user.first_name} ${body.user.last_name}`;
        setUserName(fullName);
      }

    async function createPost(e){
        e.preventDefault();
        const res = await fetch("/posts/", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({
            caption,
            userName
        }),
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": cookie.parse(document.cookie).csrftoken
        }
     } )
     const body = await res.json();
     setPosts([...posts, body.post]);
    }

    const navigate = useNavigate();

    return(<div className="outlet-container">
        <div className="post-input">
            <span className="title-post-input">Create Your Post!</span>
                <form onSubmit={(event) => {createPost(event);
                                    navigate("/home");}}>
                    <textarea type="text" name="caption" className="text-post-input" placeholder="Let us know what you're up to!" onChange={e => {
                        setCaption(e.target.value);
                        getUser();
                }}></textarea>
                    <button className="create-post-button">Create Post</button>
                </form>
            </div>
        </div>
        )
    }
    
    export default Add;