import { HOME_ROUTE } from './routes';

const KEY = 'AUTH_BACK';

export function getBackUrl() {
  return localStorage.getItem(KEY) || HOME_ROUTE;
}

export function setBackUrl(url) {
  localStorage.setItem(KEY, url);
}

export function resetBackUrl() {
  localStorage.removeItem(KEY);
}
