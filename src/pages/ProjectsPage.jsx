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
            <img
              src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
              alt="Preview do projeto"
            />
          </div>

          <div class="content">
            <h3 id="proj-title-1">Sistema De Alunos — SDA</h3>
            <p>
              Aplicativo simples e eficiente para gerenciar estudantes. Permite
              cadastrar, visualizar, editar e excluir registros de forma
              organizada. Desenvolvido em Python com código limpo e modular,
              ideal para projetos educacionais ou pequenos sistemas de controle.
            </p>

            <div class="tags" aria-hidden="false">
              <span class="tag">Python</span>
            </div>

            <div class="meta-project">
              <span>⭐ 4.0 — Avaliações</span>
              <span>•</span>
              <span>jun 2025</span>
            </div>

            <div class="actions">
              <a class="btn ghost" href="https://github.com/Samuteg/Sistema-de-Alunos">
                Code
              </a>
            </div>
          </div>
        </article>
        <article class="portfolio-card" aria-labelledby="proj-title-1">
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
              <a
                class="btn ghost"
                href="https://github.com/?locale=pt-BR"
              >
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
