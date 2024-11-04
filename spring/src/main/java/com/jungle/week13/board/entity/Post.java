package com.jungle.week13.board.entity;

import com.jungle.week13.board.dto.PostRequestDto;
import com.jungle.week13.common.entity.Timestamped;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Post extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId; // ID

    @Column(nullable = false)
    private String postTitle; // 글 제목

    @Column(nullable = false)
    private String postAuthorName; // 작성자명

    @Column(nullable = false)
    private String postPwd; // 글 비밀번호

    @Column(nullable = false)
    private String postContents; // 글 내용


    public Post(PostRequestDto requestDto) {
        this.postTitle = requestDto.getPostTitle();
        this.postAuthorName = requestDto.getPostAuthorName();
        this.postPwd = requestDto.getPostPwd();
        this.postContents = requestDto.getPostContents();
    }

    public void updateContents(PostRequestDto requestDto) {
        this.postTitle = requestDto.getPostTitle();
        this.postContents = requestDto.getPostContents();
    }
}
