const matchRow = document.getElementById("match-row");
const srcBtn = document.getElementById("srcBtn");
let leagueSelect = document.getElementById("leagueSelect");
let matches = {
  fetchLeague(league) {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league}&season=2022`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "4349a2a71bmsha465b7a1ec4bd59p1e4be9jsn68a82851aa85",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => this.displayMatches(data));
  },
  displayMatches: function (data) {
    let matches = data.response;

    matches.forEach((match) => {
      let { teams, goals, fixture } = match;
      let { date } = fixture;

      let { home: homeTeam, away: awayTeam } = teams;

      let splitDate = date.split("-");

      let [year, month, day] = splitDate;

      let newDay = day.slice(0, 2);

      let { home: homeGoals, away: awayGoals } = goals;
      let { name: homeName, logo: homeLogo } = homeTeam;

      let { name: awayname, logo: awayLogo } = awayTeam;

      if (typeof homeGoals === "number") {
        homeGoals = homeGoals;
      } else {
        homeGoals = "";
      }

      if (typeof awayGoals === "number") {
        awayGoals = awayGoals;
      } else {
        awayGoals = "";
      }

      let html = ` 
      <p>${month} / ${newDay}<p/>
      <div class="row">
    
        <img src="${homeLogo}" />
        <p class="score">${homeGoals}-${awayGoals}</p>
        <img src="${awayLogo}" />
      </div>
    </div>`;

      matchRow.insertAdjacentHTML("afterbegin", html);
    });
  },
};
matches.fetchLeague("2");

let standings = {
  fetchStandings(league) {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${league}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "4349a2a71bmsha465b7a1ec4bd59p1e4be9jsn68a82851aa85",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => this.displayStandings(data));
  },
  displayStandings: function (data) {
    let standingsData = data.response[0].league.standings[0];
    standingsData.forEach((pos) => {
      let { rank, team, points, goalsDiff, all, group } = pos;
      let { name, logo } = team;
      let { played, win, draw, lose, goals } = all;

      let row = `
                  <tr>
                  <td>${rank}</td>
                  <td>
                    <img src="${logo}" />
                  </td>
                  <td>${lose}</td>
                  <td>${draw}</td>
                  <td>${win}</td>
                  <td>${points}</td>
                </tr>`;

      document.getElementById("tbody").insertAdjacentHTML("beforeend", row);
    });
  },
};
standings.fetchStandings("2");
srcBtn.addEventListener("click", function () {
  document.getElementById("tbody").innerHTML = "";
  matchRow.innerHTML = "";
  standings.fetchStandings(leagueSelect.value);
  matches.fetchLeague(leagueSelect.value);
});
