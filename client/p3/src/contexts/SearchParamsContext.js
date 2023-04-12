import { createContext, useState } from "react";

export const useSearchParamsContext = () => {
    const [searchParamsContext, setSearchParamsContext] =  useState({}); 

    return {
        searchParamsContext, 
        setSearchParamsContext
    }
}


const SearchParamsContext = createContext({
    searchParamsContext: null, 
    setSearchParamsContext: () => {}, 
}) 

export default SearchParamsContext