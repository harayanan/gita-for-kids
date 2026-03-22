#!/usr/bin/env node
/**
 * generate-illustration.mjs
 *
 * Generates folk art illustrations for the Gita for Kids project
 * using the Gemini image generation API. Supports multiple art styles
 * (Madhubani, Pichwai, Pattachitra, Warli, Kalamkari) based on the
 * chapter's meta.yaml `folk_art_style` field.
 *
 * Usage:
 *   node scripts/generate-illustration.mjs --chapter 12 --verse 1
 *   node scripts/generate-illustration.mjs --chapter 12 --batch 1-20
 *   node scripts/generate-illustration.mjs --verse 11                  (defaults to chapter 1)
 *   node scripts/generate-illustration.mjs --verse 4 --regenerate
 *   node scripts/generate-illustration.mjs --batch 11-20 --dry-run
 *
 * API key is read from /root/claudecode/mutual-fund-dost/.env.local
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const API_KEY_FILE = '/root/claudecode/mutual-fund-dost/.env.local';
const CHAPTERS_DIR = join(PROJECT_ROOT, 'content', 'chapters');
const GUIDELINES_FILE = join(PROJECT_ROOT, 'docs', 'illustration-guidelines.md');

// Gemini image generation models (tried in order)
// gemini-3.1-flash-image-preview = "Nano Banana 2" (matches reference implementation)
// gemini-2.5-flash-image = "Nano Banana" (slightly older, broader availability)
const IMAGE_MODELS = [
  'gemini-3.1-flash-image-preview',
  'gemini-2.5-flash-image',
  'gemini-3-flash-preview',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readApiKey() {
  if (!existsSync(API_KEY_FILE)) {
    throw new Error(`API key file not found: ${API_KEY_FILE}`);
  }
  const contents = readFileSync(API_KEY_FILE, 'utf-8');
  const match = contents.match(/^GEMINI_API_KEY=(.+)$/m);
  if (!match) {
    throw new Error('GEMINI_API_KEY not found in .env.local');
  }
  return match[1].trim();
}

/**
 * Resolve a chapter identifier (number or slug) to { slug, versesDir, outputDir, meta }.
 */
