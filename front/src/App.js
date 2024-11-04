import {Route, Routes} from "react-router-dom";
import BoardList from "./routes/board/BoardList";
import BoardDetail from "./routes/board/BoardDetail";
import BoardWrite from "./routes/board/BoardWrite";
import BoardUpdate from "./routes/board/BoardUpdate";
import Signup from "./routes/auth/signup";
import Login from "./routes/auth/login";
import Home from "./routes/Home";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get('/api/index')
    .then(res => {
      setData(res.data)
      // console.log("res :: ", res)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    // console.log("data :: ", data)
  })

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/board" element={<BoardList/>}/>
      <Route path="/board/:postId" element={<BoardDetail/>}/>
      <Route path="/write" element={<BoardWrite/>}/>
      <Route path="/update/:postId" element={<BoardUpdate />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;