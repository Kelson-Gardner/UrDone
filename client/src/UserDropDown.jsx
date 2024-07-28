import { Link } from 'react-router-dom';
import './UserDropDown.css';

function UserDropDown(props){
    async function logout() {
        const res = await fetch("/registration/logout/", {
          credentials: "same-origin", 
        });
    
        if (res.ok) {
          window.location = "/registration/sign_in/";
        } else {
          
        }
      }

    return(
        <div className={props.className}>
            <div className="profile-container">
                <Link to={`/menu/${props.userId}`} className="profile-name"><div>{props.userName}</div></Link>
            </div>
            <div className="drop-down-items-container">
            <Link to="/edit" className='drop-down-link'><div className="drop-down-item">Edit Profile</div></Link>
                <Link to="/add" className='drop-down-link'><div className="drop-down-item">Make Post</div></Link>
                <div className="drop-down-item" onClick={logout}>Logout</div>
            </div>
        </div>
        );
}

export default UserDropDown;