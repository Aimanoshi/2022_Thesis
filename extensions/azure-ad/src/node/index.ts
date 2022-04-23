// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OIDCStrategy } from '@studiohyperdrive/passport-azure-ad';
import type { IExtensionRegistration } from '@botframework-composer/types';

export default async function initialize(composer: IExtensionRegistration) {
  const {
    AZUREAD_CLIENT_ID,
    AZUREAD_CLIENT_SECRET,
    AZUREAD_IDENTITY_METADATA,
    AZUREAD_REDIRECT_URL,
    AZURE_AD_SCOPE,
  } = process.env;

  const strategy = new OIDCStrategy(
    {
      clientID: AZUREAD_CLIENT_ID,
      clientSecret: AZUREAD_CLIENT_SECRET,
      identityMetadata: AZUREAD_IDENTITY_METADATA,
      passReqToCallback: false,
      responseMode: 'form_post',
      responseType: 'id_token',
      redirectUrl: AZUREAD_REDIRECT_URL,
      allowHttpForRedirectUrl: true,
      scope: AZURE_AD_SCOPE,
    },
    (token, done) => {
      if (token) {
        done(null, token);
        console.log(token);
        console.log('een');
      } else {
        console.log('twee');
        done(null, false, { message: 'Authentication failed' });
      }
    }
  );

  composer.usePassportStrategy(strategy);

  composer.useUserSerializers(
    (user, done) => {
      done(null, user);
    },
    (user, done) => {
      done(null, user);
    }
  );

  composer.addWebRoute('get', '/login', composer.passport.authenticate(strategy));

  composer.addWebRoute('post', '/redirect', composer.passport.authenticate(strategy), (req, res, next) => {
    if (req.isAuthenticated) {
      res.send('done');
      res.redirect('/');
    } else {
      res.status(401).send('NOT AUTHENTICATED');
      console.log('aima');
    }
  });

  composer.addAllowedUrl('/redirect');
}
