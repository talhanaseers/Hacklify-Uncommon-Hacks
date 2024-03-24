import Card from 'react-bootstrap/Card';

import SiteNav from '../Common/SiteNav';
import SiteFooter from '../Common/SiteFooter';

import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);



export default function UpcomingHackathons() {
  return (
    <Authenticator loginMechanism={['email']}>
      {({ signOut, user }) => (
          <div class = "upcoming">
            <SiteNav logOut={signOut}/>
            <center class = "upcomingTitle">View Upcoming Hackathons</center>
            <div class = "ccontainer">
              {addCards(upcomingHackathons)}
            </div>
            <SiteFooter />
            
          </div>
      )}
    </Authenticator>
  );
}
function addCard(card){
  return(
  <Card bg = "dark" text = "white" style={{ width: '18rem' }} className='box'>
              <Card.Body>
                <Card.Text class = "host" >
                {card[0]}
              </Card.Text>
              <Card.Text class = "dates">
              {card[1]}
              </Card.Text>
              <Card.Text class = "loc">
              {card[2]}
              </Card.Text>
              <Card.Text class = "v">
              {card[3]}
              </Card.Text>
              </Card.Body>
            </Card>
  );
}

const upcomingHackathons = [["HackPrinceton", "Mar 29 - 31", "Princeton, NJ", "In-person" ],["Web3Apps", "Mar 29 - 31", "Anywhere", "Virtual" ], ["BisonBytes", "Mar 30 - 31", "Washington D.C.", "In-person" ], ["Diamond Hacks", "Mar 30 - 31", "Raleigh, NC", "In-person" ],["Global Hack Week: APIs", "Apr 5 - 11", "Anywhere", "Virtual" ], ["HackByte", "Apr 5 - 7", "Jabalpur, India", "In person" ],["MariHacks", "Apr 5 - 6", "Montreal, Canada", "In person" ], ["SF Hacks 2024", "Apr 5 - 7", "San Francisco, CA", "In person" ], ["WildHAcks", "Apr 5 - 7", "Evanston, Illinois", "In person" ], ["WiNGHacks", "Apr 5 - 7", "Gainesville, FL", "In person" ], ["Wittyhacks 4.0", "Apr 5 - 7", "Indore, Madhya Pradesh", "In person" ], ["BlossomHack", "Apr 6 - 7", "Athens, OH", "In person" ]]

function addCards(cards){
  return(cards.map(addCard));
}
