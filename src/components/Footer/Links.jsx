import { Link } from "react-router-dom";
import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";
import { IoIosArrowRoundForward } from "react-icons/io";
function Links() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (

    <div className="footer-links-section">
      <div className='links-box'>
        <div className="footer-links-item">
          <img style={{ width: "220px" }} src={ShopenyLogo} alt="Shopeny Logo" />
          <h3> Shopeny herhangi bir ticaret faaliyetinde bulunmayı amaçlamamaktadır. Bir React E-Ticaret Sitesi projesi olarak tasarlanmıştır.</h3>
          <button>
            <Link to={"/hakkimizda"}>Daha fazla</Link>
            <IoIosArrowRoundForward style={{ fontSize: "22px" }} />
          </button>
        </div>

        <div className="footer-links-item">
          <h2>Yardım ve Destek</h2>
          <div className="footer-link-item-box">
            <Link to={"/yardim-ve-destek/sikca-sorulan-sorular"}>Sıkça Sorulan Sorular (SSS)</Link>
            <Link to={"/yardim-ve-destek/iade-ve-degisim-politikasi"}>İade ve Değişim Politikası</Link>
            <Link to={"/yardim-ve-destek/teslimat-bilgileri"}>Teslimat Bilgileri</Link>
            <Link to={"/yardim-ve-destek/gizlilik-politikasi"}>Gizlilik Politikası</Link>
          </div>
        </div>

        <div className="footer-links-item  item-3">
          <h2>Kategoriler</h2>
          <div className="footer-link-item-box" >
            {/* Router Link Nesnelerine dönüşecekler */}
            <Link to={"/bilgisayar"}>Bilgisayar</Link>
            <Link to={"/telefon"}>Telefon</Link>
            <Link to={"/televizyon"}>Televizyon</Link>
            <Link to={"/kulaklik"}>Kulaklık</Link>
          </div>
        </div>

        <div className="footer-links-item  item-4">
          <div className="footer-link-item-box" style={{ marginTop: "8px" }}>
            <Link to={"/oyuncu-fareleri"}>Oyuncu Fareleri</Link>
            <Link to={"/mikrofon"}>Mikrofon</Link>
            <Link to={"/kamera"}>Kamera</Link>
            <Link to={"/klavye"}>Klavye</Link>
          </div>
        </div>

        <div className="footer-links-item">
          <h2>Hızlı Bağlantılar</h2>
          <div className="footer-link-item-box">
            <Link to={"/favori-urunler"}>Favori Ürünlerim</Link>
            <Link to={"/hesabim/siparislerim"} onClick={scrollToTop}>Siparişlerim</Link>
            <Link to={"/sepetim"}>Sepetim</Link>
            <Link to={"/hesabim/adreslerim"} onClick={scrollToTop}>Adreslerim</Link>
            <Link to={"/hesabim/hesap-bilgilerim"} onClick={scrollToTop}>Hesap Bilgilerim</Link>
          </div>
        </div>

      </div>


      <span className="copyright-text">Copyright © 2024 All Right Reserved | This Website was created by
        <a href="https://www.linkedin.com/in/hamzadogann/" target="_blank">Hamza Dogan</a>
      </span>

    </div>

  )
}

export default Links