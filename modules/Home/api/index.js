import { getRequest, postRequest } from "@share/request/basic"

export const ApiHomeGrid = data => {
  return getRequest({
    url: "/statistics/selectCounts",
    data,
    loading: true
  })
}

export const ApiAlarmList = data => {
  return getRequest({
    url: "/statistics/pageExcessiveWarning",
    data,
    loading: true
  })
}

export const ApiSelectEnergyTrend = data => {
  return getRequest({
    url: "/statistics/selectEnergyTrend",
    data,
    loading: true
  })
}

export const ApiSelectEnergyRanking = data => {
  return getRequest({
    url: "/statistics/selectEnergyRanking",
    data,
    loading: true
  })
}
