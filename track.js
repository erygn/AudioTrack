let timeID, barLeft = 0, isRunning = false, clickOnPause = false

let activCases = {
    '0': {},
    '100': {},
    '200': {},
    '300': {},
    '400': {},
    '500': {},
    '600': {},
    '700': {},
    '800': {},
    '900': {},
}, allCases = {}


window.addEventListener('load', function () {
    var trk = this.document.getElementById("track")
    for (let i = 0; i < 30; i++) {
        let div = this.document.createElement('div')
        div.classList.add('elem')
        div.id = "elem" + i
        if (i >= 0 && i < 10) {
            allCases["elem" + i] = {song: 'e.mp3'}
        } else if (i >= 10 && i < 20) {
            allCases["elem" + i] = {song: 'd.mp3'}
        } else {
            allCases["elem" + i] = {song: 'c.mp3'}
        }
        div.setAttribute("onclick", "clickElem('elem" + i + "')")
        trk.appendChild(div)
    }
});

function clickElem(id) {
    var elem = document.getElementById(id)
    if (id in activCases) {
        elem.style.backgroundColor = 'transparent'
        delete activCases[id]
        if (id == 'elem0' || id == 'elem10' || id == 'elem20') {
            delete activCases['0'][id]
        } else if (id == 'elem1' || id == 'elem11' || id == 'elem21') {
            delete activCases['100'][id]
        } else if (id == 'elem2' || id == 'elem12' || id == 'elem22') {
            delete activCases['200'][id]
        } else if (id == 'elem3' || id == 'elem13' || id == 'elem23') {
            delete activCases['300'][id]
        } else if (id == 'elem4' || id == 'elem14' || id == 'elem24') {
            delete activCases['400'][id]
        } else if (id == 'elem5' || id == 'elem15' || id == 'elem25') {
            delete activCases['500'][id]
        } else if (id == 'elem6' || id == 'elem16' || id == 'elem26') {
            delete activCases['600'][id]
        } else if (id == 'elem7' || id == 'elem17' || id == 'elem27') {
            delete activCases['700'][id]
        } else if (id == 'elem8' || id == 'elem18' || id == 'elem28') {
            delete activCases['800'][id]
        } else if (id == 'elem9' || id == 'elem19' || id == 'elem29') {
            delete activCases['900'][id]
        }
    } else {
        elem.style.backgroundColor = 'blue'
        activCases[id] = true
        if (id == 'elem0' || id == 'elem10' || id == 'elem20') {
            activCases['0'][id] = true
        } else if (id == 'elem1' || id == 'elem11' || id == 'elem21') {
            activCases['100'][id] = true
        } else if (id == 'elem2' || id == 'elem12' || id == 'elem22') {
            activCases['200'][id] = true
        } else if (id == 'elem3' || id == 'elem13' || id == 'elem23') {
            activCases['300'][id] = true
        } else if (id == 'elem4' || id == 'elem14' || id == 'elem24') {
            activCases['400'][id] = true
        } else if (id == 'elem5' || id == 'elem15' || id == 'elem25') {
            activCases['500'][id] = true
        } else if (id == 'elem6' || id == 'elem16' || id == 'elem26') {
            activCases['600'][id] = true
        } else if (id == 'elem7' || id == 'elem17' || id == 'elem27') {
            activCases['700'][id] = true
        } else if (id == 'elem8' || id == 'elem18' || id == 'elem28') {
            activCases['800'][id] = true
        } else if (id == 'elem9' || id == 'elem19' || id == 'elem29') {
            activCases['900'][id] = true
        }
    }
}

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
        if (barLeft == 0) {
            Object.keys(activCases['0'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 100) {
            Object.keys(activCases['100'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 200) {
            Object.keys(activCases['200'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 300) {
            Object.keys(activCases['300'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 400) {
            Object.keys(activCases['400'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 500) {
            Object.keys(activCases['500'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 600) {
            Object.keys(activCases['600'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 700) {
            Object.keys(activCases['700'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 800) {
            Object.keys(activCases['800'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        } else if (barLeft == 900) {
            Object.keys(activCases['900'] || {}).forEach(item => {
                this.playSound(allCases[item].song)
            })
        }
        barLeft += 1;
        timeID = setTimeout(function() { this.moveBar()}, 1);   
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

function playSound(audio) {
    let pl = new Audio(audio);
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