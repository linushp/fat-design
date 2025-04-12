import * as React from 'react';

type OnChange = (arg: string | Array<string>) => void ;
export type IValue = string | Array<string | number> | any;

export interface BatchInputProps {
  locale?: any;
  value?: IValue;
  defaultValue?: IValue;
  formatter?: string;
  isArrayValue?: boolean;
  size ?: string | any;
  onChange?: OnChange;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  container?: HTMLElement;
  max?:number;
  isBtnPaste?:boolean;
  target?:'str'|'items';
  inputCls?:string;
  onOverlayDisappear?: (arg: IValue) => void;
  textAreaWidth?: number,
  openChineseInput?: boolean,
}

export interface BatchInputState {
  textAreaVisible: boolean;
  inputValue: string;
  textAreaValue: string;
  over: boolean;
}
