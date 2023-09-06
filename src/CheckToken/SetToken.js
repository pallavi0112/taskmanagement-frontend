import React from 'react'
import {useCookies} from 'react-cookie'
import { useSelector } from 'react-redux';
const SetToken = () => {
  const {token} = useSelector((state)=>state.auth)
  const [cookies, setCookie] = useCookies(['taskManagement']);
  setCookie('token', token , { path: '/' });
  console.log(token)
  return true
}

export default SetToken