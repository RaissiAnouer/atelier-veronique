package com.AtelierVeronique.Atelier.Veronique.service;

import com.AtelierVeronique.Atelier.Veronique.dto.CategoryCount;
import com.AtelierVeronique.Atelier.Veronique.dto.ProductDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.SizeDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductSizeEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.ProfileEntity;
import com.AtelierVeronique.Atelier.Veronique.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;



    public List<ProductDTO> getProducts(){
        List<ProductEntity> product = productRepository.findAll();
        return product.stream().map(this::toDTO).toList();
    }



    public ProductDTO AddProduct(ProductDTO productDTO){
         ProductEntity newProduct= toEntity(productDTO);
         newProduct=productRepository.save(newProduct);
         return toDTO(newProduct);
    }

    public List<ProductDTO> getProductByCategory(String category){
        List<ProductEntity> products = productRepository.findByCategory(category);
        return products.stream().map(this::toDTO).toList();

    }

    public List<CategoryCount> getCategoryAndCount(){
        return  productRepository.findAllCategoryGroupByCount();

    }

    public List<ProductDTO> getBestSellers(){
        List<ProductEntity> bestSellers=productRepository.findByBestSeller(true);
        return bestSellers.stream().map(this::toDTO).toList();
    }
    
    public ProductDTO getProductById(Long id){
        ProductEntity product= productRepository.findById(id).orElseThrow(()-> new RuntimeException("Product not found or not accessible"));
        return toDTO(product);
    }




    //HELPER METHODS
    private ProductEntity toEntity(ProductDTO productDTO){
        ProductEntity product= ProductEntity.builder()
                .id(productDTO.getId())
                .name(productDTO.getName())
                .image(productDTO.getImage())
                .price(productDTO.getPrice())
                .category(productDTO.getCategory())
                .bestSeller(productDTO.isBestSeller())
                .createdAt(productDTO.getCreatedAt())
                .updatedAt(productDTO.getUpdatedAt())
                .build();
        if(productDTO.getSizes() != null ){
            List<ProductSizeEntity> sizes=productDTO.getSizes()
                    .stream()
                    .map(this::toSizeEntity)
                    .toList();

            sizes.forEach(size->size.setProduct(product));
            product.setSizes(sizes);
        }
        return product;
    }

    private ProductDTO toDTO(ProductEntity productEntity){
        return ProductDTO.builder()
                .id(productEntity.getId())
                .name(productEntity.getName())
                .image(productEntity.getImage())
                .price(productEntity.getPrice())
                .category(productEntity.getCategory())
                .bestSeller(productEntity.isBestSeller())
                .createdAt(productEntity.getCreatedAt())
                .updatedAt(productEntity.getUpdatedAt())
                .sizes(productEntity.getSizes().stream().map(this::toSizeDTO).toList()
                )
                .build();

    }

    private SizeDTO toSizeDTO(ProductSizeEntity productSizeEntity){
        return SizeDTO.builder()
                .id(productSizeEntity.getId())
                .size(productSizeEntity.getSize())
                .build();
    }

  private ProductSizeEntity toSizeEntity(SizeDTO sizeDTO){
        return ProductSizeEntity.builder()
                .id(sizeDTO.getId())
                .size(sizeDTO.getSize())
                .build();
  }
}
