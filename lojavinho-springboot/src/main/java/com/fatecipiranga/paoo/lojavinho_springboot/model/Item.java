package com.fatecipiranga.paoo.lojavinho_springboot.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @ManyToOne
    @JoinColumn(name = "cesta_cod", nullable = false)
    private Cesta cesta;

    @ManyToOne
    @JoinColumn(name="vinho_cod", nullable = false)
    private Vinho vinho;

    private Integer quantidade;
    private double valorTotal;


    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public Cesta getCesta() {
        return cesta;
    }

    public void setCesta(Cesta cesta) {
        this.cesta = cesta;
    }

    public Vinho getVinho() {
        return vinho;
    }

    public void setVinho(Vinho vinho) {
        this.vinho = vinho;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
}