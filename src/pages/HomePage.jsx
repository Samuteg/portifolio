import "../HomePage.css";
import profile from "../assets/profile.jpeg";

const HomePage = () => {
  return (
    <section class="home">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <div class="home-img">
        <img src={profile} width={40} height={400} alt="" />
      </div>
      <div class="home-content">
        <h1>
          Hi, It's <span>Samuel</span>
        </h1>
        <h3 class="typing-text">
          i am a <span></span>
        </h3>
        <p>
          Developer focused on building efficient and functional solutions, with
          experience in Python and interface development. Strong interest in
          systems, automation, and projects that combine logic, design, and
          solid user experience. Committed to continuous learning and technical
          growth.
        </p>
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/samu-teg-b9002b385/">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/Samuteg">
            <i class="fa-brands fa-github"></i>
          </a>

          <a href="https://x.com/Samuteg10?t=MknYnieS_akYpSccjQYNqg&s=09">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://www.instagram.com/samuteg10/">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
        <a href="https://www.99freelas.com.br/user/Samuteg10" class="btn">
          Hire me
        </a>
      </div>
    </section>
  );
};

export default HomePage;
