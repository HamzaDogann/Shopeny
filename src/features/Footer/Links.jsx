import ShopenyLogo from "../../assets/logo/ShopenyLogo.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import Container from "../../shared/container/Container";

function Links() {
  return (

    <div className="footer-links-section">
      <div className='links-box'>
        <div className="footer-links-item">
          <img style={{ width: "220px" }} src={ShopenyLogo} alt="Shopeny Logo" />
          <h3> Shopeny herhangi bir ticaret faaliyetinde bulunmayı amaçlamamaktadır. Bir React E-Ticaret Sitesi projesi olarak tasarlanmıştır.</h3>
          <button>
            <span>Daha Fazla</span>
            <IoIosArrowRoundForward style={{ fontSize: "22px" }} />
          </button>
        </div>

        <div className="footer-links-item">
          <h2>Yardım ve Destek</h2>
          <div className="footer-link-item-box">
            {/* Router Link Nesnelerine dönüşecekler */}
            <a href="">Sıkça Sorulan Sorular (SSS)</a>
            <a href="">İade ve Değişim Politikası</a>
            <a href="">Teslimat Bilgileri</a>
            <a href="">Gizlilik Politikası</a>
          </div>
        </div>

        <div className="footer-links-item  item-3">
          <h2>Kategoriler</h2>
          <div className="footer-link-item-box" >
            {/* Router Link Nesnelerine dönüşecekler */}
            <a href="">Bilgisayar</a>
            <a href="">Telefon</a>
            <a href="">Televizyon</a>
            <a href="">Kulaklık</a>
          </div>
        </div>

        <div className="footer-links-item  item-4">
          <div className="footer-link-item-box" style={{ marginTop: "8px" }}>
            {/* Router Link Nesnelerine dönüşecekler */}
            <a href="">Oyuncu Fareleri</a>
            <a href="">Mikrofon</a>
            <a href="">Kamera</a>
            <a href="">Klavye</a>
          </div>
        </div>

        <div className="footer-links-item">
          <h2>Hızlı Bağlantılar</h2>
          <div className="footer-link-item-box">
            {/* Router Link Nesnelerine dönüşecekler */}
            <a href="">Favori Ürünlerim</a>
            <a href="">Siparişlerim</a>
            <a href="">Sepetim</a>
            <a href="">Adres Bilgilerim</a>
            <a href="">Kullanıcı Bilgilerim</a>
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