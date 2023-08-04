import React , {useState} from 'react'
import { FaPenToSquare , FaTrash ,FaCheckCircle  } from 'react-icons/fa6'
import { BsFillCheckCircleFill  } from 'react-icons/bs'

const  TaskCard = ({task , index , EditTask , DeleteTask}) => {
  const i = index;
  const [taskShow , setTaskShow] = useState(false) ;
  // const [updateVal , setUpdateVal] = useState(props.task);
  const Colors = [
    {
      "bold" : "#FBB701",
      "light" : "rgba(255, 153, 0, 0.14)"
    },
    {
      "bold" : "#009d90",
      "light" : "rgba(0, 157, 144, 0.14)"
    },
    {
      "bold": "#0156DD",
      "light": "rgba(1, 86, 221, 0.14)"
    },
    {
      "bold": "#AC0000",
      "light": "rgba(172, 0, 0, 0.14)"
    },
    {
      "bold": "#A801BF",
      "light": "rgba(168, 1, 191, 0.14)"
    },
    {
      "bold": "#01BF09",
      "light": "rgba(1, 191, 9, 0.14)"
    },
    {
      "bold": "#EE6657",
      "light": "rgba(238, 102, 87, 0.14)"
    },
  ]
  return (
    <>
      <div className='task-item' style={{"border-top-color": Colors[i%(Colors.length)].bold}}>
        <span className='date' style={{"background-color":Colors[i%(Colors.length)].light}}>{task.createdAt && task.createdAt.split("T")[0]}</span>
         <span className='title'>{task.title}</span>
         <p className='desc'>{task.description}</p> 
         <div className='iscomplete-box'>
         {
          task.Status ?
         <>Complete<input type='checkbox' checked={task.Status} style={{"accent-color": Colors[i%(Colors.length)].bold , width:"20px" , height:"20px" , color : "#fff" , marginLeft : "0.2rem" }}/></>
         : null
         }
         </div>
        <div className='edit_delete' style={{"color": Colors[i%(Colors.length)].bold}}>
          {/* {!taskShow ? '' : <BsFillCheckCircleFill  onClick={SaveTask}/> } */}
           <FaPenToSquare onClick={() => EditTask(task)}/>
           <FaTrash onClick={() => DeleteTask(task._id)}/>
        </div>
      </div> 
    </>
  )
}

export default TaskCard
