import '../HomePage.css';

const HomePage = () => {
  return (
    <section class="home">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <div class="home-img">
        <img
          src="https://imgs.search.brave.com/e6dE2nmdO8E4c61gHtQ1fZBPMsExEYxwY2busujmhQI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MTQ4ODgyODY5NzQt/NmMwM2UyY2ExZGJh/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1ueDhaMkYw/YjN4bGJud3dmSHd3/Zkh4OE1BPT0"
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
