package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.BlogDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.BlogEntity;
import com.AtelierVeronique.Atelier.Veronique.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/style-guides")
public class BlogController {
    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<List<BlogDTO>> getBlogs(){
        return ResponseEntity.ok(blogService.getBlogs());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable Long id){
        return ResponseEntity.ok(blogService.getBlogById(id));

    }

    @PostMapping("/add")
    public ResponseEntity<BlogDTO> addBolg(@RequestBody BlogDTO blog){
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.addBolg(blog));

    }

}
