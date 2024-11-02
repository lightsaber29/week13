package com.jungle.week13.dto;

import lombok.Getter;

@Getter
public class PostRequestDto {
    private String postTitle; // 글 제목
    private String postAuthorName; // 작성자명
    private String postPwd; // 글 비밀번호
    private String postContents; // 글 내용
}
