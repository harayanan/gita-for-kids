# Gita for Kids — Quality Upgrade (Verses 1.1–1.10)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the first 10 verses from functional to exceptional — fixing editorial errors, rewriting weak stories, and overhauling the UI from "generic Tailwind template" to "living illustrated manuscript."

**Architecture:** Content fixes (YAML edits) are independent of UI changes (Astro/CSS). The plan executes content first (no risk of breaking the build), then UI quick wins (high impact, trivial effort), then component rewrites (deeper changes). No new npm dependencies — everything uses built-in Astro features, CSS, and inline SVG.

**Tech Stack:** Astro 5.7, React 19, Tailwind CSS 3, CSS animations, SVG, Astro View Transitions API.

**Verification:** This project has no test framework. Every task verifies with `npm run build` (must succeed with zero errors). Visual verification via `npm run preview`.

---

## File Map

### Content files (YAML edits)
- `content/chapters/01-arjuna-vishada-yoga/verses/001.yaml` — dhatu fix (Pandava patronymic)
- `content/chapters/01-arjuna-vishada-yoga/verses/002.yaml` — speaker attribution
- `content/chapters/01-arjuna-vishada-yoga/verses/003.yaml` — speaker attribution
- `content/chapters/01-arjuna-vishada-yoga/verses/004.yaml` — speaker attribution, dhatu fix (maheshvasa)
- `content/chapters/01-arjuna-vishada-yoga/verses/005.yaml` — transliteration typo, speaker, full story rewrite
- `content/chapters/01-arjuna-vishada-yoga/verses/006.yaml` — speaker attribution, dhatu fix (saubhadra)
- `content/chapters/01-arjuna-vishada-yoga/verses/007.yaml` — speaker attribution, full story rewrite
- `content/chapters/01-arjuna-vishada-yoga/verses/008.yaml` — transliteration typo, speaker attribution
- `content/chapters/01-arjuna-vishada-yoga/verses/009.yaml` — speaker attribution
- `content/chapters/01-arjuna-vishada-yoga/verses/010.yaml` — speaker attribution, full story rewrite, add missing dhatu entries
- `src/data/glossary.yaml` — add 10 character entries

### Component files (UI overhaul)
- `src/components/SpeakerTag.astro` — add duryodhana, add page color theming
- `src/components/FolkArtBorder.astro` — complete rewrite with SVG patterns
- `src/components/SanskritText.astro` — scale up, gold text-shadow, manuscript feel
- `src/components/DhatuBreakdown.astro` — collapsible accordion
- `src/components/StoryBlock.astro` — drop cap, paper texture, ornamental margins
- `src/components/ShlokaCard.astro` — remove double-border, section entrance animations, speaker theming
- `src/components/VerseNav.astro` — bottom nav on mobile
- `src/components/ScrollReveal.astro` — new component for scroll-triggered animations

### Layout & page files
- `src/layouts/BaseLayout.astro` — ClientRouter (View Transitions), paper texture, nav redesign, progress bar
- `src/pages/index.astro` — hero illustration, animated Om, chapter grid redesign
- `src/pages/chapters/[chapter]/index.astro` — chapter hero image, verse list redesign
- `src/pages/chapters/[chapter]/[verse].astro` — speaker color class on article

### Style files
- `src/styles/global.css` — paper texture, vignette, drop caps, scroll animations, print fixes
- ~~`tailwind.config.mjs`~~ — no changes needed (animations use vanilla CSS)
- `astro.config.mjs` — no changes needed (View Transitions is per-layout)

**Note:** `src/components/ScrollReveal.astro` is NOT needed — scroll reveal is handled via CSS classes + inline JS in BaseLayout.

---

## Phase 1: Content Fixes

### Task 1: Fix transliteration typos

**Files:**
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/005.yaml:7`
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/008.yaml:7`

- [ ] **Step 1: Fix verse 5 double-b typo**

In `005.yaml`, line 7, change:
```
transliteration: "dhṛṣṭaketuścekitānaḥ kāśirājaśca vīryavān | purujitkuntibbhojaśca śaibyaśca narapuṅgavaḥ ||"
```
to:
```
transliteration: "dhṛṣṭaketuścekitānaḥ kāśirājaśca vīryavān | purujit kuntibhojaśca śaibyaśca narapuṅgavaḥ ||"
```
(Fix: `kuntibbhojaśca` → `kuntibhojaśca`, single b. Also split `purujit` as a separate word for readability.)

- [ ] **Step 2: Fix verse 8 double-t typo**

In `008.yaml`, line 7, change:
```
transliteration: "bhavānbhīṣmaśca karṇaśca kṛpaśca samitiñjayaḥ | aśvatthāmā vikarṇaśca saumadattisttathaiva ca ||"
```
to:
```
transliteration: "bhavān bhīṣmaśca karṇaśca kṛpaśca samitiñjayaḥ | aśvatthāmā vikarṇaśca saumadattistathaiva ca ||"
```
(Fix: `saumadattisttathaiva` → `saumadattistathaiva`, single t. Also split `bhavān` for readability.)

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add content/chapters/01-arjuna-vishada-yoga/verses/005.yaml content/chapters/01-arjuna-vishada-yoga/verses/008.yaml
git commit -m "fix: transliteration typos in verses 1.5 and 1.8"
```

---

### Task 2: Add duryodhana speaker tag and fix attribution

**Files:**
- Modify: `src/components/SpeakerTag.astro:8-13` — add duryodhana entry
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/003.yaml:3` through `010.yaml:3` — change speaker

- [ ] **Step 1: Add duryodhana to SpeakerTag component**

In `src/components/SpeakerTag.astro`, add to the `speakerInfo` object after the `sanjaya` entry:

```typescript
duryodhana: { label: 'Duryodhana speaks', color: 'text-gray-700 bg-amber-100', icon: '⚔️' },
```

- [ ] **Step 2: Update speaker in verses 3-10**

