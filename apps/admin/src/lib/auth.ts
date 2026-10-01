export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'store_manager' | 'inventory_lead';
  storeId: string;
  storeName: string;
  avatar: string;
}

export const ADMIN_CREDENTIALS = {
  username: 'kishorgogoi',
  email: 'kishorgogoi@quickbasket.com',
  password: 'Moikun@0',
};

export const DEFAULT_ADMIN_USER: AdminUser = {
  id: 'adm-01',
  name: 'kishorgogoi',
  email: 'kishorgogoi@quickbasket.com',
  role: 'super_admin',
  storeId: 'vendor-1',
  storeName: 'Dark Store #04 (Sector 18 Hub)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
};

export const ADMIN_COOKIE_NAME = 'qb_admin_session';

export function parseSessionToken(token: string): AdminUser | null {
  try {
    const json = Buffer.from(token, 'base64').toString('utf-8');
    const data = JSON.parse(json);
    if (data && data.name && data.id) {
      return data as AdminUser;
    }
    return null;
  } catch {
    return null;
  }
}

export function createSessionToken(user: AdminUser): string {
  return Buffer.from(JSON.stringify(user)).toString('base64');
}
