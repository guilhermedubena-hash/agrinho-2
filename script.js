function rodarSimulacao() {
  const agua = document.getElementById("agua").value;
  const solo = document.getElementById("solo").value;
  const pragas = document.getElementById("pragas").value;

  // Impede execução se faltar resposta
  if (!agua || !solo || !pragas) {
    alert("Por favor, preencha todas as três escolhas de manejo para calcular.");
    return;
  }

  let lucroTotal = 0;
  let ambientalTotal = 0;

  // Lógica Água
  if (agua === "ruim") { lucroTotal += 70; ambientalTotal += 10; }
  else if (agua === "medio") { lucroTotal += 85; ambientalTotal += 55; }
  else if (agua === "bom") { lucroTotal += 100; ambientalTotal += 100; }

  // Lógica Solo
  if (solo === "ruim") { lucroTotal += 60; ambientalTotal += 10; }
  else if (solo === "medio") { lucroTotal += 80; ambientalTotal += 60; }
  else if (solo === "bom") { lucroTotal += 100; ambientalTotal += 100; }

  // Lógica Pragas
  if (pragas === "ruim") { lucroTotal += 80; ambientalTotal += 10; }
  else if (pragas === "medio") { lucroTotal += 85; ambientalTotal += 65; }
  else if (pragas === "bom") { lucroTotal += 100; ambientalTotal += 100; }

  // Médias Finais
  const lucroFinal = Math.round(lucroTotal / 3);
  const ambientalFinal = Math.round(ambientalTotal / 3);
  const equilibrioFinal = Math.round((lucroFinal + ambientalFinal) / 2);

  // Exibir dados na tela
  document.getElementById("label-lucro").innerText = `${lucroFinal}%`;
  document.getElementById("label-ambiental").innerText = `${ambientalFinal}%`;
  document.getElementById("circulo-resultado").innerText = `${equilibrioFinal}%`;

  // Mover as barras
  document.getElementById("barra-lucro").style.width = `${lucroFinal}%`;
  document.getElementById("barra-ambiental").style.width = `${ambientalFinal}%`;

  // Setar as cores de resposta baseadas na performance
  aplicarCores(lucroFinal, "barra-lucro");
  aplicarCores(ambientalFinal, "barra-ambiental");
  
  // Cor do círculo de equilíbrio
  const circulo = document.getElementById("circulo-resultado");
  const feedback = document.getElementById("mensagem-feedback");

  if (equilibrioFinal >= 85) {
    circulo.style.backgroundColor = "#2e7d32"; // Verde Escuro
    feedback.style.borderLeftColor = "#2e7d32";
    feedback.innerText = "🏆 Perfeito! Produtividade máxima com total respeito ecológico. Esse é o Agro Forte idealizado pelo Concurso Agrinho!";
  } else if (equilibrioFinal >= 60) {
    circulo.style.backgroundColor = "#ef6c00"; // Laranja
    feedback.style.borderLeftColor = "#ef6c00";
    feedback.innerText = "⚠️ Bom desempenho, mas cuidado. Algumas de suas decisões estão gerando desperdícios ou desgastes ambientais que podem custar caro no futuro.";
  } else {
    circulo.style.backgroundColor = "#c62828"; // Vermelho
    feedback.style.borderLeftColor = "#c62828";
    feedback.innerText = "🛑 Crítico. O ecossistema está seriamente comprometido ou o negócio se tornou inviável financeiramente. Repense as técnicas usadas.";
  }
}

function aplicarCores(valor, idElemento) {
  const elemento = document.getElementById(idElemento);
  if (valor >= 85) {
    elemento.style.backgroundColor = "#4caf50";
  } else if (valor >= 60) {
    elemento.style.backgroundColor = "#ef6c00";
  } else {
    elemento.style.backgroundColor = "#e53935";
  }
}