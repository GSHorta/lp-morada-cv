# Resumo da conversa · LP Integração Morada.ai + CV (MKT-713)

Sessão de 24/09/2026 entre Gilmar Horta e Claude (Claude Code). Registro do que foi pedido, decidido e entregue.

## Ponto de partida

- **Issue:** [MKT-713](https://linear.app/morada/issue/MKT-713/landing-page-da-integracao-moradaai-cv-henrique-ferreira), responsável Henrique Ferreira. Página com o contexto da integração Morada.ai + CV e o download do guia de boas práticas. É o destino dos mails de 28/09 e 30/09 e das campanhas (`utm_campaign=cv-aracaju`). Prazo: no ar até sex 25/09.
- **Pedido:** LP com **5 rolagens**, usando os 4 benefícios de quem usa Morada + CV (texto aprovado, entrou literal).
- **Referências visuais** na pasta, tratadas como briefing:
  - `LANDING PAGE BASE.jpg`: esqueleto das rolagens 1, 3 e 4 (hero com celular, painel de cards, curva com cards)
  - `LANDING PAGE MODELO E COR.jpg`: paleta navy e orbe azul com 4 cards (rolagem 2)
  - `INTEGRACAO.jpg`: o hub da integração

## As 5 rolagens

| # | Rolagem | Conteúdo |
|---|---------|----------|
| 01 | Início | "O corretor começa **do meio,** não do zero.", CTA do guia + WhatsApp, 3 números (CVIO v1 · 100% bidirecional · tempo real), celular animado e card do CV |
| 02 | A integração | API oficial, 100% bidirecional, tempo real, sem intermediários, ao redor do orbe com o ícone 3D da Morada |
| 03 | Benefícios | Os 4 benefícios do briefing; o destaque azul segue o mouse |
| 04 | Como funciona | 3 fluxos: MIA qualifica → handoff no Comunicador do CV → pós-visita com NPS |
| 05 | Guia | Livro 3D folheando + formulário (HubSpot) + CTA final "Converse com a MIA" + rodapé |

Marca Morada e logo do CV vieram dos vetores oficiais (nunca gerados por IA). Fontes: Outfit + Lato.

## Rodadas de ajuste

1. **Primeira versão:** as 5 rolagens, desktop e celular, formulário com UTMs e eventos no `dataLayer`, LEIA-ME de publicação.
2. **Celular separado e animado:**
   - A conversa ficou igual ao vídeo `CONVERSA MIA.mp4` (Carla × MIA, 16 mensagens, 3 fotos, loop de 47 s), com as cores do WhatsApp tiradas do vídeo.
   - **Flip 360° só no meio**, logo depois de "Um instante ✨", e a órbita em volta do aparelho ficou animada.
   - Virou componente próprio (`assets/mia-phone.*`) e ganhou a tela separada `celular-mia.html`.
   - O card do CV saiu de dentro do celular e se atualiza junto com a conversa.
   - As fotos tinham marca d'água do gerador; o rodapé foi recortado.
3. **"A" em linha:**
   - Pedido: grande, estourando o fundo e cortado em cima.
   - Depois corrigido: **da esquerda à direita pegando a tela toda**. A órbita voltou para o centro do aparelho.
4. **Orbe da rolagem 02:**
   - Recebeu o vídeo `MORADA ICONE.mp4` em loop. O fim do vídeo não encaixa no começo, então o corte foi aos 17,75 s para emendar sem pulo.
   - O selo AI ⇄ CV foi para cima do orbe. Também foi corrigido o anel do orbe, que estava desalinhado.
5. **Celular realista e fundo:**
   - O giro parecia "celular de papel". Agora o aparelho tem espessura real (28 px, proporção de 8,25 mm em 70,6 mm), lateral contornando os cantos arredondados e botões.
   - O fundo da página ganhou movimento: manchas azuis desfocadas passeando ("blue total blur color abstract").
6. **Livro do guia:**
   - Maior (400×526) e com capa mais convincente: Morada.ai + CV, selo E-BOOK e ícone 3D.
   - Ganhou a **animação folheando**: abre, passa 5 folhas, volta e fecha na capa.
   - Depois foi **acelerado** (ciclo de ~4,2 s, repetindo a cada ~7 s). Foi corrigida a página que aparecia por cima do menu fixo.
7. **Fechamento:**
   - Pacote `.zip` na pasta e repositório privado no GitHub.
   - Pedido de transferir para a Morada: não foi possível (ver pendências).

## Onde está

- **Projeto:** `Downloads/LANDING PAGE/lp-morada-cv/` (abrir `index.html` ou rodar `servir-local.ps1`)
- **Pacote:** `Downloads/LANDING PAGE/LP-MORADA-CV_MKT-713_2026-09-24.zip`
- **GitHub:** https://github.com/GSHorta/lp-morada-cv (privado, branch `main`)
- **Detalhes técnicos e pendências de publicação:** `LEIA-ME.md`

Atalhos de revisão: `index.html?mia=19` abre a conversa pouco antes do flip; `celular-mia.html?fundo=verde` deixa o celular em fundo chroma.

## Pendências

- [ ] **Formulário HubSpot:** criar o formulário do guia no portal `41468942` e colar o GUID em `LP_CONFIG.HUBSPOT_FORM_ID`. Enquanto isso, o envio é simulado e nenhum lead chega.
- [ ] **PDF do guia:** salvar em `assets/guia-boas-praticas-morada-cv.pdf` e conferir o texto da rolagem 05. Dá para trocar o miolo ilustrativo do livro por páginas reais.
- [ ] **`og:image`:** trocar por URL absoluta quando o endereço da página estiver definido.
- [ ] **Rastreio:** criar no GTM os gatilhos dos eventos `lp_cv_guia_submit`, `lp_cv_whatsapp_click`, `lp_cv_cta_click` e `lp_cv_guia_erro`.
- [ ] **WhatsApp no tema:** se a LP for publicada dentro do tema do morada.ai, o rodapé do tema intercepta o link `wa.me` e abre o modal de captura.
- [ ] **Transferir o repositório para a Morada:** a conta GSHorta não participa de nenhuma organização. Existe a organização `morada-ai` no GitHub; um admin dela precisa adicionar GSHorta com permissão de criar repositórios. Depois disso a transferência sai em um comando. Outra opção: o admin cria o repositório e você dá o push.