function resolveChapterSync(chapterArg) {
  const entries = readdirSync(CHAPTERS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  let slug;
  if (/^\d+$/.test(chapterArg)) {
    // Numeric: find directory starting with zero-padded number
    const padded = String(chapterArg).padStart(2, '0');
    slug = entries.find(e => e.startsWith(padded + '-'));
    if (!slug) throw new Error(`No chapter directory found for number ${chapterArg}`);
  } else {
    slug = entries.find(e => e === chapterArg);
    if (!slug) throw new Error(`Chapter directory not found: ${chapterArg}`);
  }

  const metaPath = join(CHAPTERS_DIR, slug, 'meta.yaml');
  if (!existsSync(metaPath)) {
    throw new Error(`meta.yaml not found: ${metaPath}`);
  }
  const metaRaw = readFileSync(metaPath, 'utf-8');
  const meta = {};
  for (const field of ['number', 'slug', 'name', 'folk_art_style', 'verse_count']) {
    const m = metaRaw.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
    if (m) meta[field] = m[1].trim();
  }

  return {
    slug,
    versesDir: join(CHAPTERS_DIR, slug, 'verses'),
    outputDir: join(PROJECT_ROOT, 'public', 'illustrations', slug),
    meta,
  };
}

// ---------------------------------------------------------------------------
// Folk art style prompt blocks
// ---------------------------------------------------------------------------

const STYLE_PROMPTS = {
  madhubani: {
    name: 'Madhubani (Mithila)',
    prompt: `STYLE REQUIREMENTS (CRITICAL — follow every rule exactly):
- Madhubani (Mithila) folk art style
- Flat perspective — NO shading, NO atmospheric depth, NO 3D rendering, NO gradients
- Double-line outlines on all figures and objects
- Horror vacui — fill ALL blank spaces with traditional patterns: crosshatching, concentric circles, dots, fish motifs, lotus motifs, geometric fills
- Figures in strict profile OR frontal view, NEVER three-quarter view
- Dense floral and geometric border on all four sides
- No naturalistic sky, ground, or landscape — use patterned flat color fields
- Bharni (filled) style of Madhubani painting
- Always illustrate the verse/mythological scene, NOT any modern story analogy`,
  },
  pichwai: {
    name: 'Pichwai (Nathdwara)',
    prompt: `STYLE REQUIREMENTS (CRITICAL — follow every rule exactly):
- Pichwai painting style from Nathdwara, Rajasthan
- Rich, detailed, devotional composition centered on Krishna
- Flat perspective — NO shading, NO atmospheric depth, NO 3D rendering
- Intricate lotus pond motifs, cows, peacocks, flowering trees where relevant
- Dense floral patterns filling all empty spaces (horror vacui)
- Figures in strict profile OR frontal view, NEVER three-quarter view
- Ornamental border with lotus, paisley, or floral chain on all four sides
- Rich jewel-tone palette with gold accents
- Devotional, sacred atmosphere — temple painting aesthetic
- Always illustrate the verse/mythological scene, NOT any modern story analogy`,
  },
  pattachitra: {
    name: 'Pattachitra (Odisha)',
    prompt: `STYLE REQUIREMENTS (CRITICAL — follow every rule exactly):
- Pattachitra folk art style from Odisha
- Flat perspective — NO shading, NO atmospheric depth, NO 3D rendering
- Bold black outlines on all figures with intricate internal detailing
- Horror vacui — fill ALL spaces with fine cross-hatching, floral scrolls, geometric patterns
- Figures in strict profile OR frontal view, NEVER three-quarter view
- Multi-layered ornamental border (typically 3-4 nested frames)
- No naturalistic sky or landscape — use patterned flat color fields
- Narrative panel composition showing a single key scene
- Always illustrate the verse/mythological scene, NOT any modern story analogy`,
  },
  warli: {
    name: 'Warli (Maharashtra)',
    prompt: `STYLE REQUIREMENTS (CRITICAL — follow every rule exactly):
- Warli tribal folk art style from Maharashtra
- Simple white stick figures and geometric shapes on a terracotta/earth-tone background
- Flat perspective — NO shading, NO atmospheric depth, NO 3D rendering
- Figures made from basic geometric shapes (triangles for bodies, circles for heads)
- Scenes composed in circular or processional arrangements
- Decorative border of simple geometric chain patterns
- Minimalist aesthetic — the beauty is in simplicity and rhythm
- Fill spaces with small dots, spirals, and simple plant motifs
- Always illustrate the verse/mythological scene, NOT any modern story analogy`,
  },
  kalamkari: {
    name: 'Kalamkari (Andhra Pradesh)',
    prompt: `STYLE REQUIREMENTS (CRITICAL — follow every rule exactly):
- Kalamkari painting style from Andhra Pradesh (Srikalahasti or Machilipatnam school)
- Flat perspective — NO shading, NO atmospheric depth, NO 3D rendering
- Fine pen-drawn outlines with natural dye color fills
- Elaborate scrolling vine and floral borders on all four sides
- Figures in strict profile OR frontal view, NEVER three-quarter view
- Dense botanical patterns (flowers, leaves, vines) filling all empty spaces
- Tree of Life motif where compositionally appropriate
- Narrative mythological scenes with rich textile-like patterning
- Always illustrate the verse/mythological scene, NOT any modern story analogy`,
  },
};

/**
 * Minimal YAML parser — handles only the simple key: value and block-scalar
 * formats used in the verse files. Not a general-purpose parser.
 */
function parseVerseYaml(raw) {
  const result = {};

  // Extract `meaning` block scalar (> style)
  const meaningMatch = raw.match(/^meaning:\s*>\s*\n((?:[ \t]+.+\n?)+)/m);
  if (meaningMatch) {
    result.meaning = meaningMatch[1]
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .join(' ');
  }

  // Extract `story.title`
  const storyTitleMatch = raw.match(/^\s+title:\s*"(.+?)"/m);
  if (storyTitleMatch) {
    result.story_title = storyTitleMatch[1];
  }

  // Simple scalar fields
  const scalarFields = ['chapter', 'verse', 'speaker'];
  for (const field of scalarFields) {
    const m = raw.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
    if (m) result[field] = m[1].trim();
  }

  return result;
}

function readVerseData(verseNum, versesDir) {
  const paddedNum = String(verseNum).padStart(3, '0');
  const yamlPath = join(versesDir, `${paddedNum}.yaml`);
  if (!existsSync(yamlPath)) {
    throw new Error(`Verse YAML not found: ${yamlPath}`);
  }
  const raw = readFileSync(yamlPath, 'utf-8');
  const data = parseVerseYaml(raw);
  data.verse_number = verseNum;
  data.padded_number = paddedNum;
  return data;
}

// ---------------------------------------------------------------------------
// Character reference sheet (from illustration-guidelines.md)
// ---------------------------------------------------------------------------

const CHARACTER_REFS = {
  dhritarashtra: `Dhritarashtra: Elderly stout king, white/cream royal silk robes, gold crown, silk blindfold over eyes, seated on throne, white hair and beard.`,
  sanjaya: `Sanjaya: Middle-aged advisor, simple indigo robes (no armor, no crown), meditative seated posture, wise and calm eyes.`,
  duryodhana: `Duryodhana: Young warrior (25-30), strong jaw, proud bearing, red-gold armor over yellow silk, ornate gold crown with red gem, strong muscular build.`,
  drona: `Drona: Elderly sage (60+), simple saffron robes, no crown, long white beard, teaching staff or bow, calm authority.`,
  bhishma: `Bhishma: Ancient warrior (80+), towering stature, silver armor, flowing white hair (no crown), massive bow, weathered face with kind eyes.`,
  arjuna: `Arjuna: Young warrior (25), lean and athletic, terracotta/saffron armor, distinctive diadem/headband, holds divine bow Gandiva.`,
  krishna: `Krishna: Youthful graceful figure, yellow silk robes, peacock feather in crown, blue-tinged skin, divine smile, flute at waist.`,
};

// Map speaker field values to character keys
const SPEAKER_MAP = {
  dhritarashtra: 'dhritarashtra',
  sanjaya: 'sanjaya',
  duryodhana: 'duryodhana',
  drona: 'drona',
  bhishma: 'bhishma',
  arjuna: 'arjuna',
  krishna: 'krishna',
};

/**
 * Determine which characters are relevant for a given verse.
 * Always includes the speaker. Attempts to infer others from the meaning text.
 */
function getRelevantCharacters(verseData) {
  const characters = new Set();

  // Always include the speaker
  const speakerKey = SPEAKER_MAP[verseData.speaker?.toLowerCase()];
  if (speakerKey) characters.add(speakerKey);

  // Infer additional characters from meaning text
  const meaning = (verseData.meaning || '').toLowerCase();
  if (meaning.includes('bhishma') || meaning.includes('grandsire')) characters.add('bhishma');
  if (meaning.includes('drona') || meaning.includes('teacher')) characters.add('drona');
  if (meaning.includes('arjuna')) characters.add('arjuna');
  if (meaning.includes('krishna')) characters.add('krishna');
  if (meaning.includes('duryodhana')) characters.add('duryodhana');
  if (meaning.includes('sanjaya')) characters.add('sanjaya');
  if (meaning.includes('dhritarashtra') || meaning.includes('blind king')) characters.add('dhritarashtra');

  return Array.from(characters).map(k => CHARACTER_REFS[k]).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Prompt construction
// ---------------------------------------------------------------------------

function buildSceneDescription(verseData, chapterMeta) {
  const { verse_number, speaker, meaning, story_title } = verseData;
  const chapterNum = chapterMeta.number || '?';
  const chapterName = chapterMeta.name || '';
  const speakerName = speaker
    ? speaker.charAt(0).toUpperCase() + speaker.slice(1)
    : 'Unknown';

  return `Chapter ${chapterNum} (${chapterName}), Verse ${verse_number} of the Bhagavad Gita.
Speaker: ${speakerName}.
Scene: ${meaning}
Story theme: "${story_title || 'N/A'}"

Illustrate the MYTHOLOGICAL scene — divine figures, ancient India settings, sacred landscapes. Do NOT illustrate any modern analogy or contemporary scene.`;
}

function buildPrompt(verseData, chapterMeta) {
  const characters = getRelevantCharacters(verseData);
  const scene = buildSceneDescription(verseData, chapterMeta);
  const artStyle = chapterMeta.folk_art_style || 'madhubani';
  const styleConfig = STYLE_PROMPTS[artStyle] || STYLE_PROMPTS.madhubani;

  const characterBlock = characters.length > 0
    ? `\nCHARACTERS (use these exact visual attributes):\n${characters.map(c => `- ${c}`).join('\n')}\n`
    : '';

  return `Create a ${styleConfig.name} folk art style illustration for a children's book about the Bhagavad Gita.

SCENE:
${scene}
${characterBlock}
${styleConfig.prompt}

COLOR PALETTE (use ONLY these six colors):
- Saffron/orange: #C75B12
- Deep indigo/blue: #2D3A87
- Terracotta/brown: #B85C3A
- Forest green: #1A6847
- Gold/amber: #C4A24E
- Cream background: #FDF6E3
- NO bright green grass, NO blue sky, NO purple, NO neon colors, NO black backgrounds

CRITICAL — NO TEXT IN THE IMAGE:
- Do NOT include any words, letters, labels, captions, titles, chapter numbers, or color swatches
- Do NOT render any text overlays, legends, or annotations
- The image must contain ONLY the illustration — pure artwork with no text whatsoever

SERIES COHESION:
- Use the style of classic ${styleConfig.name} paintings as your reference
- Border must be dense with traditional motifs matching the series style

FORMAT: Landscape orientation 16:9 aspect ratio (1408×768 px), suitable for full-width web display in a children's book.`.trim();
}

// ---------------------------------------------------------------------------
// Gemini API call
// ---------------------------------------------------------------------------

async function generateImageWithRetry(prompt, apiKey, maxRetries = 3) {
  const models = IMAGE_MODELS;

  for (const model of models) {
    console.log(`  Trying model: ${model}`);
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const body = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          // If model not found, try the next model immediately
          if (response.status === 404) {
            console.warn(`  Model ${model} not found (404), trying fallback...`);
            break; // break inner retry loop, try next model
          }
          // Rate limit — back off and retry
          if (response.status === 429) {
            const delay = Math.pow(2, attempt) * 2000;
            console.warn(`  Rate limited. Retrying in ${delay / 1000}s...`);
            await new Promise(r => setTimeout(r, delay));
            continue;
          }
          throw new Error(`API error ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        // Extract base64 image from response parts
        const parts = data?.candidates?.[0]?.content?.parts ?? [];
        for (const part of parts) {
          if (part?.inlineData?.data) {
            return { base64: part.inlineData.data, mimeType: part.inlineData.mimeType || 'image/png', model };
          }
        }

        // If we got a response but no image data, log the text response
        const textParts = parts.filter(p => p.text).map(p => p.text).join(' ');
        if (textParts) {
          console.warn(`  Model returned text instead of image: ${textParts.slice(0, 200)}`);
        }
        throw new Error('No image data in response');

      } catch (err) {
        if (attempt < maxRetries - 1 && !err.message.includes('API error')) {
          const delay = Math.pow(2, attempt) * 1000;
          console.warn(`  Attempt ${attempt + 1} failed: ${err.message}. Retrying in ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
        } else {
          throw err;
        }
      }
    }
  }

  throw new Error('All models and retries exhausted');
}

