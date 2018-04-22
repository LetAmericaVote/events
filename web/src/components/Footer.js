import React from 'react';
import styled from 'styled-components';
import Section from '../blocks/Section';
import { SEARCH_ROUTE } from '../routing/routes';
import {
  Paragraph,
  StyledAnchor,
} from '../blocks/Type';
import {
  FlexDown,
  FlexAcrossCenter,
  FlexResponsiveRow,
  FlexResponsiveHalfColumn,
  FlexResponsiveQuarterColumn,
} from '../blocks/Flex';

const links = {
  'about': 'https://www.letamericavote.org/about',
  'guide': 'https://www.letamericavote.org/guide-standing-voting-rights',
  'intern': 'https://docs.google.com/forms/d/e/1FAIpQLSc8QCrO26Rw_ciCPQSrfNEG8DuCCoZLAASK_ZsCIJ_s1YzAow/viewform',
  'store': 'https://store.letamericavote.org/',
  'donate': 'https://secure.actblue.com/contribute/page/lav-main',
  'privacy': 'https://www.letamericavote.org/privacy-policy',
  'contact': 'https://www.letamericavote.org/contact',
};

const FooterTitle = styled(Paragraph)`
  font-weight: 900;
  font-family: ${props => props.theme.heavyFontFamily}

  ${props => props.theme.extraTinyMarginBottom}
  text-align: center;

  ${props => props.theme.tablet`
    ${props.right ? 'text-align: right;' : 'text-align: left;'}
  `}
`;

const FooterLink = styled(StyledAnchor)`
  text-decoration: none;
  ${props => props.theme.extraTinyMarginBottom}

  ${props => props.theme.fg.secondary}

  &:hover {
    text-decoration: underline;
    ${props => props.theme.fg.action}
  }

  text-align: center;

  ${props => props.theme.tablet`
    ${props.right ? 'text-align: right;' : 'text-align: left;'}
  `}
`;

const DisclaimerPadding = styled.div`
  ${props => props.theme.reset}

  width: 100%;
  ${props => props.theme.basePadding}
`;

const Disclaimer = styled(FlexAcrossCenter)`
  width: 100%;

  text-align: center;

  ${props => props.theme.actionBorderStyle}
`;

const DisclaimerCopy = styled(Paragraph)`
  ${props => props.theme.fg.action}

  margin-bottom: 0;
  ${props => props.theme.basePadding}
`;

const Footer = (props) => {
  return (
    <Section>
      <FlexResponsiveRow>
        <FlexResponsiveQuarterColumn>
          <FlexDown fill>
            <FooterTitle right>Let America Vote</FooterTitle>
            <FooterLink href={links.about} right>About</FooterLink>
            <FooterLink href={links.store} right>Store</FooterLink>
            <FooterLink href={links.intern} right>Intern</FooterLink>
            <FooterLink href={links.donate} right>Donate</FooterLink>
            <FooterLink href={links.privacy} right>Privacy Policy</FooterLink>
            <FooterLink href={links.contact} right>Contact Us</FooterLink>
          </FlexDown>
        </FlexResponsiveQuarterColumn>
        <FlexResponsiveHalfColumn>
          <DisclaimerPadding>
            <Disclaimer>
              <DisclaimerCopy>Paid for by Let America Vote (www.letamericavote.org). Not authorized by any candidate or candidate’s committee</DisclaimerCopy>
            </Disclaimer>
          </DisclaimerPadding>
        </FlexResponsiveHalfColumn>
        <FlexResponsiveQuarterColumn>
          <FlexDown fill>
            <FooterTitle>Voting Rights House Party</FooterTitle>
            {/* TODO: VRHP About Page? */}
            <FooterLink href={links.about}>About</FooterLink>
            <FooterLink href={SEARCH_ROUTE}>Find a house party</FooterLink>
            {/* TODO: Host google form link */}
            <FooterLink href={links.intern}>Host a house party</FooterLink>
          </FlexDown>
        </FlexResponsiveQuarterColumn>
      </FlexResponsiveRow>
    </Section>
  );
}

export default Footer;
