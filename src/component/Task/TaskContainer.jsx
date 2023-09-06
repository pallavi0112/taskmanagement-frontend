import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import './Task.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllTask, DeleteTask, GetUpdatingData } from '../../features/taskSlice'
import { FaPlus } from 'react-icons/fa6'
import { openForm } from '../../features/commanSlice'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie'
const TaskContainer = () => {
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['taskManagement']);
    const token = cookies.token;
    const [isExisting, setIsExisting] = useState(false)
    const tasks = useSelector((state) => state.tasks.data)
    const [taskList, setTaskList] = useState(tasks)
    const Status = useSelector((state) => state.tasks.status);
    console.log(taskList)
    const editTask = (task) => {
        dispatch(openForm({ isopen: true, update: true }))
        dispatch(GetUpdatingData(task))
    }
    const deleteTask = (id) => {
        dispatch(DeleteTask({id , token}))
        dispatch(GetAllTask(token))
    }
    const HandleClick = () =>{
        dispatch(openForm({ isopen: true, update: false }))
        dispatch(GetUpdatingData(null))
    }
    useEffect(() => {
        dispatch(GetAllTask(token))
    }, [])
   
    useEffect(() => {
        setTaskList(tasks)
        // if (Status.create || Status.update || Status.delete) {
        //   const msg = Status.create || Status.update || Status.delete
        //   toast.success(msg, {
        //     position: 'top-right',
        //     autoClose: 3500,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: false,
        //     progress: undefined,
        //   });
        // }
        console.log(taskList)
      },[tasks])
    return (
        <div className='task-section'>
          <ToastContainer/>
            <div className='task-header-section'>
                <button onClick={HandleClick} className='task-btn'>Create Your Task <FaPlus /></button>
            </div>
            {taskList && taskList.length > 0 ? <h3 className='heading'>All Your Tasks</h3> : 'nothing is there'}
            <div className='task-items allItems'>
                {taskList && taskList.map((obj, index) => {
                    return <TaskCard task={obj} key={index} index={index} DeleteTask={deleteTask} EditTask={editTask} />
                })}
            </div>
        </div>
    )
}

export default TaskContainer