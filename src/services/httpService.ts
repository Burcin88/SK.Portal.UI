import AppConsts from './../lib/appconst';
import { L } from '../lib/abpUtility';
import { Modal } from 'antd';
import axios from 'axios';

const qs = require('qs');

declare var abp: any;

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  headers: { 'Content-Type': 'application/json'},
  timeout: 30000,
  paramsSerializer: function(params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function(config) {
    if (!!abp.auth.getToken()) {
      config.headers.common['Authorization'] = 'Bearer ' + abp.auth.getToken();
    }

    config.headers.common['.AspNetCore.Culture'] = abp.utils.getCookieValue('Abp.Localization.CultureName');
    config.headers.common['Abp.TenantId'] = abp.multiTenancy.getTenantIdCookie();
  

    return config;
  },
  error => { 
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
      Modal.error({
        title: L(error.response.data.error.message),
        content: L(error.response.data.error.details),
     });
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
   
      //Modal.error({
      //  title: L('LoginFailed'),
      //  content: L(error.response.data.error.message),
       // className:"closeErrorModal"
     // });
    } else if (!error.response) {
    //  Modal.error({ content: L('UnknownError') });
    }

    //setTimeout(() => {}, 100000);


    return  Promise.reject(error);
  }
);

export default http;