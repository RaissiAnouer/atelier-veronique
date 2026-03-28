package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.CategoryCount;
import com.AtelierVeronique.Atelier.Veronique.dto.ProductDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.SizeCount;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductEntity;
import com.AtelierVeronique.Atelier.Veronique.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/collections")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts(){
        return ResponseEntity.ok(productService.getProducts());
    }


    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.AddProduct(productDTO));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDTO>> getProductByCategory(@PathVariable String category){
        return ResponseEntity.ok(productService.getProductByCategory(category));
    }

    @GetMapping("/count")
    public ResponseEntity<List<CategoryCount>> getCountByCategory(){
        return ResponseEntity.ok(productService.getCategoryAndCount());
    }

    @GetMapping("/size")
    public ResponseEntity<List<SizeCount>> getCountBySize(){
        return ResponseEntity.ok(productService.getSizeAndCount());
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }
    @GetMapping("/filter")
    public ResponseEntity<List<ProductDTO>> filter(@RequestParam(required = false) List<String> category,@RequestParam(required = false, defaultValue = "0") Long min,@RequestParam(required = false, defaultValue = "9999") Long max,@RequestParam(required = false) List<String> sizes){
        return  ResponseEntity.ok(productService.filter(category,min,max,sizes));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> search(@RequestParam String keyword){
        return ResponseEntity.ok(productService.searchProduct(keyword));

    }



}
