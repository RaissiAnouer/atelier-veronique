package com.AtelierVeronique.Atelier.Veronique.repository;

import com.AtelierVeronique.Atelier.Veronique.dto.CategoryCount;
import com.AtelierVeronique.Atelier.Veronique.dto.ProductDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.SizeCount;
import com.AtelierVeronique.Atelier.Veronique.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ProductRepository extends JpaRepository<ProductEntity,Long> {
    List<ProductEntity> findByCategory(String category);

    List<ProductEntity> findByBestSeller(boolean bestSeller);


    @Query("SELECT p.category AS category,COUNT(p) AS count FROM ProductEntity p GROUP BY p.category")
    List<CategoryCount> findAllCategoryGroupByCount();

    @Query("SELECT s.size AS size, COUNT(s) AS count " +
            "FROM ProductSizeEntity s " +
            "GROUP BY s.size")   List<SizeCount> findAllSizesGroupByCount();

    List<ProductEntity> findByCategoryIn(List<String> categories);


    @Query("""
    SELECT DISTINCT p FROM ProductEntity p
    LEFT JOIN p.sizes s
    WHERE (:categories IS NULL OR p.category IN :categories)
    AND (p.price BETWEEN :min AND :max)
    AND (:sizes IS NULL OR s.size IN :sizes)
    """)
    List<ProductEntity> findProductsFiltered(@Param("categories") List<String> categories,
                                             @Param("min") long min,
                                             @Param("max") long max,
                                             @Param("sizes") List<String> sizes);

    @Query("SELECT p FROM ProductEntity p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ProductEntity> searchByNameOrCategory(String keyword);}

