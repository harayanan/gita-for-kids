# Illustration Guidelines — Gita for Kids

This document defines the visual standards for all illustrations in the Gita for Kids series. Every illustration prompt must reference these guidelines to maintain series cohesion.

---

## 1. Character Reference Sheet

Use these fixed visual attributes in every illustration prompt that includes the corresponding character.

| Character | Age/Build | Clothing | Crown/Headwear | Other |
|-----------|-----------|----------|----------------|-------|
| **Dhritarashtra** | Elderly, stout | White/cream royal silk robes | Gold crown | Silk blindfold over eyes; seated on throne; white hair and beard |
| **Sanjaya** | Middle-aged | Simple indigo robes, no armor | None | No crown; meditative seated posture; wise, calm eyes |
| **Duryodhana** | Young warrior (25–30), strong jaw, proud bearing | Red-gold armor over yellow silk | Ornate gold crown with red gem | Strong, muscular build |
| **Drona** | Elderly sage (60+) | Simple saffron robes | None | Long white beard; teaching staff or bow; calm authority |
| **Bhishma** | Ancient warrior (80+), towering stature | Silver armor | Flowing white hair (no crown) | Massive bow; weathered face with kind eyes |
| **Arjuna** | Young warrior (25), lean and athletic | Terracotta/saffron armor | Distinctive diadem/headband | Holds divine bow Gandiva |
| **Krishna** | Youthful, graceful | Yellow silk robes | Peacock feather in crown | Blue-tinged skin; divine smile; flute at waist |

---

## 2. Madhubani Style Constraints

Include ALL of the following phrases in every illustration prompt, verbatim:

- "Madhubani (Mithila) folk art style"
- "Flat perspective — NO shading, NO atmospheric depth, NO 3D rendering, NO gradients"
- "Double-line outlines on all figures and objects"
- "Horror vacui — fill ALL blank spaces with traditional patterns: crosshatching, concentric circles, dots, fish motifs, lotus motifs, geometric fills"
- "Figures in strict profile OR frontal view, NEVER three-quarter view"
- "Dense floral and geometric border on all four sides"
- "No naturalistic sky, ground, or landscape — use patterned flat color fields"
- "Bharni (filled) style of Madhubani painting"

---

## 3. Color Palette

Specify all of the following in every prompt:

| Color | Hex |
|-------|-----|
| Saffron | `#C75B12` |
| Indigo | `#2D3A87` |
| Terracotta | `#B85C3A` |
| Forest Green | `#1A6847` |
| Gold | `#C4A24E` |
| Cream (background) | `#FDF6E3` |

Also include this negative constraint in every prompt:

> "NO bright green grass, NO blue sky, NO purple, NO neon colors, NO black backgrounds"

---

## 4. Art Direction Rule

> "Always illustrate the verse/mythological scene, NOT the modern story analogy. Let the text handle modern connections; let the art stay in the mythological world."

The modern analogies (cricket, sports, school) exist only in the narrative text. The illustrations must depict the Mahabharata scene described by the verse — chariots, warriors, bows, the Kurukshetra battlefield, palaces, and mythological settings.

---

## 5. Images Requiring Regeneration (Priority Order)

| Priority | Image | Current Issue | Replacement Scene |
|----------|-------|---------------|-------------------|
| HIGH | `004.png` | Modern cricket scene breaks series | Duryodhana observing Pandava army formations from his chariot, warriors with bows on both sides |
| HIGH | `007.png` | Modern sports huddle breaks series | Duryodhana standing center, addressing his commanders (Drona, Bhishma, Karna) arranged around him |
| MEDIUM | `001.png` | Rajput miniature style, lacks Madhubani | Dhritarashtra on throne, Sanjaya kneeling, battlefield visible through arch — in flat Madhubani style |
| MEDIUM | `002.png` | Naturalistic tree/landscape | Duryodhana approaching Drona under Madhubani Tree of Life with patterned leaves |
| MEDIUM | `008.png` | Naturalistic sunset | Bhishma towering figure with bow, Madhubani patterned background, smaller Devavrata vow scene inset |
| MEDIUM | `009.png` | Naturalistic cliff landscape | Servant carrying king up stylized patterned cliff, Madhubani flat rendering |
| LOW | `003.png` | Already good — minor refinements | Add more Madhubani fill patterns to warriors' clothing |
| LOW | `006.png` | Already good — minor refinements | Ensure Abhimanyu's design connects to Arjuna's |
| LOW | `005.png` | Good — minor refinements | Strengthen warrior connection in medallions |
| LOW | `010.png` | Good — minor refinements | Push soldiers further into flat Madhubani profile |

---

## 6. Series Cohesion Rules

- Use image `003.png` (Drona between armies) as the **stylistic North Star** for all new and regenerated images.
- Border style must match across all images — use `003.png`'s dense floral border as the template.
- Character designs must be consistent across all illustrations — reference the character sheet in Section 1 in every prompt.
- When multiple images share a character, verify the design matches before finalizing.

---

## 7. Technical Specs

| Use | Dimensions | Format |
|-----|-----------|--------|
| Web | 1408 × 768 px | PNG |
| Print-ready | 2816 × 1536 px (2× for A4 book) | PNG |

- **File naming:** `{verse_number}.png` — zero-padded two digits (e.g., `001.png`, `010.png`)
- **Location:** `public/illustrations/{chapter-slug}/`
  - Example: `public/illustrations/01-arjuna-vishada-yoga/001.png`
