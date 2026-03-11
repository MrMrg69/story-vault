# 📚 My Story Vault (Mini-Biblioteca de Entretenimento)

> Um **hub pessoal** para rastrear, organizar e compartilhar sua coleção de filmes, séries, animes, livros, manhwas, mangás e jogos — com controle de progresso, avaliações, comentários e muito mais.

![Nuxt 3](https://img.shields.io/badge/Nuxt-3-black?logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3-green?logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css)
![Headless UI](https://img.shields.io/badge/Headless%20UI-6B46C1?logo=vue.js)

---

## 🎯 O que é?

Este projeto é uma aplicação **pessoal (e Open Source)** para centralizar sua jornada de entretenimento:

- ✅ Controle de progresso (ex: S2E12, capítulo 45, página 320, etc.)  
- ⭐ Avaliação por estrelas  
- 📝 Notas pessoais e recomendações  
- 🎮 Indicação de jogos "platinados"  
- 📺 Onde foi consumido (Netflix, Crunchyroll, editora, Steam...)  
- 📊 Estatísticas rápidas (ex: 12 séries assistidas, 8 concluídas...)  
- 🌙 Interface moderna, limpa e responsiva  

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|-------|------------|
| Framework | [Nuxt 3](https://nuxt.com/) (Vue 3 + SSR/SSG/SPA) |
| UI | [Tailwind CSS](https://tailwindcss.com/) + [Headless UI Vue](https://headlessui.dev/vue/menu) |
| Estado | [Pinia](https://pinia.vuejs.org/) |
| Tipagem | TypeScript 5+ |
| Ícones | [Heroicons](https://heroicons.com/) |
| Estilização | `@nuxtjs/tailwindcss` com custom classes |

---

## 🚀 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/MrMrg69/story-vault.git
cd story-vault

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Abra o ambiente local no navegador
http://localhost:3000/library
```

---

## 📁 Estrutura do Projeto

```text
app.vue
pages/
├── library/
│   └── index.vue
│       └── [type]
│           └── index.vue 
├── index.vue
components/
├── ui/
│   ├── Button.vue
│   ├── Rating.vue
│   └── Modal.vue
├── items/
│   ├── ItemCard.vue
├── layout/
│   ├── Navbar.vue
│   └── Sidebar.vue
stores/
└── items.ts
types/
└── items.ts
composables/
└── useItems.ts
assets/
└── css/
│   └── tailwind.css
nuxt.config.ts
```

---

## 📥 Como usar

1. Adicionar um novo item
Clique em "Adicionar Novo"
Preencha título, tipo, status e detalhes (progresso, avaliação, onde consumiu, etc.)
Jogos: marque ✅ "Jogo platinado"

2. Gerenciar progresso
Séries/animes: ajuste temporada e episódio
Livros/mangás: atualize capítulo ou página
Avalie com clicar nas estrelas (1–5)

3. Ver estatísticas
Total de itens
Quantos assistidos/lidos/concluídos
Em progresso atualmente

```💡 Funcionalidades futuras: gráficos, exportação CSV/PDF, importação por JSON.```

---

## 🎨 Personalização

| Recurso | Suportado |
|--------|-----------|
| Tipos de mídia | `movie`, `series`, `anime`, `book`, `manhwa`, `manga`, `game` |
| Status | `planning`, `watching`, `reading`, `completed`, `dropped` |
| Avaliação | Estrelas clicáveis (1–5) |
| Notas | Sim (textarea) |
| Local consumido | Sim (`where`) |
| Jogo platinado | Sim (checkbox para `game`) |

---

## 📄 Exemplo de dados

```ts
{
  id: '1',
  title: 'Breaking Bad',
  type: 'series',
  status: 'watching',
  progress: { season: 2, episode: 4 },
  rating: 5,
  notes: 'Excelente desenvolvimento do Walter',
  where: 'Netflix',
  coverImage: '/images/breaking-bad.jpg',
  createdAt: '2024-04-05T10:00:00Z'
}
```