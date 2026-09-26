import React, { useEffect } from 'react'
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";

import { FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareUpwork } from "react-icons/fa6";

import Container from '../../shared/container/Container';
import AnimationBackground from '../../shared/components/AnimationBackground/AnimationBackground';
import { Link, useLocation } from 'react-router-dom';
import "./About.scss";

function About() {

    const location = useLocation();
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location]);

    return (
        <Container>
            <div className='about-general-box'>

                <div className='shopeny-logo-box'>
                    <Link to="/" ><img src={ShopenyLogo} alt="shopeny-logo" /></Link>
                </div>

                <h3>Geliştirici Hakkında</h3>
                <div className='about-developer-box'>
                    <div className='developer'>
                        <img src="https://media.licdn.com/dms/image/v2/D4D03AQFY5NzFl3c4RA/profile-displayphoto-scale_400_400/B4DZzDcfKlKgAg-/0/1772805562284?e=1792022400&v=beta&t=plMuML9ejnoTRTN70Mk0Vq4djJzlxoZQ34v1u_96S9Q" alt="" />
                        <p>Hamza Doğan</p>
                        <span>Software Developer</span>
                    </div>
                    <div className='developer-description'>
                        <p> Ben Hamza Doğan, modern web teknolojileri konusunda geniş bir bilgi birikimine sahip bir yazılım geliştiricisiyim. React, Sass, ve TailwindCSS gibi araçlarla dinamik ve etkileşimli kullanıcı arayüzleri oluşturuyorum. Animasyonlu ve kullanıcı deneyimi odaklı (UX/UI) tasarımlarda yetkinim. Git ve GitHub ile versiyon kontrol sistemleri üzerinde ve Firebase ile veri tabanı yönetimi konusunda proje deneyimli bilgi sahibiyim.  Tüm bu teknolojileri bir araya getirerek, yaratıcı ve etkileyici web uygulamaları geliştirmekteyim.</p>
                        <p style={{ marginTop: "20px" }}>Bana ulaşabileceğiniz bağlantılar,</p>
                        <div className='social-media-addresses-box'>
                            <a href="https://www.linkedin.com/in/hamzadogann/" target='_blank'>
                                <FaLinkedin />
                            </a>

                            <a href="https://github.com/HamzaDogann" target='_blank'>
                                <ImGithub />
                            </a>

                            <a href="http://instagram.com/hamza.dgn_" target='_blank'>
                                <FaSquareInstagram />
                            </a>

                            <a href="https://www.upwork.com/freelancers/~017712df24c17daa43" target='_blank'>
                                <FaSquareUpwork />
                            </a>
                        </div>
                    </div>
                </div>

                <h3>Proje Hakkında</h3>

                <div className='about-description-box'>
                    <p>
                        Shopeny adını verdiğim bu e-ticaret sitesi projesini, React ve Sass kullanarak geliştirdim. Bu proje, ticari amaçlı olmamakla birlikte, proje geliştirme deneyimi kazanmak ve farklı teknolojilerle  entegre şekilde çalışarak yeteneklerimi geliştirmek için hazırlanmıştır.
                    </p>
                    <p>
                        Shopeny, tamamen eğitim amaçlı olup, herhangi bir veri paylaşımı yapılmamaktadır. Proje sürecinde öğrendiğim yeni teknolojiler ve metodolojiler, profesyonel gelişimime katkıda bulunmuş ve becerilerimi bir üst seviyeye taşımıştır.
                    </p>
                    <p>
                        Bu proje aynı zamanda, frontend geliştirme yeteneklerimi sergileyerek olası iş fırsatları için değerli bir kaynak oluşturmayı hedeflemektedir. 💼 İlgili kişiler ve işverenler için, yaratıcı çözümler üretebilme kapasitemi ve teknik bilgi birikimimi gözler önüne seren bir portföy niteliğindedir. ✨
                    </p>
                    <p>
                        Shopeny ile elde ettiğim deneyimler, gelecekte daha büyük ve karmaşık projelerde çalışabilme yetkinliğimi pekiştirmiştir. Bu süreçte destek olan ve katkıda bulunan herkese teşekkür ederim. 🙏
                    </p>
                </div>
                <AnimationBackground />
            </div>
        </Container>
    )
}

export default About