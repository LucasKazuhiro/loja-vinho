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

import com.fatecipiranga.paoo.lojavinho_springboot.model.Cliente;
import com.fatecipiranga.paoo.lojavinho_springboot.repository.ClienteRepository;

@RestController
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

     
    @PostMapping("/api/clientes")
    public String gravar(@RequestBody Cliente cliente) {
        clienteRepository.save(cliente);
        return "O Cliente " + cliente.getNome() + " foi salvo corretamente!";
    }

     
    @PutMapping("/api/clientes")
    public String alterar(@RequestBody Cliente cliente) {
        clienteRepository.save(cliente);
        return "O Cliente " + cliente.getNome() + " foi alterado corretamente!";
    }

     
    @GetMapping("/api/clientes/{codigo}")
    public Cliente carregar(@PathVariable long codigo) {
        Optional<Cliente> cliente = clienteRepository.findById(codigo);
        return cliente.orElse(null);  
    }

     
    @DeleteMapping("/api/clientes/{codigo}")
    public String remover(@PathVariable long codigo) {
        clienteRepository.deleteById(codigo);
        return "Cliente de código " + codigo + " removido com sucesso!";
    }

    
    @GetMapping("/api/clientes")
    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }
}