// ---------------------------------------------------------------------------
// Save image
// ---------------------------------------------------------------------------

function saveImage(base64Data, outputPath) {
  mkdirSync(dirname(outputPath), { recursive: true });
  const buffer = Buffer.from(base64Data, 'base64');
  writeFileSync(outputPath, buffer);
  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`  Saved: ${outputPath} (${kb} KB)`);
}

// ---------------------------------------------------------------------------
// Core: generate one verse illustration
// ---------------------------------------------------------------------------

async function generateIllustration(verseNum, chapter, options = {}) {
  const { regenerate = false, dryRun = false } = options;

  console.log(`\n=== Chapter ${chapter.meta.number}, Verse ${verseNum} ===`);

  const verseData = readVerseData(verseNum, chapter.versesDir);
  console.log(`  Speaker: ${verseData.speaker}`);
  console.log(`  Story: "${verseData.story_title}"`);
  console.log(`  Art style: ${chapter.meta.folk_art_style}`);

  const outputPath = join(chapter.outputDir, `${verseData.padded_number}.png`);

  // Check if already exists (skip unless --regenerate)
  if (existsSync(outputPath) && !regenerate) {
    console.log(`  Skipping (already exists). Use --regenerate to overwrite.`);
    return { skipped: true, path: outputPath };
  }

  const prompt = buildPrompt(verseData, chapter.meta);

  console.log('\n--- PROMPT ---');
  console.log(prompt);
  console.log('--- END PROMPT ---\n');

  if (dryRun) {
    console.log('  [dry-run] Skipping API call.');
    return { dryRun: true, prompt };
  }

  const apiKey = readApiKey();

  console.log('  Calling Gemini API...');
  const startTime = Date.now();

  const { base64, mimeType, model } = await generateImageWithRetry(prompt, apiKey);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`  Success via ${model} in ${elapsed}s (mimeType: ${mimeType})`);

  saveImage(base64, outputPath);
  return { success: true, path: outputPath, model, elapsed };
}