In each of `003.yaml` through `010.yaml`, change:
```yaml
speaker: sanjaya
```
to:
```yaml
speaker: duryodhana
```

Verse 2 (`002.yaml`) stays as `sanjaya` — it is Sanjaya's narration before Duryodhana's direct speech begins.

- [ ] **Step 3: Update ShlokaCard Props interface**

In `src/components/ShlokaCard.astro`, the `speaker` field is already typed as `string`, so no interface change needed. Verify the component renders correctly.

- [ ] **Step 4: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds. All 10 verse pages render with correct speaker tags.

- [ ] **Step 5: Commit**

```bash
git add src/components/SpeakerTag.astro content/chapters/01-arjuna-vishada-yoga/verses/
git commit -m "fix: correct speaker attribution — verses 3-10 are Duryodhana, not Sanjaya"
```

---

### Task 3: Add character entries to glossary

**Files:**
- Modify: `src/data/glossary.yaml` — add 10 new entries

- [ ] **Step 1: Add character entries**

Append to `src/data/glossary.yaml`:

```yaml
- term: Sanjaya
  definition: Dhritarashtra's charioteer and advisor, blessed with divine sight to see the entire battlefield from far away.

- term: Dhritarashtra
  definition: The blind king of Hastinapura. Father of the hundred Kauravas. He asks Sanjaya to describe the battle.

- term: Duryodhana
  definition: The eldest Kaurava prince. Proud and jealous, he refused to share the kingdom with his Pandava cousins.

- term: Arjuna
  definition: The third Pandava brother — the greatest archer in the world. Krishna is his charioteer and guide.

- term: Krishna
  definition: An avatar of Lord Vishnu who serves as Arjuna's charioteer. He speaks the teachings of the Gita.

- term: Bhishma
  definition: The great-grandfather of both Pandavas and Kauravas. Bound by a terrible vow, he fights on the Kaurava side.

- term: Drona
  definition: Dronacharya — the royal teacher of archery who trained both the Pandavas and Kauravas. Fights for the Kauravas.

- term: Karna
  definition: A great warrior raised as a charioteer's son, but secretly the eldest son of Kunti. Loyal to Duryodhana.

- term: Abhimanyu
  definition: Arjuna's brave young son who learned to enter the Chakravyuha battle formation but not how to escape it.

- term: Chakravyuha
  definition: A deadly spiral battle formation. Abhimanyu famously broke into one but could not find his way out.
```

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds. Glossary page now shows entries under A, B, C, D, K, S sections.

- [ ] **Step 3: Commit**

```bash
git add src/data/glossary.yaml
git commit -m "feat: add 10 character entries to glossary (Sanjaya, Bhishma, Drona, etc.)"
```

---

### Task 4: Fix dhatu breakdown errors

**Files:**
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/001.yaml` — Pandava patronymic
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/004.yaml` — maheshvasa
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/006.yaml` — saubhadra
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/010.yaml` — add missing words, fix shlesha spelling

- [ ] **Step 1: Fix verse 1 — Pandava patronymic**

In `001.yaml`, change the `पाण्डवाः` entry:
```yaml
  - word: "पाण्डवाः"
    parts: ["pāṇḍu (King Pandu)", "va (sons of)"]
    meaning: "the sons of Pandu"
```
to:
```yaml
  - word: "पाण्डवाः"
    parts: ["pāṇḍu (King Pandu)", "a (descendant of)"]
    meaning: "the sons of Pandu"
```

- [ ] **Step 2: Fix verse 4 — maheshvasa**

In `004.yaml`, find the `महेष्वासाः` entry and change:
```yaml
    parts: ["mahā (great)", "iṣu (arrow)", "āsa (bow)"]
```
to:
```yaml
    parts: ["mahā (great)", "iṣvāsa (bow/archer)"]
```

- [ ] **Step 3: Fix verse 6 — saubhadra**

In `006.yaml`, find the `सौभद्रः` entry and change the mixed-format parts:
```yaml
    parts: ["su (good)", "bhadra (auspicious)", "subhadrā's son"]
```
to:
```yaml
    parts: ["subhadrā (Arjuna's wife)", "a (patronymic suffix)"]
    meaning: "son of Subhadra — Abhimanyu"
```

- [ ] **Step 4: Fix verse 10 — add missing words and fix shlesha**

In `010.yaml`, add three missing dhatu entries after the `एतेषाम्` entry:

```yaml
  - word: "तद्"
    parts: ["tad (that)"]
    meaning: "that"
  - word: "तु"
    parts: ["tu (but, however)"]
    meaning: "but"
  - word: "इदम्"
    parts: ["idam (this)"]
    meaning: "this"
```

Also in the story body, change `"shleshā"` to `"shlesha"` (remove the incorrect ā ending — the word is masculine).

- [ ] **Step 5: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add content/chapters/01-arjuna-vishada-yoga/verses/001.yaml content/chapters/01-arjuna-vishada-yoga/verses/004.yaml content/chapters/01-arjuna-vishada-yoga/verses/006.yaml content/chapters/01-arjuna-vishada-yoga/verses/010.yaml
git commit -m "fix: correct dhatu breakdowns in verses 1, 4, 6, 10 and fix shlesha spelling"
```

---

## Phase 2: Story Rewrites

### Task 5: Rewrite verse 5 story — "The King Who Gave His Own Flesh"

**Files:**
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/005.yaml:40-65`

- [ ] **Step 1: Replace the story section**

Replace the entire `story:` block in `005.yaml` with:

