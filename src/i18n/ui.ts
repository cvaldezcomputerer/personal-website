/**
 * ui.ts - UI string translations for the site chrome (nav, section titles,
 * buttons, labels). Author-written EN/JA, NOT machine-translated. Long-form
 * content (resume data, About, project text) lives in resume.ts and the
 * content collections; this file is only the short interface strings.
 *
 * Scope: homepage + chrome are bilingual. Blog posts and full project case
 * studies stay English for now (see the README / project memory).
 */

export type Lang = 'en' | 'ja';

export const LANGS: Lang[] = ['en', 'ja'];

export const LANG_LABEL: Record<Lang, string> = {
  en: 'English',
  ja: '日本語',
};

export interface UiStrings {
  skipToContent: string;
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    credentials: string;
    writing: string;
  };
  sections: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    credentials: string;
  };
  readCaseStudy: string;
  visitSite: string;
  smallerProjects: string;
  inProgress: string;
  toggleTheme: string;
  toggleLang: string;
  backToProjects: string;
}

export const ui: Record<Lang, UiStrings> = {
  en: {
    skipToContent: 'Skip to content',
    nav: {
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      skills: 'Skills',
      credentials: 'Education',
      writing: 'Writing',
    },
    sections: {
      about: 'About',
      projects: 'Selected projects',
      experience: 'Experience',
      skills: 'Skills',
      credentials: 'Education & certifications',
    },
    readCaseStudy: 'Read the case study',
    visitSite: 'Visit site',
    smallerProjects: 'Smaller projects',
    inProgress: 'In progress',
    toggleTheme: 'Toggle dark mode',
    toggleLang: 'Switch language',
    backToProjects: 'Back to projects',
  },
  ja: {
    skipToContent: '本文へスキップ',
    nav: {
      about: '自己紹介',
      projects: 'プロジェクト',
      experience: '職歴',
      skills: 'スキル',
      credentials: '学歴・資格',
      writing: 'ブログ',
    },
    sections: {
      about: '自己紹介',
      projects: '主なプロジェクト',
      experience: '職歴',
      skills: 'スキル',
      credentials: '学歴・資格',
    },
    readCaseStudy: 'ケーススタディを読む',
    visitSite: 'サイトを見る',
    smallerProjects: 'その他のプロジェクト',
    inProgress: '取得予定',
    toggleTheme: 'ダークモード切り替え',
    toggleLang: '言語を切り替え',
    backToProjects: 'プロジェクト一覧へ戻る',
  },
};

/** Path helper: prefix a root-relative path with the locale (no prefix for en). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return clean;
  return clean === '/' ? '/ja' : `/ja${clean}`;
}
