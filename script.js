var dash = document.querySelector(".dash")
var database = firebase.database();
const dashStates = {
  "sites": `
    <h2>$displayName$'s sites</h2>
    <div class="site-cards">

    </div>
  `
}

async function initDash(userData) {
  document.querySelector(".flow").style.display = "none";
  document.querySelector(".dash-container").style.display = "flex";

  console.log(userData)
  
  var sitesData
    await database.ref(`users/${userData.uid}/sites`).once('value').then(function(snapshot) {
      sitesData = snapshot.val();
  });

  var customState = f(dashStates.sites, userData)
  try {
    dash.innerHTML = customState
    for (x of sitesData) {
      siteCard = document.createElement("div")
      siteCard.classList.add("site-card")
      siteCard.style.background = `url(https://image.thum.io/get/https://${x})`
      siteCard.innerHTML = `
        <h3>${x}</h3>
      `
      siteCard.addEventListener("click", function(event) {
        console.log(event.target)
      })
      dash.querySelector(".site-cards").appendChild(siteCard)
    }
  } catch {
    customState = `<h3 class="no-sites">You're all set up, <b>${userData.displayName}!</b> Contact your Hidden Depths representative to add your sites.</h3>`
    dash.innerHTML = customState
  }
  
  
}

function f(state, userData) {
  var parsed = state.split("$")
  const listItems = document.querySelectorAll("li");
  for (let i = 1; i < parsed.length - 1; i += 2) {
    parsed[i] = userData[parsed[i]]
  }
  return parsed.join("")
}

document.querySelector("#logout").addEventListener("click", function() {
  firebase.auth().signOut()
})