```yaml
story:
  title: "The King Who Gave His Own Flesh"
  source: "Mahabharata / Shibi Jataka"
  body: |
    A hawk was chasing a pigeon across a burning sky.

    The pigeon, terrified and bleeding from its wing, dove through an open
    window and landed in the lap of King Shibi. The bird was shaking so hard
    that Shibi could feel its tiny heart hammering against his palm. "Save
    me," it cried. "The hawk will tear me apart."

    King Shibi wrapped the trembling bird in his silk shawl. "As long as you
    are in my kingdom," he said softly, "nothing will harm you. I promise."

    But then the hawk landed on the windowsill. Its talons clicked against
    the marble. "That pigeon is my food," the hawk said. "I have been
    hunting it since dawn. You may be a king, but you cannot steal my dinner.
    If you protect the pigeon, I will starve. Is that fair?"

    Shibi closed his eyes. The hawk was right — it needed to eat. But he had
    given his word to the pigeon. What could he do?

    "Take my flesh instead," said the king.

    He called for a golden scale. On one side, they placed the pigeon. On
    the other, the king began to cut flesh from his own arm. But no matter
    how much he cut — his arm, his leg, his side — the pigeon's side of the
    scale stayed heavier. Blood pooled on the marble floor. The courtiers
    wept. Still the scale did not move.

    Finally, Shibi climbed onto the scale himself, offering everything he had.

    The hawk and pigeon shimmered and changed shape. They were gods, testing
    the king's compassion. They healed his wounds, blessed his name, and
    vanished in a shower of golden light.

    In this verse, when Duryodhana says "Shaibya," he means a warrior from
    King Shibi's family. That single name carries all of this inside it: the
    pigeon's terror, the hawk's hunger, the king's blood on the golden scale.

    In ancient India, a warrior's name was not just a label. It was a legacy.
    Dhrishtaketu meant "bold banner." Purujit meant "conqueror of many."
    Every name on that battlefield told a story of who came before.
```

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add content/chapters/01-arjuna-vishada-yoga/verses/005.yaml
git commit -m "feat: rewrite verse 5 story — King Shibi's sacrifice (from essay to narrative)"
```

---

### Task 6: Rewrite verse 7 story — "The Captain's Huddle"

**Files:**
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/007.yaml:40-66`

- [ ] **Step 1: Replace the story section**

Replace the entire `story:` block in `007.yaml` with:

```yaml
story:
  title: "The Captain's Huddle"
  source: "original"
  body: |
    The score was 47 to 3, and Kabir's team was losing badly.

    Kabir was captain of the under-12 Jodhpur district kabaddi team. They
    had trained for three months, waking at five every morning to practice
    raids in the freezing sand. His mother packed extra parathas for the
    bus ride to every tournament. But the team from Jaipur was faster,
    stronger, and their coach had once played for India.

    During the break, Kabir's teammates sat on the dusty ground with their
    heads down. Rahul was picking at the tape on his knee. Sania stared at
    nothing, her hands limp in her lap. Nobody spoke. The only sound was
    the Jaipur team laughing on the other side of the court.

    Kabir's stomach was churning. He wanted to sit down too. He wanted to
    disappear. But he was the captain, and captains don't get to disappear.

    He stood up. His legs felt heavy, but he stood.

    "Okay, listen," he said, surprised by the steadiness of his own voice.
    "Rahul — remember that spin raid you did last week in practice? The one
    where even Coach couldn't catch you? Nobody on that team has seen it.
    Sania — you haven't missed a single ankle hold all morning. Not one."

    He went around the circle, naming each player, naming something real
    they had done. Not flattery. Facts.

    He didn't feel as confident as he sounded. But something strange
    happened — as he named his teammates' strengths out loud, he started
    to believe his own words. And one by one, heads came up.

    That is exactly what Duryodhana does in verse 7. After five straight
    verses of nervously listing every dangerous warrior on the Pandava
    side, he catches himself. He turns to Drona and says: "Enough about
    them. Let me name our champions."

    But listen to how he addresses Drona — "dvijottama," best of the
    twice-born. It sounds respectful. Underneath, Duryodhana is really
    saying: "You are on OUR side. Right? Right?"

    Sometimes the huddle isn't just for the team. Sometimes it's for the
    captain who needs to hear himself say it will be okay.
```

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add content/chapters/01-arjuna-vishada-yoga/verses/007.yaml
git commit -m "feat: rewrite verse 7 story — kabaddi captain's huddle (from analogy to narrative)"
```

---

### Task 7: Rewrite verse 10 story — "The Donkey in the Tiger Skin"

**Files:**
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/010.yaml:38-68`

- [ ] **Step 1: Replace the story section**

Replace the entire `story:` block in `010.yaml` with:

