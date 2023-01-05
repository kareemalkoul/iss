import crypto from 'crypto';
import buffer from 'buffer';

// Creating a private key
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});
// Using Hashing Algorithm
const algorithm = "SHA256";

// Converting string to buffer
const data = Buffer.from("I Love GeeksForGeeks");

// Sign the data and returned signature in buffer
const signature = crypto.sign(algorithm, data, privateKey);

// Verifying signature using crypto.verify() function
export const checkVerified = (data: any, publicKey: string, signature: any) => {
    const isVerified = crypto.verify(algorithm, data, publicKey, signature);
    return isVerified;
}

// Printing the result console.log(Is signature verified: ${isVerified});