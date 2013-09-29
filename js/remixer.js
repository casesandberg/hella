window.Remixer = (function() {

  function Remixer() {
    this.apiKey = "FPLTBQBYRKMKVH6BL";
    this.songs = new Array();
    this.remixed = new Array();
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

  // Remixer.prototype.buildSegmentGroups = function(segments) {
  //   var groupedSegments = new Array();

  //   var segmentGroup;
  //   var track;
  //   _.each(segments, function(el, i) {
  //     if el.

  //   });

  //   return groupedSegments;
  // };

// Play the remixed song.

  Remixer.prototype.play = function() {
    var flattenedRemix = _.flatten(this.remixed);
    this.player.stop();
    this.player.play(0, flattenedRemix);
  };

// Pause the song currently playing.

  Remixer.prototype.pause = function() {
    this.player.stop();
  };

  Remixer.prototype.playSnippet = function(snippet) {
    var snippetArr = [snippet];
    this.player.play(0, snippet);
  };

  Remixer.prototype.loadSnippets = function() {
  };

  Remixer.prototype.loadBars = function(song, limit) {
    var barsArr = new Array();
    var iter = Math.floor(song.analysis.bars.length/limit);

    for(var i = 0; i < limit; i++) {
      barsArr.push(song.analysis.bars[i * iter]);
    }

    return barsArr;
  };

  Remixer.prototype.loadBeats = function(song, limit) {
    var beatsArr = new Array();
    var barIter = Math.ceil(limit / 4);


    for (var i = 0; i < limit; i+=barIter){
      for (var j = 0; j < 4; j++){
        beatsArr.push(song.analysis.beats[i + j]);
      } 
    }

    // for (var i = 0; i < limit; i++) {
    //   beatsArr.push(song.analysis.beats[i * iter]);
    // };

    return beatsArr;   
  };

  return Remixer;

})(this);

window.remixer = new Remixer();
remixer.addTrack("TRUKTZP1416712D3B8", "https://dl.dropboxusercontent.com/u/34120492/songs/aint_it_funny.mp3");
remixer.addTrack("TRPJHTS1416713A719", "https://dl.dropboxusercontent.com/u/34120492/songs/ask_myself.mp3");