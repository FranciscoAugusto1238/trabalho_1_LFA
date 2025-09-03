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

// Desenha o autômato no SVG
function desenharAutomato() {
  const svg = document.getElementById("automatoSVG");
  svg.innerHTML = "";

  let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  let marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrow");
  marker.setAttribute("viewBox", "0 0 10 10");
  marker.setAttribute("refX", "10");
  marker.setAttribute("refY", "5");
  marker.setAttribute("markerWidth", "6");
  marker.setAttribute("markerHeight", "6");
  marker.setAttribute("orient", "auto-start-reverse");

  let pathArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathArrow.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
  pathArrow.setAttribute("fill", "#333");

  marker.appendChild(pathArrow);
  defs.appendChild(marker);
  svg.appendChild(defs);

  let estados = Array.from(vm.estados).sort((a, b) => a - b);

  let cx = 400, cy = 200, raio = 150;
  let anguloStep = (2 * Math.PI) / estados.length;

  let posicoes = {};
  estados.forEach((estado, i) => {
    let ang = i * anguloStep - Math.PI / 2;
    let ex = cx + raio * Math.cos(ang);
    let ey = cy + raio * Math.sin(ang);
    posicoes[estado] = { x: ex, y: ey };

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", ex);
    circle.setAttribute("cy", ey);
    circle.setAttribute("r", 25);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", estado === vm.estadoAtual ? "#43c6ac" : "#fff");
    svg.appendChild(circle);

    if (estado >= vm.precoProduto) {
      let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle2.setAttribute("cx", ex);
      circle2.setAttribute("cy", ey);
      circle2.setAttribute("r", 29);
      circle2.setAttribute("stroke", "black");
      circle2.setAttribute("fill", "none");
      svg.appendChild(circle2);
    }

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", ex - 12);
    text.setAttribute("y", ey + 5);
    text.textContent = "q" + estado;
    svg.appendChild(text);
  });

  vm.transicoes.forEach(t => {
    if (!(t.origem in posicoes) || !(t.destino in posicoes)) return;

    let { x: x1, y: y1 } = posicoes[t.origem];
    let { x: x2, y: y2 } = posicoes[t.destino];

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let labelX, labelY;

    if (t.origem === t.destino) {
      let loop = `M ${x1} ${y1-25} q -20 -40 40 0`;
      path.setAttribute("d", loop);
      labelX = x1 + 20;
      labelY = y1 - 50;
    } else {
      let mx = (x1 + x2) / 2 + (y1 - y2) * 0.3;
      let my = (y1 + y2) / 2 + (x2 - x1) * 0.3;
      let curva = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
      path.setAttribute("d", curva);
      labelX = mx;
      labelY = my;
    }

    path.setAttribute("stroke", "#555");
    path.setAttribute("fill", "none");
    path.setAttribute("marker-end", "url(#arrow)");
    svg.appendChild(path);

    let label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", labelX);
    label.setAttribute("y", labelY);
    label.setAttribute("font-size", "12px");
    label.setAttribute("fill", "#000");
    label.textContent = t.simbolo;
    svg.appendChild(label);
  });
}

atualizarInterface("Pronto para digitar moedas manualmente.");
