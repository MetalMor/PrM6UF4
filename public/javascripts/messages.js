console.log('hola messages');

util = {
    removeMessages: function(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    },
    loadMessages: function(messages) {
        var messageList = document.getElementById('messages');
        this.removeMessages(messageList);
        messages.forEach(function(message) {
            messageList.appendChild(util.createListNode(message));
        });
    },
    createListNode: function(text) {
        var node = document.createElement('li');
        node.textContent = text
        return node;
    },
    nodesToArray: function(nodeArray) {
        var ret = [];
        var len = nodeArray.length;
        for (var counter = 0; counter < len; counter++)
            ret.unshift(nodeArray[counter].innerHTML);
        return ret;
    },
    getDataObject: function() {
        var messagesArray = util.nodesToArray(document.getElementsByTagName('li'));
        var userName = document.getElementById("data").innerHTML.split(' ')[1];
        var channelName = document.getElementById("data").innerHTML.split(' ')[4];
        return {
            data: {
                user: userName,
                channel: channelName,
                messages: messagesArray
            }
        };
    }
};
window.onload = function() {
    userData = util.getDataObject();
    util.loadMessages(userData.data.messages)
    console.log('user data: ' + userData.user);
};


/*function loadMessages(messages) {
    messages.forEach(function(message) {
        messageList.appendChild(createListNode(message));
    });
};

function createListNode(text) {
    var node = document.createElement('li');
    node.textContent = text
    return node;
};

function nodesToArray(nodeArray) {
    var ret = [];
    var len = nodeArray.length;
    for (var counter = 0; counter < len; counter++)
        ret[counter] = getText(nodeArray[counter]);
    return ret;
};

function getText(node) {
    if (node.nodeType === 3)
        return node.data;
    var txt = "";
    if (node = node.firstChild) do {
        txt += getText(node);
    } while (node = node.nextSibling);
};*/
