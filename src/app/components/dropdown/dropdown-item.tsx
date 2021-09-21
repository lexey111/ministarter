import React from 'react';
import { TDropdownItemProps } from './dropdown.interface';


export const DropdownItem: React.FC<TDropdownItemProps> = ({
                                                             caption,
                                                             children
                                                           }: TDropdownItemProps) => {

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{caption ? caption : children}</>;
};
