package com.AtelierVeronique.Atelier.Veronique.dto;

import com.AtelierVeronique.Atelier.Veronique.entity.ProductSizeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SizeDTO {
    private Long id;
    private ProductSizeEntity.Size size;
}
