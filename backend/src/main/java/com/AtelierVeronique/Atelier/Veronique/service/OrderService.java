package com.AtelierVeronique.Atelier.Veronique.service;

import com.AtelierVeronique.Atelier.Veronique.dto.OrderDTO;
import com.AtelierVeronique.Atelier.Veronique.dto.OrderItemDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.OrderEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.OrderItemEntity;
import com.AtelierVeronique.Atelier.Veronique.entity.ProfileEntity;
import com.AtelierVeronique.Atelier.Veronique.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProfileService profileService;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDTO).toList();
    }

    public OrderDTO getOrderById(Long id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return toDTO(order);
    }

    public List<OrderDTO> getOrdersByCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(profile.getEmail())
                .stream().map(this::toDTO).toList();
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        ProfileEntity profile = profileService.getCurrentProfile();

        OrderEntity order = OrderEntity.builder()
                .userEmail(profile.getEmail())
                .fullName(orderDTO.getFullName() != null ? orderDTO.getFullName() : profile.getFullName())
                .city(orderDTO.getCity())
                .address(orderDTO.getAddress())
                .phone(orderDTO.getPhone())
                .totalAmount(orderDTO.getTotalAmount())
                .status(OrderEntity.OrderStatus.PENDING)
                .build();

        if (orderDTO.getItems() != null) {
            List<OrderItemEntity> items = orderDTO.getItems().stream()
                    .map(itemDTO -> OrderItemEntity.builder()
                            .order(order)
                            .productName(itemDTO.getProductName())
                            .size(itemDTO.getSize())
                            .quantity(itemDTO.getQuantity())
                            .price(itemDTO.getPrice())
                            .image(itemDTO.getImage())
                            .build())
                    .toList();
            order.setItems(items);
        }

        OrderEntity saved = orderRepository.save(order);
        return toDTO(saved);
    }

    public OrderDTO updateOrderStatus(Long id, OrderEntity.OrderStatus status) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return toDTO(orderRepository.save(order));
    }

    public Map<String, Long> getOrderCounts() {
        Map<String, Long> counts = new java.util.LinkedHashMap<>();
        counts.put("total", orderRepository.count());
        for (OrderEntity.OrderStatus status : OrderEntity.OrderStatus.values()) {
            counts.put(status.name(), orderRepository.countByStatus(status));
        }
        return counts;
    }

    private OrderDTO toDTO(OrderEntity entity) {
        return OrderDTO.builder()
                .id(entity.getId())
                .userEmail(entity.getUserEmail())
                .fullName(entity.getFullName())
                .city(entity.getCity())
                .address(entity.getAddress())
                .phone(entity.getPhone())
                .totalAmount(entity.getTotalAmount())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .items(entity.getItems() != null
                        ? entity.getItems().stream().map(this::toItemDTO).toList()
                        : List.of())
                .build();
    }

    private OrderItemDTO toItemDTO(OrderItemEntity entity) {
        return OrderItemDTO.builder()
                .id(entity.getId())
                .productName(entity.getProductName())
                .size(entity.getSize())
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .image(entity.getImage())
                .build();
    }
}
