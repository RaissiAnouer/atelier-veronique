package com.AtelierVeronique.Atelier.Veronique.repository;

import com.AtelierVeronique.Atelier.Veronique.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity,Long> {
    List<ProductEntity> findByCategory(String category);

    List<ProductEntity> findByBestSeller(boolean bestSeller);

}
