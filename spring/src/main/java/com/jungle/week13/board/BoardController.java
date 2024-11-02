package com.jungle.week13.board;

import com.jungle.week13.dto.PostRequestDto;
import com.jungle.week13.entity.Post;
import com.jungle.week13.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/index")
    public String home() {
        return "Hello World!";
    }

    @PostMapping("/board")
    public Post createPost(@RequestBody PostRequestDto requestDto) {
        return boardService.createPost(requestDto);
    }

    @GetMapping("/board")
    public List<Post> getPosts() {
        return boardService.getPosts();
    }

    @GetMapping("/board/{id}")
    public Post getPost(@PathVariable Long id) {
        System.out.println("BoardController getPost :: postId " + id);
        return boardService.getPost(id);
    }

    @PutMapping("/board/{id}")
    public Long updatePost(@PathVariable Long id, @RequestBody PostRequestDto requestDto) {
        return boardService.updatePost(id, requestDto);
    }

    @DeleteMapping("/board/{id}")
    public Long deletePost(@PathVariable Long id, @RequestBody PostRequestDto requestDto) {
        return boardService.deletePost(id, requestDto);
    }
}
