package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.ProductDTO;
import com.AtelierVeronique.Atelier.Veronique.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminController {
    private ProductService productService;


    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO){
        String token= 
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.AddProduct(productDTO));
    }
}
