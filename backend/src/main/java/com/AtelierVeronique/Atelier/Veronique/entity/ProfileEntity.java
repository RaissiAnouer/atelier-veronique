package com.AtelierVeronique.Atelier.Veronique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "tbl_profiles")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    public enum Role {
        ADMIN,
        USER
    }
    @Enumerated(EnumType.STRING)
    private Role role= Role.USER;
    @Column(unique = true)
    private String email;
    private String password;
    private Boolean isActive;
    private String activationToken;
    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToOne(
            mappedBy = "profile",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private CartEntity cart;

    @PrePersist
    public void prePersist(){
        if(this.isActive==null){
            isActive=false;
        }
        if(this.cart== null ){
            this.cart=CartEntity.builder()
                    .profile(this)
                    .products(new ArrayList<>())
                    .build();
        }else {
            this.cart.setProfile(this);
        }
    }

}
