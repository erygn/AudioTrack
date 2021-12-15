window.addEventListener('load', function () {
    var trk = this.document.getElementById("track")
    for (let i = 0; i < 50; i++) {
        let div = this.document.createElement('div')
        div.classList.add('elem')
        if (i == 6 || i == 13) {
            div.classList.add('elemPlay')
        }
        trk.appendChild(div)
    }
});

let timeID, barLeft = 0, isRunning = false, clickOnPause = false

function playTrack() {
    if (barLeft == 1000) {
        barLeft = 0
    }
    clickOnPause = false
    if (isRunning == false) {
        isRunning = true
        moveBar()
    }
}

async function moveBar() {
    if (barLeft < 1000 && isRunning == true) {
        var bar = document.getElementById("bar");
        bar.style.left = barLeft + 1 + 'px';
        barLeft += 1;
        if (barLeft == 300 || barLeft == 600) {
            this.playSound()
        }
        timeID = setTimeout(function(n) { this.moveBar()}, 1);   
    } else {
        isRunning = false
        clearTimeout(timeID)
        if (clickOnPause == false) {
            var repeat = document.getElementById('repeat');
            if (repeat.checked) {
                this.playTrack()
            }
        }
    }
}

function playSound() {
    let pl = new Audio("c.mp3");
    pl.play();
}

function pauseTrack() {
    if (clickOnPause == true) {
        this.stopTrack()
    } else {
        clickOnPause = true
        isRunning = false
    }
}

function stopTrack() {
    clickOnPause = false
    isRunning = false
    clearTimeout(timeID)
    var bar = document.getElementById("bar");
    bar.style.left = '0px';
    barLeft = 0
}