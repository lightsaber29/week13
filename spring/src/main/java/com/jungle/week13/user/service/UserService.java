package com.jungle.week13.user.service;

import com.jungle.week13.jwt.JwtUtil;
import com.jungle.week13.user.dto.LoginRequestDto;
import com.jungle.week13.user.dto.SignupRequestDto;
import com.jungle.week13.user.entity.User;
import com.jungle.week13.user.entity.UserRoleEnum;
import com.jungle.week13.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private static final String ADMIN_TOKEN = "AAABnvxRVklrnYxKZ0aHgTBcXukeZygoC";

    @Transactional
    public void signup(SignupRequestDto signupRequestDto) {
        String username = signupRequestDto.getUsername();
        String password = signupRequestDto.getPassword();

        // 회원 중복 확인
        Optional<User> found = userRepository.findByUsername(username);
        if (found.isPresent()) {
            throw new IllegalArgumentException("중복된 사용자가 존재합니다.");
        }

        String email = signupRequestDto.getEmail();
        // 사용자 ROLE 확인
        UserRoleEnum role = UserRoleEnum.USER;
        if (signupRequestDto.isAdmin()) {
            String adminToken = signupRequestDto.getAdminToken();
            if (!ADMIN_TOKEN.equals(adminToken)) {
                throw new IllegalArgumentException("관리자 암호가 틀려 등록이 불가능합니다.");
            }
            role = UserRoleEnum.ADMIN;
        }

        User user = new User(username, password, email, role);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> login(LoginRequestDto loginRequestDto, HttpServletResponse response) {
        String username = loginRequestDto.getUsername();
        String password = loginRequestDto.getPassword();

        // 사용자 확인
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("등록된 사용자가 없습니다.")
        );

        // 비밀번호 확인
        String loginPassword = user.getPassword();
        if (!StringUtils.equals(password, loginPassword)){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        String loginUsername = user.getUsername();
        UserRoleEnum loginRole = user.getRole();
        String token = jwtUtil.createToken(loginUsername, loginRole);
        response.addHeader(JwtUtil.AUTHORIZATION_HEADER, token);

        Map<String, String> result = new HashMap<>();
        result.put("username", loginUsername);
        result.put("role", loginRole.toString());

        return ResponseEntity.ok(result);
    }
}
