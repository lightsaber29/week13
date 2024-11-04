import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      홈 화면 입니다.
      <br />
      <br />
      <button onClick={() => navigate('/signup')}>회원가입</button>&nbsp;
      <button onClick={() => navigate('/login')}>로그인</button>
    </div>
  );
};

export default Home;