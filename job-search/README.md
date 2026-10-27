# Job search documents

Backup of the resume documents for the 2026 job search, plus what is left to
do. Not used by the site build. The Google Drive folder is the source of
truth; these copies only exist in case it is lost. This repo is public, so these copies leave out
private details (phone, street address, birthday, photo). The full versions
live in the Google Drive folder "Job Applications 2026 (Resumes)":

- `Resume-reworked` (Google Doc): English resume
- `Career History (職務経歴書) – Cristian Valdez – Draft EN` (Google Doc)
- `rirekisho.docx`: full 履歴書 on the 厚労省 form
- `Where my resume lives (update checklist)` (Google Doc): every place to
  update after a change

## Places to update after a change

- cristianvaldez.jp: `src/data/resume.ts` (EN and JA), later the resume PDFs,
  and `public/og/default.png` if the headline changes
- this `job-search/` folder (only after big changes)
- LinkedIn
- Daijob

| File | What it is |
| --- | --- |
| `resume-en.md` | English resume, phone removed |
| `career-history-en.md` | 職務経歴書, English draft (translate to Japanese last) |
| `rirekisho-public.md` | 履歴書 text with private fields removed |

## To do

1. Cristian reviews the career history draft and checks:
   - employer name: done. "JET Programme (Takko, Aomori)", not the Board of
     Education (JET placements can be BOEs, schools or city halls, and other
     JETs list just the programme). The 履歴書's CLAIR JETプログラム line fits.
   - CSUSB labs: done. "several computer labs" (somewhere between 5 and 12;
     the exact number and college name are unknown)
   - takkotaco.com usage: done. Cloudflare, Oct 13-27 2026: 29.4k pageviews,
     14.5k visits, about 1,300 visits per school day, 90% Japan, ChromeOS top
     OS. Peak period (ABC unit, +88% visits on the two weeks before), so the
     doc says "over 1,000 visits on a typical school day (October 2026)".
   - the full AJET webmaster list, to pick the strongest items with specifics
2. oRo Miyazaki internship and Spanish: done in the English resume (still one
   page; three bullets shortened to make room) and the career history.
   履歴書: not under 職歴 (it was not employment); one line in 自己PR at most.
3. Update the 履歴書 to match the final review (employer name, date).
4. Translate the 職務経歴書 into Japanese.
5. Export three PDFs: English resume (no phone), 職務経歴書, and a reduced
   履歴書 (address 青森県 only, no phone, birthday or photo).
6. Add download buttons to the site: English resume on the EN page, 履歴書 and
   職務経歴書 on the JA page.

## Notes

- The 履歴書 form needs MS Mincho to lay out right. Export its PDF from Word or
  Google Docs on the Mac, not from LibreOffice.
- Upload the 履歴書 to Drive as .docx without converting it to a Google Doc;
  conversion breaks the merged cells and the photo.
