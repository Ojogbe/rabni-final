Place partner logo files in this folder so they can be served in production (e.g., Vercel).

Use these exact, case-sensitive filenames to match the references in `src/pages/GetInvolvedPage.tsx`:

- us-embassy-and-consulate-in-nigeria.png
- project-literacy.jpg
- abuja-enterprise-agency-aea.jpg
- international-rescue-committee-irc.jpg
- gordon-barrett.png
- nehi-hub.png
- hh-muhammad-sanusi-ii-sdg-challenge.png
- ted-ed.jpg
- un-sdgs.png
- yali-regional-leadership-center.png
- korean-cultural-centre.jpg

Notes:
- PNG/JPG formats are acceptable. If your source file is a different format, either convert it or update the filename in the `partners` list in the page.
- File paths under `/public` are served at the site root. Logos will be available at `/partners/<filename>`.
- OnError fallback: If a logo fails to load, the page will display a small initials fallback box instead of a broken image.
