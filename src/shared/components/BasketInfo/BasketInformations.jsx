import "./BasketInformations.scss";
function BasketInformations() {

    return (
        <div className="basket-information-box">
            <h2>Sepet Bilgisi</h2>
            <div className="product-amount-and-price-box">
                <p>8 Ürün</p>
                <p>350.000₺</p>
            </div>
            <p className="dividing-line"></p>
            <h2>Teslimat</h2>
            <div className="choose-cargo-box">
                <select name="" id="">
                    <option value="">Normal Kargo</option>
                    <option value="">Hızlı Kargo</option>
                </select>
                <p>Hızlı kargolar için ek ücret uygulanır</p>
            </div>
            <p className="dividing-line"></p>
            <h2>Promosyon</h2>
            <div className="promotion-box">
                <input type="text" name="" id="" placeholder="İndirim için promosyon kodu giriniz" />
                <button className="confirm-promotion-btn">Uygula</button>
            </div>
            <p className="dividing-line"></p>
            <div className="total-promotion-and-cargo-prices-box">
                <div className="price-box">
                    <p>Promosyon İndirimi</p>
                    <span className="promotion-discount">20%</span>
                </div>
                <div className="price-box">
                    <p>Kargo Ücreti</p>
                    <span className="cargo-price">+70₺</span>
                </div>
            </div>
            <p className="dividing-line"></p>
            <div className="basket-total-price-box">
                <p>Toplam Tutar</p>
                <p className="total-price">450.000₺</p>
            </div>
            <div className="checkout-button-box">
                <button className="checkout-btn">Sepeti Onayla</button>
            </div>

        </div>
    )
}

export default BasketInformations