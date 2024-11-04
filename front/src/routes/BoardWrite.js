import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    postTitle: '',
    postAuthorName: '',
    postContents: '',
    postPwd: '',
  });

  const { postTitle, postAuthorName, postContents, postPwd } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    console.log("board :: ", board);
    await axios.post(`/api/board`, board).then((res) => {
      console.log("res :: ", res);
      alert('등록되었습니다.');
      navigate('/board');
    });
  };

  const backToList = () => {
    navigate('/board');
  };

  return (
    <div>
      <div>
        <span>제목</span>: &nbsp;
        <input type="text" name="postTitle" value={postTitle} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>: &nbsp;
        <input
          type="text"
          name="postAuthorName"
          value={postAuthorName}
          onChange={onChange}
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
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <span>비밀번호</span>: &nbsp;
        <input
          type="password"
          name="postPwd"
          value={postPwd}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <button onClick={saveBoard}>저장</button>&nbsp;
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardWrite;