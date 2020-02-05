import { useContext } from 'react';
import { I18nContext } from '../context';

export type TranslationFunction = (key: string) => string;

export function useTranslation(): TranslationFunction {
  const i18n = useContext(I18nContext);
  console.log('i18n', i18n);
  const t = key => {
    return i18n[key];
  };
  return t;
}
