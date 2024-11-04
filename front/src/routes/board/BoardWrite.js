import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormInput } from '../../hooks';

const BoardWrite = () => {
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useFormInput({
    postTitle: '',
    postAuthorName: '',
    postContents: '',
    postPwd: '',
  });

  const { postTitle, postAuthorName, postContents, postPwd } = values; //비구조화 할당

  const saveBoard = async () => {
    console.log("board :: ", values);
    await axios.post(`/api/board`, values).then((res) => {
      console.log("res :: ", res);
      alert('등록되었습니다.');
      resetForm();
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
        <button onClick={saveBoard}>저장</button>&nbsp;
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardWrite;