# Landing page — PerfilScan

HTML + CSS + JavaScript puros. Sem build, sem dependências.

```
landing-page/
├── index.html      estrutura e textos
├── styles.css      visual (cores da marca em :root)
├── script.js       CONFIG, depoimentos, formulário
└── assets/img/     logo, avatar e páginas reais do relatório
```

## Ver no PC

Abra `index.html` direto no navegador, ou sirva a pasta:

```bash
python -m http.server 8765
```

## Formulário → e-mail

O envio usa o [FormSubmit](https://formsubmit.co) (grátis, sem backend).
**No primeiro envio** chega um e-mail de ativação em `perfilscan@gmail.com`:
clique em **Activate Form**. Depois disso, cada pedido chega como uma tabela
no e-mail, com assunto `🔍 Novo pedido PerfilScan: @perfil (plano)`.

## O que editar em `script.js` → `CONFIG`

| Chave | O que faz |
|---|---|
| `EMAIL_DESTINO` | Para onde vão os pedidos |
| `WHATSAPP_NUMERO` | Ex.: `5511999998888`. Preenchido, aparece o botão flutuante do WhatsApp |
| `FOTOS_NICHOS` | `true` depois de salvar as fotos dos nichos (abaixo) |

`DEPOIMENTOS` (mesmo arquivo) são **exemplos** — troque pelos reais.

## Fotos

- **Nichos:** salve em `assets/img/nichos/` com os nomes
  `imobiliaria.jpg`, `restaurante.jpg`, `hamburgueria.jpg`, `estetica.jpg`,
  `petshop.jpg`, `cafeteria.jpg`, `cosmeticos.jpg`, `criador.jpg`
  e ligue `FOTOS_NICHOS`. Sem foto, o card fica no gradiente da marca.
- **Ícone do Instagram:** no `index.html`, seção `#instagram`, troque o `<svg>`
  pelo `<img src="assets/img/instagram.png">` (há um comentário no lugar).
- **Relatório:** `relatorio-p1.jpg` … `p6.jpg` são prints da auditoria do
  próprio @perfilscan. Para regerar, abra o HTML da auditoria e tire um print
  de cada `.page`.

## Preço

No `index.html`, plano "Auditoria completa", troque `Sob consulta` pelo valor.

## GitHub Pages

Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`.
O site fica em `https://perfilscan.github.io/perfilscan-lading-page/` (Pages em repositório privado exige plano pago da organização).
