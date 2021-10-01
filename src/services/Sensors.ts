import { api, createRealtimeConnection } from './resources';

interface PayloadSensor {
  type: string;
  data: {
    position: [number, number];
  };
}

export const stream = () => {
  // const url = api.baseURL + `/api/sensors/stream`;
  const url = api.baseURL.replace(/^http/, `ws`) + `/api/sensors/stream`;

  const conn = createRealtimeConnection<PayloadSensor>(url, {
    params: {
      Authorization: api.getAuthToken(),
      shutdown: `on-event`,
    },
    delayFrames: 1000,
    delayReconnect: 2000,
  });

  conn.onStatus((status) => {
    console.log(`connection status:`, status);
  });
  conn.onEachFrame((payload) => {
    console.log(`each frame:`, payload);
    if (payload.type === `END`) {
      conn.close(); // a custom "close code"
    }
  });
  conn.onFrames((frames) => {
    console.log(`frames:`, frames[0]);
  });
  conn.onClose((code, reason) => {
    console.log(`connection closed. code:`, code, `reason:`, reason);
  });

  return conn;
};
