import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskEditModal from './components/TaskEditModal';
import { Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TbRuler2 } from 'react-icons/tb';

function Main() {
    const token= localStorage.getItem("token")
    const navigate=useNavigate()
    if(!token){
        navigate("/login")
    }
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(
  "");
  const [addtask,setAddtask]=useState(false)
  const [fetchedTasks,setFetched]=useState(false)
  const [checked,setChecked]=useState(false)
  const [category,setCategory]=useState("")
const mail=localStorage.getItem("mail")
// fetching data

const fetchData=async()=>{
    try{
      const res = await axios.post("http://localhost:8081/api/v1/auth/fetchtasks", { mail });
if (res.data.success) {
  let filteredTasks = res.data.tasks;

  // Filter tasks based on the category
  if (category === "completed") {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (category === "pending") {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }
  const sortedTasks = filteredTasks.sort((a, b) => {
    // First, compare priority
    if (a.priority !== b.priority) {
      // If priority is different, sort by priority
      if (a.priority === "high") return -1; // high priority comes first
      if (b.priority === "high") return 1;
      if (a.priority === "medium") return -1; // medium priority comes second
      if (b.priority === "medium") return 1;
      return 0; // low priority comes last
    } else {
      // If priority is the same, compare due dates
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
  });

  console.log(sortedTasks); // Check if tasks are sorted correctly
  setTasks(sortedTasks);
}

        else{
            console.log(res.data.message)
        }

    }catch(e){

    }
}


  useEffect(() => {
    setFetched(true)
fetchData()
setFetched(false)
  }, [category]); 


  const checkedTask =async (id) =>{
    setChecked(true)
    try{
    const res=await axios.post("http://localhost:8081/api/v1/auth/completed",{mail,id})
  if(res.data.success){
    fetchData()
    setChecked(false)
    
  
  }
  else{
    setChecked(false)
  }}
  catch(e){
    alert("error")
  }

  }
   

  const addTask = async(id,title,description,priority,dueDate,completed) => {
    setAddtask(true)
    try{
const res=await axios.post("http://localhost:8081/api/v1/auth/addtask",{mail,id,title,description,priority,dueDate,completed})
if(res.data.success){
    fetchData()
    setAddtask(false)
    toast.success("Task Added Successfully!")
   
}   
else{
  setAddtask(false)
    toast.info("Task Not Added!")
}

}
    catch(e){  setAddtask(false)
      toast.error("something Went Wrong!")

    }
  };

  const deleteTask =async (id) => {
    setChecked(true)
    try{
        const res=await axios.post("http://localhost:8081/api/v1/auth/delete",{mail,id})
        if(res.data.success){
            fetchData()
            setChecked(false)
            toast.success("Deleted Successfully!")
        }   
        else{
          toast.error(res.data.message)
          setChecked(false)
        }
        
        }
            catch(e){alert(e)
              toast.error("Something Went Wrong!")
              setChecked(false)
        
            }
  };

  const editTask = (id) => {
   setSelectedTask(id)
    setEditModalOpen(true);
    
  };

  const saveEditedTask = async(id,title,description,priority,dueDate) => {
  setChecked(true)
    try{
        const res=await axios.post("http://localhost:8081/api/v1/auth/edit",{mail,id,title,description,priority,dueDate})
        if(res.data.success){
            fetchData()
        toast.success("Edted Successfully!")
            setChecked(false)
        }   
        else{
          toast.error("Unable to edit!")
          setChecked(false)
        }
        
        }
            catch(e){console.log(e)
              setChecked(false)
            }
        
            
    setEditModalOpen(false); // Close modal after saving
  };

  const filterCompletedTasks = () => {
  setCategory("completed")
  };

  const filterPendingTasks = () => {
    setCategory("pending")
  };
  const allTasks = () => {
    setCategory("")
  };
  const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("mail")
    navigate("/login")
  }

  return (
    <div style={{
      backgroundColor: "lightblue",
      minHeight: '100vh',
    }}>
      <div style={{display:"flex",justifyContent:"space-between",padding:"10px 20px 10px 20px",alignItems:"center"}}>
        <Typography color={"orange"} variant="h4">Task Manager</Typography>
       <div onClick={logout} style={{display:"flex",alignItems:"center",color:"green"}}  > <LogoutIcon color={"green"} />Logout</div>
      </div>
      <Container maxWidth="lg">
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TaskForm onAddTask={addTask} addtask={addtask} alltasks={allTasks} pendingTasks={filterPendingTasks} completedTasks={filterCompletedTasks} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TaskList checked={checked} category={category} fetchedTasks={fetchedTasks} completedTasks={filterCompletedTasks} tasks={tasks} checkedTasks={checkedTask} onDeleteTask={deleteTask} onEditTask={editTask} />
          </Grid>
        </Grid>
        <TaskEditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          task={selectedTask}
          onSave={saveEditedTask}
        />
      </Container>
      <ToastContainer/>
    </div>
  );
}

export default Main;
