package com.AtelierVeronique.Atelier.Veronique.repository;

import com.AtelierVeronique.Atelier.Veronique.dto.CategoryCount;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ProductRepository extends JpaRepository<ProductEntity,Long> {
    List<ProductEntity> findByCategory(String category);

    List<ProductEntity> findByBestSeller(boolean bestSeller);


    @Query("SELECT p.category AS category,COUNT(p) AS count FROM ProductEntity p GROUP BY p.category")
    List<CategoryCount> findAllCategoryGroupByCount();
}
