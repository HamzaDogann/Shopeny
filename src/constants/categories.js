export const validCategories = [
  'bilgisayar',
  'telefon',
  'televizyon',
  'kulaklik',
  'mikrofon',
  'oyuncu-fareleri',
  'klavye',
  'kamera'
];

export const categoryTranslation = {
  'computers': 'bilgisayar',
  'phones': 'telefon',
  'televisions': 'televizyon',
  'headphones': 'kulaklik',
  'microphones': 'mikrofon',
  'gaming-mice': 'oyuncu-fareleri',
  'keyboards': 'klavye',
  'cameras': 'kamera'
};


export function translateCategoryNameToTurkish(englishCategoryName) {

  const entry = Object.entries(categoryTranslation).find(([key, value]) => key === englishCategoryName);
  return entry ? entry[1] : englishCategoryName; 
}


export function translateCategoryNameToEnglish(turkishCategoryName) {
  const entry = Object.entries(categoryTranslation).find(([key, value]) => value === turkishCategoryName);
  return entry ? entry[0] : turkishCategoryName;
}