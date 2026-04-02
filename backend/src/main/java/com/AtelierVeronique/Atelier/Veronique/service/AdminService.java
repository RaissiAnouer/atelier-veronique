package com.AtelierVeronique.Atelier.Veronique.service;

import com.AtelierVeronique.Atelier.Veronique.util.JwtUtil;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final JwtUtil jwtUtil;

    public void isAdmin(String token){
        if(!jwtUtil.isAdmin(token)){
            throw new RuntimeException("Access denied: Admins only");
        }
    }
}
