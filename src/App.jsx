import React,{useState} from 'react'
import useDebounce from './Pages/useDebounce'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navigation/Navbar'
import Home from './Pages/Home'
import Post from './Pages/Post'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Footer from './Pages/Footer'


export default function App() {
  const [searchinput, setsearchinput] = useState('')
  const debouncesearch = useDebounce(searchinput, 500)

  return (
    <div>
      <Router>
        <Navbar setsearchinput={setsearchinput} />
        <Routes>
          <Route path="/" element={<Home debouncesearch={debouncesearch}/>} />
          <Route path="/post" element={<Post />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}
