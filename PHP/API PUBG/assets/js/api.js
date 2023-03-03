let commandbtn = document.querySelector("#command");
let platformbtn = document.querySelector("#platform");
let ignbtn = document.querySelector("#ign");
let searchbtn = document.querySelector("#searchbtn");
let seasonbtn = document.querySelector("#season");
let statcon = document.querySelector("#statcon");
let seasonid = null;
let seasonnum = null;
let platformoptions = document.querySelectorAll(".platformnames");
let commandoptions = document.querySelectorAll(".cmdnames");
let command = "null";
let platform = "null";
const apikey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMThlM2M4MC03MjVmLTAxM2ItN2JlYS00ZDU4ZWM4MjRkNjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjczMjc3OTc1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmctcmV2aWV3cyJ9.bG-SEigI2Gxl_92wBfNzW4nzy-RrkJrk-K8szPQL4Cs";
  
function get_season() {
  let seasons = fetch(`https://api.pubg.com/shards/steam/seasons`, {
    headers: {
      accept: "application/vnd.api+json",
      Authorization: `Bearer ${apikey}`,
    },
  });
  seasons
    .then((response) => response.json())
    .then((data) => find_seasonid(data))
    .catch((err) => console.log(err));
}