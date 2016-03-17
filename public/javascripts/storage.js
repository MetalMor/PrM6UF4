window.onload = function() {
    var dataArray = document.getElementById('data').innerHTML.split(' ');
    var userData = {
        channelName: dataArray[4],
        userName: dataArray[1]
    };
    localStorage.setItem('userData', JSON.stringify(userData));
};
