document.addEventListener("DOMContentLoaded", () => {
  fetch("../../config.json")
    .then((response) => response.json())
    .then((json) => {
      let key = json.key;
      let params = new URLSearchParams(window.location.search);
      const category = params.get("teamId");
      fetch(
        `https://api.sportsdata.io/v3/csgo/scores/json/MembershipsByTeam/${category}?key=${key}`
      )
        .then((response) => response.json())
        .then((data) => {
          document.querySelector(".team__name").innerHTML = data[0].TeamName;
          document.querySelector(
            ".sub"
          ).innerHTML = `Subscribe to ${data[0].TeamName} for news`;
          var counter = 0;
          data.forEach(function (team) {
            console.log(data);
            fetch(
              `https://api.sportsdata.io/v3/csgo/scores/json/Player/${team.PlayerId}?key=${key}`
            )
              .then((response) => response.json())
              .then((player) => {
                counter += 1;
                document.querySelector(".teamPlayers").innerHTML += `
            <div class="team__player">
              <div class="team__playerNr">
                <img src="/assets/images/placeholderPlayer.png" alt="PlaceHolder For ${player.CommonName}" class="team__player-placeholder"> 
                <h2 class="team__player-nr">Player: ${counter}</h2>
              </div>
              <div class="team__playerInfo">
                <p class="team__Player-name">Real name: <span class="team__Player-span">${player.CommonName}</span></p>
                <p class="team__Player-matchName">In game name: <span class="team__Player-span">${player.MatchName}</span></p>
                <p class="team__Player-birthCountry">Birth Country: <span class="team__Player-span">${player.BirthCountry}</span></p>
              </div>
            </div>`;
              })
              .catch((err) => console.log(err));
          });
          document.querySelector(".Loading").remove();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
