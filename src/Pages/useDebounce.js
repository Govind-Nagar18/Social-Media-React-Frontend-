import React, {useState, useEffect} from 'react'

export default function useDebounce(Value, delay) {
    const [debounceValue, setDebounceValue] = useState(Value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(Value), delay);
        
        return () => clearTimeout(timer);

    },[Value, delay])

    return debounceValue;
}
