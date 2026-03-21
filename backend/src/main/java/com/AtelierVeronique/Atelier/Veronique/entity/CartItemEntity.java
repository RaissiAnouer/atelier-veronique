package com.AtelierVeronique.Atelier.Veronique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="cart_id")
    private CartEntity cart;

    @ManyToOne
    @JoinColumn(name = "product_size_id")
    private ProductSizeEntity productSize;
    private int quantity;
}
