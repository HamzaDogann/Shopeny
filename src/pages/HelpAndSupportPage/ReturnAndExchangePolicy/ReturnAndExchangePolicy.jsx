import React from 'react'
import { motion } from 'framer-motion';

import { opacityAndTransformEffect } from '../../../shared/animations/animations';
import "./ReturnAndExchangePolicy.scss";
function ReturnAndExchangePolicy() {
  return (
    <motion.div {...opacityAndTransformEffect('y', 23, 0.5)}>
      <h2>İade ve Değişim Politikası</h2>
      <div className='return-and-exchange-box'>
        <p> Müşteri memnuniyeti bizim önceliğimizdir. Alışveriş deneyiminizi daha güvenli ve keyifli hale getirmek için kolay ve anlaşılır bir iade ve değişim politikası sunuyoruz. Eğer satın aldığınız üründen memnun kalmadıysanız ya da farklı bir ürünle değiştirmek istiyorsanız, sizlere yardımcı olmaktan memnuniyet duyarız. Aşağıda, iade ve değişim süreçleri hakkında bilmeniz gereken tüm detayları bulabilirsiniz. Ürünlerinizi orijinal ambalajında, faturası ile birlikte belirtilen süre içinde iade edebilir veya değiştirebilirsiniz.</p>

        <h4>İade Koşulları</h4>
        <h5>Ürünlerin iade edilebilmesi için gerekli koşullar;</h5>
        <ul>
          <li>İade etmek istediğiniz ürünün, ilk alındığı gibi orijinal ambalajında olması gerekmektedir. Ambalajın üzerinde herhangi bir hasar veya deformasyon olmamalı ve ürün, tüm koruyucu materyallerle birlikte iade edilmelidir.</li>
          <li>İade işlemi gerçekleştirilebilmesi için ürünün hiçbir şekilde kullanılmamış ve orijinal etiketlerinin çıkarılmamış olması gerekmektedir. Ürün üzerinde herhangi bir leke, yıpranma veya kullanım izinin bulunmaması önemlidir.
          </li>
          <li>Ürün teslim alındıktan sonra, iade talebinin tarafımıza iletilmesi için 14 günlük bir süre tanınmaktadır. Bu süre zarfında, ürünün iade edilmek istenildiği bildirilmelidir. 14 günlük sürenin aşılması durumunda, iade talepleri kabul edilmeyebilir.</li>
        </ul>

        <h4>İade Süreci</h4>
        <h5>İşte adım adım iade sürecine dair bilgiler;</h5>
        <ul>
          <li>İade işlemini başlatmak için öncelikle bir iade talebi oluşturmanız gerekmektedir. Bu talebi, web sitemiz üzerinden hesabınıza giriş yaparak ya da müşteri hizmetlerimizle iletişime geçerek oluşturabilirsiniz. İade talebinde bulunurken, iade etmek istediğiniz ürünle ilgili sipariş numarası ve diğer gerekli bilgileri doğru ve eksiksiz bir şekilde belirtmeniz önemlidir.</li>
          <li>İade talebiniz onaylandıktan sonra, ürünü orijinal ambalajında ve faturasıyla birlikte bize geri göndermeniz gerekmektedir. Ürünün orijinal ambalajı zarar görmemeli ve ürün, satın alındığı gibi tüm aksesuarları, kullanım kılavuzları ve garanti belgeleri ile birlikte eksiksiz bir şekilde geri gönderilmelidir. Lütfen kargo sırasında ürünün zarar görmemesi için uygun paketleme yapmayı unutmayın.</li>
          <li>İade edilen ürün tarafımıza ulaştığında, ürünün iade koşullarına uygun olup olmadığını kontrol ederiz. İade talebiniz onaylandıktan sonra, geri ödeme işlemi başlatılır. Geri ödemenin hesabınıza yansıması, kullanılan ödeme yöntemine bağlı olarak genellikle 5-7 iş günü sürebilir. İade süreci boyunca sizi bilgilendirmek için e-posta veya telefon yoluyla iletişim kuracağız.</li>
        </ul>
      </div>
    </motion.div>
  )
}

export default ReturnAndExchangePolicy