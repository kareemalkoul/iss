$(document).ready(function () {
    var socket = io("http://localhost:8000", {
        autoConnect: false,
    });
    socket.auth = { phone: window.localStorage.getItem("phone") };
    socket.connect();
    socket.on("connection");
    $("#add_button").click(function () {
        socket.emit("addContact", {
            user_id: JSON.parse(
                window.localStorage.getItem("user_id")
            ),
            name: $("#name").val(),
            phone: $("#phone").val(),
        });
    });

    socket.on("contact_added", (user) => {
        window.location = "http://localhost:8000/contacts.html";
    });
});