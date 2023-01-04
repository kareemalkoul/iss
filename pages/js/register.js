$(document).ready(function () {
    var socket = io("http://localhost:8000", {
        autoConnect: false,
    });
    socket.auth = { phone: window.localStorage.getItem("phone") };
    socket.connect();
    socket.on("connection");
    $("#register_button").click(function () {
        socket.emit("RegisterNewUser", {
            name: $("#name").val(),
            phone: $("#phone").val(),
            password: $("#password").val(),
        });
    });

    socket.on("user_logged", (user) => {
        window.location = "http://localhost:8000/user_phone.html";
        window.localStorage.setItem(
            "user_credentials",
            user.id + user.phone
        );
        window.localStorage.setItem("user_id", user.id);
        window.location = "http://localhost:8000/user_phone.html";
        console.log("registered");
    });
});