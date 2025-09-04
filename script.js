class Automato {
  constructor(precoProduto) {
    this.precoProduto = precoProduto;
    this.estadoAtual = 0;
    this.estados = new Set([0]);
    this.transicoes = [];
  }

  inserirMoeda(valor) {
    let origem = this.estadoAtual;
    let destino = origem + valor;

    this.estados.add(destino);
    this.transicoes.push({ origem, destino, simbolo: valor });

    this.estadoAtual = destino;
    return { origem: `q${origem}`, destino: `q${destino}`, moeda: valor };
  }

  comprarProduto(nome) {
    if (this.estadoAtual >= this.precoProduto) {
      let origem = this.estadoAtual;
      this.estadoAtual -= this.precoProduto;

      this.transicoes.push({ origem, destino: this.estadoAtual, simbolo: nome });

      return { origem: `q${origem}`, destino: `q${this.estadoAtual}`, produto: nome };
    }
    return null;
  }

  getEstadoAtual() {
    return `q${this.estadoAtual}`;
  }
}

let vm = new Automato(30);

function atualizarInterface(msg = "") {
  document.getElementById("saldo").textContent = vm.estadoAtual;
  document.getElementById("estado").textContent = `q${vm.estadoAtual}`;
  document.getElementById("mensagem").textContent = msg;
  desenharAutomato();
}

// Inserir moedas manualmente
document.querySelectorAll(".moeda").forEach(btn => {
  btn.addEventListener("click", () => {
    let valor = parseInt(btn.getAttribute("data-valor"));
    vm.inserirMoeda(valor);
    atualizarInterface(`Moeda de ${valor}¢ inserida.`);
  });
});

// Comprar produto manualmente
document.querySelectorAll(".produto").forEach(btn => {
  btn.addEventListener("click", () => {
    let nome = btn.getAttribute("data-nome");
    let resultado = vm.comprarProduto(nome);
    if (resultado) {
      atualizarInterface(`Comprou: ${nome}`);
    } else {
      atualizarInterface("Saldo insuficiente para comprar o produto.");
    }
  });
});

atualizarInterface("Pronto para inserir moedas.");
