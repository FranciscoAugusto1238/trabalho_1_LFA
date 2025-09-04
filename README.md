# Trabalho I - Vending Machine

**Disciplina:** Linguagens Formais e Autômatos. 

**Objetivo:** Modelar uma “vending machine” que aceita moedas de 5, 10 e 25 centavos. O preço do produto que ela entrega é 30 centavos.
Partindo do estado inicial (0) deve reconhecer sequências que levem a estados finais (valor inserido >= 30).
Sem troco, à partir do momento que atinge mais do que 30, ganha o produto e depois continua até ganhar outro. 

**Como Executar?**

     Execute o comando git clone https://github.com/FranciscoAugusto1238/trabalho_1_LFA.git, em uma pasta de sua preferência. 

    Em seguida, execute o arquivo "trabalho1.html" no seu navegador ou através na IDE VSCODE utilizando a extensão Live Server. 


**Como Funciona?**

O usuário poderá inserir moedas de 5|10|25 centavos e poderá escolher entre 3 produtos da Vendinha de Doces, sendo estes: bala de coca, bolinha de chocolate ou moeda de chocolate. Todos os produtos custam 30 centavos e o saldo atual para comprar qualquer um destes deverá ser >= 30. Ademais, o saldo atualizado está sendo descrito acima dos botões de inserir moedas, o qual também está representando o estado atual da máquina. 


A modelagem da máquina foi realizada através da ferramenta JFLAP e encontra-se neste repositório, na forma de imagem e na forma de arquivo executável no JFLAP. Estes estão nomeados respectivamente de "ModelagemT1.jiff" e "ModelagemT1.jpg". 
