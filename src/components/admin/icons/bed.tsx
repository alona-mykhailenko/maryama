import { IconBase, type IconProps } from './icon-base';

export const BedIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </IconBase>
);

export default BedIcon;
