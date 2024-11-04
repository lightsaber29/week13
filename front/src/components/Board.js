import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Board = ({ postId, postTitle, postContents, postAuthorName }) => {
  const navigate = useNavigate();

  const moveToUpdate = () => {
    navigate(`/update/${postId}`);
  }

  const deleteBoard = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const password = window.prompt('게시글 비밀번호를 입력하세요:');
      
      if (password) {
        try {
          axios.delete(`/api/board/${postId}`, {
            data: { postPwd: password }
          }).then((res) => {
            console.log("res :: ", res);
            alert('삭제되었습니다.');
            navigate('/board');
          }).catch((error) => {
            const errorMessage = error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
            alert(errorMessage);
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
          alert(errorMessage);
        }
      } else {
        alert('비밀번호를 입력하세요.');
      }
    }
  }

  const moveToList = () => {
    navigate('/board');
  }

  return (
    <div>
      <div> 
        <h2>{postTitle}</h2>
        <h5>{postAuthorName}</h5>
        <hr />
        <p>{postContents}</p>
      </div>
      <div>
        <button onClick={moveToUpdate}>수정</button>
        <button onClick={deleteBoard}>삭제</button>
        <button onClick={moveToList}>목록</button>
      </div>
    </div>
  );
};

export default Board;