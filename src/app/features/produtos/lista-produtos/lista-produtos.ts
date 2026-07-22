import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //lista com dados - Array
  produtos = signal([
    {nome:'Teclado Gamer', preco:229.99},
    {nome:'Monitor Gamer', preco:899.99},
    {nome:'Mouse Gamer', preco:199.99},
    {nome:'Desktop Gamer', preco:569.99},
    {nome:'Headsert Gamer', preco:56.99},
  ]);
  //!função para exibir selecionados pelo usuario no console 
  exibirProduto(nome: string){
    console.log('Produto selecionado:', nome);
    this.produtoSelecionado.set(nome);
  }
  //!função que adicionar produto usando metodo update()
  adicionarproduto(){
    this.produtos.update(listaAtual => [
      ... listaAtual,
      {nome:'PlayStation 5', preco:3000},
    ]);
  }
  //!função que contabiliza a quantidade de produtos na lista
  totalprodutos = computed(() => this.produtos().length);
  //!função que calcula o valor total de produtos usando metodo cumputed()
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
    total + item.preco,0
  )}
);
//!função que substituir a lista usando o metodo set()
substituirproduto(){
  this.produtos.set([
    {nome:'Teclado', preco:50},
    {nome:'Mouse', preco:15},
    {nome:'Monitor', preco:500},
    {nome:'Desktop', preco:1500},
    {nome:'Headsert', preco:30},
  ]);
}
//metodo para monitorar alterações em tempo real usando effect()
constructor(){
  effect(() =>{
    console.log('lista de produtos alterados:', this.produtos());
  });
  effect(() =>{
    console.log('valor Total atualizado: ', this.valorTotal)
  });
  effect(() =>{
    if (typeof document !== 'undefined'){
      document.title = `(${this.totalprodutos()}) - Loja da Mili`;
    }
  });
}
//Metodo para criar um estado de seleção com signal string | null
produtoSelecionado = signal <string | null>(null);
// metodo para criar um estado para carrinho con signal
carrinho = signal <{nome: string; preco: number}[]>([]);
adicionarAocarrinho(produto:{nome: string; preco: number}){
  this.carrinho.update(listaAtual =>[
   ...listaAtual,produto
  ]);
}
// totalprodutos = computed(() => this.produtos().Length);
// metodo para calcular a quantidade total de item no carrinho
quantidadeCarrinho = computed(() => this.carrinho().length);
//metodo para calcular o valor total dos item do carriho
totalCarrinho = computed(() =>{
  return this.carrinho().reduce((total, item) =>
  total + item.preco,0)});

  //valorTotal = computed(() =>
 // {return this.produtos().reduce((total, item) =>
 // total + item.preco,0)});
}