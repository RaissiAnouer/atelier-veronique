package com.AtelierVeronique.Atelier.Veronique.dto;

import com.AtelierVeronique.Atelier.Veronique.entity.ProductSizeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String image;
    private BigDecimal price;
    private String category;
    private String description;
    private boolean bestSeller;
    private List<SizeDTO> sizes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
