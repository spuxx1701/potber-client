import environment from 'potber-client/config/environment';
import { appConfig } from './app.config';

export const authConfig = {
  issuerUrl:
    window.APP?.AUTH_ISSUER_URL ??
    environment.APP.AUTH_ISSUER_URL ??
    'https://auth.potber.de',
  clientId: '45a14ddc-e3d3-4b5b-a45a-a04946974adc',
  authorizeEndpoint: '/authorize',
  redirectUri: `${window.location.protocol}//${appConfig.hostname}/auth/callback`,
};
