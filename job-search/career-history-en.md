# Career History

Draft (English) of the 職務経歴書. Snapshot of the Google Doc
"Career History (職務経歴書) – Cristian Valdez – Draft EN" as of 2026-10-27.
The Google Doc is the working copy; this file is a backup.

As of October 27, 2026
Cristian Valdez

## Career Summary

IT support technician turned English teacher, now returning to IT with a focus on cloud and network infrastructure. At California State University, San Bernardino I spent two years managing macOS lab computers with JAMF and resolving hardware, OS and account issues. Since 2023 I have worked in Japan on the JET Programme in a Japanese-language workplace. Alongside that job I run the website of National AJET (5,000+ members) as volunteer webmaster, and I built and operate takkotaco.com, a real-time classroom game platform on Cloudflare Workers that students use in class every school day. I hold the CCNA and JLPT N2, and I am taking the AWS Solutions Architect Associate exam in November 2026.

## Work History

### Takko Town Board of Education, Aomori (JET Programme)

**January 2023 to present**
Assistant Language Teacher (ALT), full-time contract

Duties:

- Team-teach English at 3 public schools, about 250 students in total
- Plan lessons and make teaching materials together with Japanese teachers
- Help run school events and English activities
- Work, attend meetings and coordinate with staff in Japanese every day

Results:

- Built takkotaco.com to replace paper activities with live class games (see Personal Projects). It is now used in my classes and by teachers across Japan, who find it through ALTopedia, an activity-sharing site for ALTs where I post it.

### National AJET (Association for Japan Exchange and Teaching)

**April 2025 to present**
Webmaster (volunteer)

National AJET is the national support organization for JET participants, with 5,000+ members. I am responsible for its WordPress website.

Results:

- Overhauled the whole site, including the changes below
- Fixed security problems on the site
- Set up regular backups, which the site did not have before
- Fixed outgoing email from the site
- Removed unused and overlapping plugins
- Moved scattered page styles into one shared stylesheet so the site looks consistent and is easier to change
- Coordinate technical changes with the AJET board

### California State University, San Bernardino, IT Department

**January 2021 to January 2023**
IT Technician (part-time, while a student)

Supported the computer labs and staff of a university college (about 10 labs).

Duties:

- Managed and deployed macOS computers with JAMF: imaging, configuration, software distribution and replacing end-of-life machines
- Resolved incidents from walk-ups and tickets: OS problems, account and permission issues, peripheral failures, software installs
- Diagnosed hardware, software and network problems in the labs

## Personal Projects

### takkotaco.com, English learning site for Takko Town

Built and run alone.

- Real-time multiplayer class games, including a class race and a Kahoot-style live quiz, built on Cloudflare Workers and Durable Objects with WebSocket game rooms
- Used in class by about 100 or more students on a typical school day
- Stack: TypeScript, Astro, Cloudflare Workers, D1, KV, Durable Objects, automatic deploys on push to main
- Diagnosed a school web filter that blocked the game server's workers.dev address and broke a class mid-lesson. Fixed it by routing the game servers through the site's own domain.
- Found that open game rooms kept their servers awake all night and used up the free plan's daily limit. Traced it with Cloudflare usage data and moved the rooms to the WebSocket hibernation API, with room state in storage and timers as alarms.
- Also includes an interactive map of Takko and face detection in the browser

### bloggydoggy.com, multilingual blog

- Edge-first blog with its own REST API on Cloudflare Workers and D1 for likes and quizzes
- Custom Web Components with no framework, and a translation system for English, Simple English and Japanese

## Technical Skills

| Area | Skills |
| :- | :- |
| Cloud | AWS (studying for SAA-C03), Cloudflare Workers, D1, KV, Durable Objects, Pages |
| Networking | TCP/IP, routing, switching, VLANs (CCNA) |
| Systems and support | macOS endpoint management with JAMF, Linux, troubleshooting hardware, OS and accounts |
| Development | TypeScript, JavaScript, Bash, Git, GitHub Actions, REST APIs, WebSockets, Astro, WordPress |
| Languages | English (native), Japanese (business level, JLPT N2) |

## Certifications

- November 2023: Japanese driver's license (ordinary)
- January 2026: JLPT N2
- May 2026: Cisco Certified Network Associate (CCNA)
- November 2026: AWS Certified Solutions Architect Associate (exam scheduled)

## Self-PR

**I find the cause before I fix the problem.** In university IT, in the AJET website and in my own platform, my work has been finding why something broke and making sure it stays fixed. When the class game stopped working at a school, I traced it to the school's web filter and changed how the servers are reached, not just the one classroom.

**I build and run real systems, not only practice projects.** takkotaco.com has real users every school day, so I handle deploys, outages, costs and user feedback myself.

**I can work in Japanese.** I have spent nearly four years in a Japanese-language workplace and can explain technical problems to non-technical staff in Japanese or English.
