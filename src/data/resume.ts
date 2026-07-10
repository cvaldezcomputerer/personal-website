/**
 * resume.ts - single source of truth for the homepage resume, now bilingual.
 *
 * `contact` is language-neutral (name, email, links). Everything with prose
 * lives under `resume[lang]` so the EN and JA copy sit side by side and are
 * easy to review and keep in sync. The page reads `resume[lang]`. Phone number
 * is deliberately omitted from the public site. Dates are display strings.
 *
 * JA is author-written (polite-but-approachable です/ます), not machine output.
 */

import type { Lang } from '~/i18n/ui';

// Org/issuer logos live in public/logos and are referenced by plain path (see
// LogoTile.astro for why they bypass astro:assets).
const jetLogo = '/logos/jet.jpg';
const ajetLogo = '/logos/ajet.png';
const ccnaLogo = '/logos/ccna.png';
const jlptLogo = '/logos/jlpt.svg';
const awsLogo = '/logos/aws.svg';
const csusbLogo = '/logos/csusb.svg';

export interface Contact {
  name: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface AboutContent {
  /** Short label shown above the name in the sidebar (the role line). */
  role: string;
  /** One-line tagline under the name. */
  tagline: string;
  /** Home town (paired with a garlic mark - Takko is Japan's garlic town). */
  town: string;
  /** Display location (region), shown after the town. */
  location: string;
  /** The About section, one string per paragraph. */
  paragraphs: string[];
  /** Alt text for the About photo (matches the page language). */
  imageAlt: string;
  /** Plain-text summary for meta/SEO (no markup). */
  summary: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  start: string;
  end: string;
  bullets: string[];
  /** Optional org logo path (under /logos), shown as a small chip. */
  logo?: string;
  /** Where the logo links to (the org's site). Language-neutral. */
  orgUrl?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Credential {
  title: string;
  org: string;
  date: string;
  inProgress?: boolean;
  /** Optional issuer logo path (under /logos), shown as a small chip. */
  logo?: string;
  /** Where the logo links to (the issuer's site). Language-neutral. */
  orgUrl?: string;
  /** Optional verification link (e.g. a Credly badge). */
  href?: string;
}

/** A smaller side project - a single external link, no full case study. */
export interface OtherProject {
  name: string;
  description: string;
  url: string;
  stack: string[];
}

export interface ResumeContent {
  about: AboutContent;
  experience: ExperienceItem[];
  skills: SkillGroup[];
  credentials: Credential[];
  otherProjects: OtherProject[];
}

export const contact: Contact = {
  name: 'Cristian Valdez',
  email: 'cvaldezana@gmail.com',
  github: 'https://github.com/cvaldezcomputerer',
  linkedin: 'https://www.linkedin.com/in/cristian-valdez-203136378',
};

export const resume: Record<Lang, ResumeContent> = {
  en: {
    about: {
      role: 'IT & Web Development',
      tagline: 'I build and tinker across tech, from infrastructure to the web.',
      town: 'Takko',
      location: 'Aomori, Japan',
      imageAlt: 'Cristian planting rice with local students at a community rice-planting class in Aomori',
      summary:
        'Cristian Valdez is an American IT professional based in Aomori, Japan, working across infrastructure, support, and web development. Business-level Japanese (JLPT N2).',
      paragraphs: [
        "I'm an American living in Aomori, Japan. I came over in 2023 to teach on the <a href=\"https://jetprogramme.org\">JET Programme</a>, but I never stopped making things and messing with tech on the side. Personal projects have been a constant the whole time, and I keep learning whatever a project needs or whatever I happen to be curious about. As my time on JET comes to a close, I'm looking to move back into tech here in Japan, whether that's IT support, infrastructure, or web development.",
        "Mostly I just build things for myself: whatever would actually be useful, or whatever I want to understand better. That might be <a href=\"https://takkotaco.com/game/\">tools for the classroom</a>, a place to <a href=\"https://bloggydoggy.com\">express myself</a>, or a quick fix for something annoying, like a Chrome extension or a custom keyboard. I like being able to customize and tinker, and I'm not satisfied until I get something exactly how I want it.",
        "Outside of work you'll usually find me lifting or running, taking part in local groups like the badminton team or ceramics club, and helping out at community events like the <a href=\"https://bloggydoggy.com/blog/3d-printing-culture-festival/\">culture festival</a>, or running my own, like <a href=\"https://bloggydoggy.com/blog/pasta-time/\">cooking classes</a> and a hands-on electronics class.",
      ],
    },
    experience: [
      {
        role: 'Assistant English Teacher',
        org: 'JET Programme, Japan',
        start: 'Jan 2023',
        end: 'Present',
        logo: jetLogo,
        orgUrl: 'https://jetprogramme.org/en/',
        bullets: [
          'Teach English at public schools in rural Aomori while working daily in a fully Japanese-language environment.',
          'Adapt technical and educational material for non-native speakers across a wide range of proficiency levels, which takes clear communication, both written and spoken.',
        ],
      },
      {
        role: 'Webmaster (Volunteer)',
        org: 'National AJET, Japan',
        start: 'Apr 2025',
        end: 'Present',
        logo: ajetLogo,
        orgUrl: 'https://ajet.net/',
        bullets: [
          'Maintain and administer the National AJET WordPress site for a 5,000+ member organization.',
          'Troubleshoot hosting and reliability issues and coordinate technical changes with the AJET board.',
        ],
      },
      {
        role: 'IT Technician',
        org: 'California State University, San Bernardino',
        start: 'Jan 2021',
        end: 'Jan 2023',
        logo: csusbLogo,
        orgUrl: 'https://www.csusb.edu/',
        bullets: [
          'Managed and deployed macOS endpoints across department computer labs with JAMF: imaging, configuration, software distribution, and lifecycle replacement.',
          'Resolved a wide range of incidents across OS issues, account and permission troubleshooting, peripheral failures, and software installs.',
        ],
      },
    ],
    skills: [
      {
        label: 'Cloud & Infrastructure',
        items: ['AWS', 'Cloudflare (Workers, Pages, D1, Durable Objects)', 'Linux'],
      },
      {
        label: 'Networking',
        items: ['CCNA fundamentals (TCP/IP, routing, switching, VLANs)'],
      },
      {
        label: 'Languages & Tools',
        items: ['TypeScript', 'JavaScript', 'Bash', 'Git', 'GitHub Actions (CI/CD)'],
      },
      {
        label: 'Web & Systems',
        items: ['REST APIs', 'WebSockets', 'Serverless', 'Astro', 'WordPress', 'Technical support'],
      },
      {
        label: 'Spoken languages',
        items: [
          'English (native)',
          'Japanese (business level, JLPT N2)',
          'Spanish (conversational)',
        ],
      },
    ],
    credentials: [
      {
        title: 'AWS Solutions Architect Associate (SAA-C03)',
        org: 'Amazon Web Services',
        date: 'Target 2026',
        inProgress: true,
        logo: awsLogo,
        orgUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      },
      {
        title: 'Cisco Certified Network Associate (CCNA)',
        org: 'Cisco',
        date: '2026',
        logo: ccnaLogo,
        orgUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/ccna.html',
        href: 'https://www.credly.com/badges/ef082539-aa81-43db-88a6-ec3ceffe4980/public_url',
      },
      {
        title: 'JLPT N2',
        org: 'The Japan Foundation',
        date: '2026',
        logo: jlptLogo,
        orgUrl: 'https://www.jlpt.jp/e/',
      },
      {
        title: 'B.A. Computer Information Systems',
        org: 'California State University, San Bernardino',
        date: '2022',
        logo: csusbLogo,
        orgUrl: 'https://www.csusb.edu/',
      },
    ],
    otherProjects: [
      {
        name: 'Mercari Payment Warning',
        description:
          'A published Chrome extension that flags Mercari listings set to pay-on-delivery, so the surcharge never catches you at checkout. Built it for myself, and I still use it daily.',
        url: 'https://chromewebstore.google.com/detail/mercari-payment-warning/nafajmljhjdebkknmfbdccakdfhdcbhd',
        stack: ['Chrome Extension', 'JavaScript'],
      },
      {
        name: 'ZMK config - Totem',
        description:
          'A ZMK firmware config for the Totem split keyboard, with ZMK Studio support added. Picked up by the keyboard community and forked as a base for other builds.',
        url: 'https://github.com/cvaldezcomputerer/zmk-config',
        stack: ['ZMK', 'Zephyr', 'Devicetree'],
      },
    ],
  },

  ja: {
    about: {
      role: 'IT・Web開発',
      tagline: 'インフラからウェブまで、いろいろ作ったり、いじったりしています。',
      town: '田子町',
      location: '青森県、日本',
      imageAlt: '青森の地域の田植え教室で、地元の生徒たちと田植えをするクリスチャン',
      summary:
        'Cristian Valdez（クリスチャン・バルデス）は、青森県を拠点に、インフラ・サポート・ウェブ開発まで幅広く手がけるアメリカ出身のITエンジニアです。ビジネスレベルの日本語（JLPT N2）。',
      paragraphs: [
        '青森県に住んでいる、アメリカ出身です。2023年に<a href="https://jetprogramme.org">JETプログラム</a>の外国語指導助手として来日しましたが、その後もものづくりや技術いじりの手を止めることはありませんでした。個人プロジェクトはずっと続けてきていて、プロジェクトに必要なことや、その時々で気になったことを学び続けています。JETでの任期が終わりに近づいた今、日本でITの世界へ戻ろうと考えていて、ITサポート、インフラ、ウェブ開発まで幅広く視野に入れています。',
        '基本的には、自分のために物を作っています。実際に役立つものだったり、もっと深く理解したいと思ったものだったりです。たとえば<a href="https://takkotaco.com/game/">授業で使えるツール</a>だったり、<a href="https://bloggydoggy.com">自分を表現する場所</a>だったり、Chrome拡張機能や自作キーボードのように、ちょっとした面倒を解決するものだったりします。自分好みにカスタマイズしたり、いじったりするのが好きで、思い通りになるまで納得できない性格です。',
        '仕事以外では、筋トレやランニングをしたり、地元のサークル（バドミントンや陶芸）に参加したりしています。<a href="https://bloggydoggy.com/blog/3d-printing-culture-festival/">文化祭</a>のような地域のイベントを手伝ったり、<a href="https://bloggydoggy.com/blog/pasta-time/">料理教室</a>や電子工作の体験教室のように、自分でイベントを開くこともあります。',
      ],
    },
    experience: [
      {
        role: '外国語指導助手（ALT）',
        org: 'JETプログラム（日本）',
        start: '2023年1月',
        end: '現在',
        logo: jetLogo,
        orgUrl: 'https://jetprogramme.org/en/',
        bullets: [
          '青森県の公立学校で英語を教えながら、日々すべて日本語の環境で勤務しています。',
          '幅広いレベルの非ネイティブ話者向けに技術的・教育的な教材をかみ砕いて伝えており、明確な文章・口頭でのコミュニケーション力が求められます。',
        ],
      },
      {
        role: 'ウェブ管理者（ボランティア）',
        org: 'National AJET（日本）',
        start: '2025年4月',
        end: '現在',
        logo: ajetLogo,
        orgUrl: 'https://ajet.net/',
        bullets: [
          '会員5,000名以上の組織であるNational AJETのWordPressサイトを保守・運用しています。',
          'ホスティングや安定性の問題に対応し、技術的な変更をAJET理事会と調整しています。',
        ],
      },
      {
        role: 'ITテクニシャン',
        org: 'カリフォルニア州立大学サンバーナディーノ校',
        start: '2021年1月',
        end: '2023年1月',
        logo: csusbLogo,
        orgUrl: 'https://www.csusb.edu/',
        bullets: [
          'JAMFを用いて学内コンピューターラボのmacOS端末を管理・展開しました。イメージング、設定、ソフトウェア配布、機器の更新までを担当しました。',
          'OSの不具合、アカウントや権限のトラブル、周辺機器の故障、ソフトウェアのインストールまで、幅広いインシデントに対応しました。',
        ],
      },
    ],
    skills: [
      {
        label: 'クラウド・インフラ',
        items: ['AWS', 'Cloudflare（Workers、Pages、D1、Durable Objects）', 'Linux'],
      },
      {
        label: 'ネットワーク',
        items: ['CCNAの基礎（TCP/IP、ルーティング、スイッチング、VLAN）'],
      },
      {
        label: '言語・ツール',
        items: ['TypeScript', 'JavaScript', 'Bash', 'Git', 'GitHub Actions（CI/CD）'],
      },
      {
        label: 'Web・システム',
        items: ['REST API', 'WebSockets', 'サーバーレス', 'Astro', 'WordPress', 'テクニカルサポート'],
      },
      {
        label: '使用言語',
        items: [
          '英語（ネイティブ）',
          '日本語（ビジネスレベル、JLPT N2）',
          'スペイン語（日常会話レベル）',
        ],
      },
    ],
    credentials: [
      {
        title: 'AWS Solutions Architect Associate（SAA-C03）',
        org: 'Amazon Web Services',
        date: '2026年取得予定',
        inProgress: true,
        logo: awsLogo,
        orgUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      },
      {
        title: 'Cisco Certified Network Associate（CCNA）',
        org: 'Cisco',
        date: '2026年',
        logo: ccnaLogo,
        orgUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/ccna.html',
        href: 'https://www.credly.com/badges/ef082539-aa81-43db-88a6-ec3ceffe4980/public_url',
      },
      {
        title: 'JLPT N2',
        org: '国際交流基金',
        date: '2026年',
        logo: jlptLogo,
        orgUrl: 'https://www.jlpt.jp/j/',
      },
      {
        title: 'コンピューター情報システム学士（B.A.）',
        org: 'カリフォルニア州立大学サンバーナディーノ校',
        date: '2022年',
        logo: csusbLogo,
        orgUrl: 'https://www.csusb.edu/',
      },
    ],
    otherProjects: [
      {
        name: 'Mercari 着払い警告 拡張機能',
        description:
          'メルカリで「着払い」に設定された商品を、購入前に知らせてくれる、公開済みのChrome拡張機能です。手数料に不意打ちされないよう自分用に作り、今も毎日使っています。',
        url: 'https://chromewebstore.google.com/detail/mercari-payment-warning/nafajmljhjdebkknmfbdccakdfhdcbhd',
        stack: ['Chrome拡張機能', 'JavaScript'],
      },
      {
        name: 'ZMKコンフィグ - Totem',
        description:
          'Totem分割キーボード向けのZMKファームウェア設定で、ZMK Studio対応を追加したものです。キーボードコミュニティでフォークされ、各自のビルドの土台として使われています。',
        url: 'https://github.com/cvaldezcomputerer/zmk-config',
        stack: ['ZMK', 'Zephyr', 'Devicetree'],
      },
    ],
  },
};
