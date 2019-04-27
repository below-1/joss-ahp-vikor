const PREFIX = 'frninda.settings'
const DEF_RATIO_MATRIX = [
  [1.00, 2.00, 3.00, 5.00, 7.00, 7.00],
  [0.50, 1.00, 3.00, 5.00, 7.00, 7.00],
  [0.33, 0.33, 1.00, 4.00, 5.00, 3.00],
  [0.2, 0.2, 0.25, 1.0, 3.0, 3.0],
  [0.14, 0.14, 0.20, 0.33, 1.0, 2.0],
  [0.14, 0.14, 0.33, 0.33, 0.5, 1.0]
]

export default {
  IR () {
    let rawIR = localStorage.getItem(`${PREFIX}.IR`)
    if (!rawIR) {
      return 1.24
    }
    return parseFloat(rawIR)
  },
  v () {
    let rawV = localStorage.getItem(`${PREFIX}.v`)
    if (!rawV) {
      return 0.5
    }
    return parseFloat(rawV)
  },
  benefitCols () {
    let rawBenCols = localStorage.getItem(`${PREFIX}.benefitCols`)
    if (!rawBenCols) {
      rawBenCols = JSON.stringify([true, true, true, true, true, true])
    }
    const benefitCols = JSON.parse(rawBenCols)
    return benefitCols
  },
  ratioMatrix () {
    let rawRatioMatrix = localStorage.getItem(`${PREFIX}.ratioMatrix`)
    if (!rawRatioMatrix) {
      return DEF_RATIO_MATRIX
    }
    JSON.parse(rawRatioMatrix)
  }
}
