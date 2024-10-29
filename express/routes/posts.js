const express = require('express');
const router = express.Router();

const Posts = require("../schemas/posts");

// localhost:3000/api/ GET
router.get("/", (req, res) => {
  res.send("default url for posts.js GET Method");
});

// localhost:3000/api/about GET
router.get("/about", (req, res) => {
  res.send("posts.js about PATH");
});

// localhost:3000/api/posts GET
// 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({}).sort({ writeDate: -1 });
  res.send(posts);
});

// localhost:3000/api/posts/:postsId GET
// 게시글 조회 API
router.get("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;
  const detail = await Posts.find({ postsId: postsId });
  res.json({ detail })
});

// 게시글 등록 API
router.post("/posts", async (req, res) => {
  //TODO ID 는 생성해서 주고싶은데...? seq 같은걸로 나중에 갈아치우기
	const { postsId, title, writerName, password, contents } = req.body;

  const posts = await Posts.find({ postsId });
  if (posts.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdPosts = await Posts.create({
    postsId,
    title,
    writerName,
    writeDate: new Date(Date.now()),
    password,
    contents
  });

  res.json({ posts: createdPosts });
});

// 게시글 수정 API
router.put("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;
	const { title, password, contents } = req.body;

  const oldPosts = await Posts.find({ postsId });

  if (!oldPosts.length) {
    return res.status(400).json({ success: false, errorMessage: "수정할 글이 존재하지 않습니다." });
  }

  const updatedPosts = await Posts.updateOne(
    // 조건
    { postsId, password },
    // 바꿀 내용
    {
      title,
      contents
    }
  );

  res.json({ result: updatedPosts });
});

// 게시글 삭제 API
router.delete("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;
  const { password } = req.body;
  const posts = await Posts.find({ postsId });

  // 글 번호에 해당하는 값이 없음
  if (!posts.length) {
    return res.status(400).json({ success: false, errorMessage: "삭제할 글이 존재하지 않습니다." });
  }

  // 글은 존재하나 비밀번호가 맞지 않음
  if (password !== posts[0].password) {
    return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀렸습니다." });
  }

  const deletedResult = await Posts.deleteOne({ postsId, password })
  res.json({ result: deletedResult });
});

module.exports = router;