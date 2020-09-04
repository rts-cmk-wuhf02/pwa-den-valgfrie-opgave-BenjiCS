document.addEventListener("DOMContentLoaded", () => {
  // let key = "a5a4d5c58a0c4b919432efda878b0473";
  let key = "0680b02955df429a92dd6bdd50d42210";
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
        <div class="team">
          <a href="/team?teamId=${playerData[5]}">
            <img src="/assets/images/placeholderGroup.png" alt="PlaceHolder For ${playerData[0]}" class="team__placeholder">          
          </a>
          <a href="/team?teamId=${playerData[5]}" class="team__a">${playerData[0]} Click for more info</a>
        </div>`;
        return true;
      });
    })
    .catch((err) => console.log(err));
});
