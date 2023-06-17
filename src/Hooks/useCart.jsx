import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { isLoading, refetch, isError, data: cart = [], error } = useQuery({
        queryKey: ['carts', user?.email],
        // queryFn: async () => {
        //     const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`,
        //         { headers: { authorization: `Bearer ${token}` } })

        //     if (!response.ok) {
        //         throw new Error('Network response was not ok')
        //     }
        //     return response.json()
        // },
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            console.log('res from axios : ', res)
            return res.data
        },
    })
    console.log('cart : ', cart, 'error :', error?.message, 'isError : ', isError);
    return [cart, refetch, isLoading,]
};

export default useCart;