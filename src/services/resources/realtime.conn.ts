const WS_CODE: { [key: number]: string } = {
  '1000': 'Normal Closure',
  '1001': 'Going Away',
  '1002': 'Protocol Error',
  '1003': 'Unsupported Data',
  '1004': '(For future)',
  '1005': 'No Status Received',
  '1006': 'Abnormal Closure',
  '1007': 'Invalid frame payload data',
  '1008': 'Policy Violation',
  '1009': 'Message too big',
  '1010': 'Missing Extension',
  '1011': 'Internal Error',
  '1012': 'Service Restart',
  '1013': 'Try Again Later',
  '1014': 'Bad Gateway',
  '1015': 'TLS Handshake',
};

const RECONNECT_CODES = [1006, 1011, 1012, 1013, 1014];
const DELAY_BETWEEN_RECONNECT = 1000;

const isWebSocketURL = (url: string) => {
  return /^wss?:\/\//.test(url.toLocaleLowerCase());
};

interface ConnOptions {
  delayReconnect: number;
  onInit: () => void;
  onOpen: () => void;
  onClose: (e: { code: number; reason: string }) => void;
  onMessage: (e: any) => void;
}

interface ConnReturn<TData> {
  send: (data: TData) => void;
  close: (event?: any) => void;
}

const notEmpty = (data: any) => {
  return data !== undefined && data !== null && data !== ``;
};

const generateFullURL = (url: string, params: any) => {
  const hasQueryString = url.includes(`?`);
  const query = Object.keys(params)
    .filter((key) => notEmpty(params[key]))
    .map((key) => key + `=` + encodeURI(params[key]))
    .join(`&`);
  const strJoin = hasQueryString ? `&` : `?`;
  const fullUrl = url + strJoin + query;
  return fullUrl.replace(/[%?]$/, ``).replace(/(:\/\/.*)\/{2,}/g, `$1/`);
};

export const createConnection = <TData>(
  url: string,
  params: any,
  options: ConnOptions
): ConnReturn<TData> => {
  const fullURL = generateFullURL(url, params);
  const byWebSocket = isWebSocketURL(url);
  const Connector = byWebSocket ? WebSocket : EventSource;
  let conn: WebSocket | EventSource;

  let reconnectTimer: any = 0;

  const send = (data: TData) => {
    if ('send' in conn) {
      const chunk = JSON.stringify(data);
      conn.send(chunk);
    } else {
      console.warn(`you can't send data on EventSource connection!`);
    }
  };
  const close = (event: any) => {
    clearTimeout(reconnectTimer);
    if ('close' in conn) {
      conn.close();
    }
    options.onClose(event || { code: -1, reason: `` });
  };
  setTimeout(options.onInit, 0);
  setTimeout(initConnection, 0);

  function initConnection() {
    conn = new Connector(fullURL);
    conn.onopen = options.onOpen;
    function reconnect() {
      clearTimeout(reconnectTimer);
      setTimeout(() => {
        options.onInit();
        clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(() => {
          initConnection();
        }, options.delayReconnect);
      }, DELAY_BETWEEN_RECONNECT);
    }
    if (`onclose` in conn) {
      conn.onclose = (event) => {
        const code = event.code;
        const reason = event.reason || WS_CODE[code] || `-`;
        close({ code, reason });
        if (RECONNECT_CODES.includes(code)) {
          reconnect();
        }
      };
    }
    conn.onerror = (event: any) => {
      if (!byWebSocket) {
        const status = { code: -1, reason: event.message || event.type };
        close(status);
        if (status.reason === `error`) {
          reconnect();
        }
      }
    };
    conn.onmessage = (event: any) => {
      if (typeof event.data !== `string`) {
        return console.warn(`connection allows only utf-8 string data!`);
      }
      if (event.data === ``) {
        if (!byWebSocket) {
          close({ code: -1, reason: 'received an empty message' });
        }
        return;
      }
      try {
        const json = JSON.parse(event.data);
        const array = typeof json === `object` && json.constructor === Array;
        const dataItems = array ? json : [json];
        const messages = dataItems.filter(
          (i: any) => JSON.stringify(i) !== `{}`
        );
        messages.forEach(options.onMessage);
      } catch (e) {
        console.warn(`WS Error`, e);
      }
    };
  }

  return {
    send,
    close,
  };
};
