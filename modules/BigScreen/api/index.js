import { getRequest, postRequest, formRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/statistics/pageExcessiveWarning",
    loading: true,
    data
  })
}

export const ApiArchivesCounts = data => {
  return getRequest({
    url: "/statistics/selectArchivesTypeCounts",
    loading: true,
    data
  })
}

export const ApiEnergyRanking = data => {
  return getRequest({
    url: "/statistics/selectAreaEnergyRanking",
    loading: true,
    data
  })
}

export const ApiEnergyStatistics = data => {
  return getRequest({
    url: "/statistics/selectEnergyStatistics",
    loading: true,
    data
  })
}
