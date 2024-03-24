import SiteHomeNav from '../Common/SiteHomeNav';
import SiteFooter from '../Common/SiteFooter';
import '../../App.css';
import React from 'react';

export default function Profile() {
  return (
    <div>
      <SiteHomeNav />
      <div className='app-about-container'>
        <h1 className='h1about'>About Hacklify</h1>

        <div className="about-content">
          <p>
            Welcome to Hacklify, your premier destination for innovation, collaboration, and exploration in the world of hacking! At Hacklify, we believe that every great idea deserves a chance to thrive, and every hacker deserves a team that complements their skills and passions. Our platform is designed to empower you to create, connect, and conquer the challenges of tomorrow's tech landscape.
          </p>
          <div>
            <h2>Our Mission</h2>
            <p>
              At Hacklify, our mission is to revolutionize the way hackers collaborate and innovate. We're dedicated to providing a platform where hackers from all backgrounds can come together, share ideas, and form teams that push the boundaries of technology. Whether you're a seasoned hacker or just starting your journey, Hacklify is here to support you every step of the way.
            </p>
            <h2>How it Works</h2>
            <ol>
              <li>Create Your Profile: Start by creating your personalized profile on Hacklify. Highlight your skills, interests, and experience to help us match you with compatible team members.</li>
              <li>Team Matching: Our advanced matching algorithm analyzes user profiles to identify individuals with complementary skills, interests, and goals. We'll help you find the perfect teammates to bring your ideas to life.</li>
              <li>Search Upcoming Hackathons: Stay informed about the latest hackathons happening around the globe. Use our comprehensive search feature to browse upcoming events, filter by location, date, or theme, and find the perfect opportunity to showcase your talents and make your mark on the hacking community.</li>
            </ol>
            <h2>Join the Hacklify Community</h2>
            <p>
              Ready to join forces with fellow hackers, thinkers, and creators? Sign up for Hacklify today and become part of a vibrant community of innovators. Whether you're looking to build your dream team, find your next hackathon adventure, or simply connect with like-minded individuals, Hacklify has everything you need to thrive in the world of hacking. Join us at Hacklify and unlock a world of possibilities.
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
