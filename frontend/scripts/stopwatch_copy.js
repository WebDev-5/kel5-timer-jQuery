//globals
var listStopWatch = [];
var idCounter = 1; //gives id to the watch object

// axios.delete('http://localhost:8000/timer');

/* axios.post('http://localhost:8000/timer', {
      "status": 0,
      "title": 'Timer Hiji',
      "start_time": 0,
      "last_pause": 0,
      "delays": 0,
      "last_continue": 0
 });
	
axios.post('http://localhost:8000/timer', {
      "status": 0,
      "title": 'Timer Dua',
      "start_time": 0,
      "last_pause": 0,
      "delays": 0,
      "last_continue": 0
 }); */

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
  var pausePlayButtonStr = function (status) {
    if (status == 1) {
      return (
        "<button id='pause_btn" + Watch.id + "' onclick='PausePlayToggle(this, " +
        Watch.id +
        ")' style='background: orange; width: 160px;'>Pause</button>"
      );
    }
    else {
      return (
        "<button id='start_btn" + Watch.id + "' onclick='PausePlayToggle(this, " +
        Watch.id +
        ")' style='background: #5CDB95; width: 160px;'>Play</button>"
      );
    }
  };
  if (Watch.status == 0) {
    var lastOpened = Watch.last_pause;
  } else {
    var lastOpened = Date.now();
  }
  if (Watch.start_time == 0) {
    var start_time2 = lastOpened;
  } else {
    var start_time2 = Watch.start_time;
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

    "<button id='note_btn' data-toggle='modal' data-target='#notesModal' onclick='fillModal(" +
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
    GiveTimeString(lastOpened - start_time2 - Watch.delays) +
    "</h2>" +
    "<h2 class='total_jam' + id='total_jam" +
    Watch.id +
    "'>" +
    GiveTimeStringTotal(lastOpened - start_time2 - Watch.delays) +
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
  start_time = 0,
  delays = 0,
  last_pause = 0,
  last_continue = 0,
  notes = []
) {
  if (title == null) title = document.getElementById("title").value;
  this.id = idCounter;
  idCounter += 1;
  this.status = status; // 0 -> pause state 1 -> play state
  this.title = title;
  this.start_time = start_time;
  this.delays = delays;
  this.last_pause = last_pause;
  this.last_continue = last_continue;
  this.notes = notes;
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
      if (listStopWatch[i].status == 1) {
        listStopWatch[i].start_time = Date.now();
      } else {
        listStopWatch[i].start_time = 0;
      }
      listStopWatch[i].last_pause = 0;
      listStopWatch[i].last_continue = 0;
      listStopWatch[i].delays = 0;
      document.getElementById("watch" + id).innerHTML = GiveTimeString(0);
    }
  }
}

//stop the time for one clock
function StopClock(id) {
  try {
    document.querySelector("#pause_btn" + id).innerHTML = "Play";
    document.querySelector("#pause_btn" + id).setAttribute('style', "background: #5CDB95; width: 160px;");
    document.querySelector("#pause_btn" + id).setAttribute('id', "start_btn" + id);
  } catch (err) {
  }
  for (var i = 0; i < listStopWatch.length; i++) {
    if (listStopWatch[i].id == id) {
      listStopWatch[i].start_time = 0;
      document.querySelector("#watch" + id).innerHTML = GiveTimeString(0);
      document.querySelector("#total_jam" + id).style.color = 'white';
      listStopWatch[i].status = 0;
      listStopWatch[i].delays = 0;
      listStopWatch[i].last_pause = 0;
      listStopWatch[i].last_continue = 0;
      StopWatchBody(listStopWatch[i].id);
    }
  }
}

