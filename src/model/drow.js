const MAX_ID = 1000000
const MIN_ID = 1

export function create ({ name, PK, JP, AJ, KLU, ZP, UP }) {
  const fid = Math.random() * (MAX_ID - MIN_ID) + MIN_ID
  const intId = Math.floor(fid)
  const _id = `${intId}`
  return {
    _id,
    name,
    PK,
    JP,
    AJ,
    KLU,
    ZP,
    UP
  }
}

export function format (drow) {
  let _pk
  let _jp
  let _aj
  let _klu
  let _zp
  let _up

  switch (drow.PK) {
    case 1:
      _pk = 'Tidak Ada'
      break
    case 2:
      _pk = '1 Pusat Keramaian'
      break
    case 3:
      _pk = '2 pusat Keramaian'
      break
    case 4:
      _pk = '>2 Pusat Keramaian'
      break
    default:
      throw new Error(`Unknown PK = ${drow.PK}`)
  }

  switch (drow.JP) {
    case 1:
      _jp = '>= 3'
      break
    case 2:
      _jp = '2'
      break
    case 3:
      _jp = '1'
      break
    case 4:
      _jp = 'Tidak Ada'
      break
    default:
      throw new Error(`Unknown JP = ${drow.JP}`)
  }

  switch (drow.AJ) {
    case 1:
      _aj = 'Hanya Pejalan Kaki'
      break
    case 2:
      _aj = 'Hanya Sepeda Motor'
      break
    case 3:
      _aj = 'Hanya Kendaraan Pribadi (Mobil / Motor)'
      break
    case 4:
      _aj = 'Dapat dilalui semua kendaraan'
      break
    default:
      throw new Error(`Unknown AJ = ${drow.AJ}`)
  }

  switch (drow.KLU) {
    case 1:
      _klu = 'Tidak Ada'
      break
    case 2:
      _klu = '1'
      break
    case 3:
      _klu = '2'
      break
    case 4:
      _klu = '>2'
      break
    default:
      throw new Error(`Unknown KLU = ${drow.KLU}`)
  }

  switch (drow.ZP) {
    case 1:
      _zp = 'Tidak Ada'
      break
    case 2:
      _zp = '< 5m'
      break
    case 3:
      _zp = '5 - 10m'
      break
    case 4:
      _zp = '> 10m'
      break
    default:
      throw new Error(`Unknown ZP = ${drow.ZP}`)
  }

  switch (drow.UP) {
    case 1:
      _up = 'Tidak Ada'
      break
    case 2:
      _up = '1-2'
      break
    case 3:
      _up = '3-4'
      break
    case 4:
      _up = '>= 5'
      break
    default:
      throw new Error(`Unknown UP = ${drow.UP}`)
  }

  return {
    _pk,
    _jp,
    _aj,
    _klu,
    _zp,
    _up
  }
}
