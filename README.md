# Darshan B M — Portfolio

Plain HTML + CSS + JavaScript. No frameworks, no install, no build step.

## Open it
Unzip, then double-click `index.html`. It works offline (fonts load from Google Fonts when you are
online; otherwise your system fonts are used).

## Files
```
portfolio/
├── index.html      ← ALL your text, links and images (edit this most)
├── style.css       ← colors, fonts, sizes (variables at the top)
├── script.js       ← menu, theme toggle, animations, message button
└── assets/
    ├── Darshan_Res.pdf        ← your resume (Resume / Download buttons)
    ├── images/profile.jpg     ← your photo
    ├── certificates/          ← certificate images go here
    └── projects/              ← project screenshots go here
```

## Edit
Open `index.html` in a text editor and search for **`EDIT HERE`**. Each comment says what to change.

| I want to…                  | Search for                          |
|-----------------------------|-------------------------------------|
| Change top scrolling bar    | `ANNOUNCEMENT TICKER`               |
| Change name / headline      | `Change your name`                  |
| Change photo                | `Add your profile image`            |
| Change About text / stats   | `About Me paragraphs`, `stat cards` |
| Add a job                   | `ROLE 1` → copy that block          |
| Add a school + logo         | `Institution logo`                  |
| Add a project + screenshot  | `PROJECT 1`, `Add project screenshots` |
| Add a certificate           | `CERTIFICATE 1` → copy that block   |
| Social links / email / phone| `Contact buttons`                   |

### Things still to fill in (your resume did not include them)
- LinkedIn and GitHub URLs, and each project's GitHub / Live Demo links
- Each certificate's verification link and date (`Month YYYY`), plus certificate images
- Project screenshots, institution logos (optional)
- Location, CGPA/percentages, LeetCode/Instagram buttons (comments show where to add them)
- Achievements section: switched off (commented out). Instructions are in the comment above it.

### Images
Copy the file into the matching `assets/` folder, then change the `src="..."` of that `<img>`.
Grey/navy placeholder pictures show until you do.

### Colors, fonts, corner size
`style.css` section 1 holds every color and font. The cut corners are controlled by `--c` in section 4.
Dark/light theme: the sun/moon button in the nav switches them.

## Contact form limitation
A site without a server cannot send email. "Send message" opens the visitor's email app with the
message filled in, addressed to `data-email="..."` on the `<form>` tag. For real submissions use a
service such as Formspree or Netlify Forms.

## Publish (optional)
Upload the whole folder to GitHub Pages, Netlify or Vercel. Keep `index.html` at the top level.
