//globals
var listStopWatch = [];
var idCounter = 1; //gives id to the watch object

//given time in seconds returns a string in format hh:mm:ss
function GiveTimeString(theMilliseconds) {
  var secs = Math.floor(theMilliseconds / 1000);
  var mins = Math.floor(secs / 60) % 60;
  var hrs = Math.floor(secs / 3600);
  secs = secs % 60
  if (hrs < 10) hrs = "0" + hrs;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  return hrs + ":" + mins + ":" + secs;
}

//given time total returns a string in format hh:mm:ss
function GiveTimeStringTotal(theMilliseconds) {
  var secs = Math.floor(theMilliseconds / 1000);
  return "Total: "
    + Math.floor(secs / 3600) + " Hours "
    + Math.floor(secs / 60) % 60 + " Minutes "
    + secs % 60 + " Seconds ";
}

//returns html body for the watch
function StopWatchBody(Watch) {
  var pausePlayButtonStr = function (isRunning) {
    if (isRunning == 1) {
      return (
        "<button id='pause_btn" + Watch.id + "' onclick='PausePlayToggle(this, " +
        Watch.id +
        ")' style='background: orange; width: 172px;'>Pause</button>"
      );
    }
    else {
      return (
        "<button id='start_btn" + Watch.id + "' onclick='PausePlayToggle(this, " +
        Watch.id +
        ")' style='background: #5CDB95; width: 172px;'>Play</button>"
      );
    }
  };
  if (Watch.isRunning == 0) {
    var lastOpened = Watch.pauseTime;
  } else {
    var lastOpened = Date.now();
  }
  if (Watch.startTime == 0) {
    var startTime2 = lastOpened;
  } else {
    var startTime2 = Watch.startTime;
  }
  var retStr =
    "<div class='bodyTimer' id='" +
    Watch.id +
    "'>" +
    "<div class='head'>" +
    "<div class='row'>" +
    "<div class='Title'>" +
    "<h3 class='panel-title'>" +
    Watch.title +
    "</h3>" +
    "</div>" +
    "<button id='remove_btn' onclick='RemoveOne(" +
    Watch.id +
    ")'>X</button>" +
    "</div>" +
    "</div>" +
    "<div class='body'>" +
    "<h2 class='jam' + id='watch" +
    Watch.id +
    "'>" +
    GiveTimeString(lastOpened - startTime2 - Watch.timeDelays) +
    "</h2>" +
    "<h2 class='total_jam' + id='total_jam" +
    Watch.id +
    "'>" +
    GiveTimeStringTotal(lastOpened - startTime2 - Watch.timeDelays) +
    "</h2>" +
    "</div>" +
    "<div class='footer'>" +
    "<div class='btn-group btn-group-justified'>" +
    pausePlayButtonStr(Watch.isRunning) +
    "<button id='restart_btn' onclick='RestartClock(" +
    Watch.id +
    ")'>Restart</button>" +
    "<button id='remove_btn1' onclick='StopClock(" +
    Watch.id +
    ")'>Stop</button>" +
    "<!/div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  return retStr;
}

//creates a watch object
function Watch(
  isRunning = 0,
  title,
  startTime = 0,
  timeDelays = 0,
  pauseTime = 0,
  continueTime = 0
) {
  if (title == null) title = document.getElementById("title").value;
  this.id = idCounter;
  idCounter += 1;
  this.isRunning = isRunning; // 0 -> pause state 1 -> play state
  this.title = title;
  this.startTime = startTime;
  this.timeDelays = timeDelays;
  this.pauseTime = pauseTime;
  this.continueTime = continueTime;
}

//adds watch to DOM
function AddWatch() {
  listStopWatch[listStopWatch.length] = new Watch();
  document.getElementById("#stopwatches").append(
    StopWatchBody(listStopWatch[listStopWatch.length - 1])
  );
  document.getElementById("title").value = "";
}

//removes a single clock when called
function RemoveOne(id) {
  document.getElementById(id).outerHTML = "";
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      listStopWatch.splice(i, 1);
      break;
    }
  }
}

//restarts the time for one clock
function RestartClock(id) {
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      if (listStopWatch[i].isRunning == 1) {
        listStopWatch[i].startTime = Date.now();
      } else {
        listStopWatch[i].startTime = 0;
      }
      listStopWatch[i].pauseTime = 0;
      listStopWatch[i].continueTime = 0;
      listStopWatch[i].timeDelays = 0;
      document.getElementById("watch" + id).innerHTML = GiveTimeString(0);
    }
  }
}

//stop the time for one clock
function StopClock(id) {
  try {
    document.querySelector("#pause_btn" + id).innerHTML = "Play";
    document.querySelector("#pause_btn" + id).setAttribute('style', "background: #5CDB95; width: 172px;");
    document.querySelector("#pause_btn" + id).setAttribute('id', "start_btn" + id);
  } catch (err) {
  }
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      listStopWatch[i].startTime = 0;
      document.querySelector("#watch" + id).innerHTML = GiveTimeString(0);
      document.querySelector("#total_jam" + id).style.color = 'white';
      listStopWatch[i].isRunning = 0;
      listStopWatch[i].timeDelays = 0;
      listStopWatch[i].pauseTime = 0;
      listStopWatch[i].continueTime = 0;
      StopWatchBody(listStopWatch[i].id);
    }
  }
}

