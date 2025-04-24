import { getUrlOrigin } from './utils.js'

(async function () {
  "use strict";

  let endpoint = `${getUrlOrigin()}vitrine-endpoint.php`;
  
  let personnelList = [];
  let faqsList = [];
  const formation= {
    count: 0,
    title: "Formation",
    icon: 'bi-book',
  },
  formationEncour= {
    count: 0,
    title: "Formation encours",
    icon: 'bi-hourglass-bottom',
  },
  enseignant = {
    count: 0,
    title: "Enseignats",
    icon: 'bi-people',
  },
  formationAvenir = {
    count: 0,
    title: "Formations à venir",
    icon: 'bi-calendar-event',
  };

  const params = new URLSearchParams();
  // fetch personnal list from backend endpoint
  await getPersonnel();
  async function getPersonnel() 
  {
    params.append('key', "personnel");
    await fetch(`${endpoint}?${params}`, 
      {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        personnelList = data?.data;  
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const personnel of personnelList) {
    let format = `
        <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
            <div class="team-member">
            <div class="member-img">
                <img src="assets/img/team/team-1.jpg" class="img-fluid" alt="">
                <div class="social">
                <a href=""><i class="bi bi-twitter-x"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
            </div>
            <div class="member-info">
                <h4>${personnel.prenom} ${personnel.nom}</h4>
                <span> ${personnel.dateSav} </span>
            </div>
            </div>
        </div>
    `;

    document.querySelector(".personnelList").innerHTML += format;
  }

  // Formations Statistiques
  await getFormationStatistiques();
  async function getFormationStatistiques() {
    params.append('key', "formation")
    await fetch(`${endpoint}?${params}`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((json) => {
        formation.count = json?.data[0]; 
        enseignant.count = json?.data[1]
        formationEncour.count = json?.data[2];
        formationAvenir.count = json?.data[3];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const elem of [formation, enseignant, formationEncour, formationAvenir]) {
    let format = `
    <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
      <i class="bi ${elem.icon}"></i>
      <div class="stats-item">
        <span 
          >${elem.count}</span>
        <p> ${elem.title} </p>
      </div>
    </div>
    `; 

    document.querySelector(".formationStatistique").innerHTML += format;
  }

  await getFaqs();
  async function getFaqs() {
    params.append('key', "faqs")
    await fetch(`${endpoint}?${params}`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((json) => {
        faqsList = json?.data;
        console.log(json.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const faq of faqsList) {
    let format = `
        <div class="faq-item">
          <h3> ${ faq.question } ?</h3>
          <div class="faq-content">
            <p> ${faq.reponse} </p>
          </div>
          <i class="faq-toggle bi bi-chevron-right"></i>
        </div>
    `;

    document.querySelector(".faq-container").innerHTML += format;
  }

  document.querySelectorAll('.faq-item').forEach(item => {
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-toggle');
    let isOpen = false;
    item.addEventListener('click', () => {
      isOpen = !isOpen;
      isOpen ? content.classList.remove('faq-content') : content.classList.add('faq-content');
      icon.classList.toggle('rotate-icon');
    });
  });
  
  // Set AuthBTN Url
  setAuthBtnUrl();

})();


function setAuthBtnUrl() {
  const a = document.querySelector('.btn-getstarted');
  a.href= `${getUrlOrigin()}ent/auth/`;
}