```yaml
story:
  title: "The Donkey in the Tiger Skin"
  source: "Panchatantra (adapted)"
  body: |
    A washerman owned a donkey so thin you could count every rib through
    its hide. Each night the donkey brayed with hunger, and each night
    the washerman lay awake feeling guilty, because he had no money for
    extra feed.

    One morning, walking through the forest, the washerman stumbled upon
    a dead tiger. An idea sparked in his mind. He skinned the tiger
    carefully, rolled up the heavy striped hide, and carried it home.

    That night, he draped the tiger skin over his donkey and set it loose
    in the neighbouring fields.

    It worked beautifully. The farmers saw the "tiger" prowling through
    their crops in the moonlight and ran screaming into their houses,
    bolting every door. The donkey ate all night long — rice, wheat,
    sugarcane, mustard greens — and grew fat and happy.

    Night after night, the same trick. The donkey wore the tiger skin
    and feasted while the whole village trembled behind locked doors.

    But one night, standing in the middle of a moonlit cornfield with
    stalks rustling all around it, the donkey heard another donkey
    braying in the distance. The sound was sweet and familiar. And
    without thinking — without remembering the tiger skin on its
    back — it opened its mouth and brayed back.

    "HEE-HAW! HEE-HAW!"

    The farmers heard that sound and knew instantly. "That is no tiger!
    That is the washerman's donkey!" They came running with sticks
    and lanterns.

    Duryodhana's words in this verse are like that tiger skin. On the
    surface, he roars: "Our army is unlimited! Theirs is small!" He is
    puffing up his chest, trying to look like a tiger before his teacher.

    But the Sanskrit word "aparyaptam" has two opposite meanings — both
    "unlimited" AND "insufficient." So his boast accidentally brays out
    his real feeling: our army is not enough.

    The great poet Vyasa wrote it this way on purpose. He let Duryodhana
    wear a tiger skin of words while underneath, the frightened donkey
    was braying. Sanskrit poets called this "shlesha" — a pun where one
    word carries two truths at once.

    Sometimes the bravest-sounding words are the most frightened ones.
```

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add content/chapters/01-arjuna-vishada-yoga/verses/010.yaml
git commit -m "feat: rewrite verse 10 story — Panchatantra donkey-in-tiger-skin (from essay to narrative)"
```

---

### Task 8: Expand remaining stories to 300-500 words

Stories for verses 1, 2, 3, 6, 8, 9 are good but too short (150-250 words). Each needs sensory detail, varied openings, and expansion to 300-500 words. Also vary opening patterns — currently 6/10 open with a direct question to the reader.

**Note for agentic workers:** This task requires CREATIVE WRITING. The direction notes below describe what to change, but the actual 300-500 word stories must be composed by the agent. Follow the direction notes carefully. Use verse 4's story (the cricket match) as the quality benchmark — named characters, dialogue, sensory detail, clear narrative arc.

**Files:**
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/001.yaml` — story body
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/002.yaml` — story body
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/003.yaml` — story body
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/006.yaml` — story body
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/008.yaml` — story body
- Modify: `content/chapters/01-arjuna-vishada-yoga/verses/009.yaml` — story body

- [ ] **Step 1: Expand verse 1 story**

Replace the story body in `001.yaml`. Key changes:
- Open with a scene, not a question (move the question to later in the text)
- Add sensory details: the sound of conch shells in the distance, the cold marble under Dhritarashtra's feet, the smell of sandalwood incense
- Dramatize a specific moment: Dhritarashtra hearing the distant war drums and gripping his throne
- Expand to ~350 words
- Keep the brilliant closing line about inner/outer blindness

- [ ] **Step 2: Expand verse 2 story**

Replace the story body in `002.yaml`. Key changes:
- Open with action: "The Pandava army stretched across the plain like a dark ocean" (a scene, not a question)
- Add physical details of Duryodhana: his gold armor, the sweat on his palms, the way his jaw clenched
- Show him walking to Drona rather than telling us he went
- Expand to ~320 words

- [ ] **Step 3: Expand verse 3 story**

