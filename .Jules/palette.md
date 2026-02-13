## 2026-02-13 - Missing Accessibility on Icon-Only Buttons
**Learning:** Many icon-only buttons (like social share or reset buttons) rely on `title` or visual cues but lack `aria-label`, making them inaccessible to screen readers.
**Action:** Always verify icon-only buttons have an explicit `aria-label` or `sr-only` text description.
