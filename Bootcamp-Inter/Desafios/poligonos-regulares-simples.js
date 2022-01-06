/* 
POLÍGONOS REGULARES SIMPLES

 Básico
 Princípios Básicos

Você deve escrever um programa que, dados o número e o comprimento dos lados de um polígono regular, mostre seu perímetro.

Entrada
A entrada tem dois inteiros positivos: N e L, que são, respectivamente, o número de lados e o comprimento de cada lado de um polígono regular (3 ≤ N ≤ 1000000 and 1 ≤ L ≤ 4000).

Saída
A saída é o perímetro P do polígono regular em uma única linha.

 
Exemplos de Entrada     	Exemplos de Saída
3 1                                                     3
 
9 8                                                     72
 
1000000 1000                        1000000000

Prova 1 de Programação de Computadores da UNILA (2015/2)
*/

let lines = gets().split("\n");
let line = lines.shift().split(" ");

//continue o seu código aqui

let N = line[0];
let L = line[1];

let P = N * L;
print(P);