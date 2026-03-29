package com.AtelierVeronique.Atelier.Veronique.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BlogDTO {
    private Long id;
    private String title;
    private String image;
    private String text;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
