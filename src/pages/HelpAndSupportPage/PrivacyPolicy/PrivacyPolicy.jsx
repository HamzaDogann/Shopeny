import React from 'react';
import { motion } from 'framer-motion';

import { opacityAndTransformEffect } from '../../../shared/animations/animations';
import './PrivacyPolicy.scss';

function PrivacyPolicy() {
    return (

        <motion.div {...opacityAndTransformEffect('y', 23, 0.5)}>
            <h2>Gizlilik Politikası</h2>
            <div className="privacy-policy">
                <div className="privacy-section">
                    <h3>Giriş</h3>
                    <p>
                        Bu Gizlilik Politikası, yalnızca eğitim ve geliştirme amaçlarıyla oluşturulmuş olan ve ticari bir faaliyeti bulunmayan React E-Ticaret Sitesi projesi için geçerlidir. Shopeny, kullanıcıların kişisel bilgilerini toplama, kullanma veya paylaşma amacı gütmemektedir. Aşağıda, sitenin veri toplama, kullanma ve koruma politikaları hakkında detaylı bilgi bulabilirsiniz.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>1. Kişisel Bilgilerin Toplanması ve Kullanımı</h3>
                    <p>
                        Shopeny, kullanıcıların kişisel bilgilerini toplama veya kullanma amacı taşımamaktadır. Kullanıcılar sitede gezinirken, herhangi bir kişisel veri veya bilgi istememekteyiz. Bu projenin amacı, yalnızca web geliştirme becerilerini geliştirmek ve karmaşık bir e-ticaret sitesi oluşturma sürecini öğrenmektir. Dolayısıyla, kullanıcı bilgileri ile yalnızca üye olma, giriş yapma ve kullanıcı ile ilgili sepet, favori ürünler gibi verilerin oluşturulması için kullanılır. Bunların dışında herhangi bir işlem yapılmamaktadır.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>2. Çerezler ve İzleme Teknolojileri</h3>
                    <p>
                        Shopeny, kullanıcı deneyimini iyileştirmek amacıyla kullanıcının siteye girişini kolaylaştırmak için JWT barındırmaktadır.  Çerezler ve benzeri teknolojiler, genellikle kullanıcıların web siteleriyle nasıl etkileşime geçtiğini anlamak için kullanılır. Bu proje kapsamında bu tür teknolojilere kısmen yer verilmiştir.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>3. Üçüncü Taraf Hizmetleri ve Sponsorluklar</h3>
                    <p>
                        Shopeny, hiçbir üçüncü taraf hizmeti veya sponsorluğuna bağlı değildir. Kullanıcıların bilgileri, reklam veya analiz amaçlarıyla üçüncü taraflarla paylaşılmamaktadır. Bu projede kullanılan tüm içerik ve hizmetler, yalnızca eğitim ve kişisel gelişim amacıyla sağlanmaktadır ve ticari bir kazanç amacı gütmemektedir.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>4. Güvenlik</h3>
                    <p>
                        Kullanıcı bilgilerinin toplanmadığı ve işlenmediği bu projede, güvenlik önlemleri özellikle vurgulanmamaktadır. Ancak, projenin gelişimi sırasında, genel güvenlik standartlarına ve iyi uygulamalara uymaya özen gösterilmektedir. Kullanıcıların güvenliği ve gizliliği bizim için önemlidir ve bu politikalar, ileride olası veri toplama kapsamına giren projeler için bir rehber olarak hizmet edebilir.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>5. Bilgilerin Korunması ve Gizlilik</h3>
                    <p>
                        Bu projede, kullanıcıların kişisel bilgileri toplanmadığından, bu bilgilerin korunması veya gizliliğinin sağlanması konusunda ek önlemler alınmamaktadır. Ancak, bu gizlilik politikası, ileride kullanıcı bilgileri ile çalışılması gerektiğinde hangi standartlara uyulması gerektiği konusunda bir çerçeve sunar.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>6. Kullanıcı Hakları</h3>
                    <p>
                        Bu proje, kullanıcı bilgilerini toplamasa da, kullanıcıların bilgi gizliliği haklarına saygı göstermektedir. Kullanıcılar, kişisel bilgilerinin nasıl toplandığı, kullanıldığı ve korunduğu konusunda bilgilendirilmelidir. Bu gizlilik politikası, kullanıcıların bu haklarını korumak amacıyla hazırlanmıştır.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>7. Politika Değişiklikleri</h3>
                    <p>
                        Bu Gizlilik Politikası, yalnızca bu proje için geçerli olup, proje geliştikçe güncellenebilir. Politika değişiklikleri, kullanıcılara bildirilecek ve bu sayfa üzerinden erişilebilir olacaktır. Bu projenin kapsamı ve amacına uygun olarak, tüm değişiklikler kullanıcı gizliliğini koruma ilkesine bağlı kalacaktır.
                    </p>
                </div>

                <div className="privacy-section">
                    <h3>Sonuç</h3>
                    <p>
                        Bu Gizlilik Politikası, React E-Ticaret Sitesi projesi kapsamında kullanıcıların gizliliğini koruma taahhüdümüzü yansıtmaktadır. Bu proje, ticari bir amaç gütmemekte ve kullanıcıların kişisel bilgilerini toplama veya işleme amacı taşımamaktadır. Bu politika, yalnızca bilgilendirme amacı taşımaktadır ve kullanıcıların gizliliğini koruma taahhüdümüzün bir parçasıdır. Herhangi bir soru veya endişeniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default PrivacyPolicy;
