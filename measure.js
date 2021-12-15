export default class Measure {
    noteFile = {'0': 'c.mp3', '1': 'd.mp3', '2': 'e.mp3'}

    constructor(tps, subTps) {
        this.tps = tps
        this.subTps = subTps
        let beginMat = []
        for (let i = 0; i < 3; i++) {
            let inter = []
            for (let j = 0; j < tps + subTps; j++) {
                inter.push('')
            }
            beginMat.push(inter)
        }
        this.matrix = beginMat
    }

    addNote(row, column) {
        this.matrix[row][column] = this.noteFile[row]
    }

    removeNote(row, column) {
        this.matrix[row][column] = ''
    }

    removeAll() {
        let removeAll = []
        for (let i = 0; i < 3; i++) {
            let inter = []
            for (let j = 0; j < tps + subTps; j++) {
                inter.push('')
            }
            removeAll.push(inter)
        }
        this.matrix = removeAll
    }

    showMatrix() {
        return this.matrix
    }
}