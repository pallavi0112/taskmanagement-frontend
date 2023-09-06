import React, { useEffect, useState } from 'react';
// import logo from '../assets/logo.png';
import './Hero.css';
import {GrTask} from 'react-icons/gr'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../features/UserSlice';
import { useCookies } from 'react-cookie';
import { IMG_URL } from '../../config';
const Header = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['taskManagement']);
  const token = cookies.token
  const {user} = useSelector((state)=>state.User)
  const [detail , setDetail] = useState(user)
  useEffect(()=>{
       dispatch(GetUser(token))
  },[])
  useEffect(()=>{
    setDetail(user)
  },[user])
  return (
    <header>
      <nav>
        <div className="container">
          <div className="logo">
            <GrTask/>
          </div>
          <ul className="menu">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <div>
          {
            JSON.parse(localStorage.getItem('isloggedIn')) 
            ?
             <img src={`${IMG_URL}/${detail.user_pic}`} 
              style={{
                width : "50px",
                height : "50px",
                borderRadius : "50%",
                display:"block",
                objectFit:"contain"
              }}
             />
            :
            <Link to='/login'>Login</Link>
          }
            
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
