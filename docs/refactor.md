# Refactor Plan (src)

Use the checkboxes to mark completion and keep a short outcome note under each task.

## Scope and sequencing

- [ ] Audit file size and complexity hotspots  
  What: review the largest `src/components/*.tsx` and `src/app/api/news/route.ts` for duplicated logic, oversized components, and tangled concerns.  
  Why: establish refactor targets and avoid unnecessary churn.

- [x] Extract shared UI patterns into smaller components  
  What: split oversized components (e.g., playlists, telegram, advertise) into smaller presentational pieces with clear props.  
  Why: improve readability, enable reuse, and reduce re-render scope.  
  Done: extracted YouTube, Telegram, Advertise, Navigation, and About subcomponents to keep containers lean.

- [ ] Centralize repeated data/config  
  What: move repeated constants, arrays, and config objects into `src/lib/` or `src/data/`.  
  Why: reduce duplication and make future edits safer.

- [x] Normalize styling and class usage  
  What: consolidate repeated className strings into reusable utility classes or component-level style helpers.  
  Why: reduce visual drift and make style updates consistent.  
  Done: centralized repeated UI patterns into shared subcomponents and data-driven sections across About and Telegram/Advertise.

- [ ] Simplify side effects and hooks usage  
  What: extract complex `useEffect`/hook logic into custom hooks under `src/hooks/`.  
  Why: keep components focused on rendering and improve testability.

- [ ] Refactor `src/app/api/news/route.ts` for clarity  
  What: split request handling into small functions (input validation, fetch, mapping, response).  
  Why: improve readability and make error handling explicit.

- [ ] Add light regression checks  
  What: verify key UI sections render and API route still returns expected shape.  
  Why: ensure refactors are behavior-preserving.
