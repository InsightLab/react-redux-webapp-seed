import { createConnection } from './realtime.conn';

const DEFAULT_DELAY_FRAMES = 500;
const DEFAULT_DELAY_RECONNECT = 3000;

type TStatus = 'idle' | 'connecting' | 'connected' | 'closed';
export type RealtimeConnectionStatus = TStatus;

type TCallbackStatus = (status: TStatus) => void;
type TCallbackFrame<TFrame> = (frame: TFrame) => void;
type TCallbackClose = (code: number, reason: string) => void;

interface Options {
  params?: ApiHeaders;
  delayFrames?: number;
  delayReconnect?: number;
}

export interface RealtimeConnection<TFrame, TSendData> {
  send: (data: TSendData) => boolean;
  close: () => void;
  onStatus: (callback: TCallbackStatus) => void;
  onEachFrame: (callback: TCallbackFrame<TFrame>) => void;
  onFrames: (callback: TCallbackFrame<TFrame[]>) => void;
  onClose: (callback: TCallbackClose) => void;
}

// connection over WebSocket or EventSource
export const createRealtimeConnection = <TFrame = any, TSendData = any>(
  url: string,
  options?: Options
): RealtimeConnection<TFrame, TSendData> => {
  const {
    params = {},
    delayFrames = DEFAULT_DELAY_FRAMES,
    delayReconnect = DEFAULT_DELAY_RECONNECT,
  } = options || {};

  let timer: any = 0;
  let updated: number = 0;
  let frames: TFrame[] = [];

  let cbStatus: TCallbackStatus[] = [];
  let cbClose: TCallbackClose[] = [];
  let cbFrames: TCallbackFrame<TFrame[]>[] = [];
  let cbEachFrame: TCallbackFrame<TFrame>[] = [];

  const onStatus = (callback: TCallbackStatus) => {
    cbStatus.push(callback);
  };
  const onEachFrame = (callback: TCallbackFrame<TFrame>) => {
    cbEachFrame.push(callback);
  };
  const onFrames = (callback: TCallbackFrame<TFrame[]>) => {
    cbFrames.push(callback);
  };
  const onClose = (callback: TCallbackClose) => {
    cbClose.push(callback);
  };

  const notifySync = (forced = false) => {
    clearInterval(timer);
    const elapsed = Date.now() - updated;
    const skip = elapsed < delayFrames && !forced;
    if (skip) {
      timer = setTimeout(notifySync, delayFrames - elapsed);
    } else {
      if (frames.length) {
        cbFrames.forEach((fn) => fn(frames));
        frames = [];
      }
      updated = Date.now();
    }
  };

  const notifyMessages = (dataList: TFrame[] = []) => {
    for (const data of dataList) {
      frames.push(data);
      cbEachFrame.forEach((fn) => fn(data));
    }
    notifySync();
  };

  const { send, close } = createConnection<TSendData>(url, params, {
    delayReconnect,
    onInit: () => {
      cbStatus.forEach((fn) => fn('connecting'));
    },
    onOpen: () => {
      cbStatus.forEach((fn) => fn('connected'));
    },
    onClose: (event) => {
      notifySync(true);
      cbStatus.forEach((fn) => fn('closed'));
      cbClose.forEach((fn) => fn(event.code, event.reason));
    },
    onMessage: (message) => {
      notifyMessages([message]);
    },
  });

  return {
    onStatus,
    onClose,
    onEachFrame,
    onFrames,
    send,
    close,
  };
};
