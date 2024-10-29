const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
  console.log('http://localhost:'+port);
});

/** Express.js 에서 제공하는 JSON middleware 를 사용 */
// router 설정보다 상위에 작성 필요(Express 내용에서 middleware 부분 참조)
app.use(express.json());

/** router 설정 */
const postsRouter = require("./routes/posts");

// localhost:3000/api -> postsRouter
app.use("/api", [postsRouter]);


/** DB 연결 */
const connect = require("./schemas");
connect();