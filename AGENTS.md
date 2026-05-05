# Report Hub Working Rules

Default language: Chinese. Code, commands, and variable names stay in English.

## Purpose

This repository is the single management layer for web-based presentation reports.

Do not create one new desktop launcher or one new GitHub repository for every report unless there is a clear reason. Prefer adding a report entry to `report-hub.config.json`.

For web-based PPT/report work, use the `web-ppt-report` skill. The repository copy lives at `skills/web-ppt-report/SKILL.md`, and the active local copy is installed under `/Users/yuchao/.agents/skills/web-ppt-report/SKILL.md`.

## Structure

- `hub/`: the unified browser interface.
- `scripts/`: local automation for launching, checking, building, and archiving reports.
- `report-hub.config.json`: the source of truth for report metadata and paths.
- `templates/`: reusable report templates and prompt notes.
- `packages/report-ui/`: shared UI/presentation conventions.
- `archive/`: compressed outputs after a report is finished.

## Report Workspace Shape

Every report should keep research and assets inside its own folder:

- `0.brief/brief.md`: topic, audience, grading points, narrative modules, and page plan.
- `1.research/notes.md`: AI drafts, research notes, verified facts, open questions, and links.
- `2.assets/raw/`: user-downloaded original images, PDFs, videos, and screenshots.
- `2.assets/selected/`: assets selected and renamed for likely use.
- `2.assets/sources.md`: source URL, use, status, and notes for each external asset.
- `public/media/`: only final media files referenced by the web page.

Do not put downloaded assets on the desktop, in `src/`, or in random root folders. If the user provides an image, first place it under `2.assets/raw/`, then select/copy the final version to `public/media/` before referencing it in code.

## Report Rules

- Each report should have a stable `id`, `title`, `path`, `entry`, and optional `repo`.
- Prefer `dist/index.html` for finished reports.
- Keep report source files under `reports/<report-id>/`.
- Old sibling report folders may exist temporarily during migration. Do not delete them unless the user explicitly confirms.
- If a report is missing locally, mark it as `missing` instead of pretending it works.
- Do not delete old desktop launchers unless the user explicitly asks.

## Presentation Quality Rules

- Chinese text must be large enough for classroom projection.
- Empty space is not automatically bad, but unused space caused by undersized content is a failure.
- When slide content is thin, actively enrich with verified context, diagrams, comparisons, examples, or evidence.
- Before claiming a deck is optimized, inspect rendered pages visually.
- For report-like PPT webpages, avoid tiny body text, sparse cards, and large blank containers.

## Maintenance Rules

- Run `npm run check` after editing config or scripts.
- Run `npm run audit` before committing report structure cleanup.
- Use `npm run hub` to open the unified launcher.
- Use `npm run archive` only to create compressed archives; it must not delete source files.
- Run `npm run prepare-workspaces` after importing older reports so missing brief/research/asset folders are created consistently.
- Never put secrets, tokens, or private credentials in this repository.
