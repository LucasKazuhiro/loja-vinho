package com.fatecipiranga.paoo.lojavinho_springboot.controller;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Cesta;
import com.fatecipiranga.paoo.lojavinho_springboot.model.Item;
import com.fatecipiranga.paoo.lojavinho_springboot.repository.CestaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CestaController {
    @Autowired
    CestaRepository bd_cesta;

    @PostMapping("/api/cesta")
    public ResponseEntity<Cesta> criarCesta(@RequestBody Cesta cesta){
        if(cesta.getItens() != null){
            for(Item item : cesta.getItens()){
                item.setCesta(cesta);
            }
        }

        return ResponseEntity.ok(bd_cesta.save(cesta));
    }

    @GetMapping("/api/cesta/cliente")
    public ResponseEntity<List<Cesta>> listarCestaCliente(@RequestParam Long clienteCod){
        List<Cesta> cestasCliente = bd_cesta.listarCestasCliente(clienteCod);
        return ResponseEntity.ok(cestasCliente);
    }

    @DeleteMapping("/api/cesta/{cesta_cod}")
    public ResponseEntity<Object> deletarCesta(@PathVariable long cesta_cod){
        return bd_cesta.findById(cesta_cod)
                .map(cesta -> {
                    bd_cesta.deleteById(cesta_cod);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}