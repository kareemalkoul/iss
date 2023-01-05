import crypto from "crypto";
import fs from "fs";
import path from "path";

class RsaWrapper {
    public serverPub: Buffer;
    public serverPrivate: Buffer;
    public clinetPub: Buffer;

    constructor() {
        this.serverPub = fs.readFileSync(
            path.resolve("./src/utils", "keys", "server.public.pem")
        );
        this.serverPrivate = fs.readFileSync(
            path.resolve("./src/utils", "keys", "server.private.pem")
        );
        this.clinetPub = fs.readFileSync(
            path.resolve("./src/utils", "keys", "client.public.pem")
        );
    }
    encrypt = (publicKey: Buffer, message: string) => {
        let enc = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(message)
        );
        return enc.toString("base64");
    };
    decrypt = (privateKey: Buffer, message: string) => {
        let enc = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(message, "base64")
        );

        return enc.toString();
    };
}

export { RsaWrapper };
