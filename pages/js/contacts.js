function contact(event) {
    window.location = "http://localhost:8000/user_phone.html";
    // socket.emit("UserChat", {
    //     phone: $(event.target).text(),
    //     user_id: JSON.parse(
    //         window.localStorage.getItem("user_id")
    //     ),
    // });
}
$(document).ready(function () {
    var socket = io("http://localhost:8000", {
        autoConnect: false,
    });
    socket.auth = {
        phone: window.localStorage.getItem("phone"),
    };
    socket.connect();
    socket.on("connection");
    socket.emit("getContacts", {
        phone: $("#phone").val(),
        user_id: JSON.parse(window.localStorage.getItem("user_id")),
    });

    socket.on("ChatData", (message) => {
        user_id = window.localStorage.getItem("user_id");
        window.location = "http://localhost:8000/home.html";
    });

    socket.on("UserNotExist", (message) => {
        alert(message);
        window.location = "http://localhost:8000/contacts.html";
    });
    socket.on("UserIsOffline", (message) => {
        alert(message);
        window.location = "http://localhost:8000/contacts.html";
    });

    socket.on("myContacts", (contacts) => {
        // const myObj = JSON.parse(contacts);
        console.log(contacts);
        let text = "";
        function row(phone, name, status = "Inactive") {
            return `
            <tr>
                <td>
                    <span class="user-subhead"
                        >${name}</span
                    >
                </td>
                <td class="text-center", >
                    <a class="label label-default" onclick="contact()"
                        >${phone}</a
                    >
                </td>
                <td class="text-center">
                    <span class="label label-default"
                        >${status}</span
                    >
                </td>
            </tr>`;
        }
        contacts.forEach((element) => {
            text += row(element.phone, element.name);
        });
        text += "</table>";
        document.getElementById("table_body").innerHTML = text;
    });
});