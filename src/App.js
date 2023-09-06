import './App.css';
import Routing from './routes/Routing.js'
import {useCookies} from 'react-cookie'
import IsTokenExpired from './CheckToken/IsTokenExpired';
import { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { tokenNotification } from './features/commanSlice';

function App() {
  const [cookies, setCookie] = useCookies(['taskManagement']); 
  const token = cookies.token ;
  const dispatch = useDispatch()
   useEffect(()=>{
     if(IsTokenExpired(token)){
       dispatch(tokenNotification(true))
     }
   },[])
  return (
  <>      
        <Routing/>
  </>
  );
}

export default App;