//for pause and play
function PausePlayToggle(elem, id) {
  if (elem.innerHTML == "Pause") {
    document.querySelector("#pause_btn" + id).setAttribute('style', "background: #5CDB95; width: 172px;");
    document.querySelector("#pause_btn" + id).setAttribute('id', "start_btn" + id);
    document.querySelector("#start_btn" + id).innerHTML = "Play";
    for (var i = 0; i < listStopWatch.length; i++) {
      if (listStopWatch[i].id == id) {
        listStopWatch[i].isRunning = 0;
        listStopWatch[i].pauseTime = Date.now();
      }
    }
  } else if (elem.innerHTML == "Play") {
    document.querySelector("#total_jam" + id).style.color = '#63B4B8';
    document.querySelector("#start_btn" + id).setAttribute('style', "background: orange; width: 172px;");
    document.querySelector("#start_btn" + id).setAttribute('id', "pause_btn" + id);
    document.querySelector("#pause_btn" + id).innerHTML = "Pause";
    for (var i = 0; i < listStopWatch.length; i++) {
      if (listStopWatch[i].id == id) {
        listStopWatch[i].isRunning = 1;
        if (listStopWatch[i].startTime == 0) {
          listStopWatch[i].startTime = Date.now();
          listStopWatch[i].timeDelays = 0;
          listStopWatch[i].pauseTime = 0;
          listStopWatch[i].continueTime = 0;
        } else {
          listStopWatch[i].continueTime = Date.now();
          listStopWatch[i].timeDelays = listStopWatch[i].timeDelays + (listStopWatch[i].continueTime - listStopWatch[i].pauseTime)
        }
      }
      else if (listStopWatch[i].isRunning == 1 && listStopWatch[i].id != id) {
        listStopWatch[i].pauseTime = Date.now();
        listStopWatch[i].isRunning = 0;
        document.querySelector("#pause_btn" + listStopWatch[i].id).innerHTML = "Play";
        document.querySelector("#pause_btn" + listStopWatch[i].id).setAttribute('style', "background: #5CDB95; width: 172px;");
        document.querySelector("#pause_btn" + listStopWatch[i].id).setAttribute('id', "start_btn" + listStopWatch[i].id);
      }
    }
  }
}

//removes all clocks
function RemoveAll() {
  localStorage.clear();
  listStopWatch = [];
  idCounter = 1;
  document.getElementById("#stopwatches").html("");
}

//updates the time in clocks
function updateClocks() {
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].isRunning !== 0) {
      var tempId = "watch" + listStopWatch[i].id;
      var tempTotal = "total_jam" + listStopWatch[i].id;
      var tempModalId = "note" + listStopWatch[i].id;
      document.getElementById(tempId).innerHTML = GiveTimeString(
        Date.now() - listStopWatch[i].startTime - listStopWatch[i].timeDelays
      );
      document.getElementById(tempTotal).innerHTML = GiveTimeStringTotal(
        Date.now() - listStopWatch[i].startTime - listStopWatch[i].timeDelays
      );
      if (document.getElementById(tempModalId) !== null) {
        document.getElementById(tempModalId).innerHTML = GiveTimeString(
          Date.now() - listStopWatch[i].startTime - listStopWatch[i].timeDelays
        );
        document.getElementById(tempTotal).innerHTML = GiveTimeStringTotal(
          Date.now() - listStopWatch[i].startTime - listStopWatch[i].timeDelays
        );
      }
    }
  }
}

//clocks get updated each second because of this
setInterval(updateClocks, 1000);

//store the list of stopwatches in the cookie so that reloading the page does not cause data to loss
window.onbeforeunload = function (e) {
  e = e || window.event;
  localStorage.setItem("myCookie", JSON.stringify(listStopWatch));
};

window.onload = function (e) {
  e = e || window.event;
  localStorage.setItem('lastOpened', Date.now());
  var X = JSON.parse(localStorage.getItem("myCookie"));
  for (var i = 0; i < X.length; i++) {
    listStopWatch[listStopWatch.length] = new Watch(
      X[i].isRunning,
      X[i].title,
      X[i].startTime,
      X[i].timeDelays,
      X[i].pauseTime,
      X[i].continueTime
    );
    document.querySelector("#stopwatches").insertAdjacentHTML('afterend', StopWatchBody(listStopWatch[listStopWatch.length - 1]));
  }
};

function detectEnter(event) {
  event = event || window.event;
  if (event.keyCode == 13) {
    AddWatch();
  }
}

//Set event listeners for each target.

var addWatchButton = document.getElementById("addWatch-btn");
addWatchButton.addEventListener("click", AddWatch);

var removeAllButton = document.getElementById("removeAll_btn");
removeAllButton.addEventListener("click", RemoveAll);