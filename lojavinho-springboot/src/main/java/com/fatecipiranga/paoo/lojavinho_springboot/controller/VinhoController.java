package com.fatecipiranga.paoo.lojavinho_springboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Vinho;
import com.fatecipiranga.paoo.lojavinho_springboot.repository.VinhoRepository;

@RestController
public class VinhoController {

    @Autowired
    private VinhoRepository vinhoRepository;

    
    @PostMapping("/api/vinhos")
    public String gravar(@RequestBody Vinho vinho) {
        vinhoRepository.save(vinho);
        return "O Vinho " + vinho.getNome() + " foi salvo corretamente!";
    }

 
    @PutMapping("/api/vinhos")
    public String alterar(@RequestBody Vinho vinho) {
        vinhoRepository.save(vinho);
        return "O Vinho " + vinho.getNome() + " foi alterado corretamente!";
    }

    
    @GetMapping("/api/vinhos/{codigo}")
    public Vinho carregar(@PathVariable long codigo) {
        Optional<Vinho> vinho = vinhoRepository.findById(codigo);
        return vinho.orElse(null);   
    }
 
    @DeleteMapping("/api/vinhos/{codigo}")
    public String remover(@PathVariable long codigo) {
        vinhoRepository.deleteById(codigo);
        return "Vinho de código " + codigo + " removido com sucesso!";
    }

     
    @GetMapping("/api/vinhos")
    public List<Vinho> listar() {
        return vinhoRepository.findAll();
    }
}

