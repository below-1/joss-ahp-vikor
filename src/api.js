import axios from 'axios'
import setting from './model/setting'

const API_URL = process.env.VUE_APP_RANK_API_URL
export const rankAPI = async (data, indices) => {
  const payload = {
    alternatives: data,
    indices,
    IR: setting.IR(),
    v: setting.v(),
    benefit_cols: setting.benefitCols(),
    criteria_mat: setting.ratioMatrix()
  }
  const response = await axios.post(API_URL, payload)
  const result = response.data
  return result
}
