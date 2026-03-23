package com.AtelierVeronique.Atelier.Veronique.service;

import brevoModel.Cart;
import com.AtelierVeronique.Atelier.Veronique.dto.CartDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.*;
import com.AtelierVeronique.Atelier.Veronique.mapper.CartMapper;
import com.AtelierVeronique.Atelier.Veronique.repository.CartRepository;
import com.AtelierVeronique.Atelier.Veronique.repository.SizeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProfileService profileService;
    private final SizeRepository sizeRepository;
    private final CartMapper cartMapper;




    public CartDTO getCart(){
        ProfileEntity profile= profileService.getCurrentProfile();
        CartEntity cart= profile.getCart();

        if (cart== null){
            cart= CartEntity.builder()
                    .profile(profile)
                    .products(new ArrayList<>())
                    .build();
            cart=cartRepository.save(cart);
            profile.setCart(cart);
        }
        return cartMapper.toDTO(cart);
    }

    @Transactional
    public CartDTO addProductToCart(Long productSizeId, int quantity){
        ProfileEntity profile = profileService.getCurrentProfile();
        CartEntity cart = profile.getCart();
        if(cart == null && profile.getIsActive()==true ){
            cart= CartEntity.builder()
                    .profile(profile)
                    .products(new ArrayList<>())
                    .build();
            cart=cartRepository.save(cart);
            profile.setCart(cart);
        }
        Optional<CartItemEntity> existingItem=cart.getProducts().stream()
                .filter(item->item.getProductSize().getId().equals(productSizeId)).findFirst();
        if(existingItem.isPresent()){
            existingItem.get().setQuantity(existingItem.get().getQuantity()+quantity);
        }else {
            ProductSizeEntity size= sizeRepository.findById(productSizeId)
                    .orElseThrow(()->new RuntimeException("Size not found"));
            CartItemEntity newItem= CartItemEntity.builder()
                    .cart(cart)
                    .productSize(size)
                    .quantity(quantity)
                    .build();
            cart.getProducts().add(newItem);
        }
        cartRepository.save(cart);
        return cartMapper.toDTO(cart);
    }

    public CartDTO removeProductFromCart(Long productsizeId){
        ProfileEntity profile = profileService.getCurrentProfile();
        CartEntity cart = profile.getCart();
        cart.getProducts().removeIf(product->product.getProductSize().getId().equals(productsizeId));
        cartRepository.save(cart);
        return cartMapper.toDTO(cart);
    }


}
