package com.AtelierVeronique.Atelier.Veronique.repository;

import com.AtelierVeronique.Atelier.Veronique.entity.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<BlogEntity,Long> {

}
