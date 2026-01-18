const SkillsPage = () => {
  return (
    <section>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div class="skills-section">
        <h2 className="skills-title">Skills</h2>

        <div class="skills-grid">
          <div class="skill-card fade-in">
            <i class="fa-brands fa-html5"></i>
            <span>HTML</span>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-brands fa-css3-alt"></i>
            <span>CSS</span>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-brands fa-js"></i>
            <span>JavaScript</span>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-brands fa-python"></i>
            <span>Python</span>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-brands fa-node"></i>
            <span>NodeJs</span>
          </div>

          <div className="skill-card fade-in">
            <i className="fa-solid fa-database"></i>
            <span>MySQL</span>
          </div>
          <div className="skill-card fade-in">
            <i className="fa-brands fa-react"></i>
            <span>React</span>
          </div>
          <div className="skill-card fade-in">
            <i className="fa-brands fa-golang"></i>
            <span>Go</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;
