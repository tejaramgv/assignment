import React, { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from React Router

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [submit,setSubmit]=useState(false)
const navigate=useNavigate()
const token=localStorage.getItem("token")
    if(token){
      navigate("/")
    }
  const handleLogin = async() => {
    setSubmit(true)
    try{
        const res=await axios.post("https://assignment-inoy.onrender.com/login",{email,password})
        if(res.data.success){

            localStorage.setItem("token", res.data.jwt_token);
            localStorage.setItem("mail", email);
            setSubmit(false)
            navigate('/')
        }
        else{
          setSubmit(false)
          toast.info(res.data.message)

        }}
        catch(e){
            alert(e)
            setSubmit(false
            )
          toast.error(e)        }
  };

  return (
    <div style={{display:"flex",background:"rgba(33, 150, 243, 0.1)",height:"100vh",alignItems:"center",justifyContent:"center"}}>
    <Container maxWidth="sm">
      <Typography variant="h4" color={"green"} align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
      <Grid container spacing={2}>
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
          <Button variant="contained" type="submit" color="primary" >
          {submit?<ClipLoader color={"white"}/>:<>Login</>}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register">
              Create Account
            </Link>
          </Typography>
        </Grid>
      </Grid>
      </form>
      <ToastContainer/>
    </Container>
    </div>
  );
};

export default Login;
