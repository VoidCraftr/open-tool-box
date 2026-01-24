# Privacy Audit Skill
**Description:** Scans code to ensure no data is sent to external APIs.
**Instructions:**
1. Search for `fetch(`, `axios`, or `XMLHttpRequest` in `src/app/tools/`.
2. Flag any external URLs that aren't for local resources or authorized CDNs.
3. Verify all processing libraries are imported as "client-only."