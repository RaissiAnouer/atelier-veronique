package com.AtelierVeronique.Atelier.Veronique.util;
import com.AtelierVeronique.Atelier.Veronique.entity.ProfileEntity;
import com.AtelierVeronique.Atelier.Veronique.repository.ProfileRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtUtil {
    private final ProfileRepository profileRepository;
    private final SecretKey key;

    // Reads secret from environment variable or application.properties
    public JwtUtil(ProfileRepository profileRepository,@Value("${jwt.secret:${JWT_SECRET}}") String secret) {
        // Make sure secret is at least 32 bytes for HS256
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.profileRepository = profileRepository;
    }

    /* ================= TOKEN GENERATION ================= */
    public String generateToken(String username) {
        ProfileEntity user = profileRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Jwts.builder()
                .setSubject(username)
                .claim("role",user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
                .signWith(key)
                .compact();
    }

    /* ================= EXTRACT ================= */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    public boolean isAdmin(String token) {
        return "ADMIN".equals(extractRole(token));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    /* ================= VALIDATION ================= */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
