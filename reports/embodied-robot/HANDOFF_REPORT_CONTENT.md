# Report Content Handoff Guide

This app currently uses placeholder bilingual content in `src/data/content/reportContent.ts`.
Use this guide to replace it safely with your final research data.

## 1) Where to edit

- Main content object: `sectionContent`
- Chart datasets:
  - `marketTrendData`
  - `capabilityRadarData`

Do not rename chapter IDs unless you also update `src/data/chapters.ts` and section rendering logic.

## 2) Bilingual text format rules

Most text fields use this shape:

```ts
{ zh: '中文文案', en: 'English copy' }
```

Fields that require bilingual objects include:

- `intro`
- every item inside `bullets`
- table headers and cells (`table.headers`, `table.rows`)
- scenario title/description
- competitor role/note/strengths
- reference title

Keep both languages populated to avoid blank UI when toggling language.

## 3) Section-by-section checklist

For each section in `sectionContent`:

1. Confirm `id` matches a chapter ID in `src/data/chapters.ts`.
2. Replace `intro` and `bullets` with validated content.
3. If used by that section, update structured blocks:
   - `stats`
   - `table`
   - `scenarios`
   - `competitors`
   - `references`
4. Keep arrays non-empty when the section component expects content.

## 4) Table updates (newly added)

Two key tables are now part of the report:

- `sectionContent.landscape.table` (competitive landscape comparison)
- `sectionContent.models.table` (collaboration model matrix)

When updating these tables:

- Keep column counts consistent across all rows.
- Keep each cell concise for mobile readability.
- Use plain text values (no HTML).

## 5) Numeric data updates

- `marketTrendData` drives the market area chart.
- `capabilityRadarData` drives the capability radar chart.

Recommended checks:

- Keep yearly labels ordered.
- Use numeric values only.
- Preserve key names expected by charts (`global`, `china`, `us`, `fullMark`).

## 6) Validation before handoff

After replacing data, run:

```bash
npm run lint
npm run build
```

Then spot-check in browser:

- Language toggle shows both zh/en values.
- Competitive and collaboration tables render correctly.
- Mobile chapter drawer opens, navigates, and closes.
- No section appears empty unexpectedly.
