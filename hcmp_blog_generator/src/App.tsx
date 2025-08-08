import { Route, Routes} from "react-router-dom"
import Login from "./pages/Login"
import BlogGenerator from "./pages/BlogGenerator"
import { Toaster } from "sonner"



function App() {
  
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/blog-generator' element={<BlogGenerator />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
