import sda_print from "../assets/sda_print.png";
import portifolio_print from "../assets/portifolio_print.png";

const ProjectsPage = () => {
  return (
    <section class="projects">
      <div class="projects-content">
        <h2>Projects</h2>
        <article class="portfolio-card" aria-labelledby="proj-title-1">
          <div
            class="thumb"
            role="img"
            aria-label="Thumbnail do projeto: App de tarefas"
          >
            <img src={sda_print} alt="Preview do projeto" />
          </div>

          <div class="content">
            <h3 id="proj-title-1">Sistema De Alunos — SDA</h3>
            <p>
              A simple and efficient application for managing student records.
              It allows users to add, view, edit, and delete student data in an
              organized way. Developed in Python with clean and modular code,
              ideal for educational projects and small management systems.
            </p>

            <div class="tags" aria-hidden="false">
              <span class="tag">Python</span>
              <span class="tag">Sqlite</span>
            </div>

            <div class="meta-project">
              <span>⭐ 4.0 — Avaliações</span>
              <span>•</span>
              <span>jun 2025</span>
            </div>

            <div class="actions">
              <a
                class="btn primary"
                href="https://github.com/Samuteg/Sistema-de-Alunos"
              >
                View Code
              </a>
            </div>
          </div>
        </article>
        <article class="portfolio-card" aria-labelledby="proj-title-2">
          <div
            class="thumb"
            role="img"
            aria-label="Thumbnail do projeto: App de tarefas"
          >
            <img src={portifolio_print} alt="Preview do projeto" />
          </div>

          <div class="content">
            <h3 id="proj-title-2">Portifolio</h3>
            <p>
              I am a dedicated software developer with experience in building
              web and desktop applications, focusing on clean architecture,
              performance, and user-centered design. I work with technologies
              such as JavaScript, and modern web frameworks to deliver scalable
              and reliable solutions. I am continuously improving my skills and
              enjoy transforming ideas into functional, high-quality products.
            </p>

            <div class="tags" aria-hidden="false">
              <span class="tag">React</span>
              <span class="tag">Tailwind</span>
              <span class="tag">Vite</span>
            </div>

            <div class="meta-project">
              <span>⭐ 4.8 — Avaliações</span>
              <span>•</span>
              <span>jan 2026</span>
            </div>

            <div class="actions">
              <a
                class="btn primary"
                href="https://base-de-portifolio.vercel.app/"
              >
                View project
              </a>
              <a
                class="btn ghost"
                href="https://github.com/Samuteg/Base-de-portifolio"
              >
                Code
              </a>
            </div>
          </div>
        </article>
        <article class="portfolio-card" aria-labelledby="proj-title-3">
          <div
            class="thumb"
            role="img"
            aria-label="Thumbnail do projeto: App de tarefas"
          >
            <img
              src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
              alt="Preview do projeto"
            />
          </div>

          <div class="content">
            <h3 id="proj-title-2">Chatify</h3>
            <p>
              A modern web-based communication application that integrates
              seamlessly with Telegram, enabling real-time messaging,
              notifications, and automation through a unified interface. The
              platform allows users to send and receive messages, manage
              conversations, and trigger events directly from the web,
              leveraging Telegram’s secure and reliable API. Designed for
              efficiency and scalability, it is ideal for customer support, team
              communication, alerts, and system integrations.
            </p>

            <div class="tags" aria-hidden="false">
              <span class="tag">NodeJs</span>
              <span class="tag">Express</span>
              <span class="tag">Mongodb</span>
              <span class="tag">React</span>
            </div>

            <div class="meta-project">
              <span>⭐ 4.8 — Avaliações</span>
              <span>•</span>
              <span>jan 2026</span>
            </div>

            <div class="actions">
              <a class="btn primary" href="">
                View project
              </a>
              <a class="btn ghost" href="https://github.com/?locale=pt-BR">
                Code
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProjectsPage;
