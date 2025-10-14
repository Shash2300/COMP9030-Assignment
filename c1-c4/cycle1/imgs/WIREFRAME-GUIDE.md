# Wireframe Creation Guide

This folder should contain all wireframe images, persona images, and user flow diagrams for Cycle 1.

## Required Images

### User Personas (3 images needed)
- `persona-researcher.png` - Dr. Sarah Mitchell
- `persona-artist.png` - Uncle Tommy Williams
- `persona-tourist.png` - Emma Chen

**What to include:**
- Photo or illustration representing the persona
- Name, age, occupation
- Key quote
- Goals and pain points summary
- Technology comfort indicator

**Tools you can use:**
- Canva (free templates for personas)
- Figma (free design tool)
- PowerPoint/Google Slides
- Hand-drawn and scanned

---

### User Flows (3 diagrams needed)
- `userflow-1-discover-art.png` - Visitor discovers indigenous art
- `userflow-2-submit-art.png` - User submits new art entry
- `userflow-3-admin-moderation.png` - Admin reviews and approves

**What to include:**
- Start and end points clearly marked
- Decision diamonds for choices
- Process boxes for actions
- Arrows showing flow direction
- Different colors for different user types (visitor, user, admin)

**Tools you can use:**
- draw.io / diagrams.net (free, web-based)
- Lucidchart (free tier available)
- Figma / FigJam
- Microsoft Visio
- Hand-drawn and scanned

**Flow Diagram Format:**
```
[Start] → [Action] → {Decision?} → [Yes Action] → [End]
                           ↓
                         [No]
                           ↓
                    [Alternative Action]
```

---

### Wireframes (6 wireframes needed)
- `wireframe-homepage.png`
- `wireframe-art-detail.png`
- `wireframe-submit-form.png`
- `wireframe-dashboard.png`
- `wireframe-browse.png`
- `wireframe-admin-panel.png`

**Important Notes:**
- **Low-fidelity** - Focus on structure, not visual design
- Use grayscale boxes and placeholders
- Label all interactive elements
- Include annotations explaining functionality
- Show responsive breakpoints if possible

**Tools you can use:**
- **Figma** (FREE, highly recommended)
  - https://figma.com
  - Professional wireframing tools
  - Export as PNG

- **Balsamiq** (Trial available)
  - Sketch-style wireframes
  - Quick to create

- **draw.io / diagrams.net** (FREE)
  - Has wireframe shapes
  - Web-based

- **Wireframe.cc** (FREE)
  - Simple online tool
  - Quick wireframes

- **Hand-drawn** (FREE!)
  - Sketch on paper
  - Scan or photograph
  - Actually great for low-fidelity

- **PowerPoint/Google Slides** (FREE)
  - Use shapes and text boxes
  - Export as image

---

## Quick Wireframe Creation Guide

### Using Figma (Recommended - Free):

1. **Sign up** at https://figma.com (free forever)
2. **Create new file** → "Design file"
3. **Add frames** for each page (Desktop: 1440x1024, Mobile: 375x812)
4. **Use rectangles** for content areas
5. **Use text** for labels
6. **Use lines** for borders
7. **Keep it simple** - boxes and text only!
8. **Export** → File → Export → PNG

### Wireframe Tips:

**DO:**
- Use boxes for images (mark with X)
- Label all buttons and links
- Show navigation clearly
- Indicate interactive elements
- Add brief annotations
- Keep it black and white (grayscale)

**DON'T:**
- Use colors (except maybe one highlight color)
- Add detailed graphics
- Include actual images
- Worry about fonts
- Make it "pretty" - it's intentionally rough!

---

## Example Wireframe Structure

### Homepage Wireframe Layout:
```
┌─────────────────────────────────────────┐
│ [Logo]    Nav Nav Nav Nav    [Login]   │  ← Header
├─────────────────────────────────────────┤
│                                         │
│         HERO IMAGE                      │  ← Hero Section
│    Discover Indigenous Art              │
│         [CTA Button]                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│     [Interactive Map View]              │  ← Map Section
│                                         │
├─────────────────────────────────────────┤
│  Recently Added                         │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐           │  ← Featured Art
│  │ X │  │ X │  │ X │  │ X │           │
│  └───┘  └───┘  └───┘  └───┘           │
│  Title  Title  Title  Title            │
├─────────────────────────────────────────┤
│  About | Contact | Privacy             │  ← Footer
└─────────────────────────────────────────┘
```

This is ASCII art - your actual wireframes should be proper images!

---

## Personas Example Format

### Text-based Persona (convert to visual):

```
┌────────────────────────────────────────────┐
│  [Photo]         Dr. Sarah Mitchell       │
│                                            │
│  Age: 42                                   │
│  Location: Adelaide, SA                    │
│  Occupation: Academic Researcher           │
│                                            │
│  "I need a reliable resource that helps    │
│   me conduct respectful research..."       │
│                                            │
│  GOALS:                                    │
│  • Document indigenous art                 │
│  • Access reliable information             │
│  • Respect cultural protocols              │
│                                            │
│  PAIN POINTS:                              │
│  • Scattered information                   │
│  • Unclear access protocols                │
│  • Concerns about cultural respect         │
│                                            │
│  Tech Comfort: ████████░░ (High)          │
└────────────────────────────────────────────┘
```

---

## User Flow Example Format

### Text-based Flow (convert to visual diagram):

```
┌─────────┐
│  START  │
│ (Emma)  │
└────┬────┘
     │
     ▼
┌──────────────────┐
│ Land on Homepage │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ View Map         │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Click Marker     │
└────┬─────────────┘
     │
     ▼
    / \
   /   \
  /  ?  \  Interested?
 ┌───────┐
 │  Yes  │
 └───┬───┘
     │
     ▼
┌──────────────────┐
│ View Detail Page │
└────┬─────────────┘
     │
     ▼
┌─────────┐
│   END   │
│ Success │
└─────────┘
```

---

## Submission Checklist

Before presenting Cycle 1, ensure you have:

- [ ] 3 persona images in this folder
- [ ] 3 user flow diagrams in this folder
- [ ] 6 wireframe images in this folder
- [ ] All images referenced correctly in cycle1.md
- [ ] Images are clear and readable
- [ ] File names match exactly what's in cycle1.md

---

## Need Help?

**Quick Option - Hand Drawn:**
1. Print the text descriptions from cycle1.md
2. Sketch wireframes on paper based on descriptions
3. Take clear photos or scan
4. Save as PNG files with correct names

**Digital Option - Figma:**
1. Watch 10-minute Figma tutorial on YouTube
2. Create simple boxes and text
3. Takes about 2-3 hours for all 6 wireframes
4. Export as PNG

**Time-Saving Option - Use Templates:**
1. Search "wireframe template" on Figma Community
2. Duplicate a template
3. Customize for your pages
4. Export

---

*Remember: Wireframes are meant to be simple! Don't overthink it. Focus on layout and functionality, not beauty.*
