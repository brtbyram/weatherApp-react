export function convertTurkishToEnglish(str) {
  const charMap = {
    Ç: "C",
    ç: "c",
    Ğ: "G",
    ğ: "g",
    İ: "I",
    ı: "i",
    Ö: "O",
    ö: "o",
    Ş: "S",
    ş: "s",
    Ü: "U",
    ü: "u",
  };

  return str.replace(/[ÇçĞğİıÖöŞşÜü]/g, (match) => charMap[match] || match);
}
