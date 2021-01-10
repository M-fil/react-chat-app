import React from 'react';
import { InstagramOutlined, GithubOutlined, SkypeOutlined } from '@ant-design/icons';

export interface FooterLinkProp {
  url: string,
  Icon: React.ReactElement,
}

export interface FooterLinks {
  [prop: string]: FooterLinkProp,
}

const defaultIconSize = '20px';
export const DEVELOPER_NAME = 'Maxim Filanovich';

const footerLinks: FooterLinks = {
  instagram: {
    url: 'https://www.instagram.com/m__fil/',
    Icon: <InstagramOutlined style={{ fontSize: defaultIconSize }} />,
  },
  github: {
    url: 'https://github.com/M-fil',
    Icon: <GithubOutlined style={{ fontSize: defaultIconSize }} />,
  },
  vk: {
    url: 'https://join.skype.com/invite/eDlB4F9MNezI',
    Icon: <SkypeOutlined style={{ fontSize: defaultIconSize }} />,
  },
}

export default footerLinks;
