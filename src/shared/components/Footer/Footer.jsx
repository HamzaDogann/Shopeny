import React from 'react';

import HighlightsBenefits from '../../../components/Footer/HighlightsBenefits';
import InfiniteBrands from '../../../components/Footer/InfiniteBrands';
import SocialContent from '../../../components/Footer/SocialContent';
import Links from '../../../components/Footer/Links';
import Container from '../../container/Container';

import "./footer.scss";

const Footer = React.memo(() => {
    return (
        <div style={{ marginTop: "100px" }}>
            <Container>
                <HighlightsBenefits />
                <InfiniteBrands />
                <SocialContent />
            </Container>
            <Links />
        </div>
    );
});

export default Footer;
