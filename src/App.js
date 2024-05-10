import { HomeMax } from "@mui/icons-material"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register" 
import Main from "./Main"


const App=()=>(
  <BrowserRouter>
  <Routes>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/" element={<Main/>}/>



  </Routes>
  
  
  
  </BrowserRouter>


)
export default App