package com.AtelierVeronique.Atelier.Veronique.service;

import com.AtelierVeronique.Atelier.Veronique.dto.BlogDTO;
import com.AtelierVeronique.Atelier.Veronique.entity.BlogEntity;
import com.AtelierVeronique.Atelier.Veronique.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    public List<BlogDTO> getBlogs(){
        List<BlogEntity> blogs= blogRepository.findAll();
        return blogs.stream().map(this::toDTO).toList();
    }

    public BlogDTO addBolg(BlogDTO dto){
        BlogEntity blogEntity=toEntity(dto);
        BlogEntity newBlog=blogRepository.save(blogEntity);
        return toDTO(newBlog);
    }

    public BlogDTO getBlogById(Long id){
        BlogEntity blog=blogRepository.findById(id).orElseThrow(()-> new RuntimeException("Blog not found or not accessible"));
        return toDTO(blog);

    }

    public BlogDTO editBlog(Long id, BlogDTO dto) {
        BlogEntity existingBlog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        
        existingBlog.setTitle(dto.getTitle());
        existingBlog.setImage(dto.getImage());
        existingBlog.setText(dto.getText());
        existingBlog.setAuthor(dto.getAuthor());
        
        BlogEntity updatedBlog = blogRepository.save(existingBlog);
        return toDTO(updatedBlog);
    }

    private BlogEntity toEntity(BlogDTO dto){
        return BlogEntity.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .image(dto.getImage())
                .text(dto.getText())
                .author(dto.getAuthor())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }


    public void deleteBlog(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog not found");
        }
        blogRepository.deleteById(id);
    }

    private BlogDTO toDTO(BlogEntity entity){
        return BlogDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .image(entity.getImage())
                .text(entity.getText())
                .author(entity.getAuthor())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

}
