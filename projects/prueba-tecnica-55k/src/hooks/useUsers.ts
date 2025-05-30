import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchUsers } from "../services/users"
import type { User } from "../type"


export const useUsers = () => {
    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage }
        = useInfiniteQuery<{ nextCursor: number | undefined, users: User[] }>(
            {
                queryKey: ['users'],
                queryFn: async ({ pageParam = 1 }) => await fetchUsers({ pageParam: pageParam as number }),
                getNextPageParam: (lastPage) => lastPage.nextCursor,
                initialPageParam: 1,
            }
        )

    return {
        isLoading, 
        isError, 
        users: data?.pages?.flatMap(page => page.users) ?? [],
        refetch,
        fetchNextPage,
        hasNextPage
    }
}