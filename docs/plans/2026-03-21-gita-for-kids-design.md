# Gita for Kids — Design Document

**Date**: 2026-03-21
**Status**: Approved

## Vision

A site + printable book that teaches the Bhagavad Gita chapter by chapter for kids aged 8-12. Indian folk art fusion illustrations (Nano Banana 3), interactive site (Astro), and a full printable PDF book from the same source.

## Scope

- Full 18-chapter skeleton from day one
- Chapter 1 (Arjuna Vishada Yoga, 47 shlokas) complete as proof of concept
- Content written in batches of 10 shlokas for review

## Content Structure Per Shloka

Each shloka contains 9 sections, in order:

1. **Chapter & verse number** with decorative folk art border
2. **Full-width illustration** — Indian folk art fusion, depicting the shloka's emotional core
3. **Original Sanskrit** (Devanagari) — large, beautiful typography
4. **Transliteration** (IAST) — with syllable highlighting
5. **Dhatu-by-dhatu breakdown** — each word split into root + suffix with meaning
6. **Simple meaning** — 2-3 sentences a 10-year-old would understand
7. **The Story** — best available from Panchatantra/Jataka/Hitopadesha/Puranas/modern, or original (300-500 words)
8. **Speaker tag** — Krishna/Arjuna/Sanjaya/Dhritarashtra
9. **"Think about it"** — one reflection question

## Language Approach

- English primary with Sanskrit/Hindi terms woven in naturally (dharma, karma, atman, etc.)
- Mouseover tooltips for all Sanskrit/Hindi terms on the site
- Glossary footnotes/sidebar in print version
- All terms sourced from a single `glossary.yaml`

## Tech Stack

- **Framework**: Astro 5 + Tailwind CSS
- **Content**: YAML files (one per verse, organized by chapter)
- **Interactive elements**: React islands (Tooltip component only)
- **Print**: CSS `@page` print stylesheet, dedicated `/print` route
- **Illustrations**: Nano Banana 3 (Indian folk art fusion style)
- **Deployment**: Vercel (static)

## Content Architecture

```
content/
  chapters/
    01-arjuna-vishada-yoga/
      meta.yaml           # chapter name, summary, verse count
      verses/
        001.yaml          # all 9 fields per shloka
        002.yaml
        ...
      illustrations/
        001.png
        002.png
```

### Verse YAML Schema

```yaml
chapter: 1
verse: 1
speaker: dhritarashtra
sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे..."
transliteration: "dharmakṣetre kurukṣetre..."
dhatu_breakdown:
  - word: "धर्मक्षेत्रे"
    parts: ["dharma (righteousness)", "kṣetra (field)"]
    meaning: "in the field of dharma"
meaning: "Short explanation for a 10-year-old..."
story:
  title: "The Blind King's Question"
  source: "original"  # or "panchatantra", "jataka", etc.
  body: |
    The story text...
reflection: "A question for the child to think about..."
```

## Site Architecture

```
gita-for-kids/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ChapterLayout.astro
│   │   └── PrintLayout.astro
│   ├── pages/
│   │   ├── index.astro           # landing — hero + chapter grid
│   │   ├── about.astro
│   │   ├── glossary.astro        # searchable term list
│   │   ├── print.astro           # full book for PDF export
│   │   └── chapters/
│   │       └── [chapter]/
│   │           ├── index.astro   # chapter overview
│   │           └── [verse].astro # individual shloka page
│   ├── components/
│   │   ├── ShlokaCard.astro
│   │   ├── DhatuBreakdown.astro
│   │   ├── SanskritText.astro
│   │   ├── StoryBlock.astro
│   │   ├── Tooltip.tsx           # React island
│   │   ├── ChapterNav.astro
│   │   ├── VerseNav.astro
│   │   └── FolkArtBorder.astro
│   ├── data/
│   │   └── glossary.yaml
│   └── styles/
│       ├── global.css
│       └── print.css
├── content/
├── public/
│   ├── fonts/
│   └── audio/                    # future
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Visual Design

### Typography
- **Devanagari**: Noto Serif Devanagari
- **English body**: Source Serif 4
- **Transliteration/UI**: Inter

### Color Palette (Indian miniature painting inspired)
- Deep saffron `#C75B12` — primary accent, chapter headers, borders
- Royal indigo `#2D3A87` — secondary, links, speaker tags
- Aged cream `#FDF6E3` — page background
- Forest green `#1A6847` — nature/Krishna associations
- Warm terracotta `#B85C3A` — story section backgrounds
- Rich gold `#C4A24E` — decorative elements, verse numbers

### Folk Art Direction
- Each chapter gets a distinct folk art style motif (Ch 1: Madhubani, Ch 2: Pichwai, Ch 3: Pattachitra, etc.)
- Borders frame illustrations and Sanskrit text
- Lighter ornamental dividers between shloka sections
- Chapter motifs appear as thumbnails on homepage grid

### Illustration Direction (Nano Banana 3)
- Style: Indian folk art fusion — bold lines, flat vivid colors, ornate patterning, expressive faces
- Captures emotional core of each shloka, not literal depiction
- Period clothing with stylized, pattern-rich textiles
- Consistent character design across all illustrations

### Site Layout
- Single column, generous whitespace, max-width ~720px
- Illustration spans full content width
- Sanskrit text centered, slightly larger
- Story section has subtle warm background tint

## Print Book Layout

### Page Structure (per shloka, 2-page spread)
- **Left page**: Full-page illustration with folk art border, verse number in gold
- **Right page**: Sanskrit, transliteration, dhatu breakdown, meaning
- **Following page(s)**: Story + reflection question with margin ornaments

### Book Sections
1. Title page — ornate folk art frame, Devanagari + English
2. "How to use this book" — 1 page
3. Characters — illustrated guide to key figures
4. The Story So Far — 2-3 pages, Mahabharata context to Kurukshetra
5. Chapters 1-18 — the shlokas
6. Glossary — all Sanskrit terms
7. Pronunciation guide — basic Sanskrit phonetics

### Print CSS
- `@page` rules: A4, 20mm margins, bleed marks
- Page breaks before each shloka and chapter
- Cream background preserved
- Upgrade path to Typst if CSS hits limits

## Phasing

### Phase 1 — Chapter 1 Complete (Proof of Concept)
1. Project scaffolding + design system
2. Write Chapter 1 content (47 shlokas, batches of 10)
3. Build site pages + navigation
4. Generate 47 illustrations (Nano Banana 3)
5. Build print layout
6. Polish + deploy

### Phase 2 — Chapters 2-3 (Karma Yoga arc)
### Phase 3 — Chapters 4-9 (Philosophical core)
### Phase 4 — Chapters 10-18 (Completion)

## Content Review Process
- Written in batches of 10 shlokas
- Each batch reviewed before continuing
- Stories sourced from best available (Panchatantra, Jataka, Hitopadesha, Puranas, modern, or original)
