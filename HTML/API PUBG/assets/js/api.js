let ignbtn = document.querySelector("#ign");
let searchbtn = document.querySelector("#btnsearch");
let seasonbtn = '22';
const apikey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMThlM2M4MC03MjVmLTAxM2ItN2JlYS00ZDU4ZWM4MjRkNjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjczMjc3OTc1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmctcmV2aWV3cyJ9.bG-SEigI2Gxl_92wBfNzW4nzy-RrkJrk-K8szPQL4Cs";
  
function get_season() {
  let seasons = fetch(`https://api.pubg.com/shards/steam/seasons`, {
    headers: {
      accept: "application/vnd.api+json",
      Authorization: `Bearer ${apikey}`,
    },
  });
}

searchbtn.addEventListener("click", () => {
  let ign = ignbtn.value;
  let season = seasonbtn.value;
  let type = " ";
  if (command == "null") {
    alert("Please Select Command!");
  } else {
    if (platform == "null") {
      alert("Please Select Your PUBG Platform!");
    } else {
      if (command == "n") {
        if (type !== "null") {
          if (season !== "null") {
            if (ign !== "") {
              let info = {
                ign: ign,
                command: command,
                platform: platform,
                season: season,
                type: type,
              };
              search_data(info);
            } else {
              alert("Please Enter Your PUBG IGN(Case Sensitive)!");
            }
          } else {
            alert("Please Select PUBG Season!");
          }
        }
      } else if (command == "r") {
        if (type !== "null" && type !== "duo" && type !== "duo-fpp") {
          if (season !== "null" && season > 6) {
            if (ign !== "") {
              let info = {
                ign: ign,
                command: command,
                platform: platform,
                season: season,
                type: type,
              };
              search_data(info);
            } else {
              alert("Please Enter Your PUBG IGN(Case Sensitive)!");
            }
          } else {
            alert("Ranked Mode is Available from Season 7!");
          }
        }
      } else if (command == "w") {
        if (ign !== "") {
          let info = {
            ign: ign,
            command: command,
            platform: platform,
            season: season,
            type: type,
          };
          search_data(info);
        } else {
          alert("Please Enter Your PUBG IGN(Case Sensitive)!");
        }
      } else if (command == "s") {
        if (ign !== "") {
          let info = {
            ign: ign,
            command: command,
            platform: platform,
            season: season,
            type: type,
          };
          search_data(info);
        } else {
          alert("Please Enter Your PUBG IGN(Case Sensitive)!");
        }
      } else if (command == "rm") {
        if (ign !== "") {
          let info = {
            ign: ign,
            command: command,
            platform: platform,
            season: season,
            type: type,
          };
          search_data(info);
        } else {
          alert("Please Enter Your PUBG IGN(Case Sensitive)!");
        }
      } else if (command == "l") {
        if (ign !== "") {
          let info = {
            ign: ign,
            command: command,
            platform: platform,
            season: season,
            type: type,
          };
          search_data(info);
        } else {
          alert("Please Enter Your PUBG IGN(Case Sensitive)!");
        }
      }
    }
  }
});