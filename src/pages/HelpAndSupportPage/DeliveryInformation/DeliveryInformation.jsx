import React from 'react'
import Fee from "../../../assets/images/DeliveryInformations/Fee.png"
import Location from "../../../assets/images/DeliveryInformations/Location.png"
import Time from "../../../assets/images/DeliveryInformations/Time.png"
import Cargo from "../../../assets/images/DeliveryInformations/Cargo.png"
import { motion } from 'framer-motion';

import "./DeliveryInformation.scss";
import { opacityAndTransformEffect } from '../../../shared/animations/animations'
function DeliveryInformation() {
  return (
    <motion.div  {...opacityAndTransformEffect('y', 25, 0.5)}>
      <h2>Teslimat Bilgileri</h2>
      <div className='delivery-information-box'>
        <p>Değerli müşterilerimiz, siparişlerinizi güvenle ve zamanında teslim almanız bizim önceliğimizdir. Bu sayfada, siparişlerinizin teslimat süreci hakkında bilmeniz gereken tüm detayları bulabilirsiniz. Teslimat hizmetlerimizle ilgili her türlü sorunuz ve öneriniz için müşteri hizmetlerimizle iletişime geçmekten çekinmeyin. Sizlere en iyi alışveriş deneyimini sunmak için buradayız!</p>

        <div className='advantages-box'>

          <div className='advantage'>
            <img src={Time} alt="" />
            <span>Süper Hızlı</span>
          </div>

          <div className='advantage'>
            <img src={Location} alt="" />
            <span>Adrese Teslim</span>
          </div>

          <div className='advantage'>
            <img src={Fee} alt="" />
            <span>Kolay Ödeme</span>
          </div>

        </div>

        <h4>Teslimat Süreleri</h4>
        <ul>
          <li><strong>Standart Teslimat:</strong> Standart teslimat süremiz 3-5 iş günü arasındadır. Siparişleriniz, ödeme onayından sonra belirtilen süre içinde kargoya teslim edilir ve belirttiğiniz adrese gönderilir.</li>
          <li><strong>Hızlı Teslimat:</strong> Acil ihtiyacınız olan ürünler için hızlı teslimat seçeneğimiz mevcuttur. Hızlı teslimat ile siparişiniz 1-2 iş günü içinde elinize ulaşır. Bu hizmet ek ücrete tabidir ve ödeme sayfasında belirtilecektir.</li>
          <li><strong>Teslimat Saatleri:</strong> Hafta içi her gün 09:00 - 18:00 saatleri arasında gerçekleştirilir. Teslimat sırasında belirli bir saat dilimi tercih ediyorsanız, sipariş notu bölümünde belirtebilirsiniz. Ancak bu talep, kargo firmasının operasyonel koşullarına bağlı olarak değişebilir.</li>
        </ul>

        <h4>Teslimat Bölgeleri</h4>
        <ul>
          <li><strong>Şehir İçi Teslimat:</strong> Şehir içi teslimatlarımız, tüm il ve ilçeleri kapsamaktadır. Şehir içi bölgelerde genellikle 1-2 iş günü içinde teslimat yapılmaktadır.</li>
          <li><strong>Şehir Dışı Teslimat:</strong> Şehir dışı teslimatlarımız, Türkiye'nin her yerine hizmet vermektedir. Ancak bazı bölgeler için teslimat süreleri 3-7 iş günü arasında değişebilir.</li>
        </ul>

        <div className='cargo-box'>
          <div>
            <img className='shopeny-cargo-truck' src={Cargo} alt="" />
          </div>
          <div>
            <h4>Kargo Ücretleri</h4>
            <ul>
              <li><strong>Standart Kargo Ücretleri:</strong> 100 TL ve üzeri alışverişlerinizde ücretsiz kargo imkanı sunuyoruz. Ücretsiz kargo kampanyası, yalnızca standart teslimat seçeneği için geçerlidir.</li>
              <li><strong>Hızlı Kargo Ücretleri:</strong> Şehir içi teslimat ücretimiz 50 TL, şehir dışı teslimat ücretimiz ise 80 TL'dir. Kargo ücretleri, sipariş toplamına eklenerek ödeme sayfasında görüntülenir.</li>
            </ul>
          </div>
        </div>

      </div>

    </motion.div>
  )
}

export default DeliveryInformation