# LP Integração Morada.ai + CV (MKT-713)

Página estática, sem build: `index.html` + `assets/`. Abre direto no navegador (duplo clique) ou sobe como está no servidor/WordPress.

```
lp-morada-cv/
├── index.html              ← página inteira (CSS e JS embutidos)
├── celular-mia.html        ← só o celular animado, separado da LP (para ver ou gravar a tela)
├── assets/
│   ├── mia-phone.css/.js   ← componente do celular (usado pela LP e pelo celular-mia.html)
│   ├── mia/foto-*.jpg      ← as 3 fotos do empreendimento, tiradas do vídeo "CONVERSA MIA"
│   ├── mia/morada-icone.*  ← ícone 3D do orbe (rolagem 02): MP4 em loop + capa JPG
│   ├── guia-livro.css/.js  ← livro 3D do guia (rolagem 05) com animação folheando
│   ├── marca-morada.svg    ← vetor oficial (branco + círculo royal)
│   ├── cv-logo.svg         ← logo oficial branco do CV (cvcrm.com.br)
│   ├── favicon.svg         ← símbolo A
│   └── og-morada-cv.png    ← imagem de compartilhamento 1200x630
└── LEIA-ME.md
```

## Livro do guia (rolagem 05)

E-book 3D de 400×526 px com espessura, bloco de páginas visível, lombada e sombra no chão. Capa: Morada.ai + CV, selo E-BOOK, título, subtítulo e o ícone 3D da Morada como arte.

Quando a rolagem aparece, o livro abre e desliza para o centro, passa 5 folhas (sumário → capítulos 01 a 04 → "Obrigado pela leitura"), volta as folhas e fecha na capa (~4 s). Repete a cada ~7 s enquanto estiver na tela, pausa fora dela e fica fechado com "reduzir movimento".

**O miolo é ilustrativo** (títulos dos capítulos + linhas no lugar do texto). Quando o PDF final existir, dá para trocar as páginas por miniaturas reais do guia em `PAGES`, no `guia-livro.js`.

## Fundo

Quatro manchas de luz azul muito desfocadas (azul, royal, anil e ciano) passeiam devagar atrás da página inteira (`.aurora`, 26–36 s por ciclo). Só usa `transform`, sem filtro de blur, para não pesar no celular. Com "reduzir movimento" fica parado.

## Orbe da rolagem 02

O centro do hub usa o vídeo `MORADA ICONE.mp4` recortado na esfera, sem áudio, 600×600, 1 MB.
O original tem 20 s e o fim não encaixa no começo; o quadro de 17,75 s é praticamente igual ao primeiro,
então o loop corta ali e emenda sem pulo. O vídeo só carrega quando a rolagem chega perto da tela,
pausa fora dela e, com "reduzir movimento", fica parado na capa. O selo AI ⇄ CV fica acima do orbe.

## Celular da MIA

Réplica em código do vídeo `CONVERSA MIA.mp4`: mesmas 16 mensagens (Carla + MIA), mesmos horários, fotos e ritmo (loop de 47 s), no WhatsApp escuro com as cores tiradas do vídeo.

- **Flip 360°** acontece uma vez, no meio da conversa: logo depois de "Um instante ✨", enquanto a MIA procura o imóvel. O aparelho tem espessura de celular real (28 px, proporção de 8,25 mm em 70,6 mm), lateral contornando os cantos arredondados, botões de ação/volume/lateral e luz que muda conforme o ângulo. No giro ele se aproxima e inclina levemente, como um objeto de verdade. O verso tem câmera e o símbolo da Morada.
- **Órbita animada**: dois cometas de luz correm pela linha, passando por trás do aparelho em cima e pela frente embaixo.
- **Card do CV** fica separado do celular e se atualiza junto com a conversa: Em atendimento → Qualificado → Visita agendada (amanhã, 17:30, Rafael), com o contador de mensagens no Comunicador.
- A animação pausa quando o celular sai da tela ou a aba fica oculta. Com "reduzir movimento" ligado no sistema, mostra a conversa pronta, sem flip.
- As fotos tinham uma marca d'água do gerador no canto inferior direito; o rodapé delas foi recortado para tirá-la.
- **Revisão:** `?mia=24` abre a conversa já no segundo 24 (funciona na LP e no `celular-mia.html`).
- `celular-mia.html?fundo=preto` ou `?fundo=verde` troca o fundo (verde para chroma na edição).

## As 5 rolagens

