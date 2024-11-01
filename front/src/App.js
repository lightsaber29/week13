import {Route, Routes} from "react-router-dom";
import BoardList from "./routes/BoardList";
import Home from "./routes/Home";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get('/api/index')
    .then(res => {
      setData(res.data)
      console.log("res :: ", res)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    console.log("data :: ", data)
  })

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/board" element={<BoardList/>}/>
    </Routes>
  );
}

export default App;