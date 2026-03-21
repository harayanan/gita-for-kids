# Phase 1: Gita for Kids — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete site skeleton + fully written/illustrated Chapter 1 (47 shlokas)

**Architecture:** Astro 5 static site with YAML-driven content, React island for tooltips, CSS print stylesheet for book PDF. Content in batches of 10 shlokas.

**Tech Stack:** Astro 5, React 19, Tailwind 3, js-yaml, Nano Banana 3 (illustrations)

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/env.d.ts`

**Step 1:** Initialize Astro project with React + Tailwind integrations

```bash
cd /root/claudecode/gita-for-kids
npm create astro@latest . -- --template minimal --no-install --typescript strict
npm install astro @astrojs/react @astrojs/tailwind react react-dom tailwindcss js-yaml @types/js-yaml
```

**Step 2:** Configure astro.config.mjs with React + Tailwind integrations

**Step 3:** Set up Tailwind config with custom colors, fonts

**Step 4:** Set up global.css with Google Fonts imports (Noto Serif Devanagari, Source Serif 4, Inter)

**Step 5:** Create folder structure

```
content/chapters/01-arjuna-vishada-yoga/verses/
content/chapters/01-arjuna-vishada-yoga/illustrations/
src/layouts/
src/pages/chapters/
src/components/
src/data/
public/fonts/
```

**Step 6:** Verify build works: `npm run build`

**Step 7:** Commit: "feat: scaffold astro project with tailwind and react"

---

### Task 2: Design System — Layouts + Base Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/ChapterLayout.astro`
- Create: `src/components/FolkArtBorder.astro`
- Create: `src/components/SanskritText.astro`
- Create: `src/components/DhatuBreakdown.astro`
- Create: `src/components/StoryBlock.astro`
- Create: `src/components/Tooltip.tsx`
- Create: `src/components/ShlokaCard.astro`
- Create: `src/components/ChapterNav.astro`
- Create: `src/components/VerseNav.astro`

**Step 1:** Build BaseLayout.astro — HTML head with fonts, meta, cream background, nav shell

**Step 2:** Build FolkArtBorder.astro — CSS-based decorative borders (Madhubani-inspired for Ch 1)

**Step 3:** Build SanskritText.astro — centered Devanagari with Noto Serif Devanagari font

**Step 4:** Build DhatuBreakdown.astro — clean table rendering word/parts/meaning

**Step 5:** Build Tooltip.tsx (React island) — reads glossary.yaml, wraps terms in mouseover tooltips

**Step 6:** Build StoryBlock.astro — warm terracotta background tint, story rendering with Tooltip integration

**Step 7:** Build ShlokaCard.astro — composes all above into the full 9-section shloka view

**Step 8:** Build ChapterNav.astro + VerseNav.astro — prev/next navigation

**Step 9:** Build ChapterLayout.astro — wraps ShlokaCards with chapter header + nav

**Step 10:** Verify build: `npm run build`

**Step 11:** Commit: "feat: design system — layouts, components, folk art borders"

---

### Task 3: Glossary + Chapter Meta

**Files:**
- Create: `src/data/glossary.yaml`
- Create: `content/chapters/01-arjuna-vishada-yoga/meta.yaml`
- Create: `content/chapters/02-sankhya-yoga/meta.yaml` through `18-moksha-sannyasa-yoga/meta.yaml`

**Step 1:** Write glossary.yaml with ~40 core Sanskrit terms (dharma, karma, atman, kshetra, yoga, etc.)

**Step 2:** Write meta.yaml for all 18 chapters (name, sanskrit name, summary, verse count, folk art style)

**Step 3:** Commit: "feat: glossary and chapter metadata for all 18 chapters"

---

### Task 4: Landing Page + Chapter Pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/glossary.astro`
- Create: `src/pages/chapters/[chapter]/index.astro`
- Create: `src/pages/chapters/[chapter]/[verse].astro`

**Step 1:** Build landing page — hero section + 18-chapter grid (Ch 1 active, rest "coming soon")

**Step 2:** Build glossary page — renders all terms from glossary.yaml, searchable

**Step 3:** Build chapter index page — dynamic route, reads meta.yaml + lists verses

**Step 4:** Build verse page — dynamic route, reads verse YAML, renders ShlokaCard

**Step 5:** Build about page — project description

**Step 6:** Verify build + dev server: `npm run dev`

**Step 7:** Init git repo, push to GitHub, deploy to Vercel

**Step 8:** Commit: "feat: all pages — landing, chapters, verses, glossary"

---

### Task 5: Content — Chapter 1, Verses 1-10

Write complete YAML content for shlokas 1.1 through 1.10.

**Review checkpoint:** Present to user for review before continuing.

---

### Task 6: Content — Chapter 1, Verses 11-20

**Review checkpoint.**

---

### Task 7: Content — Chapter 1, Verses 21-30

**Review checkpoint.**

---

### Task 8: Content — Chapter 1, Verses 31-40

**Review checkpoint.**

---

### Task 9: Content — Chapter 1, Verses 41-47

**Review checkpoint.**

---

### Task 10: Illustrations — Chapter 1 (all 47)

Generate Nano Banana 3 illustration prompts for all 47 shlokas.

Batch generate and place in `content/chapters/01-arjuna-vishada-yoga/illustrations/`

---

### Task 11: Print Layout

**Files:**
- Create: `src/pages/print.astro`
- Create: `src/layouts/PrintLayout.astro`
- Create: `src/styles/print.css`

Build print route rendering all content sequentially with @page CSS rules.

---

### Task 12: Front Matter Pages (Book)

Write content for:
- Title page
- "How to use this book"
- Characters guide
- "The Story So Far" (Mahabharata context)
- Pronunciation guide

---

### Task 13: Final Polish + Deploy

- Cross-browser check
- Print PDF test
- Final Vercel deploy
- Update HANDOVER.md
