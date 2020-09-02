document.addEventListener("DOMContentLoaded", () => {
  let key = "a5a4d5c58a0c4b919432efda878b0473";
  fetch(
    // `https://api.sportsdata.io/v3/csgo/scores/json/MembershipsByTeam/100000078?key=${key}`
    `https://api.sportsdata.io/v3/csgo/scores/json/ActiveMemberships?key=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const teamTemplate = document.getElementById("teamTemplate");
      const list = document.getElementsByClassName("list")[0];
      var TeamName = data.map(function (data) {
        return [
          data.TeamName,
          data.PlayerName,
          data.StartDate,
          data.EndDate,
          data.TeamArea,
        ];
      });
      TeamName.sort(data.TeamName);

      const teamPassed = {};
      var counter = 0;
      TeamName.filter((playerData) => {
        if (teamPassed[playerData[0]]) return false;
        counter += 1;
        console.log(counter)
        teamPassed[playerData[0]] = true;
        document.querySelector(".list").innerHTML += `
        <section class="team ${playerData[0]}">
          <p>${playerData[0]}</p>
          <p class="team__Player-startDate">${playerData[1]}</p>
        </section>`;
        return true;
      });
      
      // console.log(teamPassed);

      TeamName.forEach(function (team) {
        // const clone = teamTemplate.content.cloneNode(true);
        
        document.querySelector(`${team[0].replace(/\s/g, "")}`).innerHTML += `
        <p class="team__Player-name">${team[1]}</p>
        <p class="team__Player-startDate">${team[2]}</p>
        <p class="team__Player-endDate"></p>
        <p class="team__Player-teamArea">${team[4]}</p>
        // `
        // clone.querySelector(".team").classList.add(team[0].replace(/\s/g, ""));
        // clone.querySelector(".team__name").innerHTML = team[0];
        // clone.querySelector(".team__Player-name").innerHTML = team[1];
        // clone.querySelector(
        //   ".team__Player-startDate"
        // ).innerHTML = team[2].substr(0, 11);
        // if (team[3] !== null) {
        //   clone.querySelector(".team__Player-startDate").innerHTML = team[3];
        // }
        // clone.querySelector(".team__Player-teamArea").innerText = team[4];
        // list.appendChild(clone);
      });
      console.log(TeamName);
    })
    .catch((err) => console.log(err));

  fetch(`https://api.sportsdata.io/v3/csgo/scores/json/Areas?key=${key}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});
