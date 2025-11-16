import { Configuration, BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'd2accf07-8680-4286-811a-a2474a717cb4', // Application (client) ID from Azure AD
    authority: 'https://login.microsoftonline.com/common', // e.g., common or tenant ID
    redirectUri: 'http://localhost:4401', // Your app URL
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // local/session storage
    storeAuthStateInCookie: false, // set true for IE
  }
};

export const loginRequest = {
  scopes: ['User.Read', 'User.ReadBasic.All', 'openid', 'profile', 'email', 'offline_access', 'User.Read.All'] // scopes for MS Graph or other APIs
};
export const protectedResources = {
  graphMe: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['User.Read', 'User.ReadBasic.All', 'openid', 'profile', 'email', 'offline_access', 'User.Read.All'] // scopes for MS Graph API
  }
};