const PREFIX = 'frninda.settings'
const DEF_RATIO_MATRIX = [
  [1.00, 2.00, 3.00, 5.00, 7.00, 7.00],
  [0.50, 1.00, 3.00, 5.00, 7.00, 7.00],
  [0.33, 0.33, 1.00, 4.00, 5.00, 3.00],
  [0.2, 0.2, 0.25, 1.0, 3.0, 3.0],
  [0.14, 0.14, 0.20, 0.33, 1.0, 2.0],
  [0.14, 0.14, 0.33, 0.33, 0.5, 1.0]
]
const SEC_KEY = `${PREFIX}.secondaryDescription`
const MAIN_KEY = `${PREFIX}.mainTitle`
const SUBTITLE_KEY = `${PREFIX}.subtitle`
const PARALLAX_KEY = `${PREFIX}.parallax`

export default {

  mainDescription () {
    let mainDescription = localStorage.getItem(`${PREFIX}.mainDescription`)
    if (!mainDescription) {
      return 'Sistem Pendukung Keputusan Penentuan Kelayakan Lokasi Usaha Franchise Menggunakan Metode AHP dan VIKOR'
    }
    return mainDescription
  },
  setMainDescription (v) {
    localStorage.setItem(`${PREFIX}.mainDescription`, v)
  },

  secondaryDescription () {
    let text = localStorage.getItem(SEC_KEY)
    if (!text) {
      return 'STUDI KASUS SALOME JOSS - KUPANG'
    }
    return text
  },
  setSecondaryDescription (text) {
    localStorage.setItem(SEC_KEY, text)
  },

  mainTitle () {
    let text = localStorage.getItem(MAIN_KEY)
    if (!text) {
      return 'FRANCHISE RANKING'
    }
    return text
  },
  setMainTitle (text) {
    localStorage.setItem(MAIN_KEY, text)
  },

  subtitle () {
    let text = localStorage.getItem(SUBTITLE_KEY)
    if (!text) {
      return 'JOSS'
    }
    return text
  },
  setSubtitle (text) {
    localStorage.setItem(SUBTITLE_KEY, text)
  },

  parallaxTitle () {
    let text = localStorage.getItem(PARALLAX_KEY)
    if (!text) {
      return 'JOSS -- SALOME'
    }
    return text
  },
  setParallaxTitle (text) {
    localStorage.setItem(PARALLAX_KEY, text)
  },

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
  setV (v) {
    localStorage.setItem(`${PREFIX}.v`, v)
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
    const result = JSON.parse(rawRatioMatrix)
    const parsed = result.map(row => {
      return row.map(el => {
        if ((typeof el) === 'string') {
          return parseFloat(el)
        } else {
          return el
        }
      })
    })
    return parsed
  },
  username () {
    let username = localStorage.getItem(`${PREFIX}.username`)
    if (!username) {
      return 'ninda-takaeb'
    }
    return username
  },
  password () {
    let password = localStorage.getItem(`${PREFIX}.password`)
    if (!password) {
      return 'ninda-takaeb'
    }
    return password
  }
}
