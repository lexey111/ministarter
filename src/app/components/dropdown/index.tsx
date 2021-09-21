import React, { useCallback, useEffect, useState } from 'react';

import './dropdown.less';
import { TDropdownProps, TDropdownValue, TItemProps } from './dropdown.interface';
import { DropdownContent } from './dropdown-content';

import arrowImage from './assets/collapse-arrow.svg';

declare const LIB_PREFIX: string; // webpack DefinePlugin

const ALLOWED_KEYS = ['ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape'];

function getCaptionByValue(children: Array<TItemProps>, value: TDropdownValue): string | JSX.Element | undefined {
  if (!value || !children || children.length === 0) {
    return void 0;
  }

  const targetItem = children.find(item => item?.props?.value === value);

  if (!targetItem) {
    return void 0;
  }
  return targetItem.props?.caption || targetItem.props?.children;
}

export const Dropdown: React.FC<TDropdownProps> = (props: TDropdownProps) => {
  const {
    value,
    onChange,
    disabled,
    tafPath
  } = props;

  const children = Array.isArray(props.children) ? props.children : [props.children];

  const [open, setOpen] = useState(false);

  const [activeValue, setActiveValue] = useState(value);
  const [currentCaption, setCurrentCaption] = useState(getCaptionByValue(children, value));

  useEffect(() => {
    setActiveValue(value); // on external update
    setCurrentCaption(getCaptionByValue(children, value));
  }, [children, value]);

  const toggleOpen = useCallback(() => {
    if (disabled) {
      return;
    }
    setOpen(!open);
  }, [open]);

  const getActiveItems = useCallback(() => {
    return children
      .filter(item => !item?.props?.disabled && item?.props?.value?.toString());
  }, [children, value]);

  const getPrevAvailableValue = useCallback(() => {
    const activeItems = getActiveItems();

    const currentIdx = activeItems.findIndex(item => item.props.value === activeValue);
    if (currentIdx <= 0) {
      return activeValue;
    }
    return activeItems[currentIdx - 1].props.value;
  }, [children, value, activeValue]);

  const getNextAvailableValue = useCallback(() => {
    const activeItems = getActiveItems();

    const currentIdx = activeItems.findIndex(item => item.props.value === activeValue);
    if (currentIdx < 0 || currentIdx === activeItems.length - 1) {
      return activeValue;
    }
    return activeItems[currentIdx + 1].props.value;
  }, [children, value, activeValue]);

  const commitValue = useCallback((val: TDropdownValue) => {
    if (!disabled && onChange && val !== value) {
      // eslint-disable-next-line no-console
      onChange(val);
    }
    setOpen(false);
  }, [value, onChange, setOpen]);

  const handleBlur = useCallback(() => {
    // eslint-disable-next-line no-console
    setOpen(false);
    commitValue(activeValue);
  }, [setOpen, activeValue, value]);

  const handleKeyboard = useCallback((e: React.KeyboardEvent) => {
    if (disabled || !e || !e.key || !ALLOWED_KEYS.includes(e.key)) {
      return;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (e.key === 'Escape' && open) {
      setOpen(false);
    }
    if (e.key === 'ArrowUp') {
      setActiveValue(getPrevAvailableValue());
    }
    if (e.key === 'ArrowDown') {
      if (!open) {
        setOpen(true);
      } else {
        setActiveValue(getNextAvailableValue());
      }
    }
    if (e.key === 'Enter' || e.key === ' ') {
      if (!open) {
        setOpen(true);
      } else {
        commitValue(activeValue);
      }
    }

    return false;
  }, [value, activeValue, children, open]);

  return <div className={LIB_PREFIX + '-dropdown' + (disabled ? ' disabled' : '') + (open ? ' open' : '')}
              aria-roledescription="dropdown"
              data-taf-path={tafPath}
              onKeyDown={handleKeyboard}
              onBlur={handleBlur}
              tabIndex={disabled !== true ? 0 : -1}>

    <div className={'dropdown-caption'}
         onClick={toggleOpen}
    >
      {currentCaption}
      <img className={'dropdown-arrow'} src={arrowImage} alt=""/>
    </div>

    {open && <DropdownContent value={value}
                              activeValue={activeValue}
                              onCommitValue={commitValue}>
      {children}
    </DropdownContent>
    }
  </div>;
};
