import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    try {
      const res = await axios.get('/api/board');
      setBoardList(res.data);
      
      console.log("boardList :: ", res.data);
    } catch (error) {
      console.error("Error fetching board list:", error);
    }
  }
  
  const moveToWrite = () => {
    navigate('/write');
  }

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div>
      <ul>
        {boardList.map((board) => (
          <li key={board.postId}>
            <Link to={`/board/${board.postId}`}>{board.postTitle}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;