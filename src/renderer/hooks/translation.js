import { useContext } from 'react';
import { I18nContext } from '../context';

export function useTranslation() {
  const i18n = useContext(I18nContext);
  console.log('i18n',i18n);
  const t = key => {
    return i18n[key];
  };
  return t;
}
