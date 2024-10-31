package com.jungle.week13.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping
public class BoardController {

    @GetMapping("/index")
    @ResponseBody
    public String home() {
        return "Hello World!";
    }
}
