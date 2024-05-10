
import React, { useState } from 'react';
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ClipLoader } from 'react-spinners';

function TaskForm({ onAddTask, completedTasks, pendingTasks, addtask,alltasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low'); // Default priority state is set to "low"
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault(); // Prevent form submission
    const id = Math.random().toString(36).substr(2, 9);

    // Check if any required field is empty
    if (!title || !description || !priority || !dueDate) {
      alert('Please fill in all required fields.');
      return;
    }

    onAddTask(id, title, description, priority, dueDate, completed);
    // Reset form fields
    setTitle('');
    setDescription('');
    setPriority('low'); // Reset priority to "low"
    setDueDate('');
  };

  return (
    <form onSubmit={handleAddTask}>
      <Grid container sx={{ backgroundColor: 'white',marginTop:"40px", borderRadius: "20px", padding: 4 }}>
        <Grid item xs={12} mb={2}>
          <TextField
            required
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style: { borderColor: 'red' } // Change 'red' to your desired border color
            }}
          />
        </Grid>
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
        <Grid item xs={6} mb={2}>
          <Button type="submit" variant="contained" color="error">
            {addtask ? (<ClipLoader color={"green"} size={15} />) : (<>Add Task</>)}
          </Button>
        </Grid>
        <Grid item xs={6} mb={2}>
          <Button variant="outlined" onClick={alltasks} color="success">
            All Tasks
          </Button>
        </Grid>
        <Grid item xs={6} mb={2}>
          <Button variant="outlined" onClick={completedTasks} color="success">
            Completed
          </Button>
        </Grid>
        <Grid item xs={6} mb={2}>
          <Button variant="outlined" onClick={pendingTasks} color="error">
            Pending Tasks
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default TaskForm;
