# Dhruv Mandalik Portfolio

A dark, data-driven personal portfolio site built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and an interactive SVG experience tree.

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Vercel-ready project structure

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

To verify a production build:

```bash
npm run build
```

## Editing Content

Most site content is centralized in `src/data`.

- `src/data/site.ts`: name, navigation, contact links, hero buttons, and skill groups
- `src/data/experiences.ts`: experience tree entries, branch paths, node positions, labels, colors, and descriptions
- `src/data/projects.ts`: featured project cards and links
- `src/data/notes.ts`: learning log teaser entries

The experience tree is intentionally coordinate-driven. To tune the tree, edit each experience's `branchPath`, `node`, and `label` values in `src/data/experiences.ts`.

## Experience Tree

The tree is implemented as SVG components:

- `src/components/experience-tree/ExperienceTree.tsx`
- `src/components/experience-tree/ExperienceBranch.tsx`
- `src/components/experience-tree/ExperienceCard.tsx`
- `src/components/experience-tree/TreeDefs.tsx`

It supports hover, focus, and tap selection. Motion is reduced automatically for users who prefer reduced motion.

To edit the tree:

- Update `src/data/experiences.ts` for content, branch paths, branch wisps, label positions, and active-card metadata.
- Update `src/data/treeStrands.ts` for the electric trunk filament paths, root/crown threads, and spark points.
- Update `TreeDefs.tsx` for SVG filters and gradients.
- Update `src/app/globals.css` and `tailwind.config.ts` for pulse, draw-in, and shimmer animations.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings:
   - Build command: `npm run build`
   - Install command: `npm install`
   - Output directory: `.next`

## GitHub Push Instructions

```bash
git init
git add .
git commit -m "Initial portfolio site with interactive experience tree"
git branch -M main
git remote add origin <MY_GITHUB_REPO_URL>
git push -u origin main
```

Recommended follow-up commits:

- `Add experience tree interactions`
- `Refine responsive layout`
- `Add project data`
- `Tune tree glow animations`
