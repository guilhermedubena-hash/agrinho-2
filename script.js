function calcularImpacto() {
  // Captura dos elementos do DOM
  const agua = document.getElementById("setor-agua").value;
  const solo = document.getElementById("setor-solo").value;
  const pragas = document.getElementById("setor-pragas").value;

  // Validação simples se todos os campos foram escolhidos
  if (!agua || !solo || !pragas) {
    alert("Por favor, selecione uma opção para todos os setores do painel.");
    return;
  }

  // Pontuações base iniciais
  let lucro = 0;
  let ambiental = 0;

  // Processamento das escolhas de Água
  switch (agua) {
    case "inundacao":
      lucro += 70; ambiental += 20;
      break;
    case "aspersao":
      lucro += 80; ambiental += 50;
      break;
    case "gotejamento":
      lucro += 95; ambiental += 95;
      break;
  }

  // Processamento das escolhas de Solo
  switch (solo) {
    case "convencional":
      lucro += 60; ambiental += 10;
      break;
    case "minimo":
      lucro += 75; ambiental += 60;
      break;
    case "direto":
      lucro += 95; ambiental += 100;
      break;
  }

  // Processamento das escolhas de Pragas
  switch (pragas) {
    case "quimico":
      lucro += 85; ambiental += 15;
      break;
    case "pontual":
      lucro += 80; ambiental += 65;
      break;
    case "mip":
      lucro += 95; ambiental += 95;
      break;
  }

  // Média dos valores para os eixos principais
  const mediaLucro = Math.round(lucro / 3);
  const mediaAmbiental = Math.round(ambiental / 3);
  
  // Cálculo do Equilíbrio Sustentável (Média Harmônica ou Ponderada para penalizar extremos)
  // Se houver muita discrepância entre os valores, a nota de equilíbrio cai.
  const equilibrio = Math.round((mediaLucro + mediaAmbiental) / 2);

  // Atualização dos textos na interface
  document.getElementById("txt-lucro").innerText = `${mediaLucro}%`;
  document.getElementById("txt-ambiental").innerText = `${mediaAmbiental}%`;
  document.getElementById("txt-equilibrio").innerText = `${equilibrio}%`;

  // Atualização das larguras das barras de progresso
  document.getElementById("bar-lucro").style.width = `${mediaLucro}%`;
  document.getElementById("bar-ambiental").style.width = `${mediaAmbiental}%`;

  // Definição de cores baseada em faixas de performance
  definirCoresDasBarras(mediaLucro, "bar-lucro");
  definirCoresDasBarras(mediaAmbiental, "bar-ambiental");
  definirCorDoCirculo(equilibrio);

  // Geração do feedback textual adaptativo
  gerarFeedback(equilibrio, mediaLucro, mediaAmbiental);
}

function definirCoresDasBarras(valor, idElemento) {
  const elemento = document.getElementById(idElemento);
  if (valor < 50) {
    elemento.style.backgroundColor = "#d32f2f"; // Vermelho
  } else if (valor < 80) {
    elemento.style.backgroundColor = "#f57c00"; // Laranja/Amarelo
  } else {
    elemento.style.backgroundColor = "#388e3c"; // Verde
  }
}

function definirCorDoCirculo(valor) {
  const circulo = document.getElementById("circle-score");
  if (valor < 50) {
    circulo.style.backgroundColor = "#d32f2f";
  } else if (valor < 80) {
    circulo.style.backgroundColor = "#f57c00";
  } else {
    circulo.style.backgroundColor = "#2e7d32";
  }
}

function gerarFeedback(equilibrio, lucro, ambiental) {
  const feedbackBox = document.getElementById("feedback-mensagem");
  
  if (equilibrio === 100 || (lucro >= 90 && ambiental >= 95)) {
    feedbackBox.style.borderLeftColor = "#2e7d32";
    feedbackBox.innerText = "🏆 Excelente! Você atingiu o equilíbrio máximo. Sua propriedade produz de forma altamente eficiente enquanto preserva integralmente os recursos naturais para as próximas gerações.";
  } else if (equilibrio >= 75) {
    feedbackBox.style.borderLeftColor = "#4caf50";
    feedbackBox.innerText = "👍 Muito bom! Você está no caminho certo para um Agro Forte e Sustentável. Pequenos ajustes em tecnologias de precisão podem te levar aos 100%.";
  } else if (lucro > ambiental) {
    feedbackBox.style.borderLeftColor = "#f57c00";
    feedbackBox.innerText = "⚠️ Alerta Econômico Alto: Sua produtividade está gerando lucros rápidos, mas a degradação do solo, o desperdício de água e o uso de químicos ameaçam a sobrevivência da propriedade a longo prazo.";
  } else {
    feedbackBox.style.borderLeftColor = "#d32f2f";
    feedbackBox.innerText = "🛑 Desequilíbrio Crítico: Suas decisões comprometeram seriamente o ecossistema ou inviabilizaram a rentabilidade econômica do produtor. Reveja suas escolhas técnicas.";
  }
}