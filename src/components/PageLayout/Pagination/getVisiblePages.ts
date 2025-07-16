export const getVisiblePages = (lastPage: number, currentPage: number) => {
  const maxVisible = 4
  const firstPage = 1

  let firstVisiblePage = Math.min(Math.max(currentPage - 2, firstPage), lastPage - maxVisible + 1)

  if (firstVisiblePage < firstPage) firstVisiblePage = firstPage

  const visiblePages = []
  for (let i = firstVisiblePage; i < firstVisiblePage + maxVisible && i <= lastPage; i++) {
    visiblePages.push(i)
  }

  return { firstPage, visiblePages }
}
