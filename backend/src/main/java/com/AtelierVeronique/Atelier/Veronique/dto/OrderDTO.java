package com.AtelierVeronique.Atelier.Veronique.dto;

import com.AtelierVeronique.Atelier.Veronique.entity.OrderEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private String userEmail;
    private String fullName;
    private String city;
    private String address;
    private String phone;
    private List<OrderItemDTO> items;
    private BigDecimal totalAmount;
    private OrderEntity.OrderStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
