import styled, { css } from 'styled-components';
import { fontFamily } from '../../../theme';
import {
  CARD_ATTR_DATA,
  CARD_MIN_HEIGHT,
  CARD_MIN_WIDTH,
} from './Manager.utils';

type TCardWindow = {
  position: { x: number; y: number; z: number };
  opening?: boolean;
  smallsize?: boolean;
  noAnimation?: boolean;
  hasFocus?: boolean;
};

type TButtonControl = {
  color?: string;
  disabled?: boolean;
};

export const CardWindow = styled.div.attrs((props: TCardWindow) => ({
  data: CARD_ATTR_DATA,
  style: {
    left: props.position.x + `px`,
    top: props.position.y + `px`,
    zIndex: props.position.z,
  },
}))<TCardWindow>`
  position: fixed;
  border: 1px solid #0002;
  border-radius: 5px;
  box-shadow: 0 10px 30px -10px #0003;
  background-color: ${(props) => (props.theme.darkMode ? `#777` : `#fff`)};
  transition: ${(props) =>
    props.noAnimation ? 'none' : 'left 0.3s, top 0.3s, transform 0.2s'};
  transform: ${(props) => `scale(${props.opening ? 0.9 : 1.0})`};
  ${(props) =>
    props.smallsize &&
    css`
      width: ${CARD_MIN_WIDTH}px;
      height: ${CARD_MIN_HEIGHT}px;
      overflow: hidden;
      box-shadow: 0 5px 10px -5px #0002;
    `}
  ${(props) =>
    props.hasFocus &&
    css`
      box-shadow: 0 10px 30px -10px #0005;
    `}
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding-right: 30px;
  border-bottom: 1px solid #eee;
`;

const CircleButton = styled.button`
  width: 12px;
  height: 12px;
  cursor: pointer;
  box-shadow: inset 0 -1px 2px #0002, 0 -1px 1px #fff;
  background: #444;
  border-radius: 50px;
  border: 0;
  :active {
    opacity: 0.7;
  }
`;

const cssButtonDisabled = css`
  opacity: 0.4;
  pointer-events: none;
  filter: grayscale(100%);
`;

export const ButtonControl = styled(CircleButton)<TButtonControl>`
  background-color: ${(props) => props.color || '#555'};
  ${(props) => props.disabled && cssButtonDisabled};
`;

export const CardControls = styled.div<{ hasFocus?: boolean }>`
  flex: 0;
  padding: 5px;
  padding-left: 10px;
  ${ButtonControl} {
    margin-right: 5px;
    ${(props) => !props.hasFocus && cssButtonDisabled}
  }
`;

export const CardTitle = styled.span`
  flex: 1;
  line-height: 1;
  ${fontFamily.OpenSans};
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
`;

export const BaseAsyncStatus = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;
  margin: 5px;
  padding: 0 10px;
  font-size: 12px;
  text-align: left;
  text-rendering: geometricPrecision;
  color: #888;
  background-color: #eee;
`;

const cssError = css`
  color: red;
  background-color: #fff1f0;
`;

export const AsyncStatus = styled(BaseAsyncStatus)<{ error?: boolean }>`
  ${(props) => props.error && cssError};
`;

export const CardBody = styled.article`
  position: relative;
  z-index: 1;
  padding: 20px;
  opacity: 0.6;
`;
