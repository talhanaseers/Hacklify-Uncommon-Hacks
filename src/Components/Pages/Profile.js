import SiteNav from '../Common/SiteNav';
import SiteFooter from '../Common/SiteFooter';

import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);


export default function Profile() {
  return (
    <Authenticator loginMechanism={['email']}>
      {({ signOut, user }) => (
          <div>
            <SiteNav logOut={signOut}/>
            <h1>Hello '{user.username}'</h1>
            <h2>Welcome to your profile</h2>
            <SiteFooter />
          </div>
      )}
    </Authenticator>
  );
}