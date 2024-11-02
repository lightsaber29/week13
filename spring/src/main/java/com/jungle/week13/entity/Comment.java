package com.jungle.week13.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Comment extends Timestamped{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentsId; // ID

    @Column(nullable = false)
    private Long postId; // 글 ID

    @Column(nullable = false)
    private String commentAuthorName; // 작성자명

    @Column(nullable = false)
    private String commentPwd; // 댓글 비밀번호

    @Column(nullable = false)
    private String commentContents; // 글 내용
}
