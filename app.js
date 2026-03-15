(function () {
  'use strict';

  // ===== CLASSES (Teachers) =====
  const CLASSES = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      teacher: 'Mr. Euler',
      emoji: '📐',
      color: '#6366f1',
      bg: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
      lastMsg: 'Need help with equations or geometry? Ask away!',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['Explain the Pythagorean theorem','How do I solve quadratic equations?','What is a derivative?'],
      persona: `You are Mr. Euler, a friendly and encouraging Mathematics teacher. Your teaching style is step-by-step, clear, and you use real-world examples. You adapt explanations to the student's grade level. Always format answers using Markdown — use **bold** for key terms, numbered lists for steps, and code blocks for formulas. When explaining equations write them clearly. End each explanation by asking if the student understood or wants more practice.`
    },
    {
      id: 'science',
      name: 'Science',
      teacher: 'Dr. Curie',
      emoji: '🔬',
      color: '#10b981',
      bg: 'linear-gradient(135deg,#059669,#0891b2)',
      lastMsg: 'Let\'s explore the wonders of the universe!',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['How does photosynthesis work?','Explain Newton\'s laws of motion','What is DNA?'],
      persona: `You are Dr. Curie, an enthusiastic Science teacher covering Physics, Chemistry, and Biology. You make complex science exciting with relatable analogies. Format answers with **Markdown**: use bullet lists for facts, bold for scientific terms, and include emoji for visual flair 🔭. Always encourage curiosity and the scientific mindset.`
    },
    {
      id: 'english',
      name: 'English & Literature',
      teacher: 'Ms. Austen',
      emoji: '📖',
      color: '#f59e0b',
      bg: 'linear-gradient(135deg,#d97706,#dc2626)',
      lastMsg: 'Great writing starts with great reading.',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['How do I write a thesis statement?','Analyse Romeo and Juliet for me','What are the types of figurative language?'],
      persona: `You are Ms. Austen, a warm and witty English and Literature teacher. You help students with grammar, essay writing, literary analysis, and creative writing. Use **Markdown** beautifully — use blockquotes for literary examples, bold for grammar rules, and give structured feedback. Always praise effort and guide improvement gently.`
    },
    {
      id: 'history',
      name: 'History',
      teacher: 'Prof. Herodotus',
      emoji: '🏛️',
      color: '#ef4444',
      bg: 'linear-gradient(135deg,#dc2626,#9a3412)',
      lastMsg: 'History is the greatest story ever told.',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['What caused World War I?','Explain the French Revolution','Tell me about the Mughal Empire'],
      persona: `You are Prof. Herodotus, a passionate History teacher who brings the past to life with vivid storytelling. Format responses with **Markdown**: use headers for different eras/events, bullet points for causes and effects, bold for important dates and names. Always connect historical events to lessons relevant today.`
    },
    {
      id: 'programming',
      name: 'Computer Science',
      teacher: 'Coach Turing',
      emoji: '💻',
      color: '#3b82f6',
      bg: 'linear-gradient(135deg,#2563eb,#1e1b4b)',
      lastMsg: 'Every expert was once a beginner. Let\'s code!',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['Explain loops in Python','What is an algorithm?','How does the internet work?'],
      persona: `You are Coach Turing, a cool and practical Computer Science teacher. You teach programming, algorithms, and digital literacy with hands-on examples. Always use fenced code blocks with language tags (e.g. \`\`\`python) for code. Use **Markdown** formatting throughout. Break down concepts step by step and celebrate student progress with encouragement.`
    },
    {
      id: 'geography',
      name: 'Geography',
      teacher: 'Explorer Vespucci',
      emoji: '🌍',
      color: '#06b6d4',
      bg: 'linear-gradient(135deg,#0891b2,#065f46)',
      lastMsg: 'The world is your classroom — let\'s explore it!',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['What causes earthquakes?','Explain climate zones','Tell me about the Amazon rainforest'],
      persona: `You are Explorer Vespucci, an adventurous Geography teacher who loves the planet. Cover physical geography, human geography, climate, and maps. Use **Markdown** with bold terms, bullet points, and occasionally use 🌏🗺️ emoji to make it engaging. Relate geography to real current events when relevant.`
    },
    {
      id: 'art',
      name: 'Art & Design',
      teacher: 'Ms. Kahlo',
      emoji: '🎨',
      color: '#ec4899',
      bg: 'linear-gradient(135deg,#db2777,#7c3aed)',
      lastMsg: 'Creativity has no wrong answers — just explore!',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['What are the principles of design?','Explain colour theory','How do I analyse a painting?'],
      persona: `You are Ms. Kahlo, a vibrant and inspiring Art & Design teacher. You cover art history, design principles, colour theory, and creative techniques. Format responses with **Markdown**, include relevant emoji 🎭🖌️, and always encourage creative experimentation. Connect art to emotion, culture, and self-expression.`
    },
    {
      id: 'physics',
      name: 'Physics',
      teacher: 'Prof. Einstein',
      emoji: '⚛️',
      color: '#8b5cf6',
      bg: 'linear-gradient(135deg,#7c3aed,#0891b2)',
      lastMsg: 'Imagination is more important than knowledge.',
      splineScene: 'https://prod.spline.design/NZSXHZlx-Y-guFVe/scene.splinecode',
      suggestions: ['What is general relativity?','Explain how gravity works','What is quantum mechanics?'],
      persona: `You are Prof. Einstein, a brilliant yet accessible Physics teacher. You explain complex physics with thought experiments, analogies, and visual descriptions. Use **Markdown** with equations in code blocks, numbered derivation steps, and bold for physical laws. Always spark curiosity and wonder about the universe.`
    }
  ];

  // ===== STATE =====
  let userId = null;
  let studentName = '';
  let gradeLevel = 'high';
  let currentClass = null;
  let conversations = {};
  let isLoading = false;
  let apiKey = '';
  let apiProvider = 'anthropic';

  // ===== DOM =====
  const $ = (sel) => document.querySelector(sel);
  const onboarding = $('#onboarding');
  const contactsView = $('#contactsView');
  const chatView = $('#chatView');
  const contactsList = $('#contactsList');
  const messagesContainer = $('#messagesContainer');
  const messageInput = $('#messageInput');
  const sendBtn = $('#sendBtn');
  const backBtn = $('#backBtn');
  const chatAvatarEmoji = $('#chatAvatarEmoji');
  const chatName = $('#chatName');
  const typingIndicator = $('#typingIndicator');
  const searchInput = $('#searchInput');
  const themeToggle = $('#themeToggle');
  const clearChatBtn = $('#clearChatBtn');
  const emptyChat = $('#emptyChat');
  const emptyChatEmoji = $('#emptyChatEmoji');
  const emptyChatName = $('#emptyChatName');
  const emptyChatDesc = $('#emptyChatDesc');
  const suggestedQuestions = $('#suggestedQuestions');
  const startBtn = $('#startBtn');
  const userIdDisplay = $('#userIdDisplay');
  const apiKeyInput = $('#apiKeyInput');
  const providerSelect = $('#providerSelect');
  const studentNameInput = $('#studentName');
  const gradeSelect = $('#gradeSelect');
  const studentGreeting = $('#studentGreeting');
  const settingsBtn = $('#settingsBtn');
  const settingsModal = $('#settingsModal');
  const settingsClose = $('#settingsClose');
  const settingsSave = $('#settingsSave');
  const settingsApiKey = $('#settingsApiKey');
  const settingsProvider = $('#settingsProvider');
  const settingsName = $('#settingsName');
  const settingsGrade = $('#settingsGrade');
  const classroomSplineLabel = $('#classroomSplineLabel');
  const splineClassroom = $('#splineClassroom');

  // ===== USER ID =====
  function generateUserId() {
    return Array.from({length: 16}, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random()*36)]).join('');
  }
  function initUser() {
    const params = new URLSearchParams(window.location.search);
    userId = params.get('uid') || generateUserId();
    userIdDisplay.textContent = 'Session: ' + userId;
  }

  // ===== THEME =====
  let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  function updateThemeIcon() {
    themeToggle.innerHTML = currentTheme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  }
  updateThemeIcon();
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
  });

  // ===== SPLINE CURSOR INTERACTION =====
  const splineHero = document.querySelector('.spline-hero');
  if (splineHero) {
    splineHero.addEventListener('mousemove', (e) => {
      const rect = splineHero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      splineHero.style.setProperty('--cursor-x', x + '%');
      splineHero.style.setProperty('--cursor-y', y + '%');
    });
  }

  // ===== RENDER CLASSES LIST =====
  function renderContacts(filter = '') {
    const filtered = filter
      ? CLASSES.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.teacher.toLowerCase().includes(filter.toLowerCase()))
      : CLASSES;

    contactsList.innerHTML = filtered.map(cls => {
      const conv = conversations[cls.id];
      let lastMsg = cls.lastMsg;
      let lastTime = '';
      if (conv && conv.length > 0) {
        const last = conv[conv.length - 1];
        lastMsg = last.content.replace(/[#*`_]/g, '').substring(0, 50) + (last.content.length > 50 ? '…' : '');
        lastTime = last.time || '';
      }
      return `
        <div class="contact-item" data-id="${cls.id}">
          <div class="subject-icon" style="background:${cls.bg}">${cls.emoji}</div>
          <div class="contact-info">
            <div class="contact-name">${cls.name}</div>
            <div class="contact-subtitle">${cls.teacher} · ${lastMsg}</div>
          </div>
          <div class="contact-meta">
            <span class="contact-time">${lastTime}</span>
            <svg class="contact-chevron" width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>`;
    }).join('');

    contactsList.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('click', () => openChat(item.dataset.id));
    });
  }

  searchInput.addEventListener('input', () => renderContacts(searchInput.value));

  // ===== OPEN CLASS / CHAT =====
  function openChat(id) {
    currentClass = CLASSES.find(c => c.id === id);
    if (!currentClass) return;

    chatAvatarEmoji.textContent = currentClass.emoji;
    chatAvatarEmoji.style.background = currentClass.bg;
    chatName.textContent = currentClass.teacher + ' — ' + currentClass.name;
    emptyChatEmoji.textContent = currentClass.emoji;
    emptyChatName.textContent = currentClass.teacher;
    emptyChatDesc.textContent = 'Your AI ' + currentClass.name + ' teacher is ready. Ask any question!';
    classroomSplineLabel.textContent = currentClass.name;

    // Update Spline scene for current subject
    if (splineClassroom) splineClassroom.setAttribute('url', currentClass.splineScene);

    renderSuggestions();
    renderMessages();

    contactsView.classList.remove('active');
    contactsView.classList.add('hidden-left');
    chatView.classList.remove('hidden-right');
    chatView.classList.add('active');

    setTimeout(() => messagesContainer.scrollTop = messagesContainer.scrollHeight, 100);
    messageInput.focus();
  }

  function renderSuggestions() {
    suggestedQuestions.innerHTML = (currentClass.suggestions || []).map(q =>
      `<button class="suggested-q">${q}</button>`
    ).join('');
    suggestedQuestions.querySelectorAll('.suggested-q').forEach(btn => {
      btn.addEventListener('click', () => {
        messageInput.value = btn.textContent;
        sendBtn.classList.add('visible');
        sendMessage();
      });
    });
  }

  backBtn.addEventListener('click', () => {
    chatView.classList.remove('active');
    chatView.classList.add('hidden-right');
    contactsView.classList.remove('hidden-left');
    contactsView.classList.add('active');
    renderContacts(searchInput.value);
  });

  // ===== RENDER MESSAGES with Markdown =====
  function renderMessages() {
    const msgs = conversations[currentClass.id] || [];
    messagesContainer.querySelectorAll('.message-row, .message-time').forEach(n => n.remove());
    emptyChat.style.display = msgs.length === 0 ? 'flex' : 'none';

    let lastDate = '';
    msgs.forEach(msg => {
      if (msg.date && msg.date !== lastDate) {
        lastDate = msg.date;
        const timeEl = document.createElement('div');
        timeEl.className = 'message-time';
        timeEl.textContent = msg.date;
        messagesContainer.insertBefore(timeEl, typingIndicator);
      }
      const row = document.createElement('div');
      row.className = 'message-row ' + (msg.role === 'user' ? 'outgoing' : 'incoming');
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      if (msg.role === 'assistant') {
        bubble.innerHTML = typeof marked !== 'undefined' ? marked.parse(msg.content) : msg.content;
        bubble.querySelectorAll('pre code').forEach(block => {
          if (typeof hljs !== 'undefined') hljs.highlightElement(block);
        });
      } else {
        bubble.textContent = msg.content;
      }
      row.appendChild(bubble);
      messagesContainer.insertBefore(row, typingIndicator);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  clearChatBtn.addEventListener('click', () => {
    if (!currentClass) return;
    if (confirm(`Clear conversation with ${currentClass.teacher}?`)) {
      conversations[currentClass.id] = [];
      renderMessages();
    }
  });

  // ===== INPUT =====
  messageInput.addEventListener('input', () => {
    sendBtn.classList.toggle('visible', messageInput.value.trim().length > 0);
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
  });

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  sendBtn.addEventListener('click', sendMessage);

  // ===== SEND MESSAGE =====
  async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || isLoading || !currentClass) return;
    if (!apiKey) { alert('Please add your API Key in Settings ⚙️'); return; }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    if (!conversations[currentClass.id]) conversations[currentClass.id] = [];
    conversations[currentClass.id].push({ role: 'user', content: text, time: timeStr, date: dateStr });

    messageInput.value = '';
    messageInput.style.height = 'auto';
    sendBtn.classList.remove('visible');
    renderMessages();

    isLoading = true;
    typingIndicator.classList.add('active');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
      const reply = await callAI(currentClass, conversations[currentClass.id]);
      const replyTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      conversations[currentClass.id].push({ role: 'assistant', content: reply, time: replyTime, date: dateStr });
    } catch (err) {
      conversations[currentClass.id].push({ role: 'assistant', content: `⚠️ **Error:** ${err.message}\n\nPlease check your API key in Settings.`, time: '', date: dateStr });
    } finally {
      isLoading = false;
      typingIndicator.classList.remove('active');
      renderMessages();
    }
  }

  // ===== AI API CALL =====
  async function callAI(cls, history) {
    const gradeContext = { primary: 'a primary school student (ages 6–11)', middle: 'a middle school student (ages 11–14)', high: 'a high school student (ages 14–18)', university: 'a university student', adult: 'an adult learner' }[gradeLevel] || 'a student';
    const systemPrompt = cls.persona + `\n\nIMPORTANT: You are speaking with ${studentName || 'a student'} who is ${gradeContext}. Adapt your language, vocabulary, and depth of explanation accordingly.`;
    const messages = history.slice(-24).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }));

    if (apiProvider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-calls': 'true'
        },
        body: JSON.stringify({ model: 'claude-3-5-haiku-20241022', max_tokens: 1500, system: systemPrompt, messages })
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || 'HTTP ' + res.status); }
      const data = await res.json();
      return data.content[0].text;
    } else {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-4o-mini', max_tokens: 1500, messages: [{ role: 'system', content: systemPrompt }, ...messages] })
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || 'HTTP ' + res.status); }
      const data = await res.json();
      return data.choices[0].message.content;
    }
  }

  // ===== ONBOARDING =====
  initUser();
  startBtn.addEventListener('click', () => {
    const name = studentNameInput.value.trim();
    const grade = gradeSelect.value;
    const key = apiKeyInput.value.trim();
    const provider = providerSelect.value;
    if (!name) { alert('Please enter your name 👤'); studentNameInput.focus(); return; }
    if (!grade) { alert('Please select your grade level 🎓'); gradeSelect.focus(); return; }
    if (!key) { alert('Please enter your API Key 🔑'); apiKeyInput.focus(); return; }

    studentName = name; gradeLevel = grade; apiKey = key; apiProvider = provider;
    localStorage.setItem('edu_name', name);
    localStorage.setItem('edu_grade', grade);
    localStorage.setItem('edu_api_key', key);
    localStorage.setItem('edu_provider', provider);

    studentGreeting.textContent = `Welcome back, ${studentName}! 👋 Choose a subject to start.`;
    onboarding.classList.add('hidden');
    contactsView.classList.remove('hidden-right');
    contactsView.classList.add('active');
    renderContacts();
  });

  // ===== SETTINGS =====
  settingsBtn.addEventListener('click', () => {
    settingsName.value = studentName;
    settingsGrade.value = gradeLevel;
    settingsApiKey.value = apiKey;
    settingsProvider.value = apiProvider;
    settingsModal.classList.add('active');
  });
  settingsClose.addEventListener('click', () => settingsModal.classList.remove('active'));
  settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) settingsModal.classList.remove('active'); });
  settingsSave.addEventListener('click', () => {
    const name = settingsName.value.trim();
    const key = settingsApiKey.value.trim();
    if (!name) { alert('Name cannot be empty.'); return; }
    if (!key) { alert('API Key cannot be empty.'); return; }
    studentName = name; gradeLevel = settingsGrade.value;
    apiKey = key; apiProvider = settingsProvider.value;
    localStorage.setItem('edu_name', name);
    localStorage.setItem('edu_grade', gradeLevel);
    localStorage.setItem('edu_api_key', key);
    localStorage.setItem('edu_provider', apiProvider);
    studentGreeting.textContent = `Welcome back, ${studentName}! 👋 Choose a subject to start.`;
    settingsModal.classList.remove('active');
  });

  // ===== RESTORE FROM LOCALSTORAGE =====
  const savedName = localStorage.getItem('edu_name');
  const savedGrade = localStorage.getItem('edu_grade');
  const savedKey = localStorage.getItem('edu_api_key');
  const savedProvider = localStorage.getItem('edu_provider');
  if (savedName && savedKey) {
    studentName = savedName; gradeLevel = savedGrade || 'high';
    apiKey = savedKey; apiProvider = savedProvider || 'anthropic';
    studentNameInput.value = savedName;
    gradeSelect.value = gradeLevel;
    apiKeyInput.value = savedKey;
    providerSelect.value = apiProvider;
  }

})();
