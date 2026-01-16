const ContactPage = () => {
  return (
     <section>
      <div class="contact-section">
        <h2>Contato</h2>

        <div class="contact-block">
          <p>Entre em contato comigo pelos canais abaixo:</p>

          <div class="contact-item">
            <span class="label">Email:</span>
            <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a>
          </div>

          <div class="contact-item">
            <span class="label">Telefone:</span>
            <a href="tel:+5511999999999">(11) 99999-9999</a>
          </div>

          <div class="contact-item">
            <span class="label">LinkedIn:</span>
            <a href="https://linkedin.com/in/seuperfil" target="_blank"
              >linkedin.com/in/seuperfil</a
            >
          </div>

          <div class="contact-item">
            <span class="label">GitHub:</span>
            <a href="https://github.com/seuusuario" target="_blank"
              >github.com/seuusuario</a
            >
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage