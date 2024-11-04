import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Home</h2>
      <br />
      <Button
        onClick={() => navigate('/login')}
        variant="primary"
        size="small"
      >
        로그인
      </Button>
      &nbsp;
      <Button 
        onClick={() => navigate('/signup')}
        variant="secondary"
        size="small"
      >
        회원가입
      </Button>
    </div>
  );
};

export default Home;