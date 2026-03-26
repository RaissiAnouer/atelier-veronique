package com.AtelierVeronique.Atelier.Veronique.dto;

import com.AtelierVeronique.Atelier.Veronique.entity.ProductSizeEntity;

public interface SizeCount {
    Long getCount();
    ProductSizeEntity.Size getSize();
}
