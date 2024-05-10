

import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Collapse, Typography, Checkbox, Modal, Backdrop, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { MdDescription } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import { green, orange } from '@mui/material/colors';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import './Task.css';

function Task({ task, onDeleteTask, onEditTask, color, completedd, completedTasks, checked }) {
  const { id, title, description, priority, dueDate, completed } = task;
  const [open, setOpen] = useState(false);
  const [complete, setCompleted] = useState(false);

  const handleEdit = () => {
    // Pass the task to the parent component for editing
    onEditTask(id);
  };

  const handleDelete = () => {
    // Pass the task id to the parent component for deletion
    onDeleteTask(id);
  };

  const handleCheckboxChange = (event) => {
    setCompleted(event.target.checked);
    completedd(id);
  };

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <div style={{  padding: "1rem" }}>
      <animated.div style={springProps}>
        <ListItem sx={{
          backgroundColor: color,
        }} button >
          <Checkbox checked={completed} onChange={handleCheckboxChange} />
          <ListItemText
            primary={title}
            secondary={`${priority} - Due: ${dueDate}`}
            secondaryTypographyProps={{ component: 'div' }}
            sx={{ flexGrow: 1 }}
          />
          <MdDescription onClick={() => setOpen(!open)} size={18} style={{ padding: "5px" }} color={"green"} />
          
          <div className="status">
            <Typography
            
              sx={{
                marginRight: 2,
                color: completed ? green[700] : orange[700],
                backgroundColor: completed ? `rgba(76, 175, 80, 0.1)` : `rgba(255, 152, 0, 0.1)`,
                border: `1px solid ${completed ? green[700] : orange[700]}`,
                borderRadius: 4,
                padding: '3px 8px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {completed ? (
                <>
                  Completed <CheckIcon sx={{ ml: 1 }} />
                </>
              ) : (
                <> <AiOutlineInfoCircle color={"red"} className="animated-icon" /> Pending</>
              )}
            </Typography>
          </div>

          <ListItemSecondaryAction sx={{ right: 2 }}>
            <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
              <Edit sx={{ color: 'rgba(84, 154, 235, 0.952)' }} />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
              <Delete sx={{ color: 'rgb(218, 108, 108);', marginRight: "5px" }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography padding={2} color={"brown"} variant="body1">{description}</Typography>
        </Collapse>
        <Modal
          open={checked} // Open modal based on checked boolean
          onClose={() => setOpen(false)} // Close modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Modal>
        
      </animated.div>
      
    </div>
  );
}

export default Task;

