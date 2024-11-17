package com.fatecipiranga.paoo.lojavinho_springboot.controller;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Cesta;
import com.fatecipiranga.paoo.lojavinho_springboot.model.Item;
import com.fatecipiranga.paoo.lojavinho_springboot.repository.CestaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class CestaController {
    @Autowired
    CestaRepository bd_cesta;

    @PostMapping("/api/cesta")
    public ResponseEntity<?> criarCesta(@RequestBody Cesta cesta){
        try{
            if(cesta == null){ return ResponseEntity.badRequest().body("Cesta não pode ser nula."); }
            if(cesta.getCliente() == null) { return ResponseEntity.badRequest().body("O cliente é obrigatório e não pode ser nulo."); }
            if(cesta.getItens().isEmpty()){ return ResponseEntity.badRequest().body("É necessário pelo menos um produto para efetuar uma compra"); }

            for(Item item : cesta.getItens()){
                item.setCesta(cesta);
            }

            if (cesta.getData() == null) {
                cesta.setData(LocalDate.now());
            }

            return ResponseEntity.ok(bd_cesta.save(cesta));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor: " + e.getMessage());
        }

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