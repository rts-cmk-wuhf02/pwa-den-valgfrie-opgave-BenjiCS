document.addEventListener("DOMContentLoaded", () => {
  fetch("../../config.json")
    .then((response) => response.json())
    .then((json) => {
      let key = json.key;
      fetch(
        `https://api.sportsdata.io/v3/csgo/scores/json/Competitions?key=${key}`
      )
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data);
          let counter = 0;

          //   console.log("2020-" + `${date.getMonth() + 1}`);

          var month = new Array();
          month[0] = "01";
          month[1] = "02";
          month[2] = "03";
          month[3] = "04";
          month[4] = "05";
          month[5] = "06";
          month[6] = "07";
          month[7] = "08";
          month[8] = "09";
          month[9] = "10";
          month[10] = "11";
          month[11] = "12";

          const date = new Date(Date.now());
          var month = month[date.getMonth()];
          console.log(month);
          console.log(("0" + 11).slice(-2));
          console.log(("0" + 4).slice(-2));
          data.forEach(function (team) {
            team.Seasons.forEach(function (seasons) {
              if ((seasons.Season = "true")) {
                if (seasons.StartDate.includes(`${date.getFullYear()}`)) {
                  if (seasons.CurrentSeason) {
                    // console.log(seasons);
                    const matchesNowTemplate = document.getElementById(
                      "leaguesList__matchesNow"
                    );
                    const list = document.getElementsByClassName(
                      "leaguesList__matchesNow"
                    )[0];

                    const clone = matchesNowTemplate.content.cloneNode(true);
                    clone.querySelector(
                      ".leaguesList__matchesNow-Competition"
                    ).innerHTML = `Competition name: <span class="leaguesList__matchesNow-span">${seasons.CompetitionName}</span>`;
                    clone.querySelector(
                      ".leaguesList__matchesNow-name"
                    ).innerHTML = `Seasons name: <span class="leaguesList__matchesNow-span">${seasons.Name}</span>`;
                    clone.querySelector(
                      ".leaguesList__matchesNow-startDate"
                    ).innerHTML = `Start date: <span class="leaguesList__matchesNow-span">${seasons.StartDate}</span>`;
                    clone.querySelector(
                      ".leaguesList__matchesNow-endDate"
                    ).innerHTML = `End date: <span class="leaguesList__matchesNow-span">${seasons.EndDate}</span>`;
                    list.appendChild(clone);
                  } else if (seasons.StartDate.includes(`${month}`)) {
                    const matchesNowTemplate = document.getElementById(
                      "leaguesList__matchesComming"
                    );
                    const list = document.getElementsByClassName(
                      "leaguesList__matchesComming"
                    )[0];

                    const clone = matchesNowTemplate.content.cloneNode(true);
                    clone.querySelector(
                      ".leaguesList__matchesComming-Competition"
                    ).innerHTML = `Competition name: <span class="leaguesList__matchesComming-span">${seasons.CompetitionName}</span`;
                    clone.querySelector(
                      ".leaguesList__matchesComming-name"
                    ).innerHTML = `Seasons name: <span class="leaguesList__matchesComming-span">${seasons.Name}</span`;
                    clone.querySelector(
                      ".leaguesList__matchesComming-startDate"
                    ).innerHTML = `Start date <span class="leaguesList__matchesComming-span">${seasons.StartDate}</span`;
                    clone.querySelector(
                      ".leaguesList__matchesComming-endDate"
                    ).innerHTML = `End date <span class="leaguesList__matchesComming-span">${seasons.EndDate}</span`;
                    list.appendChild(clone);
                  }
                }
              }
            });
          });
          document.querySelector(".Loading").remove();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
