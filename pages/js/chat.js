$(document).ready(function () {
    var chat_id = window.localStorage.getItem("current_chat_id")
    let socket = io('http://localhost:8000',{ autoConnect: false });
    socket.auth = { phone: window.localStorage.getItem("phone") } ;
    socket.connect();
    
    socket.on('connection')
    let chatInput = $('#chat_input');
    $('#send_message').click(function () {
        let message = chatInput.html();
        console.log("send");
        socket.emit("sendMsdToUser", {
            chat_id: chat_id,
            user_id: window.localStorage.getItem("user_id"),
            message: message
        });
    })

    // $('#send_message').click(function () {
    //     let message = chatInput.html();
    //     let secret_key = window.localStorage.getItem('user_credentials');
    //     var enc = new TextEncoder("utf-8");

    //     window.crypto.subtle.importKey(
    //         "raw", // raw format of the key - should be Uint8Array
    //         enc.encode(secret_key),
    //         { // algorithm details
    //             name: "HMAC",
    //             hash: {name: "SHA-256"}
    //         },
    //         false, // export = false
    //         ["sign", "verify"] // what this key can do
    //     ).then(key => {
    //         window.crypto.subtle.sign(
    //             "HMAC",
    //             key,
    //             enc.encode(message)
    //         ).then(signature => {
    //             var b = new Uint8Array(signature);
    //             var encryptedMacMessage = Array.prototype.map.call(b, x => x.toString(16).padStart(2, '0')).join("")
    //             // console.log(encryptedMacMessage);
    //             socket.emit("sendChatToServer", {
    //                 user_id: window.localStorage.getItem("user_id"),
    //                 phone: window.localStorage.getItem("phone"),
    //                 message: encryptedMacMessage + "|" + message
    //             });
    //             chatInput.html('');
    //         });
    //     });

    //     // socket.emit("sendChatToServer", encryptedMessage);
    //     // chatInput.html('');
    //     return false;
    // });

    socket.on('sendChatToClient', (message) => {
        $('.chat-content ul').append(`<li>${message}</li>`)
    });
    socket.on('msgSent', (message) => {
        $('.chat-content ul').append(`<li>${message}</li>`)
    });
})