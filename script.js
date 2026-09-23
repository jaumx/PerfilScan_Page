/* =========================================================
   PerfilScan — Landing page
   Tudo que você costuma editar está neste bloco de CONFIG.
   ========================================================= */
const CONFIG = {
  // Para onde vão os pedidos do formulário (via FormSubmit.co).
  // No PRIMEIRO envio o FormSubmit manda um e-mail de ativação para
  // este endereço — clique em "Activate" e a partir daí tudo chega.
  EMAIL_DESTINO: "perfilscan@gmail.com",

  // Número com DDI + DDD, só dígitos. Ex.: "5511999998888".
  // Vazio = o botão flutuante do WhatsApp fica escondido.
  WHATSAPP_NUMERO: "",

  // Mude para true depois de salvar as fotos em assets/img/nichos/
  // (imobiliaria.jpg, restaurante.jpg, hamburgueria.jpg, estetica.jpg,
  //  petshop.jpg, cafeteria.jpg, cosmeticos.jpg, criador.jpg).
  FOTOS_NICHOS: false,
};

// Depoimentos de EXEMPLO. Troque pelos reais quando tiver.
const DEPOIMENTOS = [
  { nome: "Imobiliária", nicho: "Imobiliária · SP", texto: "Descobri por que meus posts de imóveis não geravam contato. Mudei a bio e o direct começou a tocar." },
  { nome: "Pizzaria", nicho: "Pizzaria · delivery", texto: "O plano de 5 meses é muito claro. Sei exatamente o que postar em cada semana." },
  { nome: "Estética", nicho: "Clínica de estética", texto: "A bio refinada sozinha já valeu. Ficou profissional e passou confiança." },
  { nome: "Pet shop", nicho: "Pet shop de bairro", texto: "Nunca imaginei que um relatório do Instagram fosse tão visual. Parece um painel de empresa grande." },
  { nome: "Cafeteria", nicho: "Cafeteria", texto: "Os 3 posts prontos me tiraram do bloqueio criativo. Postei no mesmo dia." },
  { nome: "Criador", nicho: "Criador de conteúdo", texto: "O raio-X mostrou que meu perfil passava a mensagem errada. Agora está alinhado com o que vendo." },
  { nome: "Hamburgueria", nicho: "Hamburgueria smash", texto: "Entendi onde vale pagar anúncio e onde dá para crescer no orgânico. Economizei." },
];

// Legenda de cada página do relatório (visualizador "O que você recebe").
const PAGINAS = [
  { t: "Diagnóstico", d: "Nota geral do perfil, números reais, identidade visual detectada e como seu perfil é percebido à primeira vista." },
  { t: "Raio-X de percepção", d: "Hoje × potencial em 5 dimensões, com radar e notas — o que já funciona e o que está travando seu crescimento." },
  { t: "Estratégia", d: "Ajustes no perfil, o que os perfis referência do seu nicho fazem, a bio refinada e o plano de crescimento de 5 meses." },
  { t: "Conteúdo", d: "Seu próximo post ideal: ideia, legenda, CTA e capa sugerida, pronto para publicar." },
  { t: "Crescimento", d: "Pago × orgânico: onde investir, quanto, e como engajar sem gastar." },
  { t: "Plano de ação", d: "Partindo para a prática: 5 passos objetivos e as ferramentas para executar tudo." },
];

document.documentElement.classList.remove("no-js");
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Ano no rodapé ---------- */
$("#ano").textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
const toggle = $("#navToggle");
const menu = $("#menu");
toggle.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", aberto);
});
$$("#menu a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

/* ---------- Ticker de depoimentos ---------- */
(function montarTicker() {
  const track = $("#tickerTrack");
  const card = d => `
    <figure class="quote">
      <span class="quote-av" aria-hidden="true">${d.nome[0]}</span>
      <figcaption>
        <span class="stars" aria-label="5 estrelas">★★★★★</span>
        <p>“${d.texto}”</p>
        <small>${d.nicho}</small>
      </figcaption>
    </figure>`;
  const html = DEPOIMENTOS.map(card).join("");
  // duplicado para o loop infinito ficar contínuo
  track.innerHTML = html + html.replace(/<figure class="quote">/g, '<figure class="quote" aria-hidden="true">');
})();

/* ---------- Revelar ao rolar ---------- */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
  : null;
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io ? io.observe(el) : el.classList.add("in");
});

