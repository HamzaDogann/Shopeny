export const slugify = (text) => {
    const map = {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
      ' ': '-', // Boşlukları tire ile değiştir
      '&': 'and', // Özel karakterleri İngilizce karşılıklarına dönüştür
    };
  
    return text
      .toLowerCase()
      .split('')
      .map(char => map[char] || char) // Türkçe karakterleri İngilizce karakterlere dönüştür
      .join('')
      .replace(/[^a-z0-9\-]/g, '') // Sadece a-z, 0-9 ve tireye izin ver
      .replace(/--+/g, '-') // Birden fazla tireyi tek tireye dönüştür
      .replace(/^-+|-+$/g, ''); // Başındaki ve sonundaki tireleri kaldır
  };
  