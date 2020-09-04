document.addEventListener("DOMContentLoaded", () => {
  fetch("../../config.json")
    .then((response) => response.json())
    .then((json) => {
      let key = json.key;

      fetch(
        // `https://api.sportsdata.io/v3/csgo/scores/json/MembershipsByTeam/100000078?key=${key}`
        `https://api.sportsdata.io/v3/csgo/scores/json/ActiveMemberships?key=${key}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          var TeamName = data.map(function (data) {
            return [
              data.TeamName,
              data.PlayerName,
              data.StartDate,
              data.EndDate,
              data.TeamArea,
              data.TeamId,
            ];
          });
          TeamName.sort(data.TeamName);

          const teamPassed = {};
          var counter = 0;
          TeamName.filter((playerData) => {
            if (teamPassed[playerData[0]]) {
              // console.log(playerData)
              return false;
            }
            counter += 1;
            // console.log(counter);
            teamPassed[playerData[0]] = true;
            document.querySelector(".list").innerHTML += `
        <div class="team ${playerData[0].replace(/ /g, "")}">
          <a href="/team?teamId=${playerData[5]}">
            <img src="/assets/images/placeholderGroup.png" alt="PlaceHolder For ${
              playerData[0]
            }" class="team__placeholder">          
          </a>
          <a href="/team?teamId=${playerData[5]}" class="team__a">${
              playerData[0]
            } Click for more info</a>
        </div>`;
            return true;
          });
          document.querySelector(".Loading").remove();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
