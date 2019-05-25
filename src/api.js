import axios from 'axios'
import setting from './model/setting'

const BASE_API_URL = process.env.VUE_APP_BASE_API_URL
const RANK_URL = `${BASE_API_URL}/rank`
const AHP_URL = `${BASE_API_URL}/ahp`

export const rankAPI = async (data, indices) => {
  const payload = {
    alternatives: data,
    indices,
    IR: setting.IR(),
    v: setting.v(),
    benefit_cols: setting.benefitCols(),
    criteria_mat: setting.ratioMatrix()
  }
  const response = await axios.post(RANK_URL, payload)
  const result = response.data
  return result
}

export const ahpAPI = async ({ criteria_mat, IR }) => {
  const payload = { criteria_mat, IR }
  const response = await axios.post(AHP_URL, payload)
  const result = response.data
  return result
}
