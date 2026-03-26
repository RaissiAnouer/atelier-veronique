package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.CartDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.CategoryCount;
import com.AtelierVeronique.Atelier.Veronique.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDTO> getCartProducts(){
        return ResponseEntity.ok(cartService.getCart());

    }
    @PostMapping("/add-product/{productSizeId}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productSizeId,@RequestBody int quantity ){
        return ResponseEntity.ok(cartService.addProductToCart(productSizeId,quantity));
    }

    @DeleteMapping("/remove-product/{productSizeId}")
    public ResponseEntity<CartDTO> removeCartProduct(@PathVariable Long productSizeId){
       CartDTO cart = cartService.removeProductFromCart(productSizeId);
       return ResponseEntity.ok(cart);
    }


}
