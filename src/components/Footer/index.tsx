import React from 'react';
// import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import logo_dark from '@/assets/logo_dark.png';
import styles from './index.less';

const Logo = () => <img src={logo_dark} height="40" alt="徐州正通人工环境工程有限公司" />;

export default () => (
  <DefaultFooter
    copyright="2020 徐州正通人工环境工程有限公司"
    className={styles.footer}
    links={[
      {
        key: 'github',
        title: <Logo />,
        href: 'http://www.jszhengtong.com/',
        blankTarget: true,
      },
      {
        key: '徐州正通人工环境工程有限公司',
        title: '徐州正通人工环境工程有限公司',
        href: 'http://www.jszhengtong.com/',
        blankTarget: true,
      },
      /* {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      }, */
    ]}
  />
);
