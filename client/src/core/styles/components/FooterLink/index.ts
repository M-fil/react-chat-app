import styled from 'styled-components';
import { globalDefaultColors } from '../../colors';

interface FooterLinkProps {
  href: string,
}
const linkSize: string = '40px';

const FooterLink = styled('a').attrs((props) => ({
  target: '_blank',
  href: props.href,
}))<FooterLinkProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 2px solid ${globalDefaultColors.borderColor};
  width: ${linkSize};
  height: ${linkSize};
`;

export default FooterLink;
