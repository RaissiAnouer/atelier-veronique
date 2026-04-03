package com.AtelierVeronique.Atelier.Veronique.dto;

import com.AtelierVeronique.Atelier.Veronique.entity.ProfileEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RequestProfileDTO {
    private Long id;
    private CartDTO cart;
    private String fullName;
    private String password;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
