import { useEffect, useState } from "react";
import cookie from "cookie";
import './Home.css';
import { Link, useNavigate } from "react-router-dom";

function Home(){
const [posts, setPosts] = useState([]);
const [userFullName, setUserFullName] = useState("")
const [displayComments, setDisplayComments] = useState([])
const [comments, setComments] = useState([]);
const [postToComment, setPostToComment] = useState("");
const [promptedComment, setPromptedComment] = useState(false);

    async function get_post(){
        const res = await fetch("/posts/", 
        {
            credentials: "same-origin"
        }
        )
        const body = await res.json();
        setPosts(body.posts);
    }

    async function getUser(){
        const res = await fetch("/me/", {
          credentials: "same-origin",
        })
        const body = await res.json();
        const fullName = `${body.user.first_name} ${body.user.last_name}`;
        setUserFullName(fullName);
        // setUserFirstName(body.user.first_name);
      }

    async function updatePost(id, likes1){
        const likes = parseInt(likes1) + 1;
        const res = await fetch("/update_posts/", {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                likes,
                id
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken
            }
         } )
         const body = await res.json();
         get_post();
    }

    async function postComment(e, comment, poster){
        e.preventDefault();
    
        const res = await fetch("/post_comment/", {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                comment,
                poster,
                userFullName,
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken
            }
        })
        const body = res.json()
        setComments([...comments, body.comment]);
        get_comments();
        setPromptedComment(false);
    }

    async function get_comments(){
        const res = await fetch("/post_comment/", 
        {
            credentials: "same-origin"
        }
        )
        const body = await res.json();
        setDisplayComments(body.comments);
        scroller();
    }





    function promptComment(post){
        setPromptedComment(
            <form onSubmit={(e) => {
                getUser();
                postComment(event, e.target[0].value, post);
                }} className="comment-form">
                <textarea type="text" name="comment" className="comment-input" placeholder="Comment..." rows="4" cols="50" maxLength="500"></textarea>
                <button className="material-icons" id="post-comment-button">send
                </button>
            </form>
        );
    }


    function scroller() {
        const scrollableElement = document.getElementsByClassName('comments-container');
        for(let i = 0; i < scrollableElement.length; i++)
        {
            scrollableElement[i].scrollTop = scrollableElement[i].scrollHeight;
            
        }
      };
    function convertDateTime(datetime){

        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
        const date = new Date(datetime);

        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDateString = `${month} ${day}, ${year}`;
        
        return formattedDateString;

    }
    const navigate = useNavigate();

    useEffect(() => {
        scroller();   
        get_comments();
        getUser();
        get_post();
        updatePost();
    }, [])



    return (
        <div className="outlet-container">
            <div className="posts-container">{posts.map((post) => (
                <div className="post-container" key={post.id}>
                    <div className="user-container"><Link to={`/menu/${post.user}`} className="user-name-link"><span className="user-name" /**onClick={() => navigate("/menu")}**/>@{post.user_name}</span></Link> <span className="date">{convertDateTime(post.date)}</span></div>

                    <div className="caption-container">{post.caption}</div>

                    <div className="actions-container">
                    <div className="likes-container"><span className="material-icons" id="likes" onClick={() => updatePost(post.id, post.likes)}>favorite</span><span>{post.likes} Likes</span></div>
                    <div className="comment-prompt-container"><span onClick={(event) => {
                        setPostToComment(post);
                        promptComment(post);
                    }
                } name={promptedComment !== false ? "prompted-comment" : "not-prompted-comment"} id="comment" className="material-icons">add_comment</span></div>
            </div>
                {postToComment === post ? promptedComment : null}
                    <div className="comments-container">{displayComments.map((comment) => (
                        <div key={comment.id} className="all-comments-on-post">{comment.post === post.id ? <div className="comment-container"><span className="comment-user">@{comment.user_name}</span><span className="comment">{comment.message}</span></div> : ""}</div>
                        ))}</div>
                </div>
            ))}
            </div>
        </div>
    );
}
export default Home;