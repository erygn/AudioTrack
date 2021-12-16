//import Measure from './measure.js'

class Measure {
    noteFile = {'0': 'c.mp3', '1': 'd.mp3', '2': 'e.mp3'}

    constructor(tps, subTps) {
        this.tps = tps
        this.subTps = subTps
        let beginMat = []
        for (let i = 0; i < tps + subTps; i++) {
            let inter = []
            for (let j = 0; j < 3; j++) {
                inter.push('')
            }
            beginMat.push(inter)
        }
        this.matrix = beginMat
    }

    addNote(row, column) {
        this.matrix[column][row] = this.noteFile[row]
    }

    removeNote(row, column) {
        this.matrix[column][row] = ''
    }

    removeAll() {
        let removeAll = []
        for (let i = 0; i < tps + subTps; i++) {
            let inter = []
            for (let j = 0; j < 3; j++) {
                inter.push('')
            }
            removeAll.push(inter)
        }
        this.matrix = removeAll
    }

    getTps() {
        return this.tps
    }

    getSubTps() {
        return this.subTps
    }

    showMatrix() {
        return this.matrix
    }
}

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

let measure = []

window.addEventListener('load', function () {
    for (let i = 0; i < 4; i++) {
        let ms = new Measure(4, 4)
        measure.push(ms)
    }

    var trk = this.document.getElementById("track")
    for (let i = 0; i < measure.length; i++) {
        let ms = this.document.createElement("div");
        ms.classList.add('measure')
        for (let j = 0; j < measure[i].getTps() * 3; j++) {
            let tp = this.document.createElement("div")
            tp.classList.add('time')
            for (let k = 0; k < measure[i].getSubTps(); k++) {
                let sub = this.document.createElement('div')
                sub.classList.add('subTime')
                sub.id = "elem" + i + j + k
                sub.setAttribute("onclick", "clickElem('elem" + i + j + k + "')")
                tp.appendChild(sub)
            }
            ms.appendChild(tp)
        }
        trk.appendChild(ms)
    }

    /* for (let i = 0; i < 30; i++) {
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
    } */
});

function clickElem(id) {
    var elem = document.getElementById(id)
    if (id in activCases) {
        elem.style.backgroundColor = 'transparent'
        delete activCases[id]
    } else {
        elem.style.backgroundColor = 'blue'
        activCases[id] = true
    }
}

function playTrack() {
    if (barLeft == 1200) {
        barLeft = 0
    }
    clickOnPause = false
    if (isRunning == false) {
        isRunning = true
        moveBar()
    }
}

async function moveBar() {
    if (barLeft < 1200 && isRunning == true) {
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