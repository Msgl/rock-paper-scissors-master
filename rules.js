// Our buttons
const rulesBtn = document.querySelector(".rules__button");
const closeBtn = document.querySelector(".box__rules__title-btn");
const wrapper = document.querySelector(".wrapper");;

// The div we will open and close
const boxRules = document.querySelector(".box__rules");


function openRules() {
    boxRules.classList.toggle('active');
    wrapper.classList.toggle('darken');
}

function closeRules() {
    boxRules.classList.remove('active');
    wrapper.classList.toggle('darken');
}