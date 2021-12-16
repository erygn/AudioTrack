//import Measure from './measure.js'

class Measure {
    noteFile = {'2': 'c.mp3', '1': 'd.mp3', '0': 'e.mp3'}

    constructor(tps, subTps) {
        this.tps = tps
        this.subTps = subTps
        let beginMat = [], actualRow = 0, countTps = 1
        for (let i = 0; i < tps * 3; i++) {
            let inter = []
            for (let j = 0; j < subTps; j++) {
                inter.push(this.noteFile[actualRow])
            }
            beginMat.push(inter)
            if (countTps == 4) {
                actualRow++;
                countTps = 1
            } else {
                countTps++;
            }
        }
        this.matrix = beginMat
    }

    getNote(tps, sub) {
        return this.matrix[tps][sub]
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

let timeID, barLeft = 0, barTime = 0, barSubTime = 0, isRunning = false, clickOnPause = false

let activCases = {}

let measure = [], actualMeasure = 0, beforeMeasure = -1, actualTime = 0, beforeTime = -1, actualSubTime = 0, beforeSubTime = -1, measureSize = 0, timeSize = 0, subTimeSize = 0

window.addEventListener('load', function () {
    for (let i = 0; i < 4; i++) {
        let ms = new Measure(4, 4)
        measure.push(ms)
    }

    var trk = this.document.getElementById("track")
    for (let i = 0; i < measure.length; i++) {
        let ms = this.document.createElement("div");
        ms.id = i
        ms.classList.add('measure')
        for (let j = 0; j < measure[i].getTps() * 3; j++) {
            let tp = this.document.createElement("div")
            tp.id = i +',' + j
            tp.classList.add('time')
            for (let k = 0; k < measure[i].getSubTps(); k++) {
                let sub = this.document.createElement('div')
                sub.classList.add('subTime')
                sub.id = i + "," + j + "," + k
                sub.setAttribute("onclick", "clickElem('" + i + "," + j + "," + k + "')")
                tp.appendChild(sub)
            }
            ms.appendChild(tp)
        }
        trk.appendChild(ms)
    }

    measureSize = this.document.getElementById('0').offsetWidth
    timeSize = this.document.getElementById('0,0').offsetWidth
    subTimeSize = this.document.getElementById('0,0,0').offsetWidth

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
    let idC = id.split(",")
    let idF = idC[0] + ',' + idC[1] % 4 + ',' + idC[2]
    if (idF in activCases && activCases[idF].includes(measure[idC[0]].getNote(idC[1], idC[2]))) {
        elem.style.backgroundColor = 'transparent'
        if (activCases[idF].length == 0) {
            delete activCases[idF]
        } else {
            activCases[idF].splice(activCases[idF].indexOf(measure[idC[0]].getNote(idC[1], idC[2])), 1)
        }
    } else {
        elem.style.backgroundColor = '#dfe6e9'
        if (!(idF in activCases)) {
            activCases[idF] = []
        }
        activCases[idF].push(measure[idC[0]].getNote(idC[1], idC[2]))
        //console.log(measure[idC[0]].getNote(idC[1], idC[2]))
    }
}

function playTrack() {
    if (barLeft == 1200 || barLeft == 0) {
        barLeft = 0
        barTime = 0
        barSubTime = 0
        beforeSubTime = -1

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
        barLeft += 1;
        barTime += 1
        barSubTime += 1
        if (barTime >= measureSize) {
            barTime = 0
        }
        if (barSubTime >= timeSize) {
            barSubTime = 0
        }
        actualMeasure = parseInt(barLeft / measureSize)
        actualTime = parseInt(barTime / timeSize)
        actualSubTime = parseInt(barSubTime / subTimeSize)
        if (beforeSubTime != actualSubTime) {
            let id = String(actualMeasure + ',' + actualTime + ',' + actualSubTime)
            if (id in activCases) {
                for (let i = 0; i < activCases[id].length; i++) {
                    this.playSound(activCases[id][i])
                }
            }
            beforeSubTime = actualSubTime
        }
        
        /* if (actualTime == 0 && beforeTime != actualTime || actualTime == 1 && beforeTime != actualTime || actualTime == 2 && beforeTime != actualTime || actualTime == 3 && beforeTime != actualTime) {
            this.playSound("c.mp3")
            beforeTime = actualTime
        } */
        timeID = setTimeout(function() { this.moveBar()}, 12);   
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
    barTime = 0
    barSubTime = 0
    beforeSubTime = -1
}