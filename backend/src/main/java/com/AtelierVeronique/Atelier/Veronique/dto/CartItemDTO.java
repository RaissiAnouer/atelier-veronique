package com.AtelierVeronique.Atelier.Veronique.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Long id;
    private Long cartId;
    private Long productSizeId;
    private int quantity;
    private String productName;
    private String productSize;
    private BigDecimal price;
    private String image;


}
