# Job search documents

Backup of the resume documents for the 2026 job search, plus what is left to
do. Not used by the site build. This repo is public, so these copies leave out
private details (phone, street address, birthday, photo). The full versions
live in the Google Drive folder "Job Applications 2026 (Resumes)":

- `Resume-reworked` (Google Doc): English resume
- `Career History (職務経歴書) – Cristian Valdez – Draft EN` (Google Doc)
- `rirekisho.docx`: full 履歴書 on the 厚労省 form

| File | What it is |
| --- | --- |
| `resume-en.md` | English resume, phone removed |
| `career-history-en.md` | 職務経歴書, English draft (translate to Japanese last) |
| `rirekisho-public.md` | 履歴書 text with private fields removed |

## To do

1. Cristian reviews the career history draft and checks:
   - employer name on the JET contract (draft says Takko Town Board of
     Education; the 履歴書 says CLAIR, so make them match)
   - CSUSB college name and "about 10 labs"
   - takkotaco.com students per school day (draft says 100+; check with
     `node tools/scripts/analytics/pageviews.mjs 7` in the takkotaco repo)
   - the full AJET webmaster list, to pick the strongest items with specifics
2. Add the oRo Miyazaki internship (Sep 2026, 1 week: wrote a requirements
   spec, built to it, presented to the team) and Spanish (conversational):
   - 職務経歴書: its own short entry
   - 履歴書: not under 職歴 (it was not employment); one line in 自己PR at most
   - English resume: one line under Experience, as on the site
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
