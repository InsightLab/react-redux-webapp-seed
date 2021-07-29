import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { store } from './Redux';

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
