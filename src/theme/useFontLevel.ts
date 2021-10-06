import { useEffect, useMemo, useState } from 'react';
import * as db from './localStorage';

type TLevel = number;
type TScale = number;

const DEFAULT_LEVEL: TLevel = 0;
const DEFAULT_SCALE: TScale = 1;

const THEME_FONT_LEVEL = `theme:font-level`;

const FONT_SCALE = new Map<TLevel, TScale>([
  [-2, 0.8],
  [-1, 0.9],
  [DEFAULT_LEVEL, DEFAULT_SCALE],
  [+1, 1.1],
  [+2, 1.2],
  [+3, 1.3],
]);

const FONT_LEVELS = [...FONT_SCALE.keys()];
const MIN_LEVEL = FONT_LEVELS.reduce((a, b) => Math.min(a, b), DEFAULT_LEVEL);
const MAX_LEVEL = FONT_LEVELS.reduce((a, b) => Math.max(a, b), DEFAULT_LEVEL);

const saveFontLevel = (fontLevel: TLevel) => {
  db.set(THEME_FONT_LEVEL, fontLevel);
};

const loadFontLevel = () => {
  const level = db.get(THEME_FONT_LEVEL, DEFAULT_LEVEL);
  return FONT_SCALE.has(level) ? level : DEFAULT_LEVEL;
};

export const useFontLevel = (): TFontConfig => {
  const [level, setLevel] = useState<TLevel>(loadFontLevel);

  useEffect(() => {
    saveFontLevel(level);
  }, [level]);

  const incr = useMemo(() => {
    if (level < MAX_LEVEL) {
      return () => setLevel((level + 1) as TLevel);
    }
  }, [level]);

  const decr = useMemo(() => {
    if (level > MIN_LEVEL) {
      return () => setLevel((level - 1) as TLevel);
    }
  }, [level]);

  const normalize = useMemo(() => {
    if (level !== DEFAULT_LEVEL) {
      return () => setLevel(DEFAULT_LEVEL);
    }
  }, [level]);

  return useMemo(() => {
    return {
      level: level,
      scale: FONT_SCALE.get(level) ?? DEFAULT_SCALE,
      increase: incr,
      decrease: decr,
      normalize: normalize,
    };
  }, [level, incr, decr, normalize]);
};