Replace the story body in `003.yaml`. Key changes:
- Lead with the potter story (it's the strongest part) — open with the potter at his wheel
- Add sensory detail to the potter scene: the wet clay, the spinning wheel, the heat of the kiln
- Move the Duryodhana context to after the story, not before
- Expand to ~350 words

- [ ] **Step 4: Expand verse 6 story**

Replace the story body in `006.yaml`. Key changes:
- Dramatize Abhimanyu entering the Chakravyuha — show the moment, don't summarize it
- Add sounds: war drums, elephants trumpeting, the scrape of chariot wheels
- Show Abhimanyu making the choice to enter even knowing the risk
- Don't state the moral explicitly — let the story speak
- Expand to ~400 words

- [ ] **Step 5: Expand verse 8 story**

Replace the story body in `008.yaml`. Key changes:
- Add one sensory detail to Shantanu meeting Satyavati: what was the first thing he noticed? (the scent of flowers replacing the smell of fish — this is in the Mahabharata)
- Dramatize the moment of Devavrata's vow — show the court falling silent
- Expand to ~350 words

- [ ] **Step 6: Expand verse 9 story**

Replace the story body in `009.yaml`. Key changes:
- Open with the ravine scene: the sound of rocks falling, the king's cry echoing
- Add danger: describe the cliff face — wet stone, loose gravel, thorny bushes
- Slow down the servant's descent — make the reader feel the physical effort
- Replace the abstract closing aphorism with something concrete a child would say
- Expand to ~350 words

- [ ] **Step 7: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 8: Commit**

```bash
git add content/chapters/01-arjuna-vishada-yoga/verses/
git commit -m "feat: expand stories for verses 1-3, 6, 8-9 — add sensory detail, vary openings, hit 300-500 word target"
```

---

## Phase 3: UI Quick Wins

### Task 9: Add Astro View Transitions

**Files:**
- Modify: `src/layouts/BaseLayout.astro:1-2` — add import
- Modify: `src/layouts/BaseLayout.astro:18` — add ViewTransitions component in head

- [ ] **Step 1: Add View Transitions import and component**

In `src/layouts/BaseLayout.astro`, add to the frontmatter:
```typescript
import { ClientRouter } from 'astro:transitions';
```

In the `<head>` section, after the Open Graph meta tags (after line 34), add:
```html
<ClientRouter />
```

- [ ] **Step 2: Add transition names to key elements**

**Note:** The illustration `transition:name` will be added in Task 10 when the illustration block is rewritten. Here, just add `transition:name` to the verse number span in `src/components/ShlokaCard.astro`:

```html
<span class="font-ui text-xs font-semibold uppercase tracking-widest text-gold" transition:name={`verse-num-${chapter}-${verse}`}>
  Chapter {chapter} &middot; Verse {verse}
</span>
```

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds. Page transitions now animate smoothly between verse pages.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/ShlokaCard.astro
git commit -m "feat: add Astro View Transitions for smooth page navigation"
```

---

### Task 10: Remove double-border on illustrations and scale up Sanskrit

**Files:**
- Modify: `src/components/ShlokaCard.astro:66-77` — remove FolkArtBorder around illustration
- Modify: `src/components/ShlokaCard.astro:79-82` — remove FolkArtBorder around Sanskrit
- Modify: `src/components/SanskritText.astro` — scale up text, add gold shadow

- [ ] **Step 1: Remove FolkArtBorder from illustration**

In `src/components/ShlokaCard.astro`, replace lines 66-77:
```html
{illustration && (
  <div class="mb-8">
    <FolkArtBorder style={folkArtStyle}>
      <img
        src={illustration}
        alt={`Illustration for Chapter ${chapter}, Verse ${verse}`}
        class="w-full rounded-sm"
        loading="lazy"
      />
    </FolkArtBorder>
  </div>
)}
```
with:
```html
{illustration && (
  <div class="-mx-4 sm:-mx-8 md:-mx-16 mb-10">
    <img
      src={illustration}
      alt={`Illustration for Chapter ${chapter}, Verse ${verse}`}
      class="w-full"
      loading="lazy"
      transition:name={`illustration-${chapter}-${verse}`}
    />
  </div>
)}
```
(Negative margins let the illustration break out of the content column. The illustrations already have their own Madhubani borders baked in.)

- [ ] **Step 2: Remove FolkArtBorder from Sanskrit text**

In `src/components/ShlokaCard.astro`, replace lines 79-82:
```html
<FolkArtBorder style={folkArtStyle} class="mb-8">
  <SanskritText sanskrit={sanskrit} transliteration={transliteration} />
</FolkArtBorder>
```
with:
```html
<div class="mb-8">
  <SanskritText sanskrit={sanskrit} transliteration={transliteration} />
</div>
```

- [ ] **Step 3: Scale up Sanskrit text**

In `src/components/SanskritText.astro`, replace the entire template:
```html
<div class="text-center space-y-3 py-6">
  <p class="font-devanagari text-2xl md:text-3xl leading-relaxed text-gray-900 tracking-wide">
    {sanskrit}
  </p>
  <p class="font-ui text-base md:text-lg italic text-gray-500 tracking-wide">
    {transliteration}
  </p>
</div>
```
with:
```html
<div class="text-center space-y-4 py-8">
  <p
    class="font-devanagari text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-900 tracking-wider"
    style="text-shadow: 0 1px 2px rgba(196, 162, 78, 0.15);"
  >
    {sanskrit}
  </p>
  <p class="font-body text-base md:text-lg italic text-gray-500 tracking-wide">
    {transliteration}
  </p>
</div>
```

- [ ] **Step 4: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/ShlokaCard.astro src/components/SanskritText.astro
git commit -m "feat: free illustrations from double-border, scale Sanskrit to text-4xl/5xl with gold shadow"
```

---

### Task 11: Paper texture, page vignette, and drop caps

**Files:**
- Modify: `src/styles/global.css` — add paper texture, vignette, drop cap styles, scroll animations

- [ ] **Step 1: Add paper texture and vignette to global.css**

Append the following to the END of `src/styles/global.css` (after the closing `}` of the existing `@layer base` block on line 27). The `body::before`/`::after` rules go inside a NEW `@layer base` block. The `.drop-cap` and `.scroll-reveal` rules go OUTSIDE any layer (they need higher specificity):

```css
@layer base {
  /* Paper texture — subtle noise overlay (z-index 1 to stay below nav/tooltips) */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  /* Page vignette — book-like light fall (z-index 1 to stay below nav/tooltips) */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.04);
  }
}

/* Drop cap for story opening */
.drop-cap::first-letter {
  float: left;
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 3.5em;
  line-height: 0.8;
  padding-right: 0.08em;
  padding-top: 0.05em;
  color: #C75B12;
  font-weight: 700;
}

/* Scroll reveal animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add paper texture, page vignette, drop caps, and scroll-reveal CSS"
```

---

### Task 12: Add scroll-reveal animations via inline script

**Files:**
- Modify: `src/layouts/BaseLayout.astro` — add IntersectionObserver script

- [ ] **Step 1: Add scroll-reveal script to BaseLayout**

In `src/layouts/BaseLayout.astro`, add just before the closing `</body>` tag:

```html
<script>
  // Scroll-reveal: animate elements as they enter the viewport
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
  }

  // Run on initial load and after View Transition navigations
  initScrollReveal();
  document.addEventListener('astro:after-swap', initScrollReveal);
</script>
```

- [ ] **Step 2: Add scroll-reveal classes to ShlokaCard sections**

In `src/components/ShlokaCard.astro`, add `class="scroll-reveal"` to each major section wrapper:
- The illustration div
- The SanskritText wrapper div
- The DhatuBreakdown component wrapper
- The meaning section div
- The StoryBlock wrapper
- The reflection div

Each section gets a staggered delay via inline style: `style="transition-delay: 0.1s"`, `0.2s`, etc.

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/ShlokaCard.astro
git commit -m "feat: add scroll-reveal entrance animations to verse page sections"
```

---

## Phase 4: Component Rewrites

### Task 13: Rewrite FolkArtBorder with SVG patterns

**Files:**
- Modify: `src/components/FolkArtBorder.astro` — complete rewrite

- [ ] **Step 1: Replace FolkArtBorder with SVG-based borders**

Replace the entire content of `src/components/FolkArtBorder.astro` with a version that uses inline SVG `<pattern>` elements for each folk art style:

- **Madhubani**: Double-line border with fish and lotus chain motifs, filled triangles at corners
- **Pichwai**: Repeated lotus bud garland along edges, peacock feather eye corner ornaments
- **Pattachitra**: Scrolling vine with stylized flowers, scalloped edge
- **Warli**: Chain of small triangular dancing figures, geometric border
- **Kalamkari**: Flowing vine with pen-stroke quality flowers

The component should:
1. Define SVG `<defs>` with `<pattern>` elements for top/bottom/left/right borders
2. Use `position: relative` with SVG strips absolutely positioned along each edge
3. Have proper corner ornaments (SVG, not CSS squares) — a lotus bud for madhubani, a peacock eye for pichwai, etc.
4. Accept the same props interface (`style`, `class`)

Keep borders lightweight — the SVG paths should be hand-crafted simple shapes (10-20 path commands each), not complex artwork.

- [ ] **Step 2: Verify build and visual check**

Run: `cd /root/claudecode/gita-for-kids && npm run build && npm run preview`
Expected: Build succeeds. The "What is the Gita?" section on the landing page and the about page display the new SVG borders.

- [ ] **Step 3: Commit**

```bash
git add src/components/FolkArtBorder.astro
git commit -m "feat: rewrite FolkArtBorder with inline SVG folk art patterns (madhubani, pichwai, etc.)"
```

---

### Task 14: Redesign StoryBlock with drop cap and paper texture

**Files:**
- Modify: `src/components/StoryBlock.astro` — visual redesign

- [ ] **Step 1: Redesign StoryBlock**

Replace the content of `src/components/StoryBlock.astro`:

```astro
---
import Tooltip from './Tooltip.tsx';

interface Props {
  title: string;
  source: string;
  body: string;
  glossary: { term: string; definition: string }[];
}

const { title, source, body, glossary } = Astro.props;

const sourceLabel = source === 'original' ? 'An original story' : `From the ${source}`;
const paragraphs = body.split('\n\n').filter(p => p.trim());
---

<div class="my-10 relative">
  <!-- Decorative top border -->
  <div class="flex items-center gap-3 mb-6">
    <div class="flex-1 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"></div>
    <span class="font-devanagari text-terracotta/40 text-sm">कथा</span>
    <div class="flex-1 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"></div>
  </div>

  <!-- Story header -->
  <div class="mb-5">
    <h3 class="font-body text-2xl font-bold text-terracotta">{title}</h3>
    <span class="font-ui text-xs text-terracotta/50 italic">{sourceLabel}</span>
  </div>

  <!-- Story body with drop cap on first paragraph -->
  <div class="font-body text-lg leading-[1.9] text-gray-800 space-y-5">
    {paragraphs.map((paragraph, i) => (
      <p class={i === 0 ? 'drop-cap' : ''}>
        <Tooltip client:load glossary={glossary} text={paragraph} />
      </p>
    ))}
  </div>

  <!-- Decorative bottom border -->
  <div class="flex items-center gap-3 mt-8">
    <div class="flex-1 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"></div>
    <span class="font-devanagari text-terracotta/40 text-sm">॥</span>
    <div class="flex-1 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"></div>
  </div>
</div>
```

Key changes:
- Removed the boxy `bg-terracotta/8 rounded-xl border` container — stories now breathe
- Added drop cap on first paragraph via `.drop-cap` class (defined in global.css)
- Increased line-height to 1.9 for comfortable reading
- Added decorative Sanskrit dividers (कथा = "story") instead of a border
- Larger title (text-2xl vs text-xl)
- Increased body text size (text-lg vs text-base)

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/StoryBlock.astro
git commit -m "feat: redesign StoryBlock — drop cap, Sanskrit dividers, breathing layout"
```

---

### Task 15: Redesign meaning section and reflection section in ShlokaCard

**Files:**
- Modify: `src/components/ShlokaCard.astro:94-114` — meaning and reflection sections

- [ ] **Step 1: Redesign meaning section**

In `src/components/ShlokaCard.astro`, replace the meaning section (lines 94-100):
```html
<div class="py-4">
  <h3 class="font-ui text-xs font-semibold uppercase tracking-widest text-gold mb-3">What it means</h3>
  <p class="font-body text-lg leading-relaxed text-gray-800">
    <Tooltip client:load glossary={glossary} text={meaning} />
  </p>
</div>
```
with:
```html
<div class="py-6 scroll-reveal" style="transition-delay: 0.3s">
  <div class="border-l-[3px] border-gold/40 pl-6">
    <p class="font-body text-xl md:text-2xl leading-relaxed text-gray-800">
      <Tooltip client:load glossary={glossary} text={meaning} />
    </p>
  </div>
</div>
```

- [ ] **Step 2: Redesign reflection section**

Replace the reflection section (lines 111-114):
```html
<div class="bg-forest/8 rounded-xl px-6 py-6 my-6 border border-forest/15">
  <h3 class="font-ui text-xs font-semibold uppercase tracking-widest text-forest mb-3">Think about it</h3>
  <p class="font-body text-base italic text-gray-700 leading-relaxed">{reflection}</p>
</div>
```
with:
```html
<div class="text-center py-10 my-6 scroll-reveal" style="transition-delay: 0.6s">
  <span class="font-devanagari text-forest/30 text-sm block mb-4">चिन्तनम्</span>
  <p class="font-body text-xl md:text-2xl italic text-gray-700 leading-relaxed max-w-lg mx-auto">
    {reflection}
  </p>
</div>
```

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/ShlokaCard.astro
git commit -m "feat: redesign meaning (gold-border blockquote) and reflection (centered, breathing) sections"
```

---

### Task 16: Add speaker-based page color theming

**Files:**
- Modify: `src/pages/chapters/[chapter]/[verse].astro` — pass speaker data for theming
- Modify: `src/components/ShlokaCard.astro` — apply speaker-based CSS custom properties
- Modify: `src/styles/global.css` — add speaker theme CSS

- [ ] **Step 1: Add speaker color CSS custom properties**

In `src/styles/global.css`, add:

```css
/* Speaker-based page theming */
article[data-speaker="dhritarashtra"] { --speaker-accent: #6B7280; --speaker-bg: rgba(107, 114, 128, 0.04); }
article[data-speaker="sanjaya"] { --speaker-accent: #2D3A87; --speaker-bg: rgba(45, 58, 135, 0.04); }
article[data-speaker="duryodhana"] { --speaker-accent: #92400E; --speaker-bg: rgba(146, 64, 14, 0.04); }
article[data-speaker="arjuna"] { --speaker-accent: #B85C3A; --speaker-bg: rgba(184, 92, 58, 0.04); }
article[data-speaker="krishna"] { --speaker-accent: #1A6847; --speaker-bg: rgba(26, 104, 71, 0.04); }

/* Apply the speaker background tint */
article[data-speaker] {
  background-color: var(--speaker-bg);
}
```

- [ ] **Step 2: Apply data-speaker attribute to ShlokaCard article**

In `src/components/ShlokaCard.astro`, change:
```html
<article class="max-w-reading mx-auto px-4 py-12">
```
to:
```html
<article class="max-w-reading mx-auto px-4 py-12" data-speaker={speaker}>
```

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds. Pages now have subtle background tint based on speaker.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/components/ShlokaCard.astro
git commit -m "feat: add speaker-based page color theming via CSS custom properties"
```

---

### Task 17: Add reading progress bar

**Files:**
- Modify: `src/layouts/BaseLayout.astro` — add progress bar element and script

- [ ] **Step 1: Add progress bar HTML and CSS**

In `src/layouts/BaseLayout.astro`, add immediately after the opening `<body>` tag:

```html
<div id="reading-progress" class="fixed top-0 left-0 h-[3px] bg-saffron z-[100] transition-[width] duration-100 ease-out" style="width: 0%"></div>
```

- [ ] **Step 2: Add progress bar script**

In the existing `<script>` block (or a new one), add:

```javascript
function initProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}
initProgress();
document.addEventListener('astro:after-swap', initProgress);
```

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add saffron reading progress bar at top of page"
```

---

## Phase 5: Landing Page Redesign

### Task 18: Redesign landing page hero and chapter grid

**Files:**
- Modify: `src/pages/index.astro` — hero with illustration, animated Om, improved grid

- [ ] **Step 1: Redesign the hero section**

Replace the hero section in `index.astro` (lines 10-34) with a version that:
- Uses the first illustration as a hero background image (`/illustrations/01-arjuna-vishada-yoga/001.png`) with a cream gradient overlay
- Keeps the Devanagari title centered and prominent
- Adds the animated SVG Om that draws itself (using `stroke-dasharray`/`stroke-dashoffset` CSS animation)
- Adds scroll-reveal class

- [ ] **Step 2: Improve chapter grid cards**

In the chapter grid, enhance each card:
- Add a colored left-border accent using the chapter's `folk_art_style` color
- Add a small inline SVG motif icon per folk art style
- Desaturate "coming soon" chapters more aggressively (opacity + grayscale filter)
- Add scroll-reveal with staggered delays

- [ ] **Step 3: Improve "What is the Gita?" section**

Replace the FolkArtBorder wrapper with a simpler, warmer treatment:
- Remove the border, use the new Sanskrit कथा-style dividers instead
- Add a subtle background gradient
- Make text larger and more inviting

- [ ] **Step 4: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: redesign landing page — hero illustration, animated Om, enhanced chapter grid"
```

---

## Phase 6: Navigation Improvements

### Task 19: Redesign navigation header

**Files:**
- Modify: `src/layouts/BaseLayout.astro:37-50` — nav section

- [ ] **Step 1: Replace the nav**

Replace the generic SaaS nav with a version that:
- Shows a full decorative header on page load with the Devanagari title centered and folk art motifs flanking it
- Compresses to a minimal sticky bar on scroll (using a small JS scroll listener that adds/removes a class)
- Uses a more bookish design: no `backdrop-blur`, instead use a warm cream background with a subtle gold bottom border
- The mobile version uses a hamburger menu

- [ ] **Step 2: Add breadcrumb trail for verse pages**

Add a conditional breadcrumb that appears on verse pages (passed via a slot or prop):
`Home > Chapter 1: Arjuna's Sorrow > Verse 3`

This can be added to `src/pages/chapters/[chapter]/[verse].astro` above the ShlokaCard.

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/chapters/[chapter]/[verse].astro
git commit -m "feat: redesign nav — warm header, scroll compression, breadcrumbs on verse pages"
```

---

### Task 20: Mobile bottom nav for verse pages

**Files:**
- Modify: `src/components/VerseNav.astro` — add fixed bottom nav on mobile

- [ ] **Step 1: Redesign VerseNav for mobile**

In `src/components/VerseNav.astro`, add a fixed bottom nav bar that:
- Is `fixed bottom-0 left-0 right-0` on mobile (`md:static md:bottom-auto`)
- Has three sections: ← Prev | All Verses (center) | Next →
- Has a warm cream background with a top gold border
- Touch targets are at least 44x44px
- Adds `pb-16 md:pb-0` to the parent page to account for the fixed bar height

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/VerseNav.astro
git commit -m "feat: add fixed bottom nav on mobile for verse-to-verse navigation"
```

---

## Phase 7: Chapter Index Page

### Task 21: Redesign chapter index page

**Files:**
- Modify: `src/pages/chapters/[chapter]/index.astro` — hero image, verse list timeline
- Modify: `src/layouts/ChapterLayout.astro` — accept illustration prop

- [ ] **Step 1: Add chapter hero illustration**

In `src/layouts/ChapterLayout.astro`, accept an optional `illustration` prop and render it as a hero banner above the chapter header.

In `src/pages/chapters/[chapter]/index.astro`, pass the first verse's illustration path to the layout.

- [ ] **Step 2: Redesign verse list**

Replace the flat list of verse links with a visually richer treatment:
- Each verse card shows: verse number, first line of Sanskrit (truncated), and the first sentence of the meaning
- Add a colored left accent that uses the chapter's folk art style color
- Add scroll-reveal with staggered delays
- Show the speaker tag (small, inline) on each card

- [ ] **Step 3: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/chapters/[chapter]/index.astro src/layouts/ChapterLayout.astro
git commit -m "feat: redesign chapter index — hero illustration, enriched verse list"
```

---

## Phase 8: DhatuBreakdown Enhancement

### Task 22: Make DhatuBreakdown collapsible and interactive

**Files:**
- Modify: `src/components/DhatuBreakdown.astro` — convert to collapsible accordion

- [ ] **Step 1: Redesign DhatuBreakdown as a collapsible section**

Replace `src/components/DhatuBreakdown.astro` with a version that:
- Uses the HTML `<details>` / `<summary>` element (no JS needed, fully accessible)
- The summary shows "Word by Word" with a small chevron indicator
- When open, displays a clean 3-column grid: Devanagari word | root parts | English meaning
- Each row has a subtle gold bottom border
- The section has scroll-reveal animation

```html
<details class="py-6 scroll-reveal group" style="transition-delay: 0.2s">
  <summary class="cursor-pointer list-none flex items-center gap-2 select-none">
    <span class="font-ui text-xs font-semibold uppercase tracking-widest text-gold">Word by Word</span>
    <svg class="w-4 h-4 text-gold/60 transition-transform group-open:rotate-90" ...>chevron</svg>
  </summary>
  <div class="mt-4 space-y-3">
    <!-- entries -->
  </div>
</details>
```

- [ ] **Step 2: Verify build**

Run: `cd /root/claudecode/gita-for-kids && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/DhatuBreakdown.astro
git commit -m "feat: make DhatuBreakdown collapsible with details/summary element"
```

---

## Phase 9: Illustration Guidelines (Reference Document)

### Task 23: Write illustration generation guidelines

**Files:**
- Create: `docs/illustration-guidelines.md`

- [ ] **Step 1: Write the character reference and style guide**

Create `docs/illustration-guidelines.md` containing:

1. **Character Reference Sheet** — fixed visual attributes for each recurring character:
   - Dhritarashtra: elderly, white hair/beard, silk blindfold over eyes, gold crown, white/cream royal robes
   - Sanjaya: middle-aged, simple indigo robes, no crown, meditative posture
   - Duryodhana: young warrior, ornate gold crown with red gem, red-gold armor, proud bearing
   - Drona: elderly sage, simple saffron robes, white beard, teaching staff or bow
   - Bhishma: ancient warrior, silver armor, white hair, massive bow, towering stature
   - Arjuna: young warrior, terracotta/saffron armor, distinctive diadem, divine bow Gandiva
   - Krishna: blue-tinged skin, yellow robes, peacock feather crown, flute

2. **Madhubani Style Constraints** (for use in every illustration prompt):
   - Flat perspective — no shading, no atmospheric depth, no 3D rendering
   - Double-line outlines on all figures and objects
   - Horror vacui — fill all blank spaces with patterns (crosshatching, concentric circles, dots, fish motifs, lotus motifs)
   - Figures in strict profile or frontal view, never three-quarter
   - Dense floral and geometric border on all four sides (use image 003 as the standard)
   - No naturalistic sky, ground, or landscape — use patterned flat color fields

3. **Color Palette** (hex values for prompt specification):
   - Saffron #C75B12, Indigo #2D3A87, Terracotta #B85C3A, Forest Green #1A6847, Gold #C4A24E, Cream #FDF6E3
   - "No bright green grass, no blue sky, no purple, no neon colors"

4. **Art Direction Rule**: Always illustrate the verse/mythological scene, not the modern story analogy. Let the text handle modern connections; let the art stay in the mythological world.

5. **Images requiring regeneration** (priority order):
   - 004 (cricket scene) — replace with Duryodhana observing Pandava army
   - 007 (sports huddle) — replace with Duryodhana addressing his commanders
   - 001, 002, 008, 009 — regenerate with stronger Madhubani constraints

6. **Technical specs**: 1408x768 PNG for web, 2816x1536 for print readiness.

- [ ] **Step 2: Commit**

```bash
git add docs/illustration-guidelines.md
git commit -m "docs: add illustration guidelines — character sheet, Madhubani style constraints, regeneration list"
```

---

## Phase 10: Final Verification and Polish

### Task 24: Full build verification and visual review

- [ ] **Step 1: Run full build**

```bash
cd /root/claudecode/gita-for-kids && npm run build
```
Expected: Zero errors.

- [ ] **Step 2: Run preview server**

```bash
npm run preview
```

- [ ] **Step 3: Visual verification checklist**

Check each page:
- [ ] Landing page: hero illustration visible, Om animated, chapter grid styled
- [ ] Chapter 1 index: hero image, verse list with speaker tags
- [ ] Verse 1.1: illustration breaks out of column, Sanskrit is large with gold shadow, story has drop cap, reflection is centered
- [ ] Verse 1.5: new King Shibi story displays correctly, all paragraphs render
- [ ] Verse 1.7: new kabaddi story displays correctly
- [ ] Verse 1.10: new donkey story displays correctly, Duryodhana speaker tag shows
- [ ] Glossary: new character entries appear under correct letters
- [ ] View Transitions: navigate between verses — smooth animation
- [ ] Progress bar: scrolling shows saffron bar at top
- [ ] Scroll reveal: sections animate in as you scroll
- [ ] Mobile: bottom nav visible, touch targets adequate, layout responsive

- [ ] **Step 4: Commit any polish fixes**

```bash
git add -A
git commit -m "polish: final visual adjustments after full review"
```

---

## Execution Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1 | 1-4 | Content fixes (typos, speakers, glossary, dhatu) |
| 2 | 5-8 | Story rewrites and expansions |
| 3 | 9-12 | UI quick wins (View Transitions, paper texture, animations) |
| 4 | 13-17 | Component rewrites (borders, story, meaning, reflection, speaker theming, progress bar) |
| 5 | 18 | Landing page redesign |
| 6 | 19-20 | Navigation improvements |
| 7 | 21 | Chapter index redesign |
| 8 | 22 | DhatuBreakdown enhancement |
| 9 | 23 | Illustration guidelines document |
| 10 | 24 | Final verification |

**Total: 24 tasks across 10 phases. Content phases (1-2) are independent of UI phases (3-8) and can be parallelized.**
