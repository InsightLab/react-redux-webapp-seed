import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createRealtimeConnection,
  RealtimeConnection as TConn,
  RealtimeConnectionStatus as TConnStatus,
} from '../services/resources';

type TState<TFrame> = {
  frames: TFrame[];
  status: TConnStatus;
  closeCode: number;
};

export const useStream = <TFrame, TSendData = any>(url: string) => {
  const [state, setState] = useState<TState<TFrame>>(() => {
    return { frames: [], status: `idle`, closeCode: 0 };
  });
  const connRef = useRef<TConn<TFrame, TSendData>>();

  const sendData = useCallback((data: TSendData): boolean => {
    return connRef.current ? connRef.current.send(data) : false;
  }, []);

  useEffect(() => {
    const conn = createRealtimeConnection<TFrame, TSendData>(url);
    connRef.current = conn;
    conn.onFrames((nextFrames) => {
      setState((prev) => ({
        ...prev,
        frames: [...prev.frames, ...nextFrames],
      }));
    });
    conn.onStatus((status) => {
      setState((prev) => {
        return status === `connected`
          ? { ...prev, status, closeCode: 0 }
          : { ...prev, status };
      });
    });
    conn.onClose((code) => {
      setState((prev) => ({ ...prev, closeCode: code }));
    });
    return () => {
      connRef.current = undefined;
      conn.close();
    };
  }, [url]);

  return { ...state, sendData };
};
