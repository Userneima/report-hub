---
name: web-ppt-report
description: Use when creating, optimizing, reviewing, or maintaining web-based PPT/report presentations for class or product research. Applies to React/Vite long-form slide reports, report-hub reports, projection-readable Chinese decks, and tasks involving slide density, narrative structure, evidence enrichment, or report QA.
---

# Web PPT Report

Use this skill for web-native presentation reports, especially `report-hub/reports/*`.

## Core Workflow

1. Start from the grading goal or audience decision need, not from page count or UI components.
2. Map the report into 4-6 scoring/narrative modules before editing pages.
3. For every thin page, actively enrich with verified facts, diagrams, comparisons, scenarios, evidence boundaries, or concise tables.
4. Implement in the existing report structure; avoid creating a new repository or desktop launcher.
5. Validate by rendering/opening the report, not only by reading code.

## Slide Quality Rules

- Chinese body text must be projection-readable. If the page has empty space, increase type scale, improve composition, or add meaningful content.
- Cards are not decoration. If a card contains only one short sentence, either enrich it or remove/restructure the card.
- Avoid large blank containers, tiny captions, sparse six-card grids, and screenshots that are too small to interpret.
- Each page should have one clear claim, one visual structure, and enough evidence to feel like a finished presentation page.
- Preserve source boundaries: label facts, analogies, assumptions, and inferred industry roles clearly.

## Content Enrichment Patterns

- Product reports: add specifications, usage scenarios, teardown structure, user value, market signal, ecosystem role, and risk boundary.
- AI product reports: separate device-side capture, cloud model processing, workflow integration, privacy/security, and user-facing output.
- Partnership reports: clarify who contributes hardware, software, channels, supply chain, data, and ecosystem access.
- Summary pages: synthesize into competitive advantage, core value, future direction, and one memorable concluding sentence.

## File Rules

- Main report source lives under `reports/<report-id>/`.
- Use `report-hub.config.json` as the source of truth for title, path, entry, and commands.
- Keep `dist/` when the report must open from the hub without rebuilding.
- Do not keep per-report `.app`, `.command`, `.bat`, `.ps1`, screenshots, dev-server logs, `.DS_Store`, or duplicate handoff notes.
- Run `npm run audit` and `npm run check` after cleanup or structure edits.

## QA Checklist

- Does every major page answer a grading point or narrative need?
- Are thin pages enriched rather than merely resized?
- Are Chinese headings, body text, chart labels, and footnotes readable on a projector?
- Are images large enough and directly related to the claim?
- Is the report opened from the hub after changes?
- Are sources and inference boundaries visible where claims could be challenged?
