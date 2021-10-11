//globals
var listStopWatch = [];
var idCounter = 1; //gives id to the watch object

//given time in seconds returns a string in format hh:mm:ss
function GiveTimeString(theMilliseconds) {
  var secs = Math.floor(theMilliseconds / 1000);
  var mins = Math.floor(secs / 60);
  var hrs = Math.floor(secs / 3600);
  secs = secs % 60
  if (hrs < 10) hrs = "0" + hrs;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  return hrs + ":" + mins + ":" + secs;
}

function GiveTimeStringTotal(theMilliseconds) {
  var secs = Math.floor(theMilliseconds / 1000);
  var mins = Math.floor(secs / 60);
  var hrs = Math.floor(secs / 3600);
  secs = secs % 60
  if (hrs < 10) hrs = hrs;
  if (mins < 10) mins = mins;
  if (secs < 10) secs = secs;
  return "Total: " + hrs +" Hours " + mins +" Minutes " + secs +" Seconds ";
}

//returns html body for the watch
function StopWatchBody(Watch) {
  var pausePlayButtonStr = function (isRunning) {
    if (isRunning == 1) {
      return (
        "<button id='pause_btn' onclick='PausePlayToggle(this, " +
        Watch.id +
        ")'>Pause</button>"
      );
    }
    else {
      return (
        "<button id='start_btn' onclick='PausePlayToggle(this, " +
        Watch.id +
        ")'>Play</button>"
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
  $("#stopwatches").append(
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

function StopClock(id) {
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      listStopWatch[i].isRunning = 0;
      listStopWatch[i].startTime = 0;
      document.getElementById("watch" + id).innerHTML = GiveTimeString(0);
      document.getElementById("total_jam" + id).style.color = 'white';
      showTotal(total);
      listStopWatch[i].timeDelays = 0;
      listStopWatch[i].pauseTime = 0;
      listStopWatch[i].continueTime = 0;
      StopWatchBody(listStopWatch[i].id);
      location.reload();
    }
  }
}

//for pause play
function PausePlayToggle(elem, id) {
  if (elem.innerHTML == "Pause") {
    elem.outerHTML =
      "<button id='start_btn' onclick='PausePlayToggle(this, " +
      id +
      ")'>Play</button>";
    for (var i = 0; i < listStopWatch.length; i++) {
      if (listStopWatch[i].id == id) {
        listStopWatch[i].isRunning = 0;
        listStopWatch[i].pauseTime = Date.now();
      }
    }
  } else if (elem.innerHTML == "Play") {
    elem.outerHTML =
      "<button id='pause_btn' onclick='PausePlayToggle(this, " +
      id +
      ")'>Pause</button>";
    for (var i = 0; i < listStopWatch.length; i++) {
      if (listStopWatch[i].id == id) {
        listStopWatch[i].isRunning = 1;
        if (listStopWatch[i].startTime == 0) {//pertamakali
          listStopWatch[i].startTime = Date.now();
          listStopWatch[i].timeDelays = 0;
          listStopWatch[i].pauseTime = 0;
          listStopWatch[i].continueTime = 0;
        } else {
          listStopWatch[i].continueTime = Date.now();
          listStopWatch[i].timeDelays = listStopWatch[i].timeDelays + (listStopWatch[i].continueTime - listStopWatch[i].pauseTime)
        }
      }
      else if(listStopWatch[i].isRunning == 1){
          listStopWatch[i].pauseTime = Date.now();
          listStopWatch[i].isRunning = 0;  
      }
    }
    location.reload();
  }
}

//removes all clocks
function RemoveAll() {
  localStorage.clear();
  listStopWatch = [];
  idCounter = 1;
  $("#stopwatches").html("");
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

//load the list of stopwatches in listStopWatch and attach them to html is list is present in cookie.
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
    $("#stopwatches").append(
      StopWatchBody(listStopWatch[listStopWatch.length - 1])
    );
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

const total = document.querySelector('#total_jam');

function showTotal(Total) {
  Total.style.display = "block";
}
function hideTotal(Total) {
  Total.style.display = "none";
}
