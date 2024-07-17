import { Link, useNavigate } from "react-router-dom";

const SuperDealCards = () => {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="super-deal-cards-box">
            <div className="large-box">
                <h2>Sesin Ötesinde</h2>
                <p>Mükemmel ses kalitesi ve konforu bir arada sunan marka kulaklıklar indirimde. Favori müziğinizi, podcast'lerinizi en yüksek ses kalitesinde dinleyin.</p>
                <Link to="/kulaklik">Ürünlere Gözat</Link>
            </div>
            <div className="small-boxes">
                <div className="small-box" onClick={() => handleNavigate('/telefon')}>
                    <h2>Teknolojinin Zirvesi</h2>
                    <p>En yeni özellikler ve şık tasarımıyla dikkat çeken telefonlar, özel indirimlerle sizlerle buluşuyor! </p>
                </div>
                <div className="small-box" onClick={() => handleNavigate('/televizyon')}>
                    <h2>Göz Alıcı Görüntüler</h2>
                    <p>Sinema kalitesinde görüntü ve ses deneyimi sunan en kaliteli televizyonlar, özel indirim fırsatlarıyla evinize geliyor!</p>
                </div>
            </div>
        </div>
    );
};

export default SuperDealCards;
