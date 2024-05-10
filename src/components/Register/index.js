import React, { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [submit,setSubmit]=useState(false)
const navigate=useNavigate()
  const handleRegister = async() => {
    const token=localStorage.getItem("token")
    if(token){
      navigate("/")
    }
    // Perform client-side validation
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
   
    setSubmit(true)
    try{
const res=await axios.post("http://localhost:8081/api/v1/auth/register",{username,email,password})
if(res.data.success){
  setSubmit(false)
    navigate('/login')

}
else{
  setSubmit(false)
  toast.info(res.data.message)
}}
catch(e){
  setSubmit(false)
  toast.error(e)
}
    // If validation passes, you can proceed with registration
    // For example, you can make an API call to register the user
    console.log('Registration successful:', { username, email, password });

    // Clear form fields and errors after successful registration
    setUsername('');
    setEmail('');
    setPassword('');
    setError({});
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error.username}
            helperText={error.username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </Grid>
      </Grid>
      <ToastContainer/>
    </Container>
  );
};

export default Register;
