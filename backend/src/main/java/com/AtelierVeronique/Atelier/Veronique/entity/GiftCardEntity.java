package com.AtelierVeronique.Atelier.Veronique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "tbl_giftcards")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GiftCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    private String description;
    private BigDecimal price;
}
