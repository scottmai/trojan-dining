import { useEffect, useRef, useReducer } from 'react';

// Modified from https://github.com/ooade/use-fetch-hook
export const useCacheFetch = (date) => {
    const apiUrl = `https://trojan-dining.herokuapp.com/menu/?date=${date}`;

    const initialState = {
        status: 'idle',
        error: null,
        data: [],
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, status: 'fetching' };
            case 'FETCHED':
                return { ...initialState, status: 'fetched', data: action.payload };
            case 'FETCH_ERROR':
                return { ...initialState, status: 'error', error: action.payload };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        let cancelRequest = false;
        let cacheFound = false;
        if (!apiUrl || !apiUrl.trim()) return;

        const fetchData = async () => {
            dispatch({ type: 'FETCHING' });

            if (typeof caches != 'undefined')
            {
                const cacheStorage = await caches.open('menu');
                const cachedResponse = await cacheStorage.match(date);

                if (cachedResponse && cachedResponse.ok)
                {
                    cacheFound = true;
                    const GetCache = async() => {
                        const data = await cachedResponse.json();
                        dispatch({ type: 'FETCHED', payload: data });
                        console.log("Retrieved menu from cache");
                    };
                    GetCache();
                }
            }

            if (!cacheFound)
            {
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if ('caches' in window)
                    {
                        caches.open('menu').then((cache) => {
                            cache.put(date, new Response(JSON.stringify(data)));
                        });
                        console.log("Menu successfully cached");
                    }
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCHED', payload: data });
                } catch (error) {
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCH_ERROR', payload: error.message });
                }
            }
        };

        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
    }, [date]);

    return state;
};