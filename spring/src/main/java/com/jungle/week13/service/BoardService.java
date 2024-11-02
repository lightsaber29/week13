package com.jungle.week13.service;

import com.jungle.week13.dto.PostRequestDto;
import com.jungle.week13.entity.Post;
import com.jungle.week13.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public Post createPost(PostRequestDto requestDto) {
        Post post = new Post(requestDto);
        boardRepository.save(post);
        return post;
    }

    @Transactional(readOnly = true)
    public List<Post> getPosts() {
        List<Post> posts = boardRepository.findAll();
        return posts;
    }

    public Post getPost(Long postId) {
        return boardRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("글이 존재하지 않습니다.")
        );
    }

    public Long updatePost(Long id, PostRequestDto requestDto) {
        Post post = getPost(id);
        String oldPostPwd = post.getPostPwd();
        String postPwd = requestDto.getPostPwd();

        if (StringUtils.isEmpty(postPwd)) {
            throw new IllegalArgumentException("비밀번호 값이 입력되지 않았습니다.");
        }

        if (!StringUtils.equals(oldPostPwd, postPwd)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        post.updateContents(requestDto);
        boardRepository.save(post);

        return post.getPostId();
    }

    public Long deletePost(Long id, PostRequestDto requestDto) {
        Post post = getPost(id);
        String oldPostPwd = post.getPostPwd();
        String postPwd = requestDto.getPostPwd();

        if (StringUtils.isEmpty(postPwd)) {
            throw new IllegalArgumentException("비밀번호 값이 입력되지 않았습니다.");
        }

        if (!StringUtils.equals(oldPostPwd, postPwd)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        boardRepository.deleteById(id);
        return id;
    }
}
