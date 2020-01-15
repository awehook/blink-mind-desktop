import i18n from '../lib/i18next';
import { initReactI18next } from 'react-i18next';

const i18nextOptions = {

}

i18n.use(initReactI18next);
if (!i18n.isInitialized) {
  console.log('!i18n.isInitialized');
  i18n.init({
    debug: true
  });
}

export { i18n };
