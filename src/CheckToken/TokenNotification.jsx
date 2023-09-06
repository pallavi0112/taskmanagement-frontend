import React , {useState , useEffect} from 'react'
import { Modal, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { tokenNotification } from '../features/commanSlice';
import { useDispatch , useSelector } from 'react-redux';
const TokenNotification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const istokennotification = useSelector((state)=>state.comman.istokennotification)
    const [isopen , setIsopen] = useState(istokennotification)
    const style = {
        position : 'relative',
        maxheight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '2rem',
        borderRadius: '0.5rem',
        backgroundColor : "#fff",
    };
    
    useEffect(()=>{
       setIsopen(istokennotification)
    },[istokennotification])
    return (
        <Modal
            open={isopen}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClose={()=>{dispatch(tokenNotification(false))}}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box>
             <div style={{...style}}>
                <button style={{
                    position :"absolute",
                    top : "10px",
                    right: "10px",
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize:"1.1rem",
                    color:"#880E4f"
                }}
                onClick = {()=>{dispatch(tokenNotification(false))}}
                >
                <ImCross />
                </button>
            <h2 id="parent-modal-title">Your token has expired !!</h2>
            <p id="parent-modal-description">
                Please login for the continue....
            </p>
            <Button type="button" variant="contained" className="task-btn" 
            onClick={()=>{
                 dispatch(tokenNotification(false))
                 navigate('/login')
            }}>
                 Go To Login
            </Button>

             </div>
        </Box>
        </Modal>
    )
}

export default TokenNotification