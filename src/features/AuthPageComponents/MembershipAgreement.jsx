import React from 'react'
import { IoCloseCircle } from "react-icons/io5";

function MembershipAgreement({handleAgreement}) {
    return (
        <div className='membership-agreement'>

            <div className='membership-agreement-modal'>
                <h3 className='text-center'>Üyelik Sözleşmesi</h3>
                <div className='agreements-box'>
                    <h3>1. Sözleşmenin Amacı</h3>
                    <p>
                        <strong>1.1.</strong> Bu Sözleşme, Shopeny adlı e-ticaret simülasyon sitesinin kullanım şartlarını ve Üye'nin hak ve yükümlülüklerini belirlemek amacıyla düzenlenmiştir.
                    </p>
                    <p>
                        <strong>1.2.</strong> Shopeny, herhangi bir ticari amaç gütmemekte olup, yalnızca React projesi olarak geliştirilmiştir. Site, gerçek bir e-ticaret sitesini simüle etmek amacıyla tasarlanmıştır.
                    </p>

                    <h3>2. Üyelik Koşulları</h3>
                    <p>
                        <strong>2.1.</strong> Üyelik başvurusunda bulunarak, Üye bu Sözleşme'yi okuduğunu, anladığını ve tüm şartlarını kabul ettiğini beyan eder.
                    </p>
                    <p>
                        <strong>2.2.</strong> Üyelik başvurusu, Üye'nin gerekli bilgileri eksiksiz ve doğru bir şekilde doldurması ve Proje Sahibi'nin onayı ile tamamlanır. Proje Sahibi, üyelik başvurularını kabul etmeme hakkını saklı tutar.
                    </p>

                    <h3>3. Kullanım Şartları ve Sınırlamaları</h3>
                    <p>
                        <strong>3.1.</strong> Üye, Shopeny sitesini yalnızca kişisel kullanım amacıyla kullanacağını kabul eder. Site üzerindeki tüm işlemler (sepete ekleme, adres ekleme vb.) tamamen simülasyon amaçlı olup, gerçek bir ticari işlem niteliği taşımamaktadır.
                    </p>
                    <p>
                        <strong>3.2.</strong> Üye, site üzerindeki tüm içeriklerin ve işlemlerin gerçek olmadığını, sadece eğitim ve proje geliştirme amacıyla sunulduğunu kabul eder.
                    </p>

                    <h3>4. Gizlilik</h3>
                    <p>
                        <strong>4.1.</strong> Proje Sahibi, Üye'nin kişisel verilerini hiçbir üçüncü taraf ile paylaşmayacağını taahhüt eder.
                    </p>
                    <p>
                        <strong>4.2.</strong> Üye, siteye erişim için kullandığı şifre ve kullanıcı adı gibi bilgilerin güvenliğinden sorumludur. Üye, bu bilgilerin yetkisiz kişilerce kullanılmasından dolayı doğabilecek zararlardan kendisi sorumludur.
                    </p>

                    <h3>5. Verilerin Kullanımı ve Güvenliği</h3>
                    <p>
                        <strong>5.1.</strong> Üye tarafından sağlanan tüm bilgiler, sadece simülasyon amacıyla kullanılacak ve hiçbir ticari veya üçüncü taraf amaçla işlenmeyecektir.
                    </p>
                    <p>
                        <strong>5.2.</strong> Üye'nin site üzerindeki tüm işlemleri (sepete ekleme, adres ekleme vb.) gerçek bir ticari işlem gibi işlemeyecek, sadece simülasyon kapsamında değerlendirilecektir.
                    </p>

                    <h3>6. Sorumluluk Reddi</h3>
                    <p>
                        <strong>6.1.</strong> Proje Sahibi, site üzerindeki içeriklerin ve işlemlerin gerçeklik taşımadığını, sadece eğitim ve geliştirme amaçlı olduğunu beyan eder. Üye, bu durumu kabul eder ve siteyi bu bilinçle kullanır.
                    </p>
                    <p>
                        <strong>6.2.</strong> Üye, site kullanımı sırasında doğabilecek herhangi bir zarardan Proje Sahibi'ni sorumlu tutmayacağını kabul eder.
                    </p>
                </div>
                <IoCloseCircle onClick={()=>handleAgreement()} className='close-agreement-modal' />
            </div>
        </div>
    )
}

export default MembershipAgreement