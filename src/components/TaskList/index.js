


import React from 'react';
import Task from '../Task';
import { List,Typography } from '@mui/material';
import { RingLoader } from 'react-spinners';
import { RiErrorWarningLine } from 'react-icons/ri'; // Importing an icon from React Icons library

function TaskList({ tasks, onDeleteTask, onEditTask,checked, checkedTasks,category, completedTasks, fetchedTasks }) {
  const list = [
    "rgba(76, 175, 80, 0.1)",
    "rgba(33, 150, 243, 0.1)",
    "rgba(156, 39, 176, 0.1)",
    "rgba(255, 152, 0, 0.1)",
    "rgba(244, 67, 54, 0.1)"
  ];
  
  const chooseColor = () => {
    const rand = Math.floor(Math.random() * list.length);
    return list[rand]
  }

  const changeStatus = (id) => {
    checkedTasks(id);
  };

  if (fetchedTasks && tasks.length===0) {
    return (
      <div className="sweet-loading">
        <RingLoader color={'#123abc'} loading={true} size={150} />
      </div>
    );
  } else if (!fetchedTasks && tasks.length === 0) {
    return (
      <>    <Typography color="green">{category===""?<>All Tasks</>:<>{category.toUpperCase()}</>}</Typography>   <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <RiErrorWarningLine style={{ fontSize: '64px', color: 'orange', marginBottom: '20px' }} />
        <Typography variant="h4" color="blue">Add Tasks..</Typography>
      </div></>
    );
  } else {
    return (
      <List style={{ height: "95vh", overflow: "auto" }}>
       <Typography color={"green"}>{category===""?<>All Tasks</>:<>{category.toUpperCase()}</>}</Typography> 
        {tasks.map((task) => (
          <Task checked={checked} key={task.id} task={task} completedTasks={completedTasks} completedd={changeStatus} color={chooseColor} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
        ))}
      </List>
    );
  }
}

export default TaskList;
