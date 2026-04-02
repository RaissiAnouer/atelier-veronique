package com.AtelierVeronique.Atelier.Veronique.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GiftCardDTO {
    private Long id;
    private String name;
    private String image;
    private String description;
    private BigDecimal price;
}
