import {useReducer} from 'react';

/**
 * const forceUpdate = useForceUpdate()
 * ...
 * forceUpdate()
 */
export const useForceUpdate = () => useReducer((x) => x + 1, 0)[1];
