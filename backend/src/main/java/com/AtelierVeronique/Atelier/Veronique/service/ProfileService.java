package com.AtelierVeronique.Atelier.Veronique.service;

import com.AtelierVeronique.Atelier.Veronique.dto.AuthDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.RequestProfileDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.ResponseProfileDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.ProfileEntity;
import com.AtelierVeronique.Atelier.Veronique.mapper.CartMapper;
import com.AtelierVeronique.Atelier.Veronique.repository.ProfileRepository;
import com.AtelierVeronique.Atelier.Veronique.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CartMapper cartMapper;



    @Value("${app.activation.url}")
    private  String activationUrl;

    public ResponseProfileDTO registerProfile(RequestProfileDTO requestProfileDTO){
      ProfileEntity newProfile=toEntity(requestProfileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile=profileRepository.save(newProfile);
        try {
            String activationLink = activationUrl + "/api/v1.0/activate?token=" + newProfile.getActivationToken();
            String subject = "Active your account";
            String body = "Click on the following link to activate your account: " + activationLink;
            emailService.sendEmail(newProfile.getEmail(), subject, body);
        }catch (Exception e){
            System.err.println("Email failed to send for: " + newProfile.getEmail() + " | Error: " + e.getMessage());
        }
        return toDTO(newProfile);
    }



    public boolean isAccountActive(String email){
        return profileRepository.findByEmail(email)
                .map(ProfileEntity :: getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(()-> new UsernameNotFoundException("No profile was found with the email address"));
    }

    public ResponseProfileDTO getPublicProfile(String email){
        ProfileEntity currentUser=null;
        if(email==null){
            currentUser=getCurrentProfile();
        }else{
            currentUser=profileRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("Profile not found with this email"+email));
        }
        return ResponseProfileDTO.builder()
                .id(currentUser.getId())
                .fullName(currentUser.getFullName())
                .email(currentUser.getEmail())
                .createdAt(currentUser.getCreatedAt())
                .updatedAt(currentUser.getUpdatedAt())
                .build();
    }

    public Map<String,Object>authenticateAndGenerateToken(AuthDTO authDTO){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDTO.getEmail(),authDTO.getPassword()));
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token",token,
                    "user",getPublicProfile(authDTO.getEmail())
            );
        }catch(Exception e){
            throw new RuntimeException("Invalid email or password");

        }
    }

    public void deleteProfile(Long id){
        profileRepository.deleteById(id);
    }

    public List<ResponseProfileDTO> getProfiles(){
        List<ProfileEntity> profiles= profileRepository.findAll();
        return profiles.stream().map(this::toDTO).toList();
    }


    public ProfileEntity toEntity(RequestProfileDTO requestProfileDTO){
        return ProfileEntity.builder()
                .id(requestProfileDTO.getId())
                .fullName(requestProfileDTO.getFullName())
                .email(requestProfileDTO.getEmail())
                .password(passwordEncoder.encode(requestProfileDTO.getPassword()))
                .createdAt(requestProfileDTO.getCreatedAt())
                .updatedAt(requestProfileDTO.getUpdatedAt())
                .build();
    }

    public ResponseProfileDTO toDTO(ProfileEntity profileEntity){
        return ResponseProfileDTO.builder()
                .id(profileEntity.getId())
                .cart(cartMapper.toDTO(profileEntity.getCart()))
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .role(profileEntity.getRole())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationUrl){
        return profileRepository.findByActivationToken(activationUrl)
                .map(profile->{
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    profileRepository.save(profile);
                    return true;
                }).orElse(false);
    }

}
