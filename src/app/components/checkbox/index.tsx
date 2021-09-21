import React, { useCallback } from 'react';

import checkedImage from './assets/check.svg';
import uncheckedImage from './assets/uncheck.svg';

import './checkbox.less';

export type TCheckBoxProps = {
  title?: string
  checked: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
  children?: string | JSX.Element
  tafPath?: string
};

declare const LIB_PREFIX: string; // webpack DefinePlugin

export const Checkbox: React.FC<TCheckBoxProps> = ({
                                                     title,
                                                     children,
                                                     checked,
                                                     onChange,
                                                     disabled,
                                                     tafPath
                                                   }: TCheckBoxProps) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (!disabled) {
      onChange?.(!checked); // mouse
    }
    return false;
  }, [checked, disabled]);

  const handleKeyboard = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!disabled && (e?.key === 'Enter' || e?.key === ' ')) {
      onChange?.(!checked);
    }
    return false;

  }, [checked, disabled]);

  const hasTitle = Boolean(title) || Boolean(children);

  return <div
    className={LIB_PREFIX + '-checkbox' + (disabled ? ' disabled' : '') + (checked ? ' checked' : '') + (!hasTitle ? ' no-title' : '')}
    aria-roledescription="checkbox"
    aria-checked={checked}
    data-taf-path={tafPath}
    onClick={handleClick}
    onKeyPress={handleKeyboard}
    tabIndex={disabled !== true ? 0 : -1}>
    <span className={'checkbox-tickmark'}>
      <img src={checked ? checkedImage : uncheckedImage} alt=""/>
    </span>
    <span className={'checkbox-title'}>{title ? title : children}</span>
  </div>;
};
