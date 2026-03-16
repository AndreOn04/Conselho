document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector(".btn-send");
      const btnText = btn.querySelector("span");
      const btnIcon = btn.querySelector("ion-icon");

      btn.disabled = true;
      btnText.innerText = "Enviando...";
      btnIcon.setAttribute("name", "refresh-outline");
      btnIcon.classList.add("spinning");

      const formData = new FormData(contactForm);
      const endpoint = "https://formspree.io/f/xaqpppjv";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (response.ok) {
          contactForm.reset();
          window.location.href = "https://formspree.io/thanks?language=pt";
        } else {
          alert(
            "Erro ao enviar. Verifique se o e-mail foi ativado no Formspree.",
          );
        }
      } catch (error) {
        alert("Erro de conexão. Tente novamente.");
      } finally {
        btn.disabled = false;
        btnText.innerText = "Enviar Mensagem";
        btnIcon.setAttribute("name", "paper-plane-outline");
        btnIcon.classList.remove("spinning");
      }
    });
  }
});
