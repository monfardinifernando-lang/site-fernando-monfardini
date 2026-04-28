# Site Fernando Monfardini

Site one-page estático para **Fernando Monfardini** — consultor de Compliance, Governança, LGPD e Gestão de Riscos.

## Estrutura de arquivos

```
/
├── index.html                         ← Página principal
├── css/
│   └── style.css                      ← Estilos (variáveis, layout, responsividade)
├── js/
│   └── main.js                        ← JavaScript (fade-in, nav, artigos)
├── assets/
│   ├── foto-fernando.jpg              ← ⚠️ SUBSTITUIR: foto profissional P&B
│   ├── livro-compliance-futebol.jpg   ← ⚠️ SUBSTITUIR: capa do livro
│   ├── logo-cnf.png                   ← ⚠️ SUBSTITUIR: logo Compliance no Futebol
│   └── monograma-fm.svg               ← Monograma FM (gerado — pode ajustar)
├── CNAME                              ← Domínio customizado para GitHub Pages
└── README.md                          ← Este arquivo
```

## Como publicar no GitHub Pages

1. Crie um repositório público no GitHub (sugestão: `fernandomonfardini`)
2. Faça upload de todos os arquivos desta pasta para o repositório
3. Vá em **Settings → Pages → Branch: main → / (root)**
4. O site estará disponível em `https://seu-usuario.github.io/fernandomonfardini/`
5. Para domínio customizado: aponte o DNS do seu domínio para os IPs do GitHub Pages e o arquivo `CNAME` já está configurado

## Substituição de imagens

| Arquivo | Especificações recomendadas |
|---|---|
| `assets/foto-fernando.jpg` | Retrato, 600×600px ou maior, fundo neutro. O CSS aplica filtro P&B automaticamente. |
| `assets/livro-compliance-futebol.jpg` | Capa do livro, mínimo 400px de largura |
| `assets/logo-cnf.png` | Logo da vertical, fundo transparente (PNG), mínimo 280px |

## Adicionando artigos / links de mídia

Abra `js/main.js` e edite o array `artigos` no início do arquivo:

```js
const artigos = [
  {
    titulo: "Título do artigo",
    fonte: "Nome da publicação",
    url: "https://link-do-artigo.com",
    data: "2025-03-15"   // formato YYYY-MM-DD
  },
  // adicione mais objetos aqui...
];
```

## Atualização de e-mail de contato

No `index.html`, procure por `mailto:contato@fernandomonfardini.com.br` e substitua pelo e-mail correto.

## Dependências externas (CDN)

- **Google Fonts** — Lora + Poppins
- **Lucide Icons** — ícones minimalistas

Nenhuma dependência de build. O site funciona abrindo `index.html` diretamente no navegador.
