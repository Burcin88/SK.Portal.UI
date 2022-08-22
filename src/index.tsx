import './index.css';
import App from './App';
// import moment from 'moment';
import * as React from 'react';
import Utils from './utils/utils';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import initializeStores from './stores/storeInitializer';
import registerServiceWorker from './registerServiceWorker';
import abpUserConfigurationService from './services/abpUserConfigurationService';

declare var abp: any;
Utils.setLocalization();

abpUserConfigurationService.getAll().then(data => {
  Utils.extend(true, abp, data.data.result);
  // abp.clock.provider = Utils.getCurrentClockProvider(data.data.result.clock.provider);

  // moment.locale(abp.localization.currentLanguage.name);

  // if (abp.clock.provider.supportsMultipleTimezone) {
  //   moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
  // }

  const stores = initializeStores();

  // const init = async () => {
  //   try {
  //     moment.locale('tr', {
  //       months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_',),
  //       monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_',),
  //       weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_',),
  //       weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
  //       weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
  //       longDateFormat: {
  //         LT: 'HH:mm',
  //         LTS: 'HH:mm:ss',
  //         L: 'DD.MM.YYYY',
  //         LL: 'D MMMM YYYY',
  //         LLL: 'D MMMM YYYY HH:mm',
  //         LLLL: 'dddd, D MMMM YYYY HH:mm',
  //       },
  //       calendar: {
  //         sameDay: '[bugün saat] LT',
  //         nextDay: '[yarın saat] LT',
  //         nextWeek: '[gelecek] dddd [saat] LT',
  //         lastDay: '[dün] LT',
  //         lastWeek: '[geçen] dddd [saat] LT',
  //         sameElse: 'L',
  //       },
  //       relativeTime: {
  //         future: '%s sonra',
  //         past: '%s önce',
  //         s: 'birkaç saniye',
  //         ss: '%d saniye',
  //         m: 'bir dakika',
  //         mm: '%d dakika',
  //         h: 'bir saat',
  //         hh: '%d saat',
  //         d: 'bir gün',
  //         dd: '%d gün',
  //         M: 'bir ay',
  //         MM: '%d ay',
  //         y: 'bir yıl',
  //         yy: '%d yıl',
  //       },
  //       // ordinal: function (number, token):string  {
  //       //   switch (token) {
  //       //     case 'd':
  //       //     case 'D':
  //       //     case 'Do':
  //       //     case 'DD':
  //       //       return number;
  //       //     default:
  //       //       if (number === 0) {
  //       //         // special case for zero
  //       //         return number + "'ıncı";
  //       //       }
  //       //       var a = number % 10,
  //       //         b = (number % 100) - a,
  //       //         c = number >= 100 ? 100 : null;
  //       //       return (number + (suffixes[a] || suffixes[b] || suffixes[c]));
  //       //   }
  //       // },
  //       week: {
  //         dow: 1, // Monday is the first day of the week.
  //         doy: 7, // The week that contains Jan 7th is the first week of the year.
  //       },
  //     });
  //   } catch (err) { }
  // }

  ReactDOM.render(
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
  );

  // if (abp.localization.currentCulture.name === 'tr') {    init(); }
  registerServiceWorker();
});
