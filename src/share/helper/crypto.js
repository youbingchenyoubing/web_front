import * as CryptoJS from "crypto-js"
import { aes } from "@constants/crypto"

export const enCryptoAES = value => {
  return CryptoJS.AES.encrypt(value, aes.KEY, {
    iv: aes.IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).ciphertext.toString()
}

export const deCryptoAES = value => {
  value = CryptoJS.enc.Hex.parse(word)
  value = CryptoJS.enc.Base64.stringify(value)
  CryptoJS.AES.decrypt(value, aes.KEY, {
    iv: aes.IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
    .toString(CryptoJS.enc.Utf8)
    .toString()
}

// MD5 加密
export function enCryptoMd5(word) {
  return CryptoJS.MD5(word).toString()
}
