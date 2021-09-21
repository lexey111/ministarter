import React from 'react';

import './dropdown.less';
import { TDropdownValue, TItemProps } from './dropdown.interface';

export type TDropdownContentProps = {
  value: TDropdownValue
  activeValue: TDropdownValue
  children: Array<TItemProps>
  onCommitValue: (value: TDropdownValue) => void
};

declare const LIB_PREFIX: string; // webpack DefinePlugin

function getItemClassName(item: TItemProps, value: TDropdownValue, activeValue: TDropdownValue): string {
  let itemClassName = LIB_PREFIX + '-dropdown-item';

  if (item.props?.value === value) {
    itemClassName += ' selected';
  }

  if (item.props?.value === activeValue) {
    itemClassName += ' active';
  }

  if (item.props?.disabled === true) {
    itemClassName += ' disabled';
  }
  return itemClassName;
}

export const DropdownContent: React.FC<TDropdownContentProps> = (props: TDropdownContentProps) => {
  const {
    children,
    value,
    activeValue,
    onCommitValue
  } = props;

  return <div className={'dropdown-content'}>
    {(children as [TItemProps]).map(item => {
      const key = item?.props?.value?.toString();
      if (!key) {
        return null;
      }

      return <div className={getItemClassName(item, value, activeValue)}
                  data-taf-path={item.props.tafPath}
                  onClick={() => !item.props.disabled && onCommitValue(item.props.value)}
                  key={key}>
        {item}
      </div>;
    })}
  </div>;
};
