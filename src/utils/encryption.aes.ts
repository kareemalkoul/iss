import CryptoJS from "crypto-js";

class AESEncryption {

    static encrypt = (key: string, text: string) => {
        const encrypted = CryptoJS.AES.encrypt(text, key);
        return encrypted;
    };

    static decrypt = (key: string, text_encrypted: string) => {
        var decrypted = CryptoJS.AES.decrypt(text_encrypted, key);
        return decrypted;
    };

}

export { AESEncryption };