| # | Âncora | Conteúdo | Referência seguida |
|---|--------|----------|--------------------|
| 01 | `#inicio` | Hero: proposta + CTA do guia + WhatsApp. Celular com a conversa animada da MIA (vídeo CONVERSA MIA), card do lead no CV ao lado e o "A" em linha gigante sangrando o fundo | LANDING PAGE BASE (hero) |
| 02 | `#integracao` | O que é: API oficial CVIO v1, 100% bidirecional, tempo real, sem intermediários, em hub com orbe central Morada ⇄ CV | MODELO E COR + INTEGRACAO |
| 03 | `#beneficios` | Os 4 benefícios, texto do briefing sem alteração (só o ponto duplo em "timeline.." virou um). Destaque azul acompanha o hover | LANDING PAGE BASE (cards) |
| 04 | `#como-funciona` | 3 fluxos: MIA qualifica → handoff no Comunicador Oficial do CV → pós-visita com NPS automático | LANDING PAGE BASE (curva) |
| 05 | `#guia` | Formulário do guia (HubSpot) + CTA final "falar com a MIA no WhatsApp" + rodapé | — |

Os dados na interface (Carla, Rafael, NPS 9) são **ilustrativos**.

## Pendências antes de publicar

Tudo se ajusta no bloco `LP_CONFIG`, no começo do `<script>` do `index.html`.

1. **Formulário no HubSpot**: criar o formulário "Guia Morada + CV" no portal `41468942` e colar o GUID em `HUBSPOT_FORM_ID`.
   Enquanto estiver vazio, o envio é **simulado** e nenhum dado sai da página.
   O formulário precisa ter estes campos (os `morada_last_touch_*` ficam ocultos, iguais ao formulário do WhatsApp da home):
   `firstname`, `email`, `phone`, `company`, `morada_last_touch_channel`, `morada_last_touch_conversion_point`,
   `morada_last_touch_datetime`, `morada_last_touch_landing_url`, `morada_last_touch_utm_referrer`,
   `morada_last_touch_utm_source`, `…_utm_medium`, `…_utm_campaign`, `…_utm_content`, `…_utm_term`.
   Valores enviados: canal `LP Integração CV` e ponto de conversão `lp_cv_guia_download`. Se `morada_last_touch_channel` for lista suspensa no HubSpot, cadastrar a opção ou trocar em `CANAL`.
2. **PDF do guia**: salvar como `assets/guia-boas-praticas-morada-cv.pdf` ou trocar `GUIA_URL`. Conferir o texto de apoio da rolagem 5 contra o conteúdo real do PDF.
3. **`og:image`**: depois de definir o endereço da página, trocar por URL absoluta (ex.: `https://morada.ai/integracao-cv/assets/og-morada-cv.png`).
4. **Rastreio (seg 28)**: GTM `GTM-WKLLFZGF` e HubSpot só carregam em `*.morada.ai` e não duplicam se o tema já carregar. Eventos no `dataLayer` para gatilhos de pixel/conversão:

   | Evento | Quando | Parâmetros |
   |--------|--------|------------|
   | `lp_cv_guia_submit` | envio do formulário (conversão) | `envio` (`ok`/`simulado`/`erro_*`), `utm_*` |
   | `lp_cv_whatsapp_click` | qualquer botão da MIA | `cta_posicao` (hero, como-funciona, form-sucesso, cta-final, mobile-fixo) |
   | `lp_cv_cta_click` | botões que levam ao guia | `cta_posicao` |
   | `lp_cv_guia_erro` | HubSpot recusou ou falha de rede | `status` |

   Se o HubSpot recusar o envio, o guia é liberado mesmo assim e o erro aparece no console e no evento acima.

## UTMs

`utm_campaign=cv-aracaju` é o padrão do briefing. A página guarda as UTMs por 30 min na sessão (mesmas chaves do morada.ai) e, se o acesso vier sem `utm_campaign`, envia `cv-aracaju`.
Sugestão de links (confirmar source/medium com o padrão do time):

- Mail seg 28/09: `?utm_source=email&utm_medium=email&utm_campaign=cv-aracaju&utm_content=mail-2809`
- Mail qua 30/09: `?utm_source=email&utm_medium=email&utm_campaign=cv-aracaju&utm_content=mail-3009`

## WhatsApp da MIA

Mesmo número do site (`5531980265682`), com mensagem pré-preenchida (`WHATSAPP_TEXT`).
Se a página for publicada dentro do tema do morada.ai, o script do rodapé do tema intercepta links `wa.me` e abre o modal de captura (nome + telefone) antes do WhatsApp. Se o objetivo for ir direto, a página precisa ficar fora desse rodapé.

## Técnico

- Fontes: Outfit + Lato pelo Google Fonts.
- Responsivo testado em 1440 e 390 px, sem rolagem lateral. No celular a curva da rolagem 04 sai (os 3 passos seguem em texto) e aparece a barra fixa "Baixar o guia" + WhatsApp entre o hero e o formulário.
- Animações pausam quando a rolagem sai da tela e respeitam "reduzir movimento" do sistema.
