package team.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import team.web.member.Member;
import team.web.session.SessionManager;

import java.util.Map;

@RestController
public class AuthController {

    private final SessionManager sessionManager;

    public AuthController(SessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    @GetMapping("/check-login")
    public Map<String, Object> checkLogin(HttpServletRequest request) {
        // 세션에서 사용자 정보를 가져옴
        Object memberObject = sessionManager.getSession(request, "member");
        boolean isLoggedIn = (memberObject != null);

        // 로그인된 사용자가 있을 경우 이름도 반환
        String name = null;
        if (isLoggedIn && memberObject instanceof Member) {
            Member member = (Member) memberObject;
            name = member.getName(); // 사용자의 이름을 가져옴
        }

        // 로그인 여부와 이름을 반환
        return Map.of("isLoggedIn", isLoggedIn, "name", name);
    }
}