import axios from 'axios'
import { useEffect, useReducer } from 'react'

const BASE_URL = "https://jobs.github.com/positions.json";

const ACTIONS = {
    MAKE_REQUEST: 'make_request',
    GET_DATA: 'get_data',
    ERROR: 'error'
}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: []}
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return { ...state, loading: false, jobs: action.payload.error}
        default: 
            return state;
    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true})

    useEffect(() => {
       // cancel request with cancelToken
       const cancelToken = axios.CancelToken;
       const source = cancelToken.source(); 

        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL, {
            params: { markdown: true, page, ...params}
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data }})
        }).catch(e => {
            if (axios.isCancel(e)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: e }})
        })

        return () => {
            source.cancel();
        }

    }, [params, page])
    return state;
}