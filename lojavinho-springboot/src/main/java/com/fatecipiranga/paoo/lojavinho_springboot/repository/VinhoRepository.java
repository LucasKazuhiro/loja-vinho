package com.fatecipiranga.paoo.lojavinho_springboot.repository;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Vinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VinhoRepository extends JpaRepository<Vinho, Long> {
    @Query("SELECT v FROM Vinho v WHERE v.nome LIKE :pesquisa")
    List<Vinho> busca(@Param("pesquisa") String pesquisa);
}

