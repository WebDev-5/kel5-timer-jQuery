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
  return "Total: " + hrs + " Hours " + mins + " Minutes " + secs + " Seconds ";
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
    "<div class='Notes'>" +
    "<button id='remove_btn' onclick='RemoveOne(" +
    Watch.id +
    ")'>X</button>" +
    "<button type='button' id='note_btn' data-toggle='modal' data-target='#notesModal' onclick='fillModal(" +
    Watch.id +
    ")'>" +
    " Notes" +
    "</button>" +
    "</div>" +
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
  continueTime = 0,
  notes = []
) {
  if (title == null)
    title = document.getElementById("title").value;

  this.id = idCounter;
  idCounter += 1;

  this.isRunning = isRunning; // 0 -> pause state 1 -> play state
  this.title = title;
  this.startTime = startTime;
  this.timeDelays = timeDelays;
  this.pauseTime = pauseTime;
  this.continueTime = continueTime;
  this.notes = notes;
}

//adds watch to DOM
function AddWatch(e) {
  e.preventDefault();

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
      else if (listStopWatch[i].isRunning == 1) {
        listStopWatch[i].pauseTime = Date.now();
        listStopWatch[i].isRunning = 0;
      }
    }
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

//function to add note to the watch's list and reload the modal
function AddNote(id) {
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      listStopWatch[i].notes.push(document.getElementById("newNote").value);
      fillModal(id);
      break;
    }
  }
}

//function to remove note from list when cross button in list items is pressed
function RemoveNote(elem, id, noteIndex) {
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      listStopWatch[i].notes.splice(noteIndex, 1);
      elem.outerHTML = "";
    }
  }
}

//function to fill the modal dynamically when a note button is called
function fillModal(id) {
  var watch = null;
  var retHtmlTitle = "";
  var retHtmlBody = "";
  var retHtmlFooter = "";

  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      watch = listStopWatch[i];
    }
  }

  if (watch == null) {
    console.log("error");
  }

  if (watch.isRunning == 0) {
    var lastOpened = watch.pauseTime;
  } else {
    var lastOpened = Date.now();
  }

  if (watch.startTime == 0) {
    var startTime2 = lastOpened;
  } else {
    var startTime2 = watch.startTime;
  }

  retHtmlTitle = watch.title;

  retHtmlBody =
    retHtmlBody +
    "<h2 class='text-center' + id='note" +
    watch.id +
    "'>" +
    GiveTimeString(lastOpened - startTime2 - watch.timeDelays) +
    "</h2>" +
    "<hr>";

  retHtmlBody += "<ul class='list-group'>";
  for (var i = 0; i < watch.notes.length; i++) {
    retHtmlBody +=
      "<li class='row list-group-item'>" +
      "<p class='col-md-11 list-item'>" +
      watch.notes[i] +
      "</p>" +
      "<span class='col-md-1 glyphicon glyphicon-remove pull-right' onclick='RemoveNote(this.parentNode, " +
      watch.id +
      ", " +
      i +
      ")'>" +
      "</span>" +
      "</li>";
  }
  retHtmlBody += "</ul>";

  retHtmlFooter +=
    "<div class='input-group'>" +
    "<input type='text' name='noteText' class='form-control' id='newNote' placeholder='Write Note' onKeyDown='if(event.which==13) AddNote(" +
    watch.id +
    ")' />" +
    "<span class='input-group-btn'>" +
    "<button id='add_note' onclick='AddNote(" +
    watch.id +
    ")' class='form-control btn btn-primary'><span class='glyphicon glyphicon-plus'></span> Add Note </button>" +
    "</span>" +
    "</div>";

  $("#notesModalTitle").html(retHtmlTitle);
  $("#notesModalBody").html(retHtmlBody);
  $("#notesModalFooter").html(retHtmlFooter);
}

//clocks get updated each second because of this
setInterval(updateClocks, 1000);

//store the list of stopwatches in the cookie so that reloading the page does not cause data to loss
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();

  // set stopwatch to local storage
  localStorage.setItem("myCookie", JSON.stringify(listStopWatch));

  // remove stopwatch in database
  fetch('http://localhost:8000/timer', {
    method: "DELETE",
  })
    .then((res) => {
      localStorage.setItem("message", res);
    })
    .catch((err) => {
      localStorage.setItem("message", err);
    })

  // add stopwatch to database
  const stopwatch = listStopWatch[0];
  const data = {
    id_timer: stopwatch.id,
    status: stopwatch.isRunning,
    title: stopwatch.title,
    start_time: stopwatch.startTime,
    last_pause: stopwatch.pauseTime,
    delays: stopwatch.timeDelays,
    last_continue: stopwatch.continueTime
  }

  fetch('http://localhost:8000/timer', {
    method: "POST",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      localStorage.setItem("message", res);
    })
    .catch((err) => {
      localStorage.setItem("message", err);
    })
});

//load the list of stopwatches in listStopWatch and attach them to html is list is present in cookie.
window.onload = async function (e) {
  e = e || window.event;

  localStorage.setItem('lastOpened', Date.now());

  try {
    var res = await fetch('http://localhost:8000/timer');
    res = await res.json();

    console.log(res);
  } catch (e) {
    console.log(e);
  }

  var X = res;
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
