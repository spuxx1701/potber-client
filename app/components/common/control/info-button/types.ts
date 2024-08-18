import { IconName } from '@fortawesome/fontawesome-common-types';

export interface Info {
  title: string;
  text: string;
  variant?: ControlVariant;
  icon?: IconName;
}
