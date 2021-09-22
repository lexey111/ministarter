export type TDropdownItemProps = {
  caption?: string
  value: number | string
  disabled?: boolean
  children?: string | JSX.Element
  tafPath?: string
};

export type TItemProps = {
  props: TDropdownItemProps
};

export type TDropdownValue = number | string | undefined;

export type TDropdownProps = {
  disabled?: boolean
  value: TDropdownValue
  onChange: (value: any) => void
  children: Array<TItemProps> | TItemProps
  tafPath?: string
  open?: boolean
};
