import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/userSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  const isLogin = !!username;

  const handleLogout = () => {
    dispatch(clearUser());
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <div>
      <h2>Home</h2>
      {username ? (
        <p>{username}님 환영합니다.</p>
      ) : (
        <br />
      )}
      {!isLogin ? (
        <>
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
        </>
      ) : (
        <Button
          onClick={handleLogout}
          variant="danger"
          size="small"
        >
          로그아웃
        </Button>
      )}
    </div>
  );
};

export default Home;