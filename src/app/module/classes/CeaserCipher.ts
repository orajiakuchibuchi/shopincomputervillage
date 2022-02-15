

export class Ceaseerciphers {

  constructor(){}

  static encrypt(text: string, shift: number) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      // tslint:disable-next-line: max-line-length
      if (65 <= c && c <=  90) { result += String.fromCharCode((c - 65 + shift) % 26 + 65); } else if (97 <= c && c <= 122) { result += String.fromCharCode((c - 97 + shift) % 26 + 97); } else {                          result += text.charAt(i); }  // Copy
    }
    return result;
  }
  static decrypt(data: string, key: number) {
    key = (26 - key) % 26;
    return Ceaseerciphers.encrypt(data, key);
  }
}
