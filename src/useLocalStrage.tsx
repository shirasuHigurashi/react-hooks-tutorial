import React from 'react'

interface UseLocalStorageReturn<T> {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
}

const useLocalStrage = <T,>(key: string, defaultValue: T): UseLocalStorageReturn<T> => {
    const [value, setValue] = React.useState<T>(() => {
        const localValue = window.localStorage.getItem(key);
        if (localValue !== null) {
            return JSON.parse(localValue) as T;
        }
        return defaultValue;
    });

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue]);

    return { value, setValue };
};

export default useLocalStrage