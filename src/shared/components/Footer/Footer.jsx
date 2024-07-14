import React from 'react';
import HighlightsBenefits from '../../../features/Footer/HighlightsBenefits';
import InfiniteBrands from '../../../features/Footer/InfiniteBrands';
import SocialContent from '../../../features/Footer/SocialContent';
import Links from '../../../features/Footer/Links';
import "./footer.scss";
import Container from '../../../features/Container/Container';

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
