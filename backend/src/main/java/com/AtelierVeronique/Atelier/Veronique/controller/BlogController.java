package com.AtelierVeronique.Atelier.Veronique.controller;

import com.AtelierVeronique.Atelier.Veronique.dto.BlogDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.BlogEntity;
import com.AtelierVeronique.Atelier.Veronique.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<BlogDTO> addBolg(@RequestBody BlogDTO blog){
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.addBolg(blog));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id){
        blogService.deleteBlog(id);
        return ResponseEntity.ok("Blog deleted successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/editBlog/{id}")
    public ResponseEntity<BlogDTO> editBlog(@PathVariable Long id, @RequestBody BlogDTO blog){
        return ResponseEntity.ok(blogService.editBlog(id, blog));
    }
}
