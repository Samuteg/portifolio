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
              <span>⭐ 4.8 — Avaliações</span>
              <span>•</span>
              <span>Nov 2025</span>
            </div>

            <div class="actions">
              <button class="btn primary" onclick="window.open('#','_blank')">
                Ver projeto
              </button>
              <button class="btn ghost" onclick="window.open('#','_blank')">
                Código
              </button>
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
            <h3 id="proj-title-2">Sistema De Alunos — SDA</h3>
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
              <span>⭐ 4.8 — Avaliações</span>
              <span>•</span>
              <span>Nov 2025</span>
            </div>

            <div class="actions">
              <button class="btn primary" onClick="window.open('#','_blank')">
                Ver projeto
              </button>
              <button class="btn ghost" onClick="window.open('#','_blank')">
                Código
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ProjectsPage