package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.GiftCardDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.GiftCardEntity;
import com.AtelierVeronique.Atelier.Veronique.service.GiftCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("gift-cards")
public class GiftCardController {
    private final GiftCardService giftCardService;

    @GetMapping
    public ResponseEntity<List<GiftCardDTO>> getGiftCards(){
        return ResponseEntity.ok(giftCardService.getGiftCards());
    }

    @PostMapping
    public ResponseEntity<GiftCardDTO> addGiftCard(@RequestBody GiftCardDTO giftCardDTO){
        return ResponseEntity.ok(giftCardService.addGiftCard(giftCardDTO));
    }
}
