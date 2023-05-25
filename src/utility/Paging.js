const Paging = (list, numberItemPerPage) => {
    const result = []
    for (let i = 0; i < list.length; i += numberItemPerPage) {
        const newList = list.slice(i, i + numberItemPerPage)
        result.push(newList)
    }
    return result
}

export { Paging }