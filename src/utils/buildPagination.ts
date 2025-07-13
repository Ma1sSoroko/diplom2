export const buildSchemePagination: (currentPage: number, pageCount: number) => (number | string)[] = (currentPage: number, pageCount: number) => {
    const prevPageNumber = +currentPage - 1 
    const nextPageNumber = +currentPage + 1 
    const scheme = [1, prevPageNumber, +currentPage, nextPageNumber, pageCount] 
    const filteredScheme = scheme.filter(item => item > 0 && item <= pageCount) 
    const set = new Set(filteredScheme) 
    const result: (number | string)[] = Array.from(set) 
  
    if (typeof result[0] === 'number' && typeof result[1] === 'number' && (result[0] as number) + 1 !== (result[1] as number)) result.splice(1, 0, '...') 
    if (typeof result[result.length - 2] === 'number' && typeof result[result.length - 1] === 'number' && (result[result.length - 2] as number) + 1 !== (result[result.length - 1] as number)) result.splice(result.length - 1, 0, '...') 
    if (typeof result[result.length - 1] === 'number' && (result[result.length - 1] as number) !== pageCount) result.splice(result.length - 2)
  
    return result
  }