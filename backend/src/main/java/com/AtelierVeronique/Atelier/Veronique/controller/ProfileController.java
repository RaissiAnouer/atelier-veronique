package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.AuthDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.ProfileDTO;
import com.AtelierVeronique.Atelier.Veronique.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/activate")
    public ResponseEntity<String> activate(@RequestParam String token){
       boolean isActivated = profileService.activateProfile(token);
       if(isActivated){
           return ResponseEntity.ok("profile activated successfully you can now access your accounts");
       }
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to activate the account");
    }

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> register(@RequestBody ProfileDTO newUser){
        return ResponseEntity.status(HttpStatus.CREATED).body(profileService.registerProfile(newUser));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody AuthDTO authDTO){
        try{
            if(!profileService.isAccountActive(authDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message",
                        "Account is not active.Please activate your account first."));
            }
            Map<String,Object>response = profileService.authenticateAndGenerateToken(authDTO);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message",e.getMessage()));
        }
    }
}
