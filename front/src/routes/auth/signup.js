import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormInput } from '../../hooks';

const Signup = () => {
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useFormInput({
    username: '',
    password: '',
    email: '',
    admin: false,
    adminToken: '',
  });

  const { username, password, email, admin, adminToken } = values;

  const signup = async () => {
    console.log("user :: ", values);
    await axios.post(`/api/signup`, values).then((res) => {
      console.log("res :: ", res);
      alert('회원가입되었습니다. 로그인 해 주세요.');
      resetForm();
      navigate('/login');
    });
  };  

  const backToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>회원가입</h2>
      <br />
      <div>
        <span>사용자명</span>: &nbsp;
        <input type="text" name="username" value={username} onChange={handleChange} />
      </div>
      <br />
      <div>
        <span>비밀번호</span>: &nbsp;
        <input type="password" name="password" value={password} onChange={handleChange} />
      </div>
      <br />
      <div>
        <span>이메일</span>: &nbsp;
        <input type="email" name="email" value={email} onChange={handleChange} />
      </div>
      <br />
      <div>
        <span>admin 여부</span>
        <input type="checkbox" name="admin" checked={admin} onChange={handleChange} />
      </div>
      {admin && (
        <div>
          <span>관리자 토큰</span>: &nbsp;
          <input 
            type="password" 
            name="adminToken" 
            value={adminToken} 
            onChange={handleChange} 
          />
        </div>
      )}
      <br />
      <div>
        <button onClick={signup}>회원가입</button>
        <button onClick={backToHome}>홈으로</button>
      </div>
    </div>
  );
};

export default Signup;
