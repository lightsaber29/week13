const express = require('express');
const router = express.Router();

const Comments = require("../schemas/comments");

// localhost:3000/api/ GET
router.get("/", (req, res) => {
  res.send("default url for comments.js GET Method");
});

// localhost:3000/api/about GET
router.get("/about", (req, res) => {
  res.send("comments.js about PATH");
});

// localhost:3000/api/comments GET
// 댓글 목록 조회 API
router.get("/comments", async (req, res) => {
  const comments = await Comments.find({}).sort({ writeDate: -1 });
  res.send(comments);
});

// localhost:3000/api/comments/:commentsId GET
// 댓글 조회 API
router.get("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;
  const detail = await Comments.find({ commentsId: commentsId });
  res.json({ detail })
});

// 댓글 등록 API
router.post("/comments", async (req, res) => {
  //TODO ID 는 생성해서 주고싶은데...? seq 같은걸로 나중에 갈아치우기
	const { commentsId, title, writerName, writeDate, password, contents } = req.body;

  const comments = await Comments.find({ commentsId });
  if (comments.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdComments = await Comments.create({ commentsId, title, writerName, writeDate, password, contents });

  res.json({ comments: createdComments });
});

module.exports = router;