$(document).ready(function () {
    var socket = io("http://localhost:8000", {
        autoConnect: false,
    });

    console.log("Hello");
    $("#login_button").click(function () {
        console.log("login");
        socket.auth = { phone: $("#phone").val() };
        socket.connect();
        socket.on("connection");
        socket.emit("Login", {
            phone: $("#phone").val(),
            password: $("#password").val(),
        });
    });
    socket.on("invalid", (message) => {
        alert(message);
        window.location = "http://localhost:8000/index.html";
    });

    socket.on("Valid", (user) => {
        console.log(user);
        window.localStorage.setItem(
            "user_credentials",
            user.id + user.phone
        );
        window.localStorage.setItem("user_id", user.id);
        window.localStorage.setItem("phone", user.phone);
        alert("Wlcome to chating App");
        window.location = "http://localhost:8000/contacts.html";
    });
});