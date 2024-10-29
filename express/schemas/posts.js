const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  // 글 번호
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  // 글 제목
  title: {
    type: String,
    required: true
  },
  // 작성자명
  writerName: {
    type: String,
    required: true
  },
  // 작성날짜
  writeDate: {
    type: Date,
    required: true
  },
  // 비밀번호
  password: {
    type: String,
    required: true
  },
  // 작성내용
  contents: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Posts", postsSchema);