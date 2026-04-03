package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.AuthDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.RequestProfileDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.ResponseProfileDTO;
import com.AtelierVeronique.Atelier.Veronique.repository.ProfileRepository;
import com.AtelierVeronique.Atelier.Veronique.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;
    private final ProfileRepository profileRepository;

    @GetMapping("/activate")
    public ResponseEntity<String> activate(@RequestParam String token){
       boolean isActivated = profileService.activateProfile(token);
       if(isActivated){
           return ResponseEntity.ok("profile activated successfully you can now access your accounts");
       }
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to activate the account");
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseProfileDTO> register(@RequestBody RequestProfileDTO newUser){
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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/profiles")
    public ResponseEntity<List<ResponseProfileDTO>> getProfiles(){
        return ResponseEntity.ok(profileService.getProfiles());
    }



    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/profiles/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long id){
        profileService.deleteProfile(id);
        return ResponseEntity.ok("Profile with ID " + id + " has been deleted successfully.");
    }


}
