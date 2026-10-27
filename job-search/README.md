# Job search documents

Backup of the resume documents for the 2026 job search, plus what is left to
do. Not used by the site build. The Google Drive folder is the source of
truth; these copies only exist in case it is lost. This repo is public, so these copies leave out
private details (phone, street address, birthday, photo). The full versions
live in the Google Drive folder "Job Applications 2026 (Resumes)":

- `Resume-reworked` (Google Doc): English resume
- `Career History (職務経歴書) – Cristian Valdez – Draft EN` (Google Doc)
- `職務経歴書 – クリスチャン・バルデス (JA)` (Google Doc): Japanese translation of
  the career history; change the English first, then this
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
| `career-history-en.md` | 職務経歴書, English version |
| `career-history-ja.md` | 職務経歴書, Japanese version |
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
3. 履歴書: done. 自己PR now uses the AJET plugin cleanup story and the takkotaco
   usage figure. Employer stays CLAIR JETプログラム.
4. Translate the 職務経歴書 into Japanese: done (Noto Sans JP so bold shows).
5. PDFs in `public/files/`: done. English resume (exported from the Google
   Doc with the phone taken out, then put back), the Japanese 職務経歴書, and
   the public 履歴書 (from `rirekisho-public.docx`, exported from Word on the
   Mac: address 青森県 only, no phone, birthday or photo; 2 pages).
6. Download links in the sidebar: done. EN page: Resume (PDF). JA page:
   履歴書（PDF）, 職務経歴書（PDF） and 英文レジュメ（PDF）.
   Re-export the PDFs whenever the Google Docs change (AWS result, leaving JET).

## Notes

- The 履歴書 form needs MS Mincho to lay out right. Export its PDF from Word or
  Google Docs on the Mac, not from LibreOffice.
- Upload the 履歴書 to Drive as .docx without converting it to a Google Doc;
  conversion breaks the merged cells and the photo.
