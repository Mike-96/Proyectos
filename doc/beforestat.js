
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
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyYmFjMDk4MC01YWNhLTAxM2ItOTg1NS0wMzFhMzJiYjRkNTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjcwNjg0Nzk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1Ymctc3RhdC1ib3QtIn0.dCRCzc9KbFYBWx921DEgBV5JaYCJ8Zj6UMQ0SjpfOg4";
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
function find_seasonid(seasons) {
  for (let j = 0; j < seasons["data"].length; j++) {
    if (seasons["data"][j]["attributes"]["isCurrentSeason"] == true) {
      seasonid = seasons["data"][j]["id"];
    }
  }
  seasonnum = `${seasonid[seasonid.length - 2]}${
    seasonid[seasonid.length - 1]
  }`;
  for (let i = seasonnum; i > 0; i--) {
    let seasonopt = document.createElement("option");
    seasonopt.value = i;
    seasonopt.innerHTML = `Season ${i}`;
    seasonbtn.append(seasonopt);
  }
}
get_season();
for (let i = 0; i < platformoptions.length; i++) {
  platformoptions[i].addEventListener("click", () => {
    platform = platformoptions[i].dataset.value;
    platformoptions[i].style.color = "#ffa200";
    for (let j = 0; j < platformoptions.length; j++) {
      if (j !== i) {
        platformoptions[j].style.color = "#ffffff";
      }
    }
  });
}
for (let i = 0; i < commandoptions.length; i++) {
  commandoptions[i].addEventListener("click", () => {
    command = commandoptions[i].dataset.value;
    commandoptions[i].style.color = "#ffa200";
    for (let j = 0; j < commandoptions.length; j++) {
      if (j !== i) {
        commandoptions[j].style.color = "#ffffff";
      }
    }
  });
}

