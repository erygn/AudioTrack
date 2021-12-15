/*window.addEventListener('load', function () {
    var stTk = document.getElementById("startTrack");
    stTk.onclick = startTrack;
});*/

let timeID, barLeft = 0, isRunning = false

function startTrack() {
    barLeft = 0
    clearTimeout(timeID)
    isRunning = true
    moveBar()
}

async function moveBar() {
    if (barLeft < 400 && isRunning == true) {
        var bar = document.getElementById("bar");
        bar.style.left = barLeft + 2 + 'px';
        barLeft += 2;
        timeID = setTimeout(function(n) { this.moveBar()}, 10);   
    } else {
        isRunning = false
        clearTimeout(timeID)
    }
}

function playTrack() {
    isRunning = true
    moveBar()
}

function pauseTrack() {
    isRunning = false
}