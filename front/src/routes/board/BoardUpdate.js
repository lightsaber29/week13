import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormInput } from '../../hooks';

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { values, handleChange, resetForm, setValues } = useFormInput({
    postTitle: '',
    postAuthorName: '',
    postContents: '',
    postPwd: '',
  });

  const { postTitle, postAuthorName, postContents, postPwd } = values; //비구조화 할당

  const getBoard = async () => {
    const res = await axios.get(`/api/board/${postId}`);
    console.log("res :: ", res);
    setValues(res.data);
  }

  const updateBoard = async () => {
    try {
      await axios.put(`/api/board/${postId}`, values).then((res) => {
        console.log("res :: ", res);
        alert('수정되었습니다.');
        resetForm();
        navigate('/board');
      });
    } catch (error) {
      // 서버에서 전달된 에러 메시지 처리
      const errorMessage = error.response?.data?.message || '수정 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  }

  const backToDetail = () => {
    navigate(`/board/${postId}`);
  }

  useEffect(() => {
    console.log("postId :: ", postId);
    getBoard();
  }, []);

  return (
    <div>
      <div>
        <span>제목</span>: &nbsp;
        <input type="text" name="postTitle" value={postTitle} onChange={handleChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>: &nbsp;
        <input
          type="text"
          name="postAuthorName"
          value={postAuthorName}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <span>내용</span>
        <br />
        <textarea
          name="postContents"
          cols="30"
          rows="10"
          value={postContents}
          onChange={handleChange}
        ></textarea>
      </div>
      <br />
      <div>
        <span>비밀번호</span>: &nbsp;
        <input
          type="password"
          name="postPwd"
          value={postPwd}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <button onClick={updateBoard}>저장</button>&nbsp;
        <button onClick={backToDetail}>취소</button>
      </div>
    </div>
  );
};

export default BoardUpdate;