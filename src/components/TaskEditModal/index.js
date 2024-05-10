// TaskEditModal.js
import React, { useState } from 'react';
import { Modal,Grid, TextField, Button,FormControl,InputLabel,Select,MenuItem } from '@mui/material';

const TaskEditModal = ({ open, onClose, task, onSave }) => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [priority,setPriority]=useState("low")
    const [dueDate,setDueDate]=useState("")
 
  const handleSave = () => {
   
    onSave(task,title,description,priority,dueDate);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ backgroundColor: 'white', padding: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
     <form onSubmit={handleSave}><Grid item xs={12} mb={2}>  <TextField
         required
          label="Title"
          fullWidth
          name="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        /></Grid>
     
     <Grid item xs={12} mb={2}>
        <TextField
          required
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} mb={2}>
      <FormControl fullWidth required>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
      </Grid>
      <Grid item xs={6} mb={2}>
        <TextField
        required
          label="Due Date"
          fullWidth
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      
        <Button margin={2}  variant="contained" color="success" type="submit" >Save</Button>
    
        <Button variant="outlined" onClick={onClose} sx={{ marginLeft: 2 }}>Cancel</Button></form>
      </div>
    </Modal>
  );
};

export default TaskEditModal;
