***

# EduChat 🎓

> AI-powered educational chat app where students chat with subject-specialist AI teachers.

## Features

- **8 AI Teacher Classes** — Maths, Science, English, History, CS, Geography, Art, Physics  
- **3D Spline Scenes** — Interactive 3D components embedded via `<spline-viewer>`, react to mouse/cursor  
- **Markdown Rendering** — Teacher responses render rich Markdown (bold, lists, code blocks, blockquotes)  
- **Syntax Highlighting** — Code answers are highlighted via highlight.js  
- **Grade-Aware AI** — Responses adapt to the student's selected grade level (Primary → University)  
- **Suggested Questions** — One‑tap starter questions per subject  
- **Dark / Light Theme** — Automatic + manual toggle  
- **LocalStorage Persistence** — API key, name, grade saved across sessions  
- **Dual Provider Support** — Works with Anthropic (Claude) & OpenAI (GPT‑4o)  

***

## Project Structure

```bash
educhat/
├── index.html       # App shell, Spline viewer tags, settings modal
├── app.js           # Logic: classes data, state, AI calls, rendering
├── style.css        # Design system, Spline banner, Markdown bubble styles
├── base.css         # CSS reset and font setup
├── README.md        # Project context (this file)
└── netlify.toml     # Deployment config
```

***

## Getting Started

### 1. Clone & Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/educhat.git
cd educhat

# Open in browser (no build step needed)
open index.html          # macOS
# or
xdg-open index.html      # Linux
# or just double‑click index.html on Windows
```

### 2. Get an API Key

- **Anthropic (Claude)**: https://console.anthropic.com → API Keys  
- **OpenAI (GPT‑4o)**: https://platform.openai.com → API Keys  

### 3. Use the App

1. Enter your name and grade level  
2. Paste your API key  
3. Click **Start Learning**  
4. Pick a subject class and start chatting!  

***

## Customising Spline 3D Scenes

Each class has a `splineScene` URL pointing to a Spline design in `app.js`.

1. Go to https://spline.design and create or remix a scene  
2. Click **Export → Web (Viewer)**  
3. Copy the `.splinecode` URL  
4. Replace the `splineScene` value for any class:

```js
{
  id: 'mathematics',
  splineScene: 'https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode',
  // ...
}
```

The `<spline-viewer>` elements use the `events-target` attribute so the scenes respond to **cursor movement** and interactions.

***

## Adding a New Class / Teacher

Add a new object to the `CLASSES` array in `app.js`:

```js
{
  id: 'chemistry',
  name: 'Chemistry',
  teacher: 'Dr. Mendeleev',
  emoji: '⚗️',
  color: '#f59e0b',
  bg: 'linear-gradient(135deg,#d97706,#92400e)',
  lastMsg: 'Every element tells a story!',
  splineScene: 'https://prod.spline.design/.../scene.splinecode',
  suggestions: ['What is the periodic table?', 'Explain covalent bonds'],
  persona: `You are Dr. Mendeleev, a Chemistry teacher...`
}
```

***

## Deployment on Netlify

### Via GitHub (recommended)

1. Push your code to a GitHub repository  
2. Go to https://netlify.com → **Add new site → Import from Git**  
3. Select your repository  
4. Build settings: leave **build command** empty (static site)  
5. Click **Deploy**  

Your site will be live at:

```text
https://your-site-name.netlify.app
```

### Via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

***

## Tech Stack

| Tool                | Purpose                         |
|---------------------|---------------------------------|
| Vanilla JS (ES6+)   | App logic, no framework needed |
| Spline Viewer       | 3D interactive scenes          |
| marked.js           | Markdown → HTML rendering      |
| highlight.js        | Code syntax highlighting       |
| Anthropic / OpenAI  | AI teacher responses           |
| Netlify             | Hosting & deployment           |

***

## Skills & Extensions

To expand capabilities, you can add “skills” on top of the core chat:

- **`quiz`** — Quiz mode where teachers generate MCQs and self‑checks  
- **`flashcards`** — Generate spaced‑repetition‑friendly flashcards from explanations  
- **`pdf`** — Upload PDFs / notes and let teachers use them as context  
- **`speech`** — Web Speech API for voice input/output  
- **`progress`** — Track topics studied per subject via localStorage  

***

## License

MIT © 2026 EduChat

***

Want me to add a `quiz` skill (MCQ generator) directly into `app.js` next, or focus on a `flashcards` mode first?
