var xhr;

function inici() {
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
    document.getElementById("enviar").onclick = function() {
        ajaxFunction(document.getElementById("newMessage").value);
    };
}

function ajaxFunction(message) {

    var userData = JSON.parse(localStorage.getItem('userData'));

    //callback
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            userData.newMessage = message;
            //document.getElementById("cadenaInvertida").innerHTML = xhr.responseText;
        }
    };

    xhr.open("POST", "chat", true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userData));
}


window.addEventListener("load", inici, true);
