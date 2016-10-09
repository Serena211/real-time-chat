/**
 * Created by Serena on 10/8/16.
 */

//wrapped in a .onload handler just to ensure that all the markup and external JavaScript is fully loaded.
window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var sendMessage = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            if (text == "") {
                alert("Please type your message!");
            }
            socket.emit('send', { message: text, username: name.value });
            // after send, clear input message field
            field.value = "";
        }
    };

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;

            //If the the number of messages becomes too high, the user will need to scroll the div
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    // send message by click or enter.
    sendButton.onclick = sendMessage;
    field.onkeypress = function (event) {
        var code = event.keyCode;
        if (code == 13) {
            sendMessage();
        }
    };

};