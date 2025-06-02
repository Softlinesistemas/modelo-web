export default function generateRandomKey() {
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      key += allowedChars.charAt(randomIndex);
    }
    return key;
  }