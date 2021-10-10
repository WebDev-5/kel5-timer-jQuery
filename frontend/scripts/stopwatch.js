//globals
var listStopWatch = [];
var idCounter = 1; //gives id to the watch object


//given time in seconds returns a string in format hh:mm:ss
function GiveTimeString(remSeconds) {
  var secs = remSeconds % 60;
  remSeconds = remSeconds - secs;
  var mins = (remSeconds / 60) % 60;
  remSeconds = remSeconds / 60 - mins;
  var hrs = remSeconds / 60;
  if (hrs < 10) hrs = "0" + hrs;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  return hrs + ":" + mins + ":" + secs;
}

//returns html body for the watch
function StopWatchBody(Watch) {
  var pausePlayButtonStr = function (status) {
    if (status == 1) {
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
    GiveTimeString(Watch.curTime - Watch.startTime) +
    "</h2>" +
    "<h2 class='total_jam' + id='watch" +
    Watch.id +
    "'>" +
    "Total : " + GiveTimeString(Watch.curTime - Watch.startTime) +
    "</h2>" +
    "</div>" +
    "<div class='footer'>" +
    "<div class='btn-group btn-group-justified'>" +
    pausePlayButtonStr(Watch.status) +
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
  status = 0,
  title,
  startTime = Date.now(),
  curTime = Date.now()
) {
  if (title == null) title = document.getElementById("title").value;
  this.id = idCounter;
  idCounter = idCounter + 1;
  this.status = status; // 0 -> pause state 1 -> play state
  this.title = title;
  this.startTime = startTime;
  this.curTime = curTime;
}

//adds watch to DOM
function AddWatch() {
  listStopWatch[listStopWatch.length] = new Watch();
  $("#stopwatches").append(
    StopWatchBody(listStopWatch[listStopWatch.length - 1])
  );
  document.getElementById("title").value = "";
}

function ShowList() {
  console.log(listStopWatch);
  // for(var i = 0; i < listStopWatch.length; i++) {
  // 	console.log(listStopWatch[i].title);
  // }
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
      listStopWatch[i].startTime = Date.now();
      listStopWatch[i].curTime = Date.now();
      document.getElementById("watch" + id).innerHTML = GiveTimeString(0);
    }
  }
}

function StopClock(id) {
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      listStopWatch[i].startTime = Date.now();
      listStopWatch[i].curTime = Date.now();
      listStopWatch[i].status = 0;
      StopWatchBody(listStopWatch[i].id);
      location.reload();
      showTotal(total);
      document.getElementById("watch" + id).innerHTML = GiveTimeString(0);
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
        listStopWatch[i].status = 0;
      }
    }
  } else if (elem.innerHTML == "Play") {
    elem.outerHTML =
      "<button id='pause_btn' onclick='PausePlayToggle(this, " +
      id +
      ")'>Pause</button>";
    for (var i = 0; i < listStopWatch.length; i++) {
      if (listStopWatch[i].id == id) {
        listStopWatch[i].status = 1;
      }
      else {
        listStopWatch[i].status = 0;
      }
    }
    location.reload();
  }
}

//removes all clocks
function RemoveAll() {
  listStopWatch = [];
  idCounter = 1;
  $("#stopwatches").html("");
}

//updates the time in clocks
function updateClocks() {
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].status !== 0) {
      listStopWatch[i].curTime += 1;
      var tempId = "watch" + listStopWatch[i].id;
      var tempModalId = "note" + listStopWatch[i].id;
      document.getElementById(tempId).innerHTML = GiveTimeString(
        listStopWatch[i].curTime - listStopWatch[i].startTime
      );
      if (document.getElementById(tempModalId) !== null) {
        document.getElementById(tempModalId).innerHTML = GiveTimeString(
          listStopWatch[i].curTime - listStopWatch[i].startTime
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
  var X = JSON.parse(localStorage.getItem("myCookie"));
  for (var i = 0; i < X.length; i++) {
    listStopWatch[listStopWatch.length] = new Watch(
      X[i].status,
      X[i].title,
      X[i].startTime,
      X[i].curTime
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
console.log(addWatchButton.textContent)

var removeAllButton = document.getElementById("removeAll_btn");
removeAllButton.addEventListener("click", RemoveAll);
console.log(removeAllButton.textContent);

const total = document.querySelector('#total_jam');
function showTotal(Total) {
  Total.style.display = "block";
}
function hideTotal(Total) {
  Total.style.display = "none";
}
