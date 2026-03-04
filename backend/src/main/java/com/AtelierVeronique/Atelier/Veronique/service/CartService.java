package com.AtelierVeronique.Atelier.Veronique.service;

import com.AtelierVeronique.Atelier.Veronique.dto.CartDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.CartItemDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.ProductDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.CartEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.CartItemEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductSizeEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.ProfileEntity;
import com.AtelierVeronique.Atelier.Veronique.repository.CartRepository;
import com.AtelierVeronique.Atelier.Veronique.repository.ProfileRepository;
import com.AtelierVeronique.Atelier.Veronique.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProfileService profileService;
    private final SizeRepository sizeRepository;

  

    public CartDTO getCart(){
        ProfileEntity profile= profileService.getCurrentProfile();
        return toDTO(profile.getCart());
    }

    public CartDTO toDTO(CartEntity cartEntity){
        List<CartItemDTO> products= cartEntity.getProducts().stream()
                .map(this::toCartItemDTO).toList();
        return CartDTO.builder()
                .id(cartEntity.getId())
                .products(products)
                .build();
    }

    public CartEntity toEntity(CartDTO cartDTO,ProfileEntity profile){
        List<CartItemEntity> products = cartDTO.getProducts().stream().map(itemDTO->toCartItemEntity(itemDTO,profile)).toList();
        return CartEntity.builder()
                .id(cartDTO.getId())
                .profile(profile)
                .products(products)
                .build();
    }

    public CartItemDTO toCartItemDTO(CartItemEntity cartItemEntity){

        return CartItemDTO.builder()
                .id(cartItemEntity.getId())
                .cartId(cartItemEntity.getCart().getId())
                .productSizeId(cartItemEntity.getProductSize().getId())
                .build();
    }

    public CartItemEntity toCartItemEntity(CartItemDTO cartItemDTO, ProfileEntity profile ){
        CartEntity cartEntity= profile.getCart();
        ProductSizeEntity size=sizeRepository.findById(cartItemDTO.getProductSizeId()).orElseThrow(()->new RuntimeException("size not found"));
        return CartItemEntity.builder()
                .id(cartItemDTO.getId())
                .cart(cartEntity)
                .productSize(size)
                .build();
    }



}
