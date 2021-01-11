import React from 'react';

import FooterContainer from './styled';
import FooterLink from '../../styles/components/FooterLink';
import footerLinks, { FooterLinkProp, DEVELOPER_NAME } from '../../constants/footer';
import { createTitle } from '../../styles/components/Title';
import WidthLimiterContainer from '../../styles/components/WidthLimiterContainer';

interface FooterProps {
  links?: FooterLinkProp[],
}

const DeveloperNameTitle = createTitle('h2');

const Footer: React.FC<FooterProps> = ({ links }) => {
  return (
    <FooterContainer>
      <WidthLimiterContainer>
        <div className="footer-wrapper main-block-wrapper">
          <div className="links-container">
            {(links || Object.values(footerLinks)).map((link) => (
              <FooterLink key={link.id} href={link.url} className="footer-link">
                {link.Icon}
              </FooterLink>
            ))}
          </div>
          <DeveloperNameTitle
            fontSize="1.5rem"
            lineHeight="2rem"
          >
            {DEVELOPER_NAME}
          </DeveloperNameTitle>
        </div>
      </WidthLimiterContainer>
    </FooterContainer>
  );
};

export default Footer;
