# 🤖 RAG Agent for Startups - Portfolio Project

Este es un proyecto de demostración de un **Agente RAG (Retrieval-Augmented Generation)** avanzado, diseñado para asesorar a fundadores de startups combinando dos fuentes de conocimiento críticas: **Estrategia/Filosofía de Crecimiento** y **Normativa Legal Chilena**.

Construido sobre la última versión de **Next.js 16 (App Router)** y **LangChain.js**, este proyecto destaca una arquitectura moderna, limpia y Serverless-ready.

![Project Preview](/project-preview.png) _(Reemplazar con captura si disponible)_

## 🚀 Características Principales

### 🧠 Agente Híbrido Inteligente

El agente no solo "charla", sino que consulta una base de conocimiento vectorial en tiempo real para responder con precisión:

- **Filosofía YCombinator**: Indexación de ensayos clave de **Paul Graham** sobre crecimiento, errores de startups y generación de ideas.
- **Legal Tech Chile**: Integración con la guía oficial de **"Tu Empresa en un Día" (ChileAtiende)**, permitiendo responder dudas sobre constitución de sociedades, costos y trámites en Chile.

### 🏗️ Arquitectura Moderna (Next.js 16)

- **100% Server Actions**: Toda la lógica del agente y la comunicación con OpenAI ocurre en el servidor (`src/app/actions/chat.ts`), sin exponer API Routes ni keys en el cliente.
- **App Router & Server Components**: Aprovecha el rendimiento de React Server Components (RSC). La Landing Page es estática/SSR, mientras el Chat es interactivo.

### 🎨 UI/UX Premium

- **Material UI (MUI v6)**: Diseño minimalista y profesional.
- **Integración Fluida**: Context API (`ChatContext`) maneja la interacción entre la Landing Page y el Widget de Chat flotante.
- **Hydration Safe**: Configuración robusta de estilos CSS-in-JS compatible con SSR (`AppRouterCacheProvider`).

### 💾 Vector Store Personalizado

- Implementación de un **Vector Store en Memoria** (`SimpleMemoryVectorStore`) escrito en TypeScript puro.
- Resuelve problemas de compilación nativa en entornos Windows y Serverless típicos de otras librerías vectores (HNSWLib, etc.), ideal para demos y prototipos rápidos.

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **IA & RAG**: [LangChain.js](https://js.langchain.com/), [OpenAI API](https://openai.com/) (GPT-3.5/4)
- **Vectores & Embeddings**: OpenAI Embeddings, Custom In-Memory Store
- **Scraping**: [Cheerio](https://cheerio.js.org/) (para ingestión de ensayos y normativa)
- **Estilos**: [Material UI](https://mui.com/) (Emotion)
- **Lenguaje**: TypeScript

## 📂 Estructura del Proyecto

```bash
src/
├── app/
│   ├── actions/       # Server Actions (Backend Logic)
│   │   └── chat.ts    # Entry point del chat
│   ├── page.tsx       # Landing Page (Server Component)
│   └── layout.tsx     # Root Layout
├── components/
│   ├── chat/          # Componentes del Chat Widget (Client)
│   └── home/          # Componentes de la Landing Page
├── contexts/          # ChatContext (Estado global UI)
├── lib/
│   ├── rag.agent.ts   # Configuración de LangChain y RAG
│   └── simple-memory-store.ts # Vector Store Custom
└── layouts/
    └── RootLayoutProvider.tsx # Configuración MUI & Providers
```

## 🏁 Cómo Iniciar

### Prerrequisitos

- Node.js 18+
- Una API Key de OpenAI

### Instalación

1.  **Clonar el repositorio**:

    ```bash
    git clone https://github.com/tu-usuario/app-langchain-rag-html-next.git
    cd app-langchain-rag-html-next
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz:

    ```env
    OPENAI_API_KEY=sk-tu-api-key-aqui
    # Opcional
    OPENAI_MODEL=gpt-3.5-turbo # o gpt-4
    ```

4.  **Ejecutar Servidor de Desarrollo**:
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🧪 Pruebas Recomendadas

Intenta preguntar al agente:

- _"¿Qué es una startup según Paul Graham?"_
- _"Quiero crear una empresa en un día en Chile, ¿qué necesito?"_
- _"¿Cuáles son los errores que matan a una startup?"_
- _"Dime los costos de constituir una sociedad SPA."_

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo para tu portafolio o aprendizaje.
