import express from 'express'
import connectDB from './config/db.mjs'
import router from './routes/authRoute.mjs'
import cors from 'cors'
const app=express();

//  const corsOptions = {
//      origin: 'https://assignment-3-qa0f.onrender.com',
//      optionsSuccessStatus: 200,
//    };
  
app.use(cors())

app.use(express.json())
connectDB()
const port=process.env.PORT || 8081;
app.use("/api/v1/auth",router)






app.listen(port,()=>console.log(`Running on port ${port}`))