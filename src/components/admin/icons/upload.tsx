import { IconBase, type IconProps } from './icon-base';

export const UploadIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 3v12" />
    <path d="m17 8-5-5-5 5" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  </IconBase>
);

export default UploadIcon;
