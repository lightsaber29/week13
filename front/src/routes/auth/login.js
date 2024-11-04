import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  const onChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    await axios.post(`/api/login`, user).then((res) => {
      console.log("res :: ", res);
      alert('로그인되었습니다.');
      navigate('/');
    });
  };

  return (
    <div>
      <h2>로그인</h2>
      <br />
      <div>
        <span>사용자명</span>: &nbsp;
        <input type="text" name="username" value={username} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>비밀번호</span>: &nbsp;
        <input type="password" name="password" value={password} onChange={onChange} />
      </div>
      <br />
      <div>
        <button onClick={login}>로그인</button>
      </div>
    </div>
  );
};

export default Login;