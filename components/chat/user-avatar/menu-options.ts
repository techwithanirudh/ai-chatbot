export type MenuOption = {
  title: string;
  href: string;
  separator?: boolean;
};

const environment = process.env.ENVIRONMENT || '';

const SETTINGS_URL =
  process.env.NEXT_PUBLIC_SETTINGS_REDIRECTION_URL ||
  `https://settings.${environment}meetingbaas.com`;

export const menuOptions: MenuOption[] = [
  {
    title: 'Settings',
    href: SETTINGS_URL,
  },
  {
    title: 'Credentials',
    href: `${SETTINGS_URL}/credentials`,
    separator: true,
  },
  {
    title: 'Logs',
    href: `${SETTINGS_URL}/logs`,
  },
  {
    title: 'Consumption',
    href: `${SETTINGS_URL}/usage`,
  },
  {
    title: 'Billing',
    href: `${SETTINGS_URL}/billing`,
  },
];
