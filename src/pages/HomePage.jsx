import '../HomePage.css';
import profile from '../assets/profile.jpeg';

const HomePage = () => {
  return (
    <section class="home">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <div class="home-img">
        <img
          src={profile} width={40} height={400}
          alt=""
        />
      </div>
      <div class="home-content">
        <h1>
          Hi, It's <span>Samuel</span>
        </h1>
        <h3 class="typing-text">
          i am a <span></span>
        </h3>
        <p>
          elit. Minus labore dolores esse. Odit similique doloribus tenetur
          doloremque, sunt commodi in ipsa repudiandae debitis deleniti
          blanditiis quibusdam quaerat neque asperiores ea.
        </p>
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/samuel-neves-b9002b385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/Samuteg">
            <i class="fa-brands fa-github"></i>
          </a>

          <a href="https://x.com/Samuteg10?t=MknYnieS_akYpSccjQYNqg&s=09">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="#">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
        <a href="#" class="btn">
          Hire me
        </a>
      </div>
    </section>
  );
};

export default HomePage;
