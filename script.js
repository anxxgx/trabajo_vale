/* ==========================================================
   SISTEMA DE RECOMENDACIÓN VOCACIONAL — script.js
   Lógica del test, cálculo de áreas y renderizado de resultados.
   ========================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. DATOS: LAS 30 PREGUNTAS
     ---------------------------------------------------------- */
  const QUESTIONS = [
    "Ayudar a otras personas.",
    "Cuerpo humano.",
    "Dibujar, diseñar.",
    "Hablar en público.",
    "Tecnología.",
    "Resolver problemas.",
    "Negocios y empresas.",
    "Organizar y trabajar en equipo.",
    "Naturaleza y animales.",
    "Escribir ideas o textos.",
    "Derechos y leyes.",
    "Números y cálculos.",
    "Experimentar y buscar.",
    "Redes sociales y publicidad.",
    "Enseñar o explicar.",
    "Salud y medicina.",
    "Herramientas y máquinas.",
    "Arte y expresión.",
    "Sociedad y problemas.",
    "Emprendimiento.",
    "Investigar y buscar información.",
    "Ser creativo/a.",
    "Tecnología.",
    "Escuchar y acompañar.",
    "Dirigir o coordinar.",
    "Comunicación y medios.",
    "Detalles y observación.",
    "Ciencia e investigación.",
    "Administración y economía.",
    "Crear tus propias ideas."
  ]; // índice 0 = pregunta 1

  const OPTIONS = [
    { value: 3, icon: "⭐", label: "Me gusta mucho" },
    { value: 2, icon: "😊", label: "Me gusta" },
    { value: 1, icon: "😐", label: "Me gusta poco" },
    { value: 0, icon: "❌", label: "No me gusta" }
  ];

  const MOTIVATIONAL_MESSAGES = [
    "Cada respuesta dice algo sobre ti ✨",
    "Vas descubriendo tu camino.",
    "Tu curiosidad también cuenta.",
    "¡Vas muy bien! ✨",
    "Ya casi llegamos 🚀",
    "Conocerte es el primer paso.",
    "Cada respuesta ayuda a conocerte mejor."
  ];
  // Preguntas (1-indexadas) en las que se mostrará un mensaje motivacional.
  const MOTIVATION_AT = [3, 7, 12, 16, 20, 24, 28];

  /* ----------------------------------------------------------
     2. DATOS: LAS 7 ÁREAS VOCACIONALES
     Los índices de "questions" están en base 1 (pregunta N).
     ---------------------------------------------------------- */
  const AREAS = [
    {
      id: "ciencias",
      name: "Ciencias",
      icon: "🧪",
      color: "var(--area-ciencias)",
      questions: [2, 9, 13, 21, 28],
      persona: "El/la investigador/a",
      mainDesc: (p) => `Tu resultado (${p}%) muestra una curiosidad natural por entender cómo funciona el mundo: te atraen la observación, la experimentación y la búsqueda de respuestas.`,
      secDesc: (p) => `Con un ${p}% de afinidad, también disfrutas investigar, observar y hacerte preguntas sobre el mundo natural.`,
      strengths: ["Curiosidad", "Observación", "Pensamiento analítico", "Investigación"],
      careers: ["Biología", "Química", "Física", "Ciencias ambientales", "Investigación científica", "Astronomía", "Geología"],
      activities: ["Hacer experimentos", "Investigar", "Observar la naturaleza", "Participar en ferias de ciencia"]
    },
    {
      id: "humanidades",
      name: "Humanidades y Sociales",
      icon: "🧠",
      color: "var(--area-humanidades)",
      questions: [1, 11, 19, 24],
      persona: "El/la cuidador/a",
      mainDesc: (p) => `Tu resultado (${p}%) refleja una fuerte sensibilidad hacia las personas y la sociedad: te interesa ayudar, escuchar y entender los problemas de tu entorno.`,
      secDesc: (p) => `Con un ${p}% de afinidad, también te conecta acompañar a otros y pensar en cómo mejorar la sociedad.`,
      strengths: ["Empatía", "Escucha activa", "Pensamiento crítico", "Compromiso social"],
      careers: ["Derecho", "Psicología", "Sociología", "Trabajo social", "Ciencias políticas", "Historia", "Filosofía"],
      activities: ["Participar en debates", "Hacer voluntariado", "Escuchar y acompañar", "Investigar temas sociales"]
    },
    {
      id: "arte",
      name: "Arte y Diseño",
      icon: "🎨",
      color: "var(--area-arte)",
      questions: [3, 18, 22],
      persona: "El/la creador/a",
      mainDesc: (p) => `Tu resultado (${p}%) muestra una fuerte conexión con la creatividad: disfrutas expresarte, diseñar y dar forma visual a tus ideas.`,
      secDesc: (p) => `Con un ${p}% de afinidad, el arte y el diseño también son un espacio donde te gusta crear.`,
      strengths: ["Creatividad", "Sensibilidad estética", "Expresión", "Originalidad"],
      careers: ["Diseño gráfico", "Diseño industrial", "Arquitectura", "Ilustración", "Animación", "Fotografía", "Diseño de interiores"],
      activities: ["Diseñar", "Dibujar", "Hacer fotografía", "Crear videos"]
    },
    {
      id: "salud",
      name: "Salud",
      icon: "🩺",
      color: "var(--area-salud)",
      questions: [16, 24],
      persona: "El/la sanador/a",
      mainDesc: (p) => `Tu resultado (${p}%) muestra un interés genuino por el bienestar de las personas: te atrae cuidar, sanar y acompañar procesos de salud.`,
      secDesc: (p) => `Con un ${p}% de afinidad, también te conecta el cuidado del cuerpo y el bienestar de otros.`,
      strengths: ["Cuidado", "Responsabilidad", "Empatía", "Atención al detalle"],
      careers: ["Medicina", "Enfermería", "Fisioterapia", "Nutrición", "Odontología", "Terapias", "Ciencias de la salud"],
      activities: ["Aprender primeros auxilios", "Investigar temas de salud", "Hacer voluntariado en salud", "Cuidar de otros"]
    },
    {
      id: "ingenieria",
      name: "Ingeniería e Informática",
      icon: "💻",
      color: "var(--area-ingenieria)",
      questions: [5, 6, 17, 23, 27],
      persona: "El/la constructor/a",
      mainDesc: (p) => `Tu resultado (${p}%) muestra afinidad por resolver problemas con lógica y tecnología: te gusta construir, programar y entender cómo funcionan las cosas.`,
      secDesc: (p) => `Con un ${p}% de afinidad, la tecnología y la resolución de problemas también son un punto fuerte para ti.`,
      strengths: ["Resolución de problemas", "Pensamiento lógico", "Precisión", "Curiosidad técnica"],
      careers: ["Ingeniería de sistemas", "Ingeniería de software", "Programación", "Robótica", "Ingeniería electrónica", "Ciencia de datos", "Ciberseguridad"],
      activities: ["Programar", "Armar o desarmar cosas", "Crear proyectos", "Participar en clubes de robótica"]
    },
    {
      id: "economia",
      name: "Economía y Administración",
      icon: "📊",
      color: "var(--area-economia)",
      questions: [7, 8, 20, 25, 29, 30],
      persona: "El/la líder",
      mainDesc: (p) => `Tu resultado (${p}%) muestra habilidades para organizar, liderar y emprender: te interesa cómo funcionan los negocios y los equipos.`,
      secDesc: (p) => `Con un ${p}% de afinidad, también disfrutas organizar, liderar y pensar en nuevas ideas de negocio.`,
      strengths: ["Liderazgo", "Organización", "Visión estratégica", "Trabajo en equipo"],
      careers: ["Administración de empresas", "Economía", "Contaduría", "Finanzas", "Marketing", "Negocios internacionales", "Emprendimiento"],
      activities: ["Emprender", "Organizar proyectos", "Participar en clubes escolares", "Liderar equipos"]
    },
    {
      id: "comunicacion",
      name: "Comunicación y Marketing",
      icon: "📣",
      color: "var(--area-comunicacion)",
      questions: [4, 10, 14, 26],
      persona: "El/la comunicador/a",
      mainDesc: (p) => `Tu resultado (${p}%) muestra una fuerte afinidad por comunicar ideas, crear contenido y conectar con otras personas.`,
      secDesc: (p) => `Con un ${p}% de afinidad, comunicar ideas y crear contenido también son cosas que disfrutas.`,
      strengths: ["Comunicación", "Creatividad", "Expresión de ideas", "Persuasión"],
      careers: ["Comunicación social", "Marketing", "Publicidad", "Comunicación audiovisual", "Periodismo", "Creación de contenido", "Relaciones públicas"],
      activities: ["Crear contenido", "Hablar en público", "Escribir", "Participar en redes sociales"]
    }
  ];

  /* ----------------------------------------------------------
     3. ESTADO
     ---------------------------------------------------------- */
  const state = {
    answers: new Array(QUESTIONS.length).fill(null),
    currentIndex: 0 // 0-based
  };

  /* ----------------------------------------------------------
     4. UTILIDADES
     ---------------------------------------------------------- */
  function $(id) { return document.getElementById(id); }

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
  }

  function areaMaxScore(area) { return area.questions.length * 3; }

  /* ----------------------------------------------------------
     5. PANTALLA 1 → INICIO DEL TEST
     ---------------------------------------------------------- */
  $("btn-start").addEventListener("click", () => {
    state.answers = new Array(QUESTIONS.length).fill(null);
    state.currentIndex = 0;
    showScreen("screen-test");
    renderQuestion();
  });

  /* ----------------------------------------------------------
     6. PANTALLA 2 → TEST
     ---------------------------------------------------------- */
  const optionsGrid = $("options-grid");
  const questionText = $("question-text");
  const progressFill = $("progress-fill");
  const progressCurrent = $("progress-current");
  const progressTrack = $("progress-track");
  const btnPrev = $("btn-prev");
  const btnNext = $("btn-next");
  const btnNextLabel = $("btn-next-label");
  const btnNextArrow = $("btn-next-arrow");
  const testMotivation = $("test-motivation");
  const testCard = $("test-card");

  function renderQuestion() {
    const idx = state.currentIndex; // 0-based
    const qNum = idx + 1;

    questionText.textContent = QUESTIONS[idx];

    // Barra de progreso
    const pct = (qNum / QUESTIONS.length) * 100;
    progressFill.style.width = pct + "%";
    progressCurrent.textContent = String(qNum).padStart(2, "0");
    progressTrack.setAttribute("aria-valuenow", qNum);

    // Opciones
    optionsGrid.innerHTML = "";
    OPTIONS.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.type = "button";
      btn.dataset.value = opt.value;
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", `${opt.label} (${opt.value} ${opt.value === 1 ? "punto" : "puntos"})`);
      btn.innerHTML = `<span class="opt-icon" aria-hidden="true">${opt.icon}</span><span>${opt.label}</span>`;
      if (state.answers[idx] === opt.value) {
        btn.classList.add("selected");
        btn.setAttribute("aria-pressed", "true");
      }
      btn.addEventListener("click", () => selectAnswer(opt.value));
      optionsGrid.appendChild(btn);
    });

    // Navegación
    btnPrev.disabled = idx === 0;
    btnNext.disabled = state.answers[idx] === null;

    if (qNum === QUESTIONS.length) {
      btnNextLabel.textContent = "Ver mi resultado";
      btnNextArrow.textContent = "✨";
    } else {
      btnNextLabel.textContent = "Siguiente";
      btnNextArrow.textContent = "→";
    }

    // Animación de entrada de la tarjeta
    testCard.classList.remove("cardIn");
    // Forzar reflow para reiniciar animación
    void testCard.offsetWidth;
    testCard.style.animation = "none";
    void testCard.offsetWidth;
    testCard.style.animation = "";

    // Mensaje motivacional ocasional
    if (MOTIVATION_AT.includes(qNum)) {
      const msg = MOTIVATIONAL_MESSAGES[qNum % MOTIVATIONAL_MESSAGES.length];
      testMotivation.textContent = msg;
      testMotivation.classList.add("show");
    } else {
      testMotivation.classList.remove("show");
    }
  }

  function selectAnswer(value) {
    state.answers[state.currentIndex] = value;

    // Actualizar visual de selección sin re-renderizar todo (mejor microinteracción)
    Array.from(optionsGrid.children).forEach((btn) => {
      const isSelected = Number(btn.dataset.value) === value;
      btn.classList.toggle("selected", isSelected);
      btn.setAttribute("aria-pressed", String(isSelected));
    });

    btnNext.disabled = false;
  }

  btnPrev.addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  });

  btnNext.addEventListener("click", () => {
    if (state.answers[state.currentIndex] === null) return;

    if (state.currentIndex === QUESTIONS.length - 1) {
      runProcessing();
    } else {
      state.currentIndex += 1;
      renderQuestion();
    }
  });

  /* ----------------------------------------------------------
     7. PANTALLA 3 → PROCESAMIENTO
     ---------------------------------------------------------- */
  const processingLine = $("processing-line");
  const PROCESSING_STEPS = [
    "Analizando tus respuestas…",
    "Conectando tus intereses…",
    "Construyendo tu perfil…"
  ];

  function runProcessing() {
    showScreen("screen-processing");
    let step = 0;
    processingLine.textContent = PROCESSING_STEPS[0];

    const interval = setInterval(() => {
      step += 1;
      if (step < PROCESSING_STEPS.length) {
        processingLine.textContent = PROCESSING_STEPS[step];
      }
    }, 550);

    setTimeout(() => {
      clearInterval(interval);
      const results = computeResults();
      renderResults(results);
      showScreen("screen-results");
      celebrate();
    }, 1700);
  }

  /* ----------------------------------------------------------
     8. CÁLCULO DE RESULTADOS
     ---------------------------------------------------------- */
  function computeResults() {
    const scored = AREAS.map((area) => {
      const max = areaMaxScore(area);
      let score = 0;
      area.questions.forEach((qNum) => {
        const val = state.answers[qNum - 1];
        score += val === null ? 0 : val;
      });
      const percent = max > 0 ? Math.round((score / max) * 100) : 0;
      return { area, score, max, percent };
    });

    scored.sort((a, b) => b.percent - a.percent || b.score - a.score);

    const topPercent = scored[0].percent;
    const tiedTop = scored.filter((s) => s.percent === topPercent);

    return { scored, tiedTop };
  }

  /* ----------------------------------------------------------
     9. RENDER DE RESULTADOS
     ---------------------------------------------------------- */
  function renderResults({ scored, tiedTop }) {
    const main = scored[0];
    const secondary = scored[1];

    // Persona
    $("results-persona").textContent = `Tu perfil: ${main.area.persona}`;

    // Tarjeta principal
    $("main-area-name").textContent = main.area.name;
    animateCount($("main-area-percent"), main.percent);
    $("main-area-desc").textContent = main.area.mainDesc(main.percent);

    // Tarjeta secundaria
    $("sec-area-name").textContent = secondary.area.name;
    animateCount($("sec-area-percent"), secondary.percent);
    $("sec-area-desc").textContent = secondary.area.secDesc(secondary.percent);

    // Nota de empate
    const tieNote = $("tie-note");
    if (tiedTop.length > 1) {
      const names = tiedTop.map((s) => s.area.name).join(" y ");
      tieNote.hidden = false;
      tieNote.textContent = `Tuviste un empate en tu puntaje más alto entre ${names}. Elegimos ${main.area.name} como tu área principal, pero ambas reflejan igual de bien tus intereses.`;
    } else {
      tieNote.hidden = true;
    }

    // Tarjetas de las 7 áreas (orden descendente)
    const areasGrid = $("areas-grid");
    areasGrid.innerHTML = "";
    scored.forEach((s, i) => {
      const card = document.createElement("article");
      card.className = "area-card" + (i === 0 ? " rank-1" : "");
      card.style.setProperty("--area-color", s.area.color);
      card.innerHTML = `
        <div class="area-card-top">
          <span class="area-icon" aria-hidden="true">${s.area.icon}</span>
          <span class="area-name">${s.area.name}</span>
          ${i === 0 ? '<span class="rank-badge">🥇 Principal</span>' : ""}
          ${i === 1 ? '<span class="rank-badge">🥈 Secundaria</span>' : ""}
        </div>
        <div class="area-scoreline">
          <span>${s.score} / ${s.max} pts</span>
          <span>${s.percent}%</span>
        </div>
        <div class="area-bar-track">
          <div class="area-bar-fill" data-target="${s.percent}"></div>
        </div>
      `;
      areasGrid.appendChild(card);
    });
    // Animar barras después de insertar al DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        areasGrid.querySelectorAll(".area-bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.target + "%";
        });
      });
    });

    // Fortalezas (combinar principal + secundaria, sin duplicar)
    const strengthsList = $("strengths-list");
    const strengthsSet = [];
    [main.area, secondary.area].forEach((a) => {
      a.strengths.forEach((s) => { if (!strengthsSet.includes(s)) strengthsSet.push(s); });
    });
    strengthsList.innerHTML = strengthsSet.slice(0, 6).map((s) => `<li>✓ ${s}</li>`).join("");

    // Carreras (principal: todas: secundaria: primeras 3)
    const careersGrid = $("careers-grid");
    const careerItems = [];
    main.area.careers.forEach((c) => careerItems.push({ name: c, color: main.area.color }));
    secondary.area.careers.slice(0, 3).forEach((c) => {
      if (!careerItems.some((it) => it.name === c)) careerItems.push({ name: c, color: secondary.area.color });
    });
    careersGrid.innerHTML = careerItems
      .map((c) => `<div class="career-chip"><span class="career-dot" style="background:${c.color}"></span>${c.name}</div>`)
      .join("");

    // Actividades
    const activitiesChips = $("activities-chips");
    const activitiesSet = [];
    [main.area, secondary.area].forEach((a) => {
      a.activities.forEach((act) => { if (!activitiesSet.includes(act)) activitiesSet.push(act); });
    });
    activitiesChips.innerHTML = activitiesSet.map((a) => `<span class="activity-chip">${a}</span>`).join("");

    // Gráfico radar
    renderRadar(scored);
  }

  function animateCount(el, target) {
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------
     10. GRÁFICO RADAR (SVG dibujado a mano, sin librerías)
     ---------------------------------------------------------- */
  function renderRadar(scored) {
    // Reordenar por orden original de AREAS para que el radar sea consistente
    const byOriginalOrder = AREAS.map((area) => scored.find((s) => s.area.id === area.id));

    const svg = $("radar-chart");
    const size = 320;
    const center = size / 2;
    const maxRadius = 110;
    const n = byOriginalOrder.length;
    const angleStep = (Math.PI * 2) / n;

    function pointFor(i, radiusFactor) {
      const angle = -Math.PI / 2 + i * angleStep;
      const r = maxRadius * radiusFactor;
      return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
    }

    let svgMarkup = "";

    // Anillos de fondo (25/50/75/100%)
    [0.25, 0.5, 0.75, 1].forEach((f) => {
      const pts = byOriginalOrder.map((_, i) => pointFor(i, f).join(",")).join(" ");
      svgMarkup += `<polygon points="${pts}" fill="none" stroke="#DCCBF3" stroke-width="1"/>`;
    });

    // Ejes
    byOriginalOrder.forEach((_, i) => {
      const [x, y] = pointFor(i, 1);
      svgMarkup += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="#E3D5F6" stroke-width="1"/>`;
    });

    // Polígono de datos (empieza en 0 para animar)
    const dataPointsFinal = byOriginalOrder.map((s, i) => pointFor(i, s.percent / 100));
    const dataPointsZero = byOriginalOrder.map((_, i) => pointFor(i, 0));

    svgMarkup += `<polygon id="radar-data" points="${dataPointsZero.map((p) => p.join(",")).join(" ")}"
        fill="rgba(108,63,191,0.35)" stroke="var(--purple-strong)" stroke-width="2.5"/>`;

    // Puntos + etiquetas
    byOriginalOrder.forEach((s, i) => {
      const [lx, ly] = pointFor(i, 1.22);
      const labelAnchor = lx < center - 5 ? "end" : lx > center + 5 ? "start" : "middle";
      svgMarkup += `<text x="${lx}" y="${ly}" font-size="9" font-family="'Plus Jakarta Sans', sans-serif"
          text-anchor="${labelAnchor}" fill="#4A2C7D" font-weight="600">${s.area.icon} ${wrapLabel(s.area.name)}</text>`;
    });

    svg.innerHTML = svgMarkup;

    // Animar el polígono de datos hacia sus valores reales
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const dataPoly = document.getElementById("radar-data");
        if (dataPoly) {
          dataPoly.style.transition = "all 1s cubic-bezier(.22,.9,.3,1)";
          dataPoly.setAttribute("points", dataPointsFinal.map((p) => p.join(",")).join(" "));
        }
      });
    });
  }

  function wrapLabel(name) {
    // Abrevia nombres largos para que no se encimen en el radar
    const map = {
      "Ciencias": "Ciencias",
      "Humanidades y Sociales": "Humanidades",
      "Arte y Diseño": "Arte",
      "Salud": "Salud",
      "Ingeniería e Informática": "Ingeniería",
      "Economía y Administración": "Economía",
      "Comunicación y Marketing": "Comunicación"
    };
    return map[name] || name;
  }

  /* ----------------------------------------------------------
     11. CELEBRACIÓN SUTIL (estrellas)
     ---------------------------------------------------------- */
  function celebrate() {
    const highlight = $("highlight-main");
    if (!highlight) return;
    const rect = highlight.getBoundingClientRect();
    const stars = ["✦", "✨", "⭐"];
    for (let i = 0; i < 8; i++) {
      const star = document.createElement("span");
      star.className = "celebrate-star";
      star.textContent = stars[i % stars.length];
      star.style.left = rect.left + Math.random() * rect.width + "px";
      star.style.top = rect.top + window.scrollY + Math.random() * rect.height + "px";
      star.style.animationDelay = (i * 0.12) + "s";
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 2000);
    }
  }

  /* ----------------------------------------------------------
     12. BOTONES FINALES
     ---------------------------------------------------------- */
  $("btn-restart").addEventListener("click", () => {
    state.answers = new Array(QUESTIONS.length).fill(null);
    state.currentIndex = 0;
    showScreen("screen-test");
    renderQuestion();
  });

  $("btn-home").addEventListener("click", () => {
    showScreen("screen-intro");
  });

  $("btn-print").addEventListener("click", () => {
    window.print();
  });

  $("btn-share").addEventListener("click", async () => {
    const mainName = $("main-area-name").textContent;
    const mainPct = $("main-area-percent").textContent;
    const text = `Mi resultado del Sistema de Recomendación Vocacional: mi área principal es "${mainName}" con ${mainPct}% de afinidad. ¡Descubre tu camino tú también! ✨`;
    const feedback = $("share-feedback");

    if (navigator.share) {
      try {
        await navigator.share({ title: "Mi perfil vocacional", text });
        feedback.textContent = "¡Compartido!";
      } catch (e) {
        // el usuario canceló, no mostrar error
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        feedback.textContent = "Resumen copiado al portapapeles ✓";
      } catch (e) {
        feedback.textContent = text;
      }
    } else {
      feedback.textContent = text;
    }
    setTimeout(() => { feedback.textContent = ""; }, 4000);
  });

  /* ----------------------------------------------------------
     13. NAVEGACIÓN POR TECLADO EN EL TEST (accesibilidad)
     ---------------------------------------------------------- */
  document.addEventListener("keydown", (e) => {
    if (!$("screen-test").classList.contains("active")) return;
    if (e.key >= "1" && e.key <= "4") {
      const idx = 4 - Number(e.key); // 1->3pts ... 4->0pts, coincide con orden visual
      const opt = OPTIONS[idx];
      if (opt) selectAnswer(opt.value);
    }
  });

})();
