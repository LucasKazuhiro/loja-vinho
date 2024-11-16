package com.fatecipiranga.paoo.lojavinho_springboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Cliente;
import com.fatecipiranga.paoo.lojavinho_springboot.repository.ClienteRepository;

@CrossOrigin(origins = "*")
@RestController
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

     
    @PostMapping("/api/cliente")
    public String gravar(@RequestBody Cliente cliente) {
        clienteRepository.save(cliente);
        return "O Cliente " + cliente.getNome() + " foi salvo corretamente!";
    }

     
    @PutMapping("/api/cliente")
    public String alterar(@RequestBody Cliente cliente) {
        clienteRepository.save(cliente);
        return "O Cliente " + cliente.getNome() + " foi alterado corretamente!";
    }

     
    @GetMapping("/api/cliente/{codigo}")
    public Cliente carregar(@PathVariable long codigo) {
        Optional<Cliente> cliente = clienteRepository.findById(codigo);
        return cliente.orElse(null);  
    }

     
    @DeleteMapping("/api/cliente/{codigo}")
    public String remover(@PathVariable long codigo) {
        clienteRepository.deleteById(codigo);
        return "Cliente de código " + codigo + " removido com sucesso!";
    }

    
    @GetMapping("/api/clientes")
    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    @PostMapping("/api/cliente/login")
    public Cliente fazerLogin(@RequestBody Cliente obj){
        Optional<Cliente> retorno = 
        clienteRepository.login(obj.getEmail(), obj.getSenha());
        if(retorno.isPresent()){
            return retorno.get();
        } else {
            return null;
        }
    }


    @PostMapping("/api/cliente/recupera")
    public Cliente recuperarSenha(@RequestBody Cliente obj){
        Optional<Cliente> retorno = 
        clienteRepository.recuperaSenha(obj.getEmail());
        if(retorno.isPresent()){
            return retorno.get();
        } else {
            return null;
        }
    }
}
