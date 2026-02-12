package com.AtelierVeronique.Atelier.Veronique.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_products_sizes")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductSizeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Size size;

    @ManyToOne
    @JoinColumn(name="product_id")
    private ProductEntity product;

    public enum Size {
        XS, S, M, L, XL, XXL
    }


}
