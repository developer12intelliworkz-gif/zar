# Home Page 3D Models Section - Implementation Plan

## Objective
Add a new homepage section directly below `CollectionShowcase` with:
- Heading
- Subtitle
- Responsive grid of 4 interactive 3D model cards

Model files to render:
- `images/models/zar-1.glb`
- `images/models/zar-2.glb`
- `images/models/zar-3.glb`
- `images/models/zar-4.glb`

## Recommended Library
Use `@google/model-viewer` (web component) for reliable GLB rendering with user interaction and low integration complexity in Next.js.

Why this choice:
- Native support for `.glb`
- Orbit controls (rotate/zoom/pan) out of the box
- Works well for product-style interactive previews
- Minimal React wrapper code required

## Dependencies to Install
Run in project root (`d:\zar\zar`):

```bash
npm install @google/model-viewer
```

## Planned File Changes
1. Create new section component:
- `src/components/ui/organisms/ModelShowcaseSection/ModelShowcaseSection.tsx`

2. Create styling module for layout and cards:
- `src/components/ui/organisms/ModelShowcaseSection/ModelShowcaseSection.module.css`

3. Add lightweight TS type declarations for custom element attributes (if needed by TS):
- `src/types/model-viewer.d.ts`

4. Insert section into homepage below `CollectionShowcase`:
- Update `src/app/page.tsx`

## Section Structure
- Container section with spacing consistent with existing homepage rhythm
- Heading and subtitle block (center aligned)
- Responsive 4-card grid:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Each card includes:
  - Interactive model viewer
  - Optional model label (if you want names under each model)

## Interaction Requirements
Each model card should support:
- Drag to rotate
- Scroll/pinch to zoom
- Smooth camera controls
- Neutral background and bounded height for visual consistency

Proposed viewer settings:
- `camera-controls`
- `touch-action="pan-y"`
- `auto-rotate` optional (can be enabled/disabled by your preference)
- `loading="lazy"` for performance

## Accessibility and Performance
- Add descriptive `alt` text per model
- Use fixed-height wrappers to avoid layout shift
- Lazy load models where possible
- Keep section semantic (`section`, heading hierarchy)

## Validation Checklist
- Section appears immediately below `CollectionShowcase`
- 4 models render correctly from provided paths
- Models are interactive on desktop and mobile
- No TypeScript or lint errors
- Layout responsive across breakpoints

## Approval Gate
Before implementation starts:
1. Approve use of `@google/model-viewer`
2. Approve section naming (`ModelShowcaseSection`)
3. Confirm whether `auto-rotate` should be enabled by default

After approval, I will:
1. Install dependency
2. Create component and styles
3. Wire section into `src/app/page.tsx`
4. Run quick error validation
