import crypto from 'crypto';

class AESWrapper {
    static getAlgorithmList = () => {
        console.log(crypto.getCiphers());
    };

    static generateKey = () => {
        return crypto.randomBytes(32);
    };

    static generateIv = () => {
        return crypto.randomBytes(16);
    };

    // separate initialization vector from message
    static separateVectorFromData = (data: string) => {
        console.log(data);
        console.log('data');
        var iv = data.slice(-24);
        var message = data.substring(0, data.length - 24)

        return {
            iv: iv,
            message: message
        };
    }

    static encrypt = (key: string, iv: Buffer, text: string) => {
        let encrypted = '';
        let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        encrypted += cipher.update(Buffer.from(text), 'utf8' as any, 'base64');
        encrypted += cipher.final('base64');

        return encrypted;
    };

    static decrypt = (key: string, text: string) => {
        let dec = '';
        let data = AESWrapper.separateVectorFromData(text);
        let cipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(data.iv, 'base64'));
        dec += cipher.update(Buffer.from(data.message, 'base64'), 'base64' as any, 'utf8');
        dec += cipher.final('utf8');

        return dec;
    };

    // add initialization vector to message
    static addIvToBody = (iv: Buffer, encryptedBase64: string) => {
        encryptedBase64 += iv.toString('base64');
        console.log(iv.toString('base64'));

        return encryptedBase64;
    };

    static createAesMessage = (aesKey: string, message: string) => {
        let aesIv = AESWrapper.generateIv();
        let encryptedMessage = AESWrapper.encrypt(aesKey, aesIv, message);
        encryptedMessage = AESWrapper.addIvToBody(aesIv, encryptedMessage);

        return encryptedMessage;
    };
}

const aesKey = "32".repeat(16)
const massage = AESWrapper.createAesMessage(aesKey, "kkkkkkkkkkkk")
console.log(massage)
console.log(AESWrapper.decrypt(aesKey, massage))
export { AESWrapper };