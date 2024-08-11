//URL FORMATTING
export const slugify = (text) => {
  const map = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
    ' ': '-',
    '&': 'and',
  };

  return text
    .toLowerCase()
    .split('')
    .map(char => map[char] || char) 
    .join('')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
};
