export default class Measure {
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