//for pause and play
function PausePlayToggle(elem, id) {
  if (elem.innerHTML == "Pause") {
    document.querySelector("#pause_btn" + id).setAttribute('style', "background: #5CDB95; width: 160px;");
    document.querySelector("#pause_btn" + id).setAttribute('id', "start_btn" + id);
    document.querySelector("#start_btn" + id).innerHTML = "Play";
    for (var i = 0; i < listStopWatch.length; i++) {
      if (listStopWatch[i].id == id) {
        listStopWatch[i].status = 0;
        listStopWatch[i].last_pause = Date.now();
      }
    }
  } else if (elem.innerHTML == "Play") {
    document.querySelector("#total_jam" + id).style.color = '#63B4B8';
    document.querySelector("#start_btn" + id).setAttribute('style', "background: orange; width: 160px;");
    document.querySelector("#start_btn" + id).setAttribute('id', "pause_btn" + id);
    document.querySelector("#pause_btn" + id).innerHTML = "Pause";
    for (var i = 0; i < listStopWatch.length; i++) {
      if (listStopWatch[i].id == id) {
        listStopWatch[i].status = 1;
        if (listStopWatch[i].start_time == 0) {
          listStopWatch[i].start_time = Date.now();
          listStopWatch[i].delays = 0;
          listStopWatch[i].last_pause = 0;
          listStopWatch[i].last_continue = 0;
        } else {
          listStopWatch[i].last_continue = Date.now();
          listStopWatch[i].delays = listStopWatch[i].delays + (listStopWatch[i].last_continue - listStopWatch[i].last_pause)
        }
      }
      else if (listStopWatch[i].status == 1 && listStopWatch[i].id != id) {
        listStopWatch[i].last_pause = Date.now();
        listStopWatch[i].status = 0;
        document.querySelector("#pause_btn" + listStopWatch[i].id).innerHTML = "Play";
        document.querySelector("#pause_btn" + listStopWatch[i].id).setAttribute('style', "background: #5CDB95; width: 160px;");
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
    if (listStopWatch[i].status !== 0) {
      var tempId = "watch" + listStopWatch[i].id;
      var tempTotal = "total_jam" + listStopWatch[i].id;
      var tempModalId = "note" + listStopWatch[i].id;
      document.getElementById(tempId).innerHTML = GiveTimeString(
        Date.now() - listStopWatch[i].start_time - listStopWatch[i].delays
      );
      document.getElementById(tempTotal).innerHTML = GiveTimeStringTotal(
        Date.now() - listStopWatch[i].start_time - listStopWatch[i].delays
      );
      if (document.getElementById(tempModalId) !== null) {
        document.getElementById(tempModalId).innerHTML = GiveTimeString(
          Date.now() - listStopWatch[i].start_time - listStopWatch[i].delays
        );
        document.getElementById(tempTotal).innerHTML = GiveTimeStringTotal(
          Date.now() - listStopWatch[i].start_time - listStopWatch[i].delays
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

  if (watch.status == 0) {
    var lastOpened = watch.last_pause;
  } else {
    var lastOpened = Date.now();
  }

  if (watch.start_time == 0) {
    var start_time2 = lastOpened;
  } else {
    var start_time2 = watch.start_time;
  }

  retHtmlTitle = watch.title;

  retHtmlBody =
    retHtmlBody +
    "<h2 class='text-center' + id='note" +
    watch.id +
    "'>" +
    GiveTimeString(lastOpened - start_time2 - watch.delays) +
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

// //store the list of stopwatches in the cookie so that reloading the page does not cause data to loss
// window.onbeforeunload = function (e) {
//   e = e || window.event;
//   localStorage.setItem("myCookie", JSON.stringify(listStopWatch));
// };

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

//store the list of stopwatches in the cookie so that reloading the page does not cause data to loss
window.onbeforeunload = function (e) {
  e = e || window.event;
  localStorage.setItem("myCookie", JSON.stringify(listStopWatch));
  // axios.delete('http://localhost:8000/timer');
  
  // for (let i = 0; i < listStopWatch.length; i++) {
  //   axios.post('http://localhost:8000/timer', {
  //     "status": listStopWatch[i].status,
  //     "title": listStopWatch[i].title,
  //     "start_time": listStopWatch[i].start_time,
  //     "last_pause": listStopWatch[i].last_pause,
  //     "delays": listStopWatch[i].delays,
  //     "last_continue": listStopWatch[i].last_continue
  //   });
  // }
};

window.onload = function (e) {
  e = e || window.event;
  localStorage.setItem('lastOpened', Date.now());

  var fromDB;

  // Get data from database
  axios.get('http://localhost:8000/timer')
    .then(function (response) {
      // save data from db to localstorage
      localStorage.setItem("cookieRes", JSON.stringify(response.data));
      fromDB = response.data;
	    console.log("DB Timer", fromDB);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
	
  var myCook = JSON.parse(localStorage.getItem("myCookie"));
  var DB = JSON.parse(localStorage.getItem("cookieRes"));

  console.log("Cookie\n" + JSON.stringify(myCook));
  console.log("From DB\n" + JSON.stringify(DB));
	
  for (var i = 0; i < DB.length; i++) {
    listStopWatch[listStopWatch.length] = new Watch(
      DB[i].status,
      DB[i].title,
      DB[i].start_time,
      DB[i].delays,
      DB[i].last_pause,
      DB[i].last_continue,
      //X[i].notes
	    []
  );
    console.log("Stopwatch\n", JSON.stringify(listStopWatch));
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