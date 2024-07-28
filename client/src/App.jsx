import './App.css'
import TopNav from './TopNav';
import { Outlet } from 'react-router-dom';
import Profile from './Profile';

function App() {
  return (
    <>
      <TopNav />
      <Profile />
      <span className='outlet'>
        <Outlet />
      </span>
    </>
  )
}

export default App;
