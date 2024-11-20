package com.fatecipiranga.paoo.lojavinho_springboot.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fatecipiranga.paoo.lojavinho_springboot.model.Cesta;
import com.fatecipiranga.paoo.lojavinho_springboot.model.Item;
import com.fatecipiranga.paoo.lojavinho_springboot.repository.CestaRepository;
import org.aspectj.apache.bcel.classfile.ExceptionTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fatecipiranga.paoo.lojavinho_springboot.model.Cliente;
import com.fatecipiranga.paoo.lojavinho_springboot.repository.ClienteRepository;

@CrossOrigin(origins = "*")
@RestController
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;
    private CestaRepository bd_cesta;
     
    @PostMapping("/api/cliente")
    public ResponseEntity<?> gravar(@RequestBody Cliente cliente) {
        try {
            
            Optional<Cliente> clienteExistente = clienteRepository.procuraEmail(cliente.getEmail());
            if (clienteExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este email já está cadastrado.");
            }
    
            
            return ResponseEntity.ok(clienteRepository.save(cliente));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor: " + e.getMessage());
        }
    }


    @PostMapping("/api/cliente/cesta")
    public ResponseEntity<?> salvarCesta(@RequestBody Map<String, Object> body){
        Long idCliente = ((Number) body.get("idCliente")).longValue();
        Cesta cesta = new ObjectMapper().convertValue(body.get("cesta"), Cesta.class);

        try{
            for(Item item : cesta.getItens()){
                item.setCesta(cesta);
            }

            if (cesta.getData() == null) {
                cesta.setData(LocalDate.now());
            }

            return clienteRepository.findById(idCliente)
                    .map(clienteEncontrado -> {
                        cesta.setCliente(clienteEncontrado);
                        clienteEncontrado.getCestas().add(cesta);
                        return ResponseEntity.ok(clienteRepository.save(clienteEncontrado));
                    }).orElseGet(() -> ResponseEntity.notFound().build());

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor: " + e.getMessage());
        }
    }

     
    @PutMapping("/api/cliente")
    public ResponseEntity<?> alterar(@RequestBody Cliente cliente) {
        try{
            return ResponseEntity.ok(clienteRepository.save(cliente));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor: " + e.getMessage());
        }
    }

     
    @GetMapping("/api/cliente/{codigo}")
    public Cliente carregar(@PathVariable long codigo) {
        Optional<Cliente> cliente = clienteRepository.findById(codigo);
        return cliente.orElse(null);  
    }

     
    @DeleteMapping("/api/cliente/{codigo}")
public ResponseEntity<?> remover(@PathVariable long codigo) {
    try {
        clienteRepository.deleteById(codigo); 
        return ResponseEntity.ok("Sua conta foi deletada com sucesso! Recarregue a página.");
    } catch (EmptyResultDataAccessException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conta do usuário não encontrada!");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor: " + e.getMessage());
    }
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
