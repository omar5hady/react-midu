
export const fetchUsers = async ({ pageParam }: { pageParam: number }) => {
    return await fetch(`https://randomuser.me/api/?results=10&page=${pageParam}`)
        .then(res => {
            if (!res.ok) throw new Error('Error en la petición')
            return res.json()
        })
        .then(res => {
            const currentPage = Number(res.info.page)
            const nextCursor = currentPage > 3 ? undefined : currentPage + 1
            return {
                users: res.results,
                nextCursor
            }
        })
}