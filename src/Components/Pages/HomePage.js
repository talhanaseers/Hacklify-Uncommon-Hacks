import { Link } from 'react-router-dom';
import '../../App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import SiteNav from '../Common/SiteNav';
import SiteFooter from '../Common/SiteFooter';

//AWS imports
import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';

Amplify.configure(awsExports);


export default function HomePage() {
    return (
      <Authenticator loginMechanism={['email']}>
        {({ signOut, user }) => (
            <div>
              <SiteNav logOut={signOut}/>
              <div className='app-container'>
              <Container>
                <Row className='px-4 my-5'>
                    <Col xs={4} sm={6}>
                        <Image 
                            src="/img/Hacklify.svg" 
                            fluid/>
                    </Col>
                    <Col xs={4} sm={6} style={{color: "white"}}>
                        <h1>Visit your profile</h1>
                        <Link to= '/Profile'>
                            <Button variant="primary" type="submit">
                                View Profile
                            </Button>&nbsp;
                        </Link>
                    </Col>

                    <Col xs={4} sm={6} style={{color: "white"}}>
                        <h1>View upcoming hackathons</h1>
                        <Link to= '/upcomingHackathons'>
                            <Button variant="primary" type="submit">
                                View Hackathons
                            </Button>&nbsp;
                        </Link>
                    </Col>

                    <Col xs={4} sm={6} style={{color: "white"}}>
                        <h1>Find a team</h1>
                        <Link to= '/matchMaking'>
                            <Button variant="primary" type="submit">
                                Form Team
                            </Button>&nbsp;
                        </Link>
                    </Col>
                </Row>
              </Container>
              </div>
              <SiteFooter />
            </div>
        )}
      </Authenticator>
    );
  }