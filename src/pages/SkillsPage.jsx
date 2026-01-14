const SkillsPage = () => {
  return (
    <section>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div class="skills-section">
        <h2>Skills</h2>

        <div className="skills-grid">
          <div className="skill-card fade-in">
            <i className="fa-brands fa-html5"></i>
            <span>HTML</span>
            <div className="progress">
              <div className="width-90"></div>
            </div>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-brands fa-css3-alt"></i>
            <span>CSS</span>
            <div className="progress">
              <div className="w-90%"></div>
            </div>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-brands fa-js"></i>
            <span>JavaScript</span>
            <div className="progress">
              <div className="w-60%"></div>
            </div>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-brands fa-python"></i>
            <span>Python</span>
            <div className="progress">
              <div className="w-80%"></div>
            </div>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-solid fa-code"></i>
            <span>C++</span>
            <div className="progress">
              <div className="w-50%"></div>
            </div>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-solid fa-database"></i>
            <span>MySQL</span>
            <div className="progress">
              <div className="w-60%"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;
