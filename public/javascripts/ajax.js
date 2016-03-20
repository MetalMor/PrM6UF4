console.log('hola ajax');
var inici = function() {
    try {
        // Firefox, Opera 8.0+, Safari, Chrome
        xhr = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
            //ie6+
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                //ie5
            } catch (e) {
                alert("El teu navegador no suporta AJAX!");
                return false;
            }
        }
    }

    window.setInterval(() => {
        ajaxGetMessages();
    }, 1000);
}

function ajaxSendMessage() {
    var text = document.getElementById("newMessage").value;
    var name = userData.user.name;
    xhr.open("POST", "/saveMessage/", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var newMessage = userData.user + '> ' +  document.getElementById('newMessage').value;
    xhr.send(JSON.stringify({message: newMessage, channel: userData.channel}));
};

function ajaxGetMessages() {

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            var messageList = JSON.parse(xhr.responseText);

            //document.getElementById('messages').appendChild();
        }
    };

    userData = util.getDataObject();

    xhr.open("POST", "/chatWindow/", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(userData));
}


window.addEventListener("load", inici, true);
