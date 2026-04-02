package com.AtelierVeronique.Atelier.Veronique.service;

import com.AtelierVeronique.Atelier.Veronique.dto.GiftCardDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.GiftCardEntity;
import com.AtelierVeronique.Atelier.Veronique.repository.GiftCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GiftCardService {
    final private GiftCardRepository giftCardRepository;


    public List<GiftCardDTO> getGiftCards(){
        List<GiftCardEntity> giftCards= giftCardRepository.findAll();
        return giftCards.stream().map(this::toDTO).toList();
    }

    public GiftCardDTO addGiftCard(GiftCardDTO giftCardDTO){
        GiftCardEntity giftCardEntity= giftCardRepository.save(toEntity((giftCardDTO)));
        return toDTO(giftCardEntity);
    }


    private GiftCardDTO toDTO(GiftCardEntity entity){
        return GiftCardDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .image(entity.getImage())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .build();

    }

    private GiftCardEntity toEntity(GiftCardDTO dto){
        return GiftCardEntity.builder()
                .id(dto.getId())
                .name(dto.getName())
                .image(dto.getImage())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .build();
    }
}