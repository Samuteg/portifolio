const ServicesPage = () => {
  return (
    <section className="services">
      <div className="services-content">
        <h1>Services</h1>
        <p></p>
        <div className="services-section">
          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3 className="service-title">
              Desenvolvimento Web
            </h3>
            <p>
              Criação de sites modernos, responsivos e totalmente otimizados.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🎨</div>
            <h3 className="service-title">Design UI/UX</h3>
            <p>Interfaces belas, intuitivas e centradas no usuário!</p>
          </div>

          <div className="service-card">
            <div className="service-icon">⚙️</div>
            <h3 className="service-title">
              Automação & Scripts
            </h3>
            <p>Ferramentas personalizadas para automatizar processos.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">📱</div>
            <h3 className="service-title">
              Apps & Mobile
            </h3>
            <p>Desenvolvimento de aplicações para Android e iOS.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