/* ---------- Contadores do hero ---------- */
$$("[data-count]").forEach(el => {
  const alvo = +el.dataset.count;
  let n = 0;
  el.textContent = "0";
  const passo = () => {
    n++;
    el.textContent = n;
    if (n < alvo) setTimeout(passo, 900 / alvo);
  };
  setTimeout(passo, 500);
});

/* ---------- Fotos dos nichos (só aplica se o arquivo existir) ---------- */
if (CONFIG.FOTOS_NICHOS) $$(".niche[data-img]").forEach(card => {
  const src = `assets/img/nichos/${card.dataset.img}`;
  const img = new Image();
  img.onload = () => card.style.setProperty("--niche-img", `url("${src}")`);
  img.src = src;
});

/* ---------- Visualizador do relatório ---------- */
(function visualizador() {
  const tabs = $$("#tabs button");
  const img = $("#viewerImg");
  let atual = 0;

  function mostrar(i) {
    atual = (i + PAGINAS.length) % PAGINAS.length;
    tabs.forEach((t, k) => t.setAttribute("aria-selected", k === atual));
    tabs[atual].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    img.classList.add("swap");
    setTimeout(() => {
      img.src = `assets/img/relatorio-p${atual + 1}.jpg`;
      img.alt = `Página ${atual + 1} — ${PAGINAS[atual].t}`;
      img.onload = () => img.classList.remove("swap");
    }, 180);
    $("#viewerNum").textContent = `0${atual + 1} / 06`;
    $("#viewerTitle").textContent = PAGINAS[atual].t;
    $("#viewerText").textContent = PAGINAS[atual].d;
  }

  tabs.forEach(t => t.addEventListener("click", () => mostrar(+t.dataset.i)));
  $("#prevPg").addEventListener("click", () => mostrar(atual - 1));
  $("#nextPg").addEventListener("click", () => mostrar(atual + 1));

  // arrastar com o dedo no celular
  let x0 = null;
  img.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  img.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) mostrar(atual + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // pré-carrega as páginas
  PAGINAS.forEach((_, k) => { new Image().src = `assets/img/relatorio-p${k + 1}.jpg`; });

  // lightbox
  const lb = $("#lightbox");
  const abrir = src => { $("#lbImg").src = src; lb.hidden = false; document.body.style.overflow = "hidden"; };
  const fechar = () => { lb.hidden = true; document.body.style.overflow = ""; };
  $("#viewerOpen").addEventListener("click", () => abrir(img.src));
  lb.addEventListener("click", fechar);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") fechar();
    if (!lb.hidden) return;
    const noViewer = document.activeElement && document.activeElement.closest(".viewer, #tabs");
    if (noViewer && e.key === "ArrowRight") mostrar(atual + 1);
    if (noViewer && e.key === "ArrowLeft") mostrar(atual - 1);
  });
})();

/* ---------- Botões que já escolhem o plano no formulário ---------- */
$$("[data-plano]").forEach(btn => btn.addEventListener("click", () => {
  const valor = btn.dataset.plano === "amostra" ? "Amostra grátis" : "Auditoria completa";
  const radio = $(`input[name="plano"][value="${valor}"]`);
  if (radio) radio.checked = true;
}));

