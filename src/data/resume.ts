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
  /** Display location. */
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
      tagline: 'I build and support things across the stack, from infrastructure to the web.',
      location: 'Aomori, Japan',
      imageAlt: 'Cristian planting rice with local students at a community rice-planting class in Aomori',
      summary:
        'Cristian Valdez is an American IT professional based in Aomori, Japan, working across infrastructure, support, and web development. Business-level Japanese (JLPT N2).',
      paragraphs: [
        "I'm an American living in Aomori, Japan. I came over in 2023 to teach on the JET Programme, but I never lost my passion for cool technology. Websites and personal projects have been a constant the whole time, and I've kept myself sharp by studying new topics that interest me or that teach me more about what I'm working on. As my time on JET comes to a close, I'm looking to transition back into tech here in Japan, and I'm open across the board: IT support, infrastructure, and web development.",
        "When it comes to how I choose what to build or learn, it comes down to things that are useful to me in some way. Whether that's <a href=\"https://takkotaco.com/games\">tools I can use in the classroom</a>, a place to <a href=\"https://bloggydoggy.com\">express myself</a>, or a simple one-off solution to an annoying problem like a Chrome extension or a split keyboard config. I like being able to customize and tinker, and I'm not satisfied until I get something exactly how I want it.",
        "Outside of work you'll usually find me lifting or running, taking part in local groups like the badminton team or ceramics club, and helping out at community events like the <a href=\"https://bloggydoggy.com\">culture festival</a>, or even <a href=\"https://bloggydoggy.com\">holding my own</a>.",
      ],
    },
    experience: [
      {
        role: 'Assistant English Teacher',
        org: 'JET Programme, Japan',
        start: 'Jan 2023',
        end: 'Present',
        bullets: [
          'Teach English at public schools in rural Aomori while working daily in a fully Japanese-language environment.',
          'Adapt technical and educational material for non-native speakers across a wide range of proficiency levels, which demands clear written and spoken communication.',
        ],
      },
      {
        role: 'Webmaster (Volunteer)',
        org: 'National AJET, Japan',
        start: 'Apr 2025',
        end: 'Present',
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
      },
      { title: 'Cisco Certified Network Associate (CCNA)', org: 'Cisco', date: '2026' },
      { title: 'JLPT N2', org: 'The Japan Foundation', date: '2026' },
      {
        title: 'B.A. Computer Information Systems',
        org: 'California State University, San Bernardino',
        date: '2022',
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
          'A ZMK firmware config for the Totem split keyboard, with ZMK Studio support added. Picked up by the keyboard community and forked as a base for their own builds.',
        url: 'https://github.com/cvaldezcomputerer/zmk-config',
        stack: ['ZMK', 'Zephyr', 'Devicetree'],
      },
    ],
  },

  ja: {
    about: {
      role: 'IT・Web開発',
      tagline: 'インフラからウェブまで、幅広くつくり、支えています。',
      location: '青森県、日本',
      imageAlt: '青森の地域の田植え教室で、地元の生徒たちと田植えをするクリスチャン',
      summary:
        'Cristian Valdez（クリスチャン・バルデス）は、青森県を拠点に、インフラ・サポート・ウェブ開発まで幅広く手がけるアメリカ出身のITエンジニアです。ビジネスレベルの日本語（JLPT N2）。',
      paragraphs: [
        '青森県在住、アメリカ出身のITエンジニアです。2023年にJETプログラムの英語指導助手として来日しましたが、その間もずっと、ものづくりの手を止めることはありませんでした。ウェブサイトや個人プロジェクトは、コンピューターに初めて触れた頃から変わらず続けてきたものです。今、本格的にIT業界へ戻ろうとしているところで、ITサポート、インフラ、ウェブ開発まで、幅広く取り組んでいきたいと考えています。',
        '日本語で日々生活し働く中で（JLPT N2）、新しいことを素早く吸収し、背景の異なる相手にも分かりやすく説明する力が身につきました。これは仕事の大部分を占めるスキルだと感じています。仕事以外では、筋トレやランニングをしたり、地元のサークル（陶芸・バドミントン・ダンス）に参加したり、趣味のプロジェクトに没頭していることが多いです。自作キーボードづくりや3Dプリント、学んだことをブログにまとめたりしています。',
      ],
    },
    experience: [
      {
        role: '外国語指導助手（ALT）',
        org: 'JETプログラム（日本）',
        start: '2023年1月',
        end: '現在',
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
      },
      { title: 'Cisco Certified Network Associate（CCNA）', org: 'Cisco', date: '2026年' },
      { title: 'JLPT N2', org: '国際交流基金', date: '2026年' },
      {
        title: 'コンピューター情報システム学士（B.A.）',
        org: 'カリフォルニア州立大学サンバーナディーノ校',
        date: '2022年',
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
