package com.fatecipiranga.paoo.lojavinho_springboot.repository;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Vinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VinhoRepository extends JpaRepository<Vinho, Long> {
    
}
