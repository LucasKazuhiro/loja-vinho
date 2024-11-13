package com.fatecipiranga.paoo.lojavinho_springboot.repository;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Cesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CestaRepository extends JpaRepository<Cesta, Long> {
    @Query(value = "SELECT * FROM cesta WHERE cliente_cod = ?1", nativeQuery = true)
    List<Cesta> listarCestasCliente(Long clienteCod);
}