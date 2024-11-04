package com.jungle.week13.board.dto;

import com.jungle.week13.board.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class PostResponseDto {
    private Long postId; // 글 번호
    private String postTitle; // 글 제목
    private String postAuthorName; // 작성자명
    private String postContents; // 글 내용

    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.postTitle = post.getPostTitle();
        this.postAuthorName = post.getPostAuthorName();
        this.postContents = post.getPostContents();
    }
}
