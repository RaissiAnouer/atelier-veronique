package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.ProfileDTO;
import com.AtelierVeronique.Atelier.Veronique.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ProfileDTO register(@RequestBody ProfileDTO newUser){
        return profileService.registerProfile(newUser);
    }

}
