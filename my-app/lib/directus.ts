import { createDirectus, rest, authentication } from '@directus/sdk';


interface Banner {
  id: number;
  title: string;
  image: string;
  link?: string;
}

interface News {
  id: number;
  ten: string;
  tom_tat: string;
  anh_dai_dien?: string;
  date_created: string;
  slug?: string;
  noi_dung?: string;
}

interface Document {
  id: number;
  title: string;
  category: string;
  date: string;
  fileUrl?: string;
}

interface Notification {
  id: number;
  title: string;
  date: string;
  content?: string;
}

interface LogoLink {
  id: number;
  loai?: number;
  mo_tab_moi?: boolean;
  link?: string;
  ten: string;
  logo?: string;
}


interface Schema {
  banner: Banner[];
  tin_tuc: News[];
  van_ban_phap_luat: Document[];
  thong_bao: Notification[];
  logo_link: LogoLink[];
}

interface FooterData {
  content: string;
  image?: string|null;
}

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus<Schema>(directusUrl)
  .with(rest())
  .with(authentication('cookie'));


export async function authenticateDirectus() {
  const email = process.env.DIRECTUS_EMAIL;
  const password = process.env.DIRECTUS_PASSWORD;

  if (email && password) {
    try {
      await directus.login({ email, password });
      console.log('Directus authentication successful');
    } catch (error) {
      console.error('Directus authentication failed:', error);
    }
  }
}


export type { Banner, News, Document, Notification, LogoLink };
