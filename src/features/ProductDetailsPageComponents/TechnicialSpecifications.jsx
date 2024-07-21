const properties = [
  { propertyName: 'Temel İşlemci Hızı', propertyDescription: 'Belirtilmemiş' },
  { propertyName: 'Cihaz Ağırlığı', propertyDescription: '2 - 4 kg' },
  { propertyName: 'Ram (Sistem Belleği)', propertyDescription: '16 GB' },
  { propertyName: 'Ekran Panel Tipi', propertyDescription: 'Liquid Retina XDR' },
  { propertyName: 'Bluetooth Özelliği', propertyDescription: 'Var' },
  { propertyName: 'Optik Sürücü', propertyDescription: 'Yok' },
  { propertyName: 'Ekran Kartı Hafızası', propertyDescription: 'Paylaşımlı' },
  { propertyName: 'Dokunmatik Ekran', propertyDescription: 'Yok' },
  { propertyName: 'SSD Kapasitesi', propertyDescription: '1 TB' },
  { propertyName: 'HDMI', propertyDescription: 'Var' },
];

function TechnicialSpecifications() {
  return (
    <div className='technicial-specifications-box'>
      <div className="product-titles-box">
        <p className="circle"></p>
        <p className="title">Teknik Özellikler</p>
      </div>
      <div className="properties-box">
        {properties.map((property, index) => (
          <div key={index} className={`property-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className='property-name'>{property.propertyName}</div>
            <div className='property-description'>{property.propertyDescription}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicialSpecifications;
