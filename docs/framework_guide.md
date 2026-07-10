# Template Framework Customization Guide

This guide describes how to duplicate, customize, and convert the baseline wedding invitation template into a completely different luxury invitation website (e.g. Birthday, Anniversary, Corporate Event, Walima, Walima, Walima, WALIMA, WALIMA) without rebuilding the architecture from scratch.

---

## 1. Quick-Start Customization Checklist

When onboarding a new client, you only need to modify text elements in these specific files:

| File | Target Modifications | Scope |
| :--- | :--- | :--- |
| **[src/app/layout.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/layout.js)** | Meta titles, site descriptions, search keywords. | SEO & Sharing |
| **[src/components/Hero.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Hero.js)** | Groom & Bride names, Request lines, Nikah/Ceremony text, Date. | Landing Card |
| **[src/components/Parents.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Parents.js)** | Parent names, greeting titles, family structures. | Family Info |
| **[src/components/ScratchDate.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/ScratchDate.js)** | Countdown target timestamp, calendar date text, schedule times. | Countdown Section |
| **[src/components/Venue.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Venue.js)** | Venue address, Google Maps link, map embed iframe coords. | Map & Location |
| **[src/components/Dua.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Dua.js)** | RSVP database hook, wishes message card lists, blessing Quran verse. | RSVP & Wishes |
| **[src/components/Footer.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Footer.js)** | Copyright names, client branding. | Footer section |

---

## 2. Reusable vs. Event-Specific Components

### A. Reusable Core Components (DO NOT EDIT logic)
These files manage global state, animations, and structures and should be reused across templates without modifications:
* **[src/components/Preloader.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Preloader.js)**: Timed load progress bar.
* **[src/components/GrandOpening.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/GrandOpening.js)**: The envelope opening split-door transition logic.
* **[src/components/MusicToggle.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/MusicToggle.js)**: Floating visualizer playback trigger.
* **[src/components/FloralOrnament.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/FloralOrnament.js)**: Reusable vector SVG ornament overlays.
* **[src/utils/audioSynth.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/utils/audioSynth.js)**: Clicks and creaks synthesis engine.

### B. Event-Specific Components (NEEDS customization)
These components contain content, cards, and text layout logic representing the event. Customize them to fit the event theme:
* **[src/components/Hero.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Hero.js)**: Adapt for Birthdays, Corporate, etc., by changing "THE GROOM / THE BRIDE" labels to "GUEST OF HONOR" or "KEYNOTE SPEAKER".
* **[src/components/ScratchDate.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/ScratchDate.js)**: Adjust the target calendar countdown date.
* **[src/components/Parents.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Parents.js)**: Completely replaceable or removable if families aren't part of the event (e.g. for Corporate or Birthday events).
* **[src/components/Venue.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Venue.js)**: Replace Google Maps configurations and address details.

---

## 3. Detailed Customization Walkthrough

### A. Changing Names, Dates, and Text
Search for text nodes inside the target components and swap them:
* **names**: In `Hero.js`, edit:
  ```javascript
  {splitName("Fauzan", groomStagger, false)}
  {splitName("Huda", brideStagger, true)}
  ```
  Change `"Fauzan"` and `"Huda"` to your client’s names.
* **dates**: In `ScratchDate.js`, set the target countdown date by editing:
  ```javascript
  const TARGET_DATE = new Date("2026-12-09T11:00:00+05:30"); // Set client timestamp
  ```

### B. Swapping Assets (Music, Images, Patterns)
* **Music file**: Replace `/public/audio/background_music.mp3` with your client’s target audio track. Ensure the output is compressed under 1.5MB.
* ** watermarks and corner patterns**: Re-design SVG watermarks inside the components (`GrandOpening.js`, `Hero.js`, `FloralOrnament.js`) or change the background image paths.
* **SVG ornaments**: Customize `FloralOrnament.js` to change leaves, buds, or vine graphics to fit the event (e.g. geometric frames for Corporate, balloons/stars for Birthdays, floral sprays for Weddings).

### C. Changing Theme Colors & Branding
All colors are configured inside the Tailwind v4 system in [src/app/globals.css](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/globals.css). To build a new template theme:
1. Open `globals.css` and change CSS theme variables:
   - For an **Anniversary** (Silver Theme): change `--color-brand-gold` to `#C0C0C0` (Silver), `--color-brand-dark` to `#1C1C1C` (Charcoal).
   - For a **Forest Wedding** (Emerald Theme): change `--color-brand-dark` to `#0B3022` (Emerald Green).
   - For a **Corporate luxury event** (Midnight Blue Theme): change `--color-brand-dark` to `#0A192F` (Midnight Navy).

### D. Changing Typography
To change the font family across the site:
1. Update Google Font imports inside [src/app/layout.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/layout.js) (inject the target Google Fonts link in metadata headers).
2. Register the new variables in the Tailwind `@theme` block in `globals.css`:
   ```css
   --font-cinzel: var(--font-my-new-cinzel-variable);
   ```

---

## 4. Recommended Workflow for Future Templates

1. **Duplicate**: Copy the template project folder to a new directory.
2. **Rename Package**: Update `name` in `package.json` to reflect the new client (e.g., `reception-smith-invitation`).
3. **Establish Theme Tokens**: Modify `globals.css` colors, background variables, and typography.
4. **Content Setup**: Open `Hero.js`, `ScratchDate.js`, `Venue.js`, and `Parents.js`, and edit client details (Names, Dates, addresses, maps coordinates).
5. **RSVP Target Hook**: Setup Wishes list / RSVP submit forms in `Dua.js` (hook it up to the database API endpoint of choice or local cache).
6. **Lint and Validate**: Run `npm run lint` and `npm run build` locally.
7. **Deploy**: Link the GitHub repository to the target hosting server.
