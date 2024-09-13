function TechnicialSpecifications({technicalSpecifications}) {
  return (
    <div className='technicial-specifications-box'>
      <div className="product-titles-box">
        <p className="circle"></p>
        <p className="title">Teknik Özellikler</p>
      </div>
      <div className="properties-box">
        {technicalSpecifications.map((property, index) => (
          <div key={index} className={`property-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className='property-name'>{property.propertyName}</div>
            <div className='property-description'>{property.propertyDetail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicialSpecifications;
