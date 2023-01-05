import crypto from "crypto"

class EAS{
    separateVectorFromData = (data:string) =>  {
        console.log(data);
        console.log('data');
        var iv = data.slice(-24);
        var message = data.substring(0, data.length - 24)
    
        return{
            iv: iv,
            message: message
        };
    }
    
    decrypt = (key: any, text:string) => {
        let dec = '';
        let data = this.separateVectorFromData(text);
        let cipher = crypto.createDecipheriv('aes-256-cbc', key,  Buffer.from(data.iv, 'base64'));
        dec += cipher.update(Buffer.from(data.message, 'base64').toString(), 'base64', 'utf8');
        dec += cipher.final('utf8');
    
        return dec;
    };
}

export {EAS}