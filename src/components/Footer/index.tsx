import * as React from 'react';
import { Layout } from 'antd';
import './index.less';
const Footer = () => {

  return (
    <Layout.Footer className={'footer'} style={{ textAlign: 'center' }}>
      Sürat Kargo © 2021 <a href="https://www.suratkargo.com.tr/">Sürat Kargo</a>
    </Layout.Footer>
  );
};
export default Footer;