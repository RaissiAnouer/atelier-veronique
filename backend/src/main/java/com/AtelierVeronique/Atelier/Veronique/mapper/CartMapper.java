package com.AtelierVeronique.Atelier.Veronique.mapper;

import com.AtelierVeronique.Atelier.Veronique.dto.CartDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.CartItemDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.CartEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.CartItemEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductSizeEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartMapper {


    public CartDTO toDTO(CartEntity cartEntity){
        if (cartEntity == null) return null;
        List<CartItemDTO> products= cartEntity.getProducts().stream()
                .map(this::toCartItemDTO).toList();
        return CartDTO.builder()
                .id(cartEntity.getId())
                .products(products)
                .build();
    }




    public CartItemDTO toCartItemDTO(CartItemEntity cartItemEntity){
        ProductSizeEntity sizeEntity = cartItemEntity.getProductSize();
        ProductEntity product = sizeEntity.getProduct();
        return CartItemDTO.builder()
                .id(cartItemEntity.getId())
                .cartId(cartItemEntity.getCart().getId())
                .productSizeId(cartItemEntity.getProductSize().getId())
                .quantity(cartItemEntity.getQuantity())
                .productName(product.getName())
                .images(product.getImages())
                .price(product.getPrice())
                .productSize(sizeEntity.getSize().name())
                .build();
    }
}
