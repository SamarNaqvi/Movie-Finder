import { fetchMovies } from './../services/api';
import { useEffect, useState } from "react"

export const useFetch = <T>(fetchFunction:()=>Promise<T>, autoFetch:Boolean=true) =>{
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    
    const reset = ()=>{
        setData(null);
        setError(null);
        setLoading(false);
    }

    const fetchMoviesData = async ()=>{
        try{
            setLoading(true);
            const res = await fetchFunction();
            setData(res);
        }
        catch(err)  {
            //@ts-ignore
            setError(err instanceof Error ? err : new Error("Error Occured"));
            setData(null);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(autoFetch)
        {
            fetchMoviesData();
        }
    },[]);

    return {data, refetch: fetchMoviesData, reset, loading, error};
}