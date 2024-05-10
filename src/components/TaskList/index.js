// // TaskList.js
// import React from 'react';
// import Task from '../Task';
// import { List } from '@mui/material';

// function TaskList({ tasks, onDeleteTask, onEditTask,checkedTasks,completedTasks,fetchedTasks }) {
//   const list = [
//     "rgba(76, 175, 80, 0.1)",
//     "rgba(33, 150, 243, 0.1)",
//     "rgba(156, 39, 176, 0.1)",
//     "rgba(255, 152, 0, 0.1)",
//     "rgba(244, 67, 54, 0.1)"
//   ];
//   const changeStatus=(id)=>
  
//   checkedTasks(id)

  
// const chooseColor=()=>{
//   const rand = Math.floor(Math.random() * list.length);
//   return list[rand]
// }

//   return (
//    <>{tasks.length>0?( <List style={{height:"95vh",overflow:"auto",borderRadius:"30px"}}>
//       {tasks.map((task) => (
//         <Task key={task.id} task={task} completedTasks={completedTasks} completedd={changeStatus} color={chooseColor} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
//       ))}
//     </List>):<>no tasks</>}
//   </>);
// }

// // export default TaskList;
// import React from 'react';
// import Task from '../Task';
// import { List } from '@mui/material';
// import { ClipLoader } from 'react-spinners'; // Importing the RingLoader component

// function TaskList({ tasks, onDeleteTask, onEditTask, checkedTasks, completedTasks, fetchedTasks }) {
//   const list = [
//     "rgba(76, 175, 80, 0.1)",
//     "rgba(33, 150, 243, 0.1)",
//     "rgba(156, 39, 176, 0.1)",
//     "rgba(255, 152, 0, 0.1)",
//     "rgba(244, 67, 54, 0.1)"
//   ];
  
//   const chooseColor = () => {
//     const rand = Math.floor(Math.random() * list.length);
//     return list[rand]
//   }
//   const changeStatus=(id)=>
  
//     checkedTasks(id)
//   // Rendering logic based on fetchedTasks and tasks length
//   if (fetchedTasks) {
//     return (
//       <div className="sweet-loading">
//         <ClipLoader/>
//       </div>
//     );
//   } else if (!fetchedTasks && tasks.length === 0) {
//     return <div>no tasks</div>;
//   } else {
//     return (
//       <List style={{ height: "95vh", overflow: "auto", borderRadius: "30px" }}>
//         {tasks.map((task) => (
//           <Task key={task.id} task={task} completedTasks={completedTasks} completedd={changeStatus} color={chooseColor} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
//         ))}
//       </List>
//     );
//   }
// }

// export default TaskList;



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
