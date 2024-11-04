package com.jungle.week13.board.service;

import com.jungle.week13.board.dto.PostRequestDto;
import com.jungle.week13.board.dto.PostResponseDto;
import com.jungle.week13.board.entity.Post;
import com.jungle.week13.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public PostResponseDto createPost(PostRequestDto requestDto) {
        Post post = new Post(requestDto);
        boardRepository.save(post);
        return new PostResponseDto(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getPosts() {
        List<Post> posts = boardRepository.findAll();
        List<PostResponseDto> response = posts.stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
        return response;
    }

    public PostResponseDto getPost(Long postId) {
        Post post = boardRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("글이 존재하지 않습니다.")
        );
        return new PostResponseDto(post.getPostId(), post.getPostTitle(), post.getPostAuthorName(), post.getPostContents());
    }

    public Long updatePost(Long postId, PostRequestDto requestDto) {
        Post post = boardRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("글이 존재하지 않습니다.")
        );
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

    public Long deletePost(Long postId, PostRequestDto requestDto) {
        Post post = boardRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("글이 존재하지 않습니다.")
        );
        String oldPostPwd = post.getPostPwd();
        String postPwd = requestDto.getPostPwd();

        if (StringUtils.isEmpty(postPwd)) {
            throw new IllegalArgumentException("비밀번호 값이 입력되지 않았습니다.");
        }

        if (!StringUtils.equals(oldPostPwd, postPwd)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        boardRepository.deleteById(postId);
        return postId;
    }
}
