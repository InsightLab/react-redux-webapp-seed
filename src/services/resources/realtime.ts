import { createConnection } from './realtime.conn';

const DEFAULT_DELAY_FRAMES = 500;
const DEFAULT_DELAY_RECONNECT = 3000;

type TStatus = 'connecting' | 'open' | 'closed';

type TCallbackStatus = (status: TStatus) => void;
type TCallbackFrame<T> = (frame: T) => void;
type TCallbackClose = (code: number, reason: string) => void;

interface Options {
  params?: any;
  delayFrames?: number;
  delayReconnect?: number;
}

interface RealtimeConnection<T, TSendData> {
  send: (data: TSendData) => void;
  close: () => void;
  onStatus: (callback: TCallbackStatus) => void;
  onEachFrame: (callback: TCallbackFrame<T>) => void;
  onFrames: (callback: TCallbackFrame<T[]>) => void;
  onClose: (callback: TCallbackClose) => void;
}

// connection over WebSocket or EventSource
export const createRealtimeConnection = <T = any, TSendData = any>(
  url: string,
  options?: Options
): RealtimeConnection<T, TSendData> => {
  const {
    params = {},
    delayFrames = DEFAULT_DELAY_FRAMES,
    delayReconnect = DEFAULT_DELAY_RECONNECT,
  } = options || {};

  let timer: any = 0;
  let updated: number = 0;
  let frames: T[] = [];

  let cbStatus: TCallbackStatus[] = [];
  let cbClose: TCallbackClose[] = [];
  let cbFrames: TCallbackFrame<T[]>[] = [];
  let cbEachFrame: TCallbackFrame<T>[] = [];

  const onStatus = (callback: TCallbackStatus) => {
    cbStatus.push(callback);
  };
  const onEachFrame = (callback: TCallbackFrame<T>) => {
    cbEachFrame.push(callback);
  };
  const onFrames = (callback: TCallbackFrame<T[]>) => {
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

  const notifyMessages = (dataList: T[] = []) => {
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
      cbStatus.forEach((fn) => fn('open'));
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
