# LP Integração Morada.ai + CV · MKT-713

Landing page da integração oficial Morada.ai + CV (API CVIO v1): 5 rolagens, celular com a conversa da MIA animada, orbe com o ícone 3D da Morada e livro do guia folheando. Destino dos mails de 28/09 e 30/09 e das campanhas `utm_campaign=cv-aracaju`.

HTML estático, sem build. Abre com duplo clique no `index.html` ou pelo servidor local:

```powershell
powershell -ExecutionPolicy Bypass -File servir-local.ps1
```

| Arquivo | O que é |
|---|---|
| `index.html` | A LP inteira (5 rolagens) |
| `celular-mia.html` | Só o celular animado, separado (`?fundo=verde` para chroma) |
| `assets/` | Marca, logo do CV, componentes do celular e do livro, fotos e vídeo do ícone |
| `_preview/` | Capturas de revisão |
| `_referencias/` | Briefing visual: referências, vídeos originais e prints |

Pendências para publicar (GUID do formulário HubSpot, PDF do guia, og:image absoluta, gatilhos do GTM) e o detalhe de cada parte estão no **[LEIA-ME.md](LEIA-ME.md)**.

Revisão rápida da conversa: `index.html?mia=19` abre o celular no segundo 19, logo antes do flip.
