package com.AtelierVeronique.Atelier.Veronique.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AuthDTO {
    private String email;
    private String password;
    private String token;
}
