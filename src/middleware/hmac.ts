import crypto from 'crypto-js';

export function secretKeyInMAC(user: { id: number, phone: string }) {
    const secret = user.id + user.phone;
    return secret
}

export function createHMAC(secret: string, massage: string) {
    const hmac = crypto.HmacSHA256(massage, secret).toString();
    return hmac;
}

export function checkHMAC(secret: string, mac: string, massage: string) {
    const hmac = crypto.HmacSHA256(massage, secret).toString();
    if (hmac == mac)
        return true
    return false;
}

export function splitMassage(massage: string): string[] {
    return massage.split("|")
}

export function mergeMassage(mac: string, massage: string): string {
    return mac + "|" + massage
}

// const user = { id: 2, phone: "0944459045" };
const user = { id: 12, phone: "0936264680" };
const secretKey = secretKeyInMAC(user)
const massage = "test";
const mac = createHMAC(secretKey, massage);

const massageAfterMac = mergeMassage(mac, massage);
const [macfrommassage, rightmassage] = splitMassage(massageAfterMac);
// console.log(macfrommassage)
const isValid = checkHMAC(secretKey, macfrommassage, rightmassage)
console.log("🚀 ~ file: hmac.ts:46 ~ isValid", isValid)