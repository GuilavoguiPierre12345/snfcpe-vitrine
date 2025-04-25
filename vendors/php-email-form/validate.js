/**
 * PHP Email Form Validation - v3.10
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", async function (event) {
      event.preventDefault();

      let thisForm = this;

      // let action = thisForm.getAttribute('action');

      // if( ! action ) {
      //   displayError(thisForm, 'The form action property is not set!');
      //   return;
      // }
      // thisForm.querySelector('.loading').classList.add('d-block');
      // thisForm.querySelector('.error-message').classList.remove('d-block');
      // thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);
      console.log(formData.get("email"));

      // php_email_form_submit(thisForm, action, formData);
    });
  });

  async function php_email_form_submit(thisForm, action, formData) {
    await fetch(action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        thisForm.querySelector(".loading").classList.remove("d-block");

        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `ERREUR RESPONSE : ${response.status} ${response.statusText} ${response.url}`
          );
        }
      })
      .then((data) => {
        thisForm.querySelector(".sent-message").classList.add("d-block");
        thisForm.querySelector(".sent-message").innerText = data.message;
        thisForm.reset();
        setTimeout(() => {
          thisForm.querySelector(".sent-message").classList.remove("d-block");
          thisForm.querySelector(".sent-message").innerText = "";
        }, 3000);
      })

      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