//buscar datos jugador
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
async function search_data(info) {
  let gamemode = info["command"];
  let pubgplatform = info["platform"];
  let season = info["season"];
  if (gamemode == "n" || gamemode == "r") {
    if (pubgplatform == "steam" || pubgplatform == "kakao") {
      if (Number(season) < 10) {
        info["seasonids"] = `division.bro.official.pc-2018-0${season}`;
      } else {
        info["seasonids"] = `division.bro.official.pc-2018-${season}`;
      }
      pubg(info);
    } else if (
      pubgplatform == "xbox" ||
      pubgplatform == "stadia" ||
      pubgplatform == "psn"
    ) {
      if (Number(season) > 2 && Number(season) < 10) {
        info["seasonids"] = `division.bro.official.console-0${season}`;
        pubg(info);
      } else if (season < 3) {
        alert("Console Platforms are Available from Season 3");
      } else {
        info["seasonids"] = `division.bro.official.console-${season}`;
        pubg(info);
      }
    }
  } else if (
    gamemode == "l" ||
    gamemode == "w" ||
    gamemode == "s" ||
    gamemode == "rm"
  ) {
    pubg(info);
  }
}
function pubg(info) {
  let data = fetch(
    `https://api.pubg.com/shards/${info["platform"]}/players?filter[playerNames]=${info["ign"]}`,
    {
      headers: {
        accept: "application/vnd.api+json",
        Authorization: `Bearer ${apikey}`,
      },
    }
  );
  data
    .then((response) => response.json())
    .then((data) => check_response_accid(data, info))
    .catch((err) => alert("Servers too busy, try again in a min"));
}
function check_response_accid(data, info) {
  let key = Object.keys(data);
  if (key[0] == "errors") {
    let err = data["errors"][0]["title"];
    if (err == "Not Found") {
      alert("Please Check Your PUBG IGN(Case Sensitive)!");
    }
  } else if (key[0] == "data") {
    let accid = data["data"][0]["id"];
    info["accid"] = accid;
    func_dir(info, data);
  }
}
function check_res_weapon(data, info) {
  let keys = Object.keys(data);
  let count = 0;
  for (let i = 0; i < keys.length; i++) {
    if (data[keys[i]] !== null) {
      count++;
    }
  }
  if (count == keys.length) {
    set_values_weapon(info, data);
  }
}
function func_dir(info, data) {
  let gamemode = info["command"];
  if (gamemode == "n") {
    pubg_normal(info);
  } else if (gamemode == "r") {
    pubg_ranked(info);
  } else if (gamemode == "l") {
    pubg_lifetime(info);
  } else if (gamemode == "w") {
    pubg_weapon(info);
  } else if (gamemode == "rm") {
    if (data["data"][0]["relationships"]["matches"]["data"].length == 0) {
      alert("No Matches exist for the last 14 days.");
    } else {
      if (data["data"][0]["relationships"]["matches"]["data"].length == 0) {
        alert("No Matches exist for the last 14 days.");
      } else {
        let matchids = [];
        for (
          let i = 0;
          i < data["data"][0]["relationships"]["matches"]["data"].length;
          i++
        ) {
          matchids.push(
            data["data"][0]["relationships"]["matches"]["data"][i]["id"]
          );
        }

        pubg_last_matches(info, matchids);
      }
    }
  } else if (gamemode == "s") {
    pubg_skilledid(info);
  }
}
function pubg_normal(info) {
  let normaldata = fetch(
    `https://api.pubg.com/shards/${info["platform"]}/players/${info["accid"]}/seasons/${info["seasonids"]}`,
    {
      headers: {
        accept: "application/vnd.api+json",
        Authorization: `Bearer ${apikey}`,
      },
    }
  );
  normaldata
    .then((response) => response.json())
    .then((data) =>
      set_values_normal(info, data["data"]["attributes"]["gameModeStats"])
    )
    .catch((err) => alert("Servers too busy, try again in a min"));
}
function pubg_ranked(info) {
  let rankeddata = fetch(
    `https://api.pubg.com/shards/${info["platform"]}/players/${info["accid"]}/seasons/${info["seasonids"]}/ranked`,
    {
      headers: {
        accept: "application/vnd.api+json",
        Authorization: `Bearer ${apikey}`,
      },
    }
  );
  rankeddata
    .then((response) => response.json())
    .then((data) =>
      set_values_ranked(info, data["data"]["attributes"]["rankedGameModeStats"])
    )
    .catch((err) => alert("Servers too busy, try again in a min"));
}
function pubg_lifetime(info) {
  let lifetimedata = fetch(
    `https://api.pubg.com/shards/${info["platform"]}/players/${info["accid"]}/seasons/lifetime`,
    {
      headers: {
        accept: "application/vnd.api+json",
        Authorization: `Bearer ${apikey}`,
      },
    }
  );
  lifetimedata
    .then((response) => response.json())
    .then((data) =>
      set_values_lifetime(info, data["data"]["attributes"]["gameModeStats"])
    )
    .catch((err) => alert("Servers too busy, try again in a min"));
}
function pubg_weapon(info) {
  let weaponobj = {
    ign: info["ign"],
    platform: info["platform"],
    accid: info["accid"],
    mastery: null,
    accuracy: null,
  };
  let weapondata = fetch(
    `https://api.pubg.com/shards/${info["platform"]}/players/${info["accid"]}/weapon_mastery`,
    {
      headers: {
        accept: "application/vnd.api+json",
        Authorization: `Bearer ${apikey}`,
      },
    }
  );
  weapondata
    .then((response) => response.json())
    .then(
      (data) =>
        (weaponobj["mastery"] = data["data"]["attributes"]["weaponSummaries"])
    )
    .then((data) => check_res_weapon(weaponobj, info))
    .catch((err) => alert("Servers too busy, try again in a min"));
  let weaponaccuracy = fetch(
    `https://api.tinybird.co/v0/pipes/playerWeaponAccuracy_PUBGStatBot.json?playerid=${info["accid"]}&token=p.eyJ1IjogIjU4MGQ1N2VkLWI0M2UtNDMwZC05ODJkLTg4OGFkMTI5YmQ5MSIsICJpZCI6ICJjMWRmMWNjZi0zMzJmLTRkOGQtODlkYi04ZGY1NWY2ZDgxMDIifQ.6GmL3QVWQUwujgGCZ6AZsNR0OEXnATE49qVGD2t4TU0`
  );
  weaponaccuracy
    .then((response) => response.json())
    .then((data) => (weaponobj["accuracy"] = data))
    .then((res) => check_res_weapon(weaponobj, info))
    .catch((err) => alert("Servers too busy, try again in a min"));
}
function set_values_normal(info, data) {
  let type = ["solo", "duo", "squad", "solo-fpp", "duo-fpp", "squad-fpp"];
  let needs = [
    "kills",
    "damageDealt",
    "assists",
    "losses",
    "roundsPlayed",
    "top10s",
    "wins",
  ];
  let datas = [[], [], [], [], [], [], []];
  for (let i = 0; i < type.length; i++) {
    if (data[type[i]]["roundsPlayed"] !== 0) {
      for (let j = 0; j < needs.length; j++) {
        datas[j].push(data[type[i]][needs[j]]);
      }
    }
  }

  if (datas !== [[], [], [], [], [], [], []]) {
    let kills = datas[0].reduce((a, b) => a + b);
    let damageDealt = Number(datas[1].reduce((a, b) => a + b)).toFixed(0);
    let assists = datas[2].reduce((a, b) => a + b);
    let losses = datas[3].reduce((a, b) => a + b);
    let roundsPlayed = datas[4].reduce((a, b) => a + b);
    let top10s = datas[5].reduce((a, b) => a + b);
    let wins = datas[6].reduce((a, b) => a + b);
    let kda = Number(((kills + assists) / losses).toFixed(1));
    let avgdmg = Number((damageDealt / roundsPlayed).toFixed(0));
    let totalstat = {
      kills: kills,
      damageDealt: damageDealt,
      assists: assists,
      losses: losses,
      roundsPlayed: roundsPlayed,
      top10s: top10s,
      wins: wins,
      kda: kda,
      avgdmg: avgdmg,
    };
    data["total"] = Object.assign({}, totalstat);
  }
  for (let i = 0; i < type.length; i++) {
    if (data[type[i]]["roundsPlayed"] !== 0) {
      data[type[i]].kda = (
        (data[type[i]]["kills"] + data[type[i]]["assists"]) /
        data[type[i]]["losses"]
      ).toFixed(1);
      data[type[i]].avgdmg = (
        data[type[i]]["damageDealt"] / data[type[i]]["roundsPlayed"]
      ).toFixed(0);
      data[type[i]]["damageDealt"] = data[type[i]]["damageDealt"].toFixed(0);
      data[type[i]]["longestKill"] = `${data[type[i]]["longestKill"].toFixed(
        0
      )}M`;
      data[type[i]]["rideDistance"] = `${(
        data[type[i]]["rideDistance"] / 1000
      ).toFixed(1)}KM`;
      data[type[i]]["swimDistance"] = `${(
        data[type[i]]["swimDistance"] / 1000
      ).toFixed(1)}KM`;
      data[type[i]]["walkDistance"] = `${(
        data[type[i]]["walkDistance"] / 1000
      ).toFixed(1)}KM`;
      data[type[i]]["timeSurvived"] = `${(
        data[type[i]]["timeSurvived"] / 3600
      ).toFixed(1)}H`;
    } else {
      Object.keys(data[type[i]]).forEach((key) => {
        data[type[i]][key] = "-";
      });
      data[type[i]]["kda"] = "-";
      data[type[i]]["avgdmg"] = "-";
    }
  }
  if (data["total"]["roundsPlayed"] !== 0) {
    render_normal(info, data);
  } else {
    alert("This Player Has No Stat For This Mode");
  }
}
function set_values_ranked(info, data) {
  let type = ["solo", "squad", "solo-fpp", "squad-fpp"];
  let needs = [
    "kills",
    "damageDealt",
    "assists",
    "deaths",
    "roundsPlayed",
    "top10Ratio",
    "wins",
    "currentRankPoint",
  ];
  let datas = [[], [], [], [], [], [], [], []];
  let exobj = null;
  for (let i = 0; i < type.length; i++) {
    if (data[type[i]] !== undefined) {
      for (let j = 0; j < needs.length; j++) {
        datas[j].push(data[type[i]][needs[j]]);
      }
      if (datas !== [[], [], [], [], [], [], [], []]) {
        let kills = datas[0].reduce((a, b) => a + b);
        let damageDealt = datas[1].reduce((a, b) => a + b).toFixed(0);
        let assists = datas[2].reduce((a, b) => a + b);
        let deaths = datas[3].reduce((a, b) => a + b);
        let roundsPlayed = datas[4].reduce((a, b) => a + b);
        let top10Ratio = `${(datas[5].reduce((a, b) => a + b) * 100).toFixed(
          1
        )}%`;
        let wins = datas[6].reduce((a, b) => a + b);
        let currentRankPoint = Math.max.apply(null, datas[7]);
        let stat = {
          kills: kills,
          damageDealt: damageDealt,
          assists: assists,
          deaths: deaths,
          roundsPlayed: roundsPlayed,
          top10Ratio: top10Ratio,
          wins: wins,
          currentRankPoint: currentRankPoint,
          kda: ((kills + assists) / deaths).toFixed(1),
          avgdmg: (damageDealt / roundsPlayed).toFixed(0),
        };
        data["total"] = Object.assign({}, stat);
      }
      data[type[i]]["avgRank"] = data[type[i]]["avgRank"].toFixed(1);
      data[type[i]]["top10Ratio"] = `${(
        data[type[i]]["top10Ratio"] * data[type[i]]["roundsPlayed"]
      ).toFixed(0)} | ${(data[type[i]]["top10Ratio"] * 100).toFixed(1)}%`;
      data[type[i]]["winRatio"] = `${(
        data[type[i]]["winRatio"] * data[type[i]]["roundsPlayed"]
      ).toFixed(0)} | ${(data[type[i]]["winRatio"] * 100).toFixed(1)}%`;
      data[type[i]]["kda"] = data[type[i]]["kda"].toFixed(1);
      data[type[i]]["avgdmg"] = (
        data[type[i]]["damageDealt"] / data[type[i]]["roundsPlayed"]
      ).toFixed(0);
      data[type[i]]["damageDealt"] = data[type[i]]["damageDealt"].toFixed(0);
      exobj = Object.assign({}, data[type[i]]);
    }
  }
  Object.keys(exobj).forEach((key) => {
    exobj[key] = "-";
  });
  for (let i = 0; i < type.length; i++) {
    if (data[type[i]] == undefined) {
      data[type[i]] = Object.assign({}, exobj);
    }
  }
  if (data["total"]["roundsPlayed"] !== 0) {
    render_ranked(info, data);
  } else {
    alert("This Player Has No Stat For This Mode");
  }
}
function set_values_lifetime(info, data) {
  let type = ["solo", "solo-fpp", "duo", "duo-fpp", "squad", "squad-fpp"];
  let needs = [
    "assists",
    "dBNOs",
    "damageDealt",
    "headshotKills",
    "kills",
    "longestKill",
    "losses",
    "rideDistance",
    "roundsPlayed",
    "swimDistance",
    "timeSurvived",
    "top10s",
    "walkDistance",
    "wins",
    "teamKills",
  ];
  let datas = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  for (let i = 0; i < type.length; i++) {
    if (data[type[i]] !== undefined) {
      for (let j = 0; j < needs.length; j++) {
        datas[j].push(data[type[i]][needs[j]]);
      }
    }
  }
  let assists = datas[0].reduce((a, b) => a + b);
  let dBNOs = datas[1].reduce((a, b) => a + b);
  let damageDealt = datas[2].reduce((a, b) => a + b);
  let headshotKills = datas[3].reduce((a, b) => a + b);
  let kills = datas[4].reduce((a, b) => a + b);
  let longestKill = Math.max.apply(null, datas[5]);
  let losses = datas[6].reduce((a, b) => a + b);
  let rideDistance = datas[7].reduce((a, b) => a + b);
  let roundsPlayed = datas[8].reduce((a, b) => a + b);
  let swimDistance = datas[9].reduce((a, b) => a + b);
  let timeSurvived = datas[10].reduce((a, b) => a + b);
  let top10s = datas[11].reduce((a, b) => a + b);
  let walkDistance = datas[12].reduce((a, b) => a + b);
  let wins = datas[13].reduce((a, b) => a + b);
  let teamKills = datas[14].reduce((a, b) => a + b);
  let stat = {
    assists: assists,
    dBNOs: dBNOs,
    damageDealt: damageDealt.toFixed(0),
    headshotKills: headshotKills,
    kills: kills,
    longestKill: `${longestKill.toFixed(1)}M`,
    losses: losses,
    rideDistance: `${(rideDistance / 1000).toFixed(1)}KM`,
    roundsPlayed: roundsPlayed,
    swimDistance: `${(swimDistance / 1000).toFixed(1)}KM`,
    timeSurvived: `${(timeSurvived / 3600).toFixed(1)}H`,
    top10s: top10s,
    walkDistance: `${(walkDistance / 1000).toFixed(1)}KM`,
    wins: wins,
    kda: ((kills + assists) / roundsPlayed).toFixed(1),
    avgdmg: (damageDealt / roundsPlayed).toFixed(1),
    teamKills: teamKills,
  };
  if (stat["roundsPlayed"] !== 0) {
    render_lifetime(info, stat);
  } else {
    alert("This Player has no stats for this mode");
  }
}
function set_values_weapon(info, data) {
  let weapondatas = Object.entries(data["mastery"]);
  let oldstat = {};
  let normalstat = {};
  let rankedstat = {};
  let totalstat = [];
  let renderstat = {};
  let names = {
    InstantRevivalKit_C: "Critical Response Kit",
    Item_Ammo_12GuageSlug_C: "12 Gauge Slug",
    Item_Ammo_12Guage_C: "12 Gauge Ammo",
    Item_Ammo_300Magnum_C: "300 Magnum Ammo",
    Item_Ammo_40mm_C: "40mm Smoke Grenade",
    Item_Ammo_45ACP_C: ".45 ACP Ammo",
    Item_Ammo_556mm_C: "5.56mm Ammo",
    Item_Ammo_57mm_C: "57mm Ammo",
    Item_Ammo_762mm_C: "7.62mm Ammo",
    Item_Ammo_9mm_C: "9mm Ammo",
    Item_Ammo_Bolt_C: "Crossbow Bolt",
    Item_Ammo_Flare_C: "Flare Gun Ammo",
    Item_Ammo_Mortar_C: "Mortar Ammo",
    Item_Armor_C_01_Lv3_C: "Military Vest (Level 3)",
    Item_Armor_D_01_Lv2_C: "Police Vest (Level 2)",
    Item_Armor_E_01_Lv1_C: "Police Vest (Level 1)",
    Item_Attach_Weapon_Lower_AngledForeGrip_C: "Angled Foregrip",
    Item_Attach_Weapon_Lower_Foregrip_C: "Vertical Foregrip",
    Item_Attach_Weapon_Lower_HalfGrip_C: "Half Grip",
    Item_Attach_Weapon_Lower_LaserPointer_C: "Laser Sight",
    Item_Attach_Weapon_Lower_LightweightForeGrip_C: "Light Grip",
    Item_Attach_Weapon_Lower_QuickDraw_Large_Crossbow_C:
      "QuickDraw Crossbow Quiver",
    Item_Attach_Weapon_Lower_ThumbGrip_C: "Thumb Grip",
    Item_Attach_Weapon_Magazine_ExtendedQuickDraw_Large_C:
      "Extended QuickDraw Mag (AR, DMR, M249, S12K)",
    Item_Attach_Weapon_Magazine_ExtendedQuickDraw_Medium_C:
      "Extended QuickDraw Mag (Handgun, SMG)",
    Item_Attach_Weapon_Magazine_ExtendedQuickDraw_Small_C:
      "Extended QuickDraw Mag (Handgun)",
    Item_Attach_Weapon_Magazine_ExtendedQuickDraw_SniperRifle_C:
      "Extended QuickDraw Mag (DMR, SR)",
    Item_Attach_Weapon_Magazine_Extended_Large_C:
      "Extended Mag (AR, DMR, M249, S12K)",
    Item_Attach_Weapon_Magazine_Extended_Medium_C:
      "Extended Mag (Handgun, SMG)",
    Item_Attach_Weapon_Magazine_Extended_Small_C: "Extended Mag (Handgun)",
    Item_Attach_Weapon_Magazine_Extended_SniperRifle_C:
      "Extended Mag (DMR, SR)",
    Item_Attach_Weapon_Magazine_QuickDraw_Large_C:
      "QuickDraw Mag (AR, DMR, M249, S12K)",
    Item_Attach_Weapon_Magazine_QuickDraw_Medium_C:
      "Quickdraw Mag (Handgun, SMG)",
    Item_Attach_Weapon_Magazine_QuickDraw_Small_C: "Quickdraw Mag (Handgun)",
    Item_Attach_Weapon_Magazine_QuickDraw_SniperRifle_C:
      "Quickdraw Mag (DMR, SR)",
    Item_Attach_Weapon_Muzzle_Choke_C: "Choke",
    Item_Attach_Weapon_Muzzle_Compensator_Large_C:
      "Compensator (AR, DMR, S12K)",
    Item_Attach_Weapon_Muzzle_Compensator_Medium_C:
      "Compensator (Handgun, SMG)",
    Item_Attach_Weapon_Muzzle_Compensator_SniperRifle_C:
      "Compensator (DMR, SR)",
    Item_Attach_Weapon_Muzzle_Duckbill_C: "Duckbill",
    Item_Attach_Weapon_Muzzle_FlashHider_Large_C: "Flash Hider (AR, DMR, S12K)",
    Item_Attach_Weapon_Muzzle_FlashHider_Medium_C: "Flash Hider (Handgun, SMG)",
    Item_Attach_Weapon_Muzzle_FlashHider_SniperRifle_C: "Flash Hider (DMR, SR)",
    Item_Attach_Weapon_Muzzle_Suppressor_Large_C: "Supressor (AR, DMR, S12K)",
    Item_Attach_Weapon_Muzzle_Suppressor_Medium_C: "Supressor (Handgun, SMG)",
    Item_Attach_Weapon_Muzzle_Suppressor_Small_C: "Supressor (Handgun)",
    Item_Attach_Weapon_Muzzle_Suppressor_SniperRifle_C: "Supressor (DMR, SR)",
    Item_Attach_Weapon_SideRail_DotSight_RMR_C: "Canted Sight",
    Item_Attach_Weapon_Stock_AR_Composite_C: "Tactical Stock",
    Item_Attach_Weapon_Stock_Shotgun_BulletLoops_C: "Shotgun Bullet Loops",
    Item_Attach_Weapon_Stock_SniperRifle_BulletLoops_C:
      "Sniper Rifle Bullet Loops",
    Item_Attach_Weapon_Stock_SniperRifle_CheekPad_C: "Sniper Rifle Cheek Pad",
    Item_Attach_Weapon_Stock_UZI_C: "Uzi Stock",
    Item_Attach_Weapon_Upper_ACOG_01_C: "4x ACOG Scope",
    Item_Attach_Weapon_Upper_Aimpoint_C: "2x Aimpoint Scope",
    Item_Attach_Weapon_Upper_CQBSS_C: "8x CQBSS Scope",
    Item_Attach_Weapon_Upper_DotSight_01_C: "Red Dot Sight",
    Item_Attach_Weapon_Upper_Holosight_C: "Holographic Sight",
    Item_Attach_Weapon_Upper_PM2_01_C: "15x PM II Scope",
    Item_Attach_Weapon_Upper_Scope3x_C: "3x Scope",
    Item_Attach_Weapon_Upper_Scope6x_C: "6x Scope",
    Item_Back_B_01_StartParachutePack_C: "Parachute",
    Item_Back_B_08_Lv3_C: "Backpack (Level 3)",
    Item_Back_BackupParachute_C: "Emergency Parachute",
    Item_Back_BlueBlocker: "Jammer Pack",
    Item_Back_C_01_Lv3_C: "Backpack (Level 3)",
    Item_Back_C_02_Lv3_C: "Backpack (Level 3)",
    Item_Back_E_01_Lv1_C: "Backpack (Level 1)",
    Item_Back_E_02_Lv1_C: "Backpack (Level 1)",
    Item_Back_F_01_Lv2_C: "Backpack (Level 2)",
    Item_Back_F_02_Lv2_C: "Backpack (Level 2)",
    Item_Boost_AdrenalineSyringe_C: "Adrenaline Syringe",
    Item_Boost_EnergyDrink_C: "Energy Drink",
    Item_Boost_PainKiller_C: "Painkiller",
    Item_BulletproofShield_C: "Folded Shield",
    Item_Chimera_Key_C: "Secret Room Key",
    Item_EmergencyPickup_C: "Emergency Pickup",
    Item_Ghillie_01_C: "Ghillie Suit",
    Item_Ghillie_02_C: "Ghillie Suit",
    Item_Ghillie_03_C: "Ghillie Suit",
    Item_Ghillie_04_C: "Ghillie Suit",
    Item_Ghillie_05_C: "Ghillie Suit",
    Item_Ghillie_06_C: "Ghillie Suit",
    Item_Ghillie_07_C: "Ghillie Suit",
    Item_Head_E_01_Lv1_C: "Motorcycle Helmet (Level 1)",
    Item_Head_E_02_Lv1_C: "Motorcycle Helmet (Level 1)",
    Item_Head_F_01_Lv2_C: "Military Helmet (Level 2)",
    Item_Head_F_02_Lv2_C: "Military Helmet (Level 2)",
    Item_Head_G_01_Lv3_C: "Spetsnaz Helmet (Level 3)",
    Item_Heal_Bandage_C: "Bandage",
    Item_Heal_FirstAid_C: "First Aid Kit",
    Item_Heal_MedKit_C: "Med kit",
    Item_Heaven_Key_C: "Key",
    Item_JerryCan_C: "Gas Can",
    Item_Mountainbike_C: "Mountain Bike",
    Item_Secuity_KeyCard_C: "Key Card",
    Item_Special_Ascender_C: "Ascender",
    Item_Special_BackupParachute_C: "Backup Parachute",
    Item_Tiger_Key_C: "Secret Room Key",
    Item_Tiger_SelfRevive_C: "Self AED",
    Item_Weapon_ACE32_C: "ACE32",
    Item_Weapon_AK47_C: "AKM",
    Item_Weapon_AUG_C: "AUG A3",
    Item_Weapon_AWM_C: "AWM",
    Item_Weapon_Apple_C: "Apple",
    Item_Weapon_Berreta686_C: "S686",
    Item_Weapon_BerylM762_C: "Beryl",
    Item_Weapon_BizonPP19_C: "Bizon",
    Item_Weapon_BlueChipDetector_C: "Blue Chip Detector",
    Item_Weapon_BluezoneGrenade_C: "Bluezone Grenade",
    Item_Weapon_C4_C: "C4",
    Item_Weapon_Cowbar_C: "Crowbar",
    Item_Weapon_Crossbow_C: "Crossbow",
    Item_Weapon_DP12_C: "DBS",
    Item_Weapon_DP28_C: "DP-28",
    Item_Weapon_DecoyGrenade_C: "Decoy Grenade",
    Item_Weapon_DesertEagle_C: "Deagle",
    Item_Weapon_Drone_C: "Drone",
    Item_Weapon_Duncans_M416_C: "M416",
    Item_Weapon_FNFal_C: "SLR",
    Item_Weapon_FlareGun_C: "Flare Gun",
    Item_Weapon_FlashBang_C: "Flashbang",
    Item_Weapon_G18_C: "P18C",
    Item_Weapon_G36C_C: "G36C",
    Item_Weapon_Grenade_C: "Frag Grenade",
    Item_Weapon_Grenade_Warmode_C: "Frag Grenade",
    Item_Weapon_Groza_C: "Groza",
    Item_Weapon_HK416_C: "M416",
    Item_Weapon_K2_C: "K2",
    Item_Weapon_Kar98k_C: "Kar98k",
    Item_Weapon_L6_C: "Lynx AMR",
    Item_Weapon_M16A4_C: "M16A4",
    Item_Weapon_M1911_C: "P1911",
    Item_Weapon_M249_C: "M249",
    Item_Weapon_M24_C: "M24",
    Item_Weapon_M79_C: "M79",
    Item_Weapon_M9_C: "P92",
    Item_Weapon_MG3_C: "MG3",
    Item_Weapon_MP5K_C: "MP5K",
    Item_Weapon_MP9_C: "MP9",
    Item_Weapon_Machete_C: "Machete",
    Item_Weapon_Mads_QBU88_C: "QBU88",
    Item_Weapon_Mini14_C: "Mini 14",
    Item_Weapon_Mk12_C: "Mk12",
    Item_Weapon_Mk14_C: "Mk14 EBR",
    Item_Weapon_Mk47Mutant_C: "Mk47 Mutant",
    Item_Weapon_Molotov_C: "Molotov Cocktail",
    Item_Weapon_Mortar_C: "Mortar",
    Item_Weapon_Mosin_C: "Mosin-Nagant",
    Item_Weapon_NagantM1895_C: "R1895",
    Item_Weapon_OriginS12_C: "O12",
    Item_Weapon_P90_C: "P90",
    Item_Weapon_Pan_C: "Pan",
    Item_Weapon_PanzerFaust100M_C: "Panzerfaust",
    Item_Weapon_QBU88_C: "QBU88",
    Item_Weapon_QBZ95_C: "QBZ95",
    Item_Weapon_Rhino_C: "R45",
    Item_Weapon_Rock_C: "Rock",
    "Item_Weapon_SCAR-L_C": "SCAR-L",
    Item_Weapon_SKS_C: "SKS",
    Item_Weapon_Saiga12_C: "S12K",
    Item_Weapon_Sawnoff_C: "Sawed-off",
    Item_Weapon_Sickle_C: "Sickle",
    Item_Weapon_SmokeBomb_C: "Smoke Grenade",
    Item_Weapon_Snowball_C: "Snowball",
    Item_Weapon_SpikeTrap_C: "Spike Trap",
    Item_Weapon_Spotter_Scope_C: "Spotter Scope",
    Item_Weapon_StickyGrenade_C: "Sticky Bomb",
    Item_Weapon_TacPack_C: "Tactical Pack",
    Item_Weapon_Thompson_C: "Tommy Gun",
    Item_Weapon_TraumaBag_C: "Trauma Bag",
    Item_Weapon_UMP_C: "UMP9",
    Item_Weapon_UZI_C: "Micro Uzi",
    Item_Weapon_VSS_C: "VSS",
    Item_Weapon_Vector_C: "Vector",
    Item_Weapon_Win1894_C: "Win94",
    Item_Weapon_Winchester_C: "S1897",
    Item_Weapon_vz61Skorpion_C: "Skorpion",
    SP6_EventItem_DVD_01_C: "Event Item",
    SP6_EventItem_DVD_02_C: "Event Item",
    SP6_EventItem_DVD_03_C: "Event Item",
    WarModeStartParachutePack_C: "Parachute",
  };
  for (let i = 0; i < weapondatas.length; i++) {
    oldstat[weapondatas[i][0]] = {};
    normalstat[weapondatas[i][0]] = {};
    rankedstat[weapondatas[i][0]] = {};
    let os = {
      StatsTotal: weapondatas[i][1]["StatsTotal"],
    };
    let ns = {
      StatsTotal: weapondatas[i][1]["OfficialStatsTotal"],
    };
    let rs = {
      StatsTotal: weapondatas[i][1]["CompetitiveStatsTotal"],
    };
    oldstat[weapondatas[i][0]] = os;
    normalstat[weapondatas[i][0]] = ns;
    rankedstat[weapondatas[i][0]] = rs;
    let mostdefeat = [
      oldstat[weapondatas[i][0]]["StatsTotal"]["MostDefeatsInAGame"],
      normalstat[weapondatas[i][0]]["StatsTotal"]["MostDefeatsInAGame"],
      rankedstat[weapondatas[i][0]]["StatsTotal"]["MostDefeatsInAGame"],
    ];
    let defeat = [
      oldstat[weapondatas[i][0]]["StatsTotal"]["Defeats"],
      normalstat[weapondatas[i][0]]["StatsTotal"]["Defeats"],
      rankedstat[weapondatas[i][0]]["StatsTotal"]["Defeats"],
    ];
    let kill = [
      oldstat[weapondatas[i][0]]["StatsTotal"]["Kills"],
      normalstat[weapondatas[i][0]]["StatsTotal"]["Kills"],
      rankedstat[weapondatas[i][0]]["StatsTotal"]["Kills"],
    ];
    let headshot = [
      oldstat[weapondatas[i][0]]["StatsTotal"]["HeadShots"],
      normalstat[weapondatas[i][0]]["StatsTotal"]["HeadShots"],
      rankedstat[weapondatas[i][0]]["StatsTotal"]["HeadShots"],
    ];
    let mostkill = [
      oldstat[weapondatas[i][0]]["StatsTotal"]["MostKillsInAGame"],
      normalstat[weapondatas[i][0]]["StatsTotal"]["MostKillsInAGame"],
      rankedstat[weapondatas[i][0]]["StatsTotal"]["MostKillsInAGame"],
    ];
    let dmg = [
      oldstat[weapondatas[i][0]]["StatsTotal"]["DamagePlayer"],
      normalstat[weapondatas[i][0]]["StatsTotal"]["DamagePlayer"],
      rankedstat[weapondatas[i][0]]["StatsTotal"]["DamagePlayer"],
    ];

    let ts = {
      MostDefeatsInAGame: Math.max.apply(null, mostdefeat),
      Defeats: defeat.reduce((a, b) => a + b),
      DamagePlayer: dmg.reduce((a, b) => a + b).toFixed(1),
      HeadShots: headshot.reduce((a, b) => a + b),
      Kills: kill.reduce((a, b) => a + b),
      MostKillsInAGame: Math.max.apply(null, mostkill),
    };
    totalstat[i] = [weapondatas[i][0], ts];
  }
  totalstat.sort((a, b) => {
    return b[1]["Kills"] - a[1]["Kills"];
  });
  let namekeys = Object.keys(names);
  for (let i = 0; i < namekeys.length; i++) {
    if (totalstat[0][0] == namekeys[i]) {
      totalstat[0][0] = names[namekeys[i]];
    }
    if (totalstat[1][0] == namekeys[i]) {
      totalstat[1][0] = names[namekeys[i]];
    }
    if (totalstat[2][0] == namekeys[i]) {
      totalstat[2][0] = names[namekeys[i]];
    }
  }
  totalstat.splice(3, totalstat.length);
  let accuracydata = data["accuracy"]["data"];
  for (let i = 0; i < accuracydata.length; i++) {
    if (
      totalstat[0][0].toLowerCase() == accuracydata[i]["weapon"].toLowerCase()
    ) {
      totalstat[0][1]["accuracy"] = `${Number(
        accuracydata[i]["accuracy"] * 100
      ).toFixed(0)}%`;
    }
    if (
      totalstat[1][0].toLowerCase() == accuracydata[i]["weapon"].toLowerCase()
    ) {
      totalstat[1][1]["accuracy"] = `${Number(
        accuracydata[i]["accuracy"] * 100
      ).toFixed(0)}%`;
    }
    if (
      totalstat[2][0].toLowerCase() == accuracydata[i]["weapon"].toLowerCase()
    ) {
      totalstat[2][1]["accuracy"] = `${Number(
        accuracydata[i]["accuracy"] * 100
      ).toFixed(0)}%`;
    }
  }
  for (let i = 0; i < totalstat.length; i++) {
    if (totalstat[i][1]["accuracy"] == undefined) {
      totalstat[i][1]["accuracy"] = "-%";
    }
  }

  if (totalstat.length == 0) {
    alert("Error Occured!");
  } else {
    render_weapon(info, totalstat);
  }
}
async function render_normal(info, stat) {
  let stattitle = document.createElement("div");
  let title = null;
  if (info["ign"][info["ign"].length - 1].toLowerCase() == "s") {
    title = `${info["ign"]}' PUBG Season ${info["season"]} Normal Mode Stat`;
  } else {
    title = `${info["ign"]}'s PUBG Season ${info["season"]} Normal Mode Stat`;
  }
  stattitle.innerHTML = title;
  stattitle.classList.add("stattitle");
  statcon.append(stattitle);
  let overalltypes = [
    "kills",
    "assists",
    "avgdmg",
    "kda",
    "damageDealt",
    "wins",
    "top10s",
    "roundsPlayed",
  ];
  let overallnames = [
    "KILL",
    "ASSIST",
    "ADR",
    "KDA",
    "DMG",
    "WIN",
    "TOP10",
    "MATCH",
  ];
  let overalldiv = document.createElement("div");
  let overall = document.createElement("div");
  overalldiv.classList.add("overallcon");
  overall.classList.add("overalltitle");
  overall.innerHTML = "OVERALL";
  overalldiv.append(overall);
  for (let i = 0; i < 2; i++) {
    let overallcontainer = document.createElement("div");
    overallcontainer.classList.add("overallcontainer");
    for (let j = 0; j < 4; j++) {
      let overalltype = document.createElement("div");
      let overallname = document.createElement("div");
      let overallstat = document.createElement("div");
      overalltype.classList.add("overalltype");
      overallname.classList.add("overallname");
      overallstat.classList.add("overallstat");
      overallname.innerHTML = overallnames[4 * i + j];
      overallstat.innerHTML = stat["total"][overalltypes[4 * i + j]];
      overalltype.append(overallname);
      overalltype.append(overallstat);
      overallcontainer.append(overalltype);
    }
    overalldiv.append(overallcontainer);
  }
  statcon.append(overalldiv);
  let subtitles = ["KILL", "KDA", "ADR", "WIN"];
  let stattypes = ["kills", "kda", "avgdmg", "wins"];
  let type = [
    ["SOLO", "DUO", "SQUAD"],
    ["SOLO-FPP", "DUO-FPP", "SQUAD-FPP"],
  ];
  for (let i = 0; i < 2; i++) {
    let statcontainer = document.createElement("div");
    statcontainer.classList.add("statcontainer");
    for (let j = 0; j < 3; j++) {
      let stattype = document.createElement("div");
      let statname = document.createElement("div");
      let detailcontainer = document.createElement("div");
      for (let k = 0; k < 4; k++) {
        let detailstat = document.createElement("div");
        let detailtype = document.createElement("div");
        let statvalue = document.createElement("div");
        detailstat.classList.add("detailstat");
        detailtype.classList.add("detailtype");
        statvalue.classList.add("statvalue");
        detailtype.innerHTML = subtitles[k];
        statvalue.innerHTML = stat[type[i][j].toLowerCase()][stattypes[k]];
        detailstat.append(detailtype);
        detailstat.append(statvalue);
        detailcontainer.append(detailstat);
      }
      detailcontainer.classList.add("flex");
      stattype.classList.add("stattype");
      statname.classList.add("statname");
      statname.innerHTML = `${type[i][j]}`;
      stattype.append(statname);
      stattype.append(detailcontainer);
      statcontainer.append(stattype);
    }
    statcon.append(statcontainer);
  }

  let seasonrender = `SEASON ${info["season"]}`;
  let canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  ctx.textAlign = "center";
  const background = new Image();
  background.src = "./ui/normal_background.png";
  background.onload = function () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.textAlign = "start";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "120px agency";
    ctx.fillText(info["ign"], canvas.width / 37, canvas.height / 8.5);
    ctx.textAlign = "center";
    ctx.font = "280px agency";
    ctx.fillText(info["season"], canvas.width / 8.2, canvas.height / 2.28);
    ctx.font = "55px agency";
    ctx.fillText(
      stat["total"]["kills"],
      canvas.width / 21,
      canvas.height / 1.32
    );
    ctx.fillText(
      stat["total"]["kda"],
      canvas.width / 8.2,
      canvas.height / 1.32
    );
    ctx.fillText(
      stat["total"]["avgdmg"],
      canvas.width / 5.25,
      canvas.height / 1.32
    );
    ctx.fillText(
      stat["total"]["wins"],
      canvas.width / 21,
      canvas.height / 1.11
    );
    ctx.fillText(
      stat["total"]["top10s"],
      canvas.width / 8.2,
      canvas.height / 1.11
    );
    ctx.fillText(
      stat["total"]["roundsPlayed"],
      canvas.width / 5.25,
      canvas.height / 1.11
    );
    ctx.fillText(
      stat["solo"]["kills"],
      canvas.width / 3.45,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["solo"]["kda"],
      canvas.width / 2.66,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["solo"]["avgdmg"],
      canvas.width / 2.11,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["solo"]["wins"],
      canvas.width / 1.755,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["duo"]["kills"],
      canvas.width / 3.45,
      canvas.height / 1.78
    );
    ctx.fillText(stat["duo"]["kda"], canvas.width / 2.66, canvas.height / 1.78);
    ctx.fillText(
      stat["duo"]["avgdmg"],
      canvas.width / 2.11,
      canvas.height / 1.78
    );
    ctx.fillText(
      stat["duo"]["wins"],
      canvas.width / 1.755,
      canvas.height / 1.78
    );
    ctx.fillText(
      stat["squad"]["kills"],
      canvas.width / 3.45,
      canvas.height / 1.2
    );
    ctx.fillText(
      stat["squad"]["kda"],
      canvas.width / 2.66,
      canvas.height / 1.2
    );
    ctx.fillText(
      stat["squad"]["avgdmg"],
      canvas.width / 2.11,
      canvas.height / 1.2
    );
    ctx.fillText(
      stat["squad"]["wins"],
      canvas.width / 1.755,
      canvas.height / 1.2
    );
    ctx.fillText(
      stat["solo-fpp"]["kills"],
      canvas.width / 1.5125,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["solo-fpp"]["kda"],
      canvas.width / 1.335,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["solo-fpp"]["avgdmg"],
      canvas.width / 1.182,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["solo-fpp"]["wins"],
      canvas.width / 1.063,
      canvas.height / 3.37
    );
    ctx.fillText(
      stat["duo-fpp"]["kills"],
      canvas.width / 1.5125,
      canvas.height / 1.78
    );
    ctx.fillText(
      stat["duo-fpp"]["kda"],
      canvas.width / 1.335,
      canvas.height / 1.78
    );
    ctx.fillText(
      stat["duo-fpp"]["avgdmg"],
      canvas.width / 1.182,
      canvas.height / 1.78
    );
    ctx.fillText(
      stat["duo-fpp"]["wins"],
      canvas.width / 1.063,
      canvas.height / 1.78
    );
    ctx.fillText(
      stat["squad-fpp"]["kills"],
      canvas.width / 1.5125,
      canvas.height / 1.2
    );
    ctx.fillText(
      stat["squad-fpp"]["kda"],
      canvas.width / 1.335,
      canvas.height / 1.2
    );
    ctx.fillText(
      stat["squad-fpp"]["avgdmg"],
      canvas.width / 1.182,
      canvas.height / 1.2
    );
    ctx.fillText(
      stat["squad-fpp"]["wins"],
      canvas.width / 1.063,
      canvas.height / 1.2
    );
  };
  let btn = document.createElement("div");
  let deletebtn = document.createElement("div");
  let btncon = document.createElement("div");
  deletebtn.innerHTML = "X";
  btn.innerHTML = "DOWNLOAD";
  btn.classList.add("downbtn");
  deletebtn.classList.add("deletebtn");
  btncon.append(btn);
  btncon.append(deletebtn);
  btncon.classList.add("flex");
  await statcon.append(canvas);
  await statcon.append(btncon);
  btn.addEventListener("click", () => {
    let a = document.createElement("a");
    a.download = `${info["ign"]} PUBG ${seasonrender} Normal Mode Stat.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
  deletebtn.addEventListener("click", () => {
    canvas.remove();
    btn.remove();
    deletebtn.remove();
  });
  alert("Completed! Scroll Down to Check Your Stat!");
}
async function render_ranked(info, stat) {
  let stattitle = document.createElement("div");
  let title = null;
  if (info["ign"][info["ign"].length - 1].toLowerCase() == "s") {
    title = `${info["ign"]}' PUBG Season ${info["season"]} Ranked Mode Stat`;
  } else {
    title = `${info["ign"]}'s PUBG Season ${info["season"]} Ranked Mode Stat`;
  }
  stattitle.innerHTML = title;
  stattitle.classList.add("stattitle");
  statcon.append(stattitle);
  let overalltypes = [
    "kills",
    "assists",
    "avgdmg",
    "kda",
    "damageDealt",
    "wins",
    "top10Ratio",
    "roundsPlayed",
  ];
  let overallnames = [
    "KILL",
    "ASSIST",
    "ADR",
    "KDA",
    "DMG",
    "WIN",
    "TOP10",
    "MATCH",
  ];
  let overalldiv = document.createElement("div");
  let overall = document.createElement("div");
  overalldiv.classList.add("overallcon");
  overall.classList.add("overalltitle");
  overall.innerHTML = "OVERALL";
  overalldiv.append(overall);
  for (let i = 0; i < 2; i++) {
    let overallcontainer = document.createElement("div");
    overallcontainer.classList.add("overallcontainer");
    for (let j = 0; j < 4; j++) {
      let overalltype = document.createElement("div");
      let overallname = document.createElement("div");
      let overallstat = document.createElement("div");
      overalltype.classList.add("overalltype");
      overallname.classList.add("overallname");
      overallstat.classList.add("overallstat");
      overallname.innerHTML = overallnames[4 * i + j];
      overallstat.innerHTML = stat["total"][overalltypes[4 * i + j]];
      overalltype.append(overallname);
      overalltype.append(overallstat);
      overallcontainer.append(overalltype);
    }
    overalldiv.append(overallcontainer);
  }
  statcon.append(overalldiv);
  let subtitles = ["KILL", "KDA", "ADR", "WIN"];
  let stattypes = ["kills", "kda", "avgdmg", "wins"];
  let type = [
    ["SOLO", "SQUAD"],
    ["SOLO-FPP", "SQUAD-FPP"],
  ];
  for (let i = 0; i < 2; i++) {
    let statcontainer = document.createElement("div");
    statcontainer.classList.add("statcontainer");
    for (let j = 0; j < 2; j++) {
      let stattype = document.createElement("div");
      let statname = document.createElement("div");
      let detailcontainer = document.createElement("div");
      for (let k = 0; k < 4; k++) {
        let detailstat = document.createElement("div");
        let detailtype = document.createElement("div");
        let statvalue = document.createElement("div");
        detailstat.classList.add("detailstat");
        detailtype.classList.add("detailtype");
        statvalue.classList.add("statvalue");
        detailtype.innerHTML = subtitles[k];
        statvalue.innerHTML = stat[type[i][j].toLowerCase()][stattypes[k]];
        detailstat.append(detailtype);
        detailstat.append(statvalue);
        detailcontainer.append(detailstat);
      }
      detailcontainer.classList.add("flex");
      stattype.classList.add("rankedstattype");
      statname.classList.add("statname");
      statname.innerHTML = `${type[i][j]}`;
      stattype.append(statname);
      stattype.append(detailcontainer);
      statcontainer.append(stattype);
    }
    statcon.append(statcontainer);
  }

  let seasonrender = `SEASON ${info["season"]}`;
  let canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  ctx.textAlign = "center";
  const background = new Image();
  background.src = "./ui/ranked_background.png";
  background.onload = function () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.textAlign = "start";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "120px agency";
    ctx.fillText(info["ign"], canvas.width / 37, canvas.height / 8.5);
    ctx.textAlign = "center";
    ctx.font = "280px agency";
    ctx.fillText(info["season"], canvas.width / 8.2, canvas.height / 2.28);
    ctx.textAlign = "start";
    ctx.font = "80px agency";
    ctx.fillText(
      stat["total"]["currentRankPoint"],
      canvas.width / 9,
      canvas.height / 1.4
    );
    ctx.font = "55px agency";
    ctx.textAlign = "center";
    ctx.fillText(
      stat["total"]["kills"],
      canvas.width / 17,
      canvas.height / 1.13
    );
    ctx.fillText(
      stat["total"]["kda"],
      canvas.width / 8.05,
      canvas.height / 1.13
    );
    ctx.fillText(
      stat["total"]["avgdmg"],
      canvas.width / 5.3,
      canvas.height / 1.13
    );
    ctx.fillText(
      stat["solo"]["kills"],
      canvas.width / 3.375,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["solo"]["kda"],
      canvas.width / 2.624,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["solo"]["avgdmg"],
      canvas.width / 2.114,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["solo"]["wins"],
      canvas.width / 1.775,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["squad"]["kills"],
      canvas.width / 3.375,
      canvas.height / 1.3
    );
    ctx.fillText(
      stat["squad"]["kda"],
      canvas.width / 2.624,
      canvas.height / 1.3
    );
    ctx.fillText(
      stat["squad"]["avgdmg"],
      canvas.width / 2.114,
      canvas.height / 1.3
    );
    ctx.fillText(
      stat["squad"]["wins"],
      canvas.width / 1.775,
      canvas.height / 1.3
    );
    ctx.fillText(
      stat["solo-fpp"]["kills"],
      canvas.width / 1.49,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["solo-fpp"]["kda"],
      canvas.width / 1.32,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["solo-fpp"]["avgdmg"],
      canvas.width / 1.1768,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["solo-fpp"]["wins"],
      canvas.width / 1.063,
      canvas.height / 2.65
    );
    ctx.fillText(
      stat["squad-fpp"]["kills"],
      canvas.width / 1.49,
      canvas.height / 1.3
    );
    ctx.fillText(
      stat["squad-fpp"]["kda"],
      canvas.width / 1.32,
      canvas.height / 1.3
    );
    ctx.fillText(
      stat["squad-fpp"]["avgdmg"],
      canvas.width / 1.1768,
      canvas.height / 1.3
    );
    ctx.fillText(
      stat["squad-fpp"]["wins"],
      canvas.width / 1.063,
      canvas.height / 1.3
    );
  };
  await statcon.append(canvas);
  let deletebtn = document.createElement("div");
  let btn = document.createElement("div");
  let btncon = document.createElement("div");
  deletebtn.innerHTML = "X";
  btn.innerHTML = "DOWNLOAD";
  btn.classList.add("downbtn");
  deletebtn.classList.add("deletebtn");
  btncon.append(btn);
  btncon.append(deletebtn);
  btncon.classList.add("flex");
  statcon.append(btncon);
  btn.addEventListener("click", () => {
    let a = document.createElement("a");
    a.download = `${info["ign"]} PUBG ${seasonrender} Lifetime Stat.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  });

  deletebtn.addEventListener("click", () => {
    canvas.remove();
    btn.remove();
    deletebtn.remove();
  });
  alert("Completed! Scroll Down to Check Your Stat!");
}
async function render_lifetime(info, stat) {
  let stattitle = document.createElement("div");
  let title = null;
  if (info["ign"][info["ign"].length - 1].toLowerCase() == "s") {
    title = `${info["ign"]}' PUBG Lifetime Stat`;
  } else {
    title = `${info["ign"]}'s PUBG Lifetime Stat`;
  }
  stattitle.innerHTML = title;
  stattitle.classList.add("stattitle");
  statcon.append(stattitle);
  let canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  ctx.textAlign = "center";
  const background = new Image();
  background.src = "./ui/lifetime_background.png";
  background.onload = function () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "start";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "120px agency";
    ctx.fillText(info["ign"], canvas.width / 37, canvas.height / 8.5);
    ctx.textAlign = "center";
    ctx.font = "75px agency";
    ctx.fillText(stat["kills"], canvas.width / 10.15, canvas.height / 2.34);
    ctx.fillText(
      stat["headshotKills"],
      canvas.width / 3.5,
      canvas.height / 2.34
    );
    ctx.fillText(
      stat["longestKill"],
      canvas.width / 2.03,
      canvas.height / 2.34
    );
    ctx.fillText(stat["dBNOs"], canvas.width / 1.445, canvas.height / 2.34);
    ctx.fillText(stat["assists"], canvas.width / 1.14, canvas.height / 2.34);
    ctx.fillText(
      Number(stat["damageDealt"]).toFixed(0),
      canvas.width / 10.15,
      canvas.height / 1.54
    );
    ctx.fillText(stat["avgdmg"], canvas.width / 3.5, canvas.height / 1.54);
    ctx.fillText(stat["kda"], canvas.width / 2.02, canvas.height / 1.54);
    ctx.fillText(stat["teamKills"], canvas.width / 1.445, canvas.height / 1.54);
    ctx.fillText(stat["wins"], canvas.width / 1.14, canvas.height / 1.54);
    ctx.fillText(
      stat["roundsPlayed"],
      canvas.width / 10.15,
      canvas.height / 1.15
    );
    ctx.fillText(
      stat["walkDistance"],
      canvas.width / 3.5,
      canvas.height / 1.15
    );
    ctx.fillText(
      stat["rideDistance"],
      canvas.width / 2.02,
      canvas.height / 1.15
    );
    ctx.fillText(
      stat["swimDistance"],
      canvas.width / 1.445,
      canvas.height / 1.15
    );
    ctx.fillText(
      stat["timeSurvived"],
      canvas.width / 1.14,
      canvas.height / 1.15
    );
  };
  let btn = document.createElement("div");
  let deletebtn = document.createElement("div");
  let btncon = document.createElement("div");
  deletebtn.innerHTML = "X";
  btn.innerHTML = "DOWNLOAD";
  btn.classList.add("downbtn");
  deletebtn.classList.add("deletebtn");
  btncon.append(btn);
  btncon.append(deletebtn);
  btncon.classList.add("flex");
  await statcon.append(canvas);
  await statcon.append(btncon);
  btn.addEventListener("click", () => {
    let a = document.createElement("a");
    a.download = `${info["ign"]} PUBG ${seasonrender} Lifetime Stat.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
  deletebtn.addEventListener("click", () => {
    canvas.remove();
    btn.remove();
    deletebtn.remove();
    stattitle.remove();
  });
  alert("Completed! Scroll Down to Check Your Stat!");
}
async function render_weapon(info, weapon) {
  let stattitle = document.createElement("div");
  let title = null;
  if (info["ign"][info["ign"].length - 1].toLowerCase() == "s") {
    title = `${info["ign"]}' PUBG Weapon Mastery Stat`;
  } else {
    title = `${info["ign"]}'s PUBG Weapon Mastery Stat`;
  }
  stattitle.innerHTML = title;
  stattitle.classList.add("stattitle");
  statcon.append(stattitle);
  let canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  ctx.textAlign = "center";

  const background = new Image();
  background.src = "./ui/weapon_background.png";
  background.onload = function () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.textAlign = "start";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "120px agency";
    ctx.fillText(info["ign"], canvas.width / 37, canvas.height / 8.5);
    ctx.font = "45px agency";
    ctx.textAlign = "start";
    ctx.fillStyle = "#262626";
    ctx.fillText(`${weapon[0][0]}`, canvas.width / 13, canvas.height / 4.59);
    ctx.fillText(`${weapon[1][0]}`, canvas.width / 13, canvas.height / 2.07);
    ctx.fillText(`${weapon[2][0]}`, canvas.width / 13, canvas.height / 1.345);
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "55px agency";
    ctx.fillText(
      weapon[0][1]["Kills"],
      canvas.width / 12.28,
      canvas.height / 3.3
    );
    ctx.fillText(
      weapon[0][1]["HeadShots"],
      canvas.width / 4.61,
      canvas.height / 3.3
    );
    ctx.fillText(
      weapon[0][1]["MostKillsInAGame"],
      canvas.width / 2.658,
      canvas.height / 3.3
    );
    ctx.fillText(
      weapon[0][1]["Defeats"],
      canvas.width / 1.858,
      canvas.height / 3.3
    );
    ctx.fillText(
      weapon[0][1]["DamagePlayer"],
      canvas.width / 1.398,
      canvas.height / 3.3
    );
    ctx.fillText(
      weapon[0][1]["accuracy"],
      canvas.width / 1.117,
      canvas.height / 3.3
    );
    ctx.fillText(
      weapon[1][1]["Kills"],
      canvas.width / 12.28,
      canvas.height / 1.75
    );
    ctx.fillText(
      weapon[1][1]["HeadShots"],
      canvas.width / 4.61,
      canvas.height / 1.75
    );
    ctx.fillText(
      weapon[1][1]["MostKillsInAGame"],
      canvas.width / 2.658,
      canvas.height / 1.75
    );
    ctx.fillText(
      weapon[1][1]["Defeats"],
      canvas.width / 1.858,
      canvas.height / 1.75
    );
    ctx.fillText(
      weapon[1][1]["DamagePlayer"],
      canvas.width / 1.398,
      canvas.height / 1.75
    );
    ctx.fillText(
      weapon[1][1]["accuracy"],
      canvas.width / 1.117,
      canvas.height / 1.75
    );
    ctx.fillText(
      weapon[2][1]["Kills"],
      canvas.width / 12.28,
      canvas.height / 1.2
    );
    ctx.fillText(
      weapon[2][1]["HeadShots"],
      canvas.width / 4.61,
      canvas.height / 1.2
    );
    ctx.fillText(
      weapon[2][1]["MostKillsInAGame"],
      canvas.width / 2.658,
      canvas.height / 1.2
    );
    ctx.fillText(
      weapon[2][1]["Defeats"],
      canvas.width / 1.858,
      canvas.height / 1.2
    );
    ctx.fillText(
      weapon[2][1]["DamagePlayer"],
      canvas.width / 1.398,
      canvas.height / 1.2
    );
    ctx.fillText(
      weapon[2][1]["accuracy"],
      canvas.width / 1.117,
      canvas.height / 1.2
    );
  };
  let btn = document.createElement("div");
  let deletebtn = document.createElement("div");
  let btncon = document.createElement("div");
  deletebtn.innerHTML = "X";
  btn.innerHTML = "DOWNLOAD";
  btn.classList.add("downbtn");
  deletebtn.classList.add("deletebtn");
  btncon.append(btn);
  btncon.append(deletebtn);
  btncon.classList.add("flex");
  await statcon.append(canvas);
  await statcon.append(btncon);
  btn.addEventListener("click", () => {
    let a = document.createElement("a");
    a.download = `${info["ign"]} PUBG ${seasonrender} Weapon Mastery Stat.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
  deletebtn.addEventListener("click", () => {
    canvas.remove();
    btn.remove();
    deletebtn.remove();
    stattitle.remove();
  });
  alert("Completed! Scroll Down to Check Your Stat!");
}
