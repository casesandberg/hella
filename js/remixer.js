window.Remixer = (function() {

  function Remixer() {
    this.apiKey = "FPLTBQBYRKMKVH6BL";
    this.songs = new Array();
    this.remixed = new Array();
    this.dict = {};
    this.init();
  };

// Initialize the environment (the Remixer and Player).

  Remixer.prototype.init = function() {
    if (window.webkitAudioContext == undefined) {
      error("Your browser is wack. Upgrade to Chrome.");
      return;
    };
    this.initRemixer();
    this.initPlayer();
    this.initPlayOnClick();
  };

  Remixer.prototype.initRemixer = function() {
    var context = new webkitAudioContext();
    this.remixer = createJRemixer(context, $, this.apiKey);
    console.log("Remixer initialized.");
  };

  Remixer.prototype.initPlayer = function() {
    this.player = this.remixer.getPlayer();
    console.log("Player initialized.");
  };

  Remixer.prototype.loadInitialBars = function() {

  };

// Add a new track to the remixer.

  Remixer.prototype.addTrack = function(trackID, trackURL) {
    var that = this;
    this.remixer.remixTrackById(trackID, trackURL, function(t, percent) {
      var track = t;

      $("#info").text(percent + "% of the track loaded");

      if (percent < 100) {
        console.log("Songs being analyzed.");
      }
  
      if (percent == 100) {
        $("#info").text(percent + "% of the track loaded, remixing...");
      }

      if (track.status == "ok") {
        that.songs.push(track);
        console.log("Track analyzed! Song Added.");
        return;
      }
    })
  };

// Generate a remix from the songs.

  Remixer.prototype.randomSong = function() {
    var that = this;
    var remixed = this.remixed;
    var numberOfBeats = _.min(this.songs, function(song, index) {
      return song.analysis.beats.length;
    }).analysis.beats.length;

    for (var i = 0; i < numberOfBeats; i++) {
      if (i % 4 == 0 || i % 4 == 2) {
        remixed.push(this.songs[0].analysis.beats[i]);
      } else if (i % 4 == 1 || i % 4 == 3) {
        remixed.push(this.songs[1].analysis.beats[i]);
      }
    }

    return this.remixed;

  };

// Loads the initial beat list items to interact with on the DOM.

  Remixer.prototype.loadBeatLis = function() {
    var song1 = this.songs[0];
    var song2 = this.songs[1];

    song1_len = song1.analysis.bars.length;
    song2_len = song2.analysis.bars.length;

    for (var songNum = 1; songNum < 3; songNum++) {
      for (var beatIdx = 32; beatIdx < 44; beatIdx++) {
        this.appendBeat(songNum, beatIdx);
      }
      this.setListCallbacks(songNum);
    }

    draggin();
    return this.remixed;
  };

// Play the remixed song.

  Remixer.prototype.play = function() {
    this.player.stop();
    this.player.play(0, this.remixed);
  };

// Pause the song currently playing.

  Remixer.prototype.pause = function() {
    this.player.stop();
  };

// Play only a single beat.

  Remixer.prototype.playSnippet = function(snippet) {
    var snippetArr = snippet;
    this.player.play(0, snippet);
  };

// Load some initial bars.

  Remixer.prototype.loadBars = function(song, limit) {
    var barsArr = new Array();
    var iter = Math.floor(song.analysis.bars.length/limit);

    for(var i = 0; i < limit; i++) {
      barsArr.push(song.analysis.bars[i * iter]);
    }

    return barsArr;
  };

// Load some initial beats.

  Remixer.prototype.loadBeats = function(song, limit) {
    var beatsArr = new Array();
    var barIter = Math.ceil(limit / 4);


    for (var i = 0; i < limit; i+=barIter){
      for (var j = 0; j < 4; j++){
        beatsArr.push(song.analysis.beats[i + j]);
      } 
    }

    return beatsArr;   
  };

  // View Logic

  Remixer.prototype.initPlayOnClick = function() {
    var that = this;
    $("#play").click(function() {
      that.remixed = new Array();
      $("#song-list li").each(function(idx, item) {
        var beatKey = $(item).attr('remix-item');
        var beat = that.dict[beatKey];
        that.remixed.push(beat);
      });
    that.play();
    });
  };

  Remixer.prototype.appendBeat = function(songNum, beatIndex) {
    var key = 'track' + songNum + '_bar' + beatIndex;
    var song = this.songs[songNum - 1];
    this.dict[key] = song.analysis.beats[beatIndex];
    var $beatLi = this.$liEl(songNum, beatIndex);
    var $songUl = $("#song-" + songNum + " ul");
    $songUl.append($beatLi);
  }

  Remixer.prototype.$liEl = function(songNum, beatIndex) {
    var key = 'track' + songNum + '_bar' + beatIndex;
    var $beatLi = $('<li></li>').attr('remix-item', key)
                                .addClass('ui-draggable beat song-' + songNum + ' beat' + (beatIndex%4+1))
                                .attr('data-beats', 1);
    return $beatLi;
  };

  Remixer.prototype.setListCallbacks = function(songNum) {
    var that = this;
    var songLiSelector = "#song-" + songNum + " ul li";
    $(songLiSelector).click(function(event) {
      var remixed = [];
      var beatKey = $(event.target).attr('remix-item');
      remixed.push(that.dict[beatKey]);
      that.playSnippet(remixed);
    });
  };

  return Remixer;

})(this);

window.remixer = new Remixer();
remixer.addTrack("TRUKTZP1416712D3B8", "https://dl.dropboxusercontent.com/u/34120492/songs/aint_it_funny.mp3");
remixer.addTrack("TRPJHTS1416713A719", "https://dl.dropboxusercontent.com/u/34120492/songs/ask_myself.mp3");