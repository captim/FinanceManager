package com.example.financemanager.config;

import com.example.financemanager.model.entities.RegistrationSource;
import com.example.financemanager.model.entities.User;
import com.example.financemanager.service.api.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Component
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final UserService userService;
    @Value("${frontend.url}")
    private String frontendUrl;

    public OAuth2LoginSuccessHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws java.io.IOException, javax.servlet.ServletException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        if (RegistrationSource.GITHUB.getName().equals(token.getAuthorizedClientRegistrationId())) {
            DefaultOAuth2User user = (DefaultOAuth2User) token.getPrincipal();
            Map<String, Object> attributes = user.getAttributes();
            String login = attributes.getOrDefault("login", "").toString();
            userService.findUserByLogin(login).ifPresentOrElse(
                    u -> SecurityContextHolder.getContext().setAuthentication(token),
                    () -> {
                        User newUser = new User();
                        newUser.setLogin(login);
                        newUser.setSource(RegistrationSource.GITHUB);
                        userService.save(newUser);
                        SecurityContextHolder.getContext().setAuthentication(token);
                    });
        }

        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
