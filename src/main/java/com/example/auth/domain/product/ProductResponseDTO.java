package com.example.auth.domain.product;

import java.math.BigDecimal;

public record ProductResponseDTO(String id, String name, BigDecimal price) {
    public ProductResponseDTO(Product product){
        this(product.getId(), product.getName(), product.getPrice());
    }
}