/* ---------- Chips (público / objetivo) ---------- */
$$(".chips").forEach(grupo => {
  const unico = grupo.hasAttribute("data-single");
  $$(".chip", grupo).forEach(chip => {
    chip.setAttribute("aria-pressed", "false");
    chip.addEventListener("click", () => {
      const ligado = chip.getAttribute("aria-pressed") === "true";
      if (unico) $$(".chip", grupo).forEach(c => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", String(!ligado));
      grupo.classList.remove("invalid");
    });
  });
});
const chipsMarcados = nome =>
  $$(`.chips[data-name="${nome}"] .chip[aria-pressed="true"]`).map(c => c.textContent.trim());

/* ---------- Máscara do WhatsApp ---------- */
$("#f-wpp").addEventListener("input", e => {
  let d = e.target.value.replace(/\D/g, "").slice(0, 11);
  if (d.length > 6) d = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  else if (d.length > 2) d = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  e.target.value = d;
});

/* ---------- Normaliza o @ (aceita link inteiro) ---------- */
function limparInsta(v) {
  v = v.trim();
  const m = v.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
  if (m) return m[1];
  return v.replace(/^@/, "").replace(/\/+$/, "");
}

/* ---------- WhatsApp ---------- */
const wppLink = texto =>
  `https://wa.me/${CONFIG.WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
if (CONFIG.WHATSAPP_NUMERO) {
  const f = $("#wppFloat");
  f.href = wppLink("Olá! Vim pelo site e quero saber mais sobre a auditoria PerfilScan.");
  f.hidden = false;
}

/* ---------- Envio do formulário (FormSubmit → e-mail) ---------- */
const form = $("#leadForm");
const status = $("#formStatus");
const btn = $("#submitBtn");

form.addEventListener("submit", async e => {
  e.preventDefault();
  status.textContent = "";
  status.className = "form-status";

  // validação
  let ok = true;
  ["#f-nome", "#f-wpp", "#f-insta"].forEach(sel => {
    const el = $(sel);
    const vazio = !el.value.trim() || (sel === "#f-wpp" && el.value.replace(/\D/g, "").length < 10);
    el.classList.toggle("invalid", vazio);
    if (vazio) ok = false;
  });
  const email = $("#f-email");
  const emailRuim = email.value.trim() && !email.checkValidity();
  email.classList.toggle("invalid", !!emailRuim);
  if (emailRuim) ok = false;

  const objetivos = chipsMarcados("objetivo");
  if (!objetivos.length) { $('.chips[data-name="objetivo"]').classList.add("invalid"); ok = false; }

  if (!ok) {
    status.textContent = "Confira os campos destacados e escolha pelo menos um objetivo.";
    status.classList.add("error");
    const primeiro = $(".invalid", form);
    if (primeiro) primeiro.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  if (form._honey.value) return; // robô

  const insta = limparInsta($("#f-insta").value);
  const dados = {
    Plano: form.plano.value,
    Nome: $("#f-nome").value.trim(),
    WhatsApp: $("#f-wpp").value.trim(),
    Email: email.value.trim() || "—",
    Instagram: `https://www.instagram.com/${insta}/`,
    "Público-alvo": chipsMarcados("publico").join(", ") || "—",
    "Objetivo da análise": objetivos.join(", "),
    Mensagem: $("#f-msg").value.trim() || "—",
    _subject: `🔍 Novo pedido PerfilScan: @${insta} (${form.plano.value})`,
    _template: "table",
    _captcha: "false",
  };
  if (dados.Email !== "—") dados._replyto = dados.Email;

  btn.classList.add("loading");
  $(".btn-label", btn).textContent = "Enviando…";

  try {
    const r = await fetch(`https://formsubmit.co/ajax/${CONFIG.EMAIL_DESTINO}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(dados),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || String(j.success) === "false") throw new Error(j.message || "Falha no envio");

    form.hidden = true;
    $("#formSuccess").hidden = false;
    $("#formSuccess").scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (err) {
    const resumo = Object.entries(dados)
      .filter(([k]) => !k.startsWith("_"))
      .map(([k, v]) => `${k}: ${v}`).join("\n");
    const alt = CONFIG.WHATSAPP_NUMERO
      ? `<a href="${wppLink("Quero minha auditoria PerfilScan!\n\n" + resumo)}" target="_blank" rel="noopener">enviar pelo WhatsApp</a>`
      : `<a href="mailto:${CONFIG.EMAIL_DESTINO}?subject=${encodeURIComponent(dados._subject)}&body=${encodeURIComponent(resumo)}">enviar por e-mail</a>`;
    status.innerHTML = `Não conseguimos enviar agora. Tente de novo ou ${alt}.`;
    status.classList.add("error");
  } finally {
    btn.classList.remove("loading");
    $(".btn-label", btn).textContent = "Quero minha auditoria";
  }
});
