package com.AtelierVeronique.Atelier.Veronique.repository;

import com.AtelierVeronique.Atelier.Veronique.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    List<OrderEntity> findAllByOrderByCreatedAtDesc();
    long countByStatus(OrderEntity.OrderStatus status);
}
