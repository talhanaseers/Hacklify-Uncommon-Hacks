import SiteHomeNav from '../Common/SiteHomeNav';
import SiteFooter from '../Common/SiteFooter';
import '../../App.css';

import React from 'react';


export default function Profile() {
  return (
        <div>
            <SiteHomeNav />
          <div className='app-container'>
            
            <h1>About Hacklify</h1>
            <h2>Learn more...</h2>
            <SiteFooter />
          </div>
        </div>
  );
}