// ---------------------------------------------------------------------------
// Batch mode
// ---------------------------------------------------------------------------

async function generateBatch(rangeStr, chapter, options = {}) {
  const match = rangeStr.match(/^(\d+)-(\d+)$/);
  if (!match) {
    throw new Error(`Invalid batch range: "${rangeStr}". Use format like "11-20".`);
  }
  const from = parseInt(match[1], 10);
  const to = parseInt(match[2], 10);

  if (from > to) throw new Error('Batch range start must be <= end.');

  console.log(`\nBatch mode: Chapter ${chapter.meta.number}, verses ${from} to ${to} (${chapter.meta.folk_art_style} style)`);
  const results = [];

  for (let v = from; v <= to; v++) {
    try {
      const result = await generateIllustration(v, chapter, options);
      results.push({ verse: v, ...result });
    } catch (err) {
      console.error(`  ERROR for verse ${v}: ${err.message}`);
      results.push({ verse: v, error: err.message });
    }

    // Polite delay between API calls to avoid rate limits
    if (v < to) {
      console.log('  Waiting 3s before next request...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log('\n=== Batch Summary ===');
  for (const r of results) {
    if (r.error) {
      console.log(`  Verse ${r.verse}: ERROR — ${r.error}`);
    } else if (r.skipped) {
      console.log(`  Verse ${r.verse}: skipped (already exists)`);
    } else if (r.dryRun) {
      console.log(`  Verse ${r.verse}: dry-run`);
    } else {
      console.log(`  Verse ${r.verse}: OK — ${r.path}`);
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    chapter: null,
    verse: null,
    batch: null,
    regenerate: false,
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--chapter':
        opts.chapter = args[++i];
        break;
      case '--verse':
        opts.verse = parseInt(args[++i], 10);
        break;
      case '--batch':
        opts.batch = args[++i];
        break;
      case '--regenerate':
        opts.regenerate = true;
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      default:
        console.warn(`Unknown argument: ${args[i]}`);
    }
  }

  return opts;
}

function printUsage() {
  console.log(`
Usage:
  node scripts/generate-illustration.mjs --chapter <N|slug> --verse <N>
  node scripts/generate-illustration.mjs --chapter <N|slug> --batch <from>-<to>
  node scripts/generate-illustration.mjs --verse <N>                (defaults to chapter 1)
  node scripts/generate-illustration.mjs --verse <N> --regenerate
  node scripts/generate-illustration.mjs --batch <from>-<to> --dry-run

Examples:
  node scripts/generate-illustration.mjs --chapter 12 --verse 1
  node scripts/generate-illustration.mjs --chapter 12 --batch 1-20
  node scripts/generate-illustration.mjs --verse 11
  node scripts/generate-illustration.mjs --verse 4 --regenerate
  node scripts/generate-illustration.mjs --batch 11-20
`.trim());
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv);

  if (!opts.verse && !opts.batch) {
    printUsage();
    process.exit(1);
  }

  // Resolve chapter (default to 1 for backward compatibility)
  const chapterArg = opts.chapter || '1';
  const chapter = resolveChapterSync(chapterArg);
  console.log(`Chapter: ${chapter.meta.number} — ${chapter.meta.name} (${chapter.slug})`);
  console.log(`Art style: ${chapter.meta.folk_art_style}`);

  if (opts.verse) {
    if (isNaN(opts.verse) || opts.verse < 1) {
      console.error('Error: --verse must be a positive integer.');
      process.exit(1);
    }
    await generateIllustration(opts.verse, chapter, { regenerate: opts.regenerate, dryRun: opts.dryRun });
  } else if (opts.batch) {
    await generateBatch(opts.batch, chapter, { regenerate: opts.regenerate, dryRun: opts.dryRun });
  }
}

main().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
