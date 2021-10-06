export const get = <T>(key: string, defaultValue: T): T => {
  const value = localStorage.getItem(key);
  if (value !== null) {
    return JSON.parse(value) as T;
  }
  return defaultValue;
};

export const set = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
