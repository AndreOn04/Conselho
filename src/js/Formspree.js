document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const modal = document.getElementById("confirm-modal");
  const btnEdit = document.getElementById("btn-edit");
  const btnConfirm = document.getElementById("btn-confirm");

  if (contactForm && modal) {
    
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.classList.add("on-visible");
    });

    if (btnEdit) {
        btnEdit.addEventListener("click", () => {
          modal.classList.remove("on-visible");
        });
    }

    if (btnConfirm) {
        btnConfirm.addEventListener("click", async () => {
          modal.classList.remove("on-visible");
    
          const btnSubmit = contactForm.querySelector(".btn-send");
          const originalText = btnSubmit.innerHTML;
    
          btnSubmit.disabled = true;
          btnSubmit.style.cursor = "wait"; 
    
          let timeLeft = 30;
          const countdown = setInterval(() => {
            btnSubmit.innerHTML = `<ion-icon name="sync-outline" class="spinning"></ion-icon> Processando (${timeLeft}s)`;
            timeLeft--;
    
            if (timeLeft < 0) {
              clearInterval(countdown);
            }
          }, 1000);
    
          await new Promise((resolve) => setTimeout(resolve, 3000));
    
          const formData = new FormData(contactForm);
    
          try {
            btnSubmit.innerHTML = `<ion-icon name="cloud-upload-outline" class="spinning"></ion-icon> Finalizando...`;
    
            const response = await fetch("https://formspree.io/f/xaqpppjv", {
              method: "POST",
              body: formData,
              headers: { Accept: "application/json" },
            });
    
            if (response.ok) {
              clearInterval(countdown); 
              contactForm.reset();
              window.location.href = "https://formspree.io/thanks?language=pt";
            } else {
              throw new Error("Erro no envio");
            }
          } catch (error) {
            clearInterval(countdown);
            alert("Ocorreu um erro ao enviar. Por favor, tente novamente.");
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
            btnSubmit.style.cursor = "pointer";
          }
        });
    }
  }
});