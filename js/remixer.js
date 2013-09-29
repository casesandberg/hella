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
    this.bindControls();
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

// Add a new track to the remixer.

  Remixer.prototype.addTrack = function(trackID, trackURL) {
    var that = this;
    this.remixer.remixTrackById(trackID, trackURL, function(t, percent) {
      var track = t;
      var songNum = that.songs.length + 1;

      $("#info").text(percent + "% of song " + songNum + " loaded");

      //  create DOM element...
      /*<div id="song-1">
        <h2 class="title">Loading...</h2>
        <h3 class="artist"></h3>
        <ul class="bucket">
        </ul>
      </div>*/

      if (percent < 100) {
        console.log("Song being analyzed.");
      }
  
      if (percent == 100) {
        $("#info").text(percent + "% of song " + songNum + " loaded, remixing...");
      }

      if (track.status == "ok") {
        $el = $('<div></div>').attr('id', 'song-' + songNum);
        $el.append('<h2 class="title">Loading...</h2>');
        $el.append('<h3 class="artist"></h3>');
        $el.append('<ul class="bucket"></ul>');
        $("#songs").append($el);
        that.songs.push(track);
        that.loadSongBeatLis();
        console.log("Track analyzed! Song " + songNum + " added.");
        that.loadSongInfo();
        $("#songs").removeClass("songs-" + (that.songs.length - 1)).addClass("songs-" + that.songs.length);
        // DUMMY SONG FOR CASE TO PLAY WITH
        that.generateBeats(32);
        return track;
      }
    })
  };

// Generate a random remix from the songs.

  Remixer.prototype.generateBeats = function(maxBeats) {
    var that = this;
    var remixed = this.remixed;
    var numberOfBeats = _.min(this.songs, function(song, index) {
      return song.analysis.beats.length;
    }).analysis.beats.length;

    $("#song-list").empty();
    var songIter = maxBeats % this.songs.length;
    for (var i = 32; i < maxBeats + 32; i++) {
      if (i % 4 == 0 || i % 4 == 1) {
        var songNum = 1;
      } else {
        if (this.songs.length == 1) {
          var songNum = 1;
        } else {
          var songNum = _.random(2, this.songs.length);
        }
      }
      var beatIndex = i;
      var key = 'track' + songNum + '_bar' + beatIndex;
      var song = this.songs[songNum - 1];
      this.dict[key] = song.analysis.beats[beatIndex];
      var $beatLi = this.$liEl(songNum, beatIndex);
      $('#song-list').append($beatLi);
      this.bindSnippetPreview(songNum);
    }
    draggin();
  };

// Loads the initial beat list items to interact with on the DOM.

  Remixer.prototype.loadSongBeatLis = function() {
    var songNum = this.songs.length;
    var song_len = this.songs[songNum - 1].analysis.bars.length;

    for (var beatIdx = 32; beatIdx < 36; beatIdx++) {
      this.appendBeat(songNum, beatIdx);
    };

    var barIndex = 6;
    this.appendBar(songNum, 6);

    for (var beatIdx = 40; beatIdx < 44; beatIdx++) {
      this.appendBeat(songNum, beatIdx);
    };

    var barIndex = 8;
    this.appendBar(songNum, 8);

    for (var beatIdx = 48; beatIdx < 52; beatIdx++) {
      this.appendBeat(songNum, beatIdx);
    };

    var barIndex = 10;
    this.appendBar(songNum, 10);

    for (var beatIdx = 56; beatIdx < 60; beatIdx++) {
      this.appendBeat(songNum, beatIdx);
    };

    var barIndex = 12;
    this.appendBar(songNum, 12);

    this.bindSnippetPreview(songNum);
    draggin();
  };

// Play

  Remixer.prototype.play = function() {
    this.player.stop();
    this.player.play(0, this.remixed);
  };

 // Pause

  Remixer.prototype.pause = function() {
    this.player.stop();
  };


// Bind controller actions to the DOM elements.

  Remixer.prototype.bindControls = function() {
    this.bindPlayOnClick();
    this.bindPauseOnClick();
  }

  Remixer.prototype.bindPlayOnClick = function() {
    var that = this;
    $(".play").click(function() {
      that.remixed = new Array();
      $("#song-list li").each(function(idx, item) {
        var beatKey = $(item).attr('remix-item');
        var beat = that.dict[beatKey];
        that.remixed.push(beat);
      });
    that.play();
    });
  };

  Remixer.prototype.bindPauseOnClick = function() {
    var that = this;
    $('.pause').click(function() {
      that.pause();
    })
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

  Remixer.prototype.loadSongInfo = function() {
    var songNum = this.songs.length;
    var song = _.last(this.songs);
    var title = song.title;
    var artist = song.artist;
    var idSelector = "#song-" + songNum;

    if (title.length > 24) {
      title = title.substring(0, 21) + '...';
    }

    if (artist.length > 24) {
      artist = artist.substring(0, 21) + '...';
    }

    $(idSelector).children(".title").text(title);
    $(idSelector).children(".artist").text(artist);
  };

  Remixer.prototype.initPlayFromPoint = function() {
    var that = this;
    $("#song-list li").click(that.playFromPoint);
  };

  Remixer.prototype.playFromPoint = function(event) {
    var that = this;
    console.log(event);
    var liIndex = $("#song-list li").index(event.target);
    var liCount = $("#song-list li").size();
    var remixedSnippets = new Array();
    for (var i = liIndex; i < liCount; i++) {
      var item = $("#song-list li").eq(i).attr('remix-item');
      var beat = that.dict[beatKey];
      remixedSnippets.push(beat);
    }
    that.playSnippet(remixedSnippets);
  };

  Remixer.prototype.appendBeat = function(songNum, beatIndex) {
    var that = this;
    var key = 'track' + songNum + '_bar' + beatIndex;
    var song = this.songs[songNum - 1];
    this.dict[key] = song.analysis.beats[beatIndex];
    var $beatLi = this.$liEl(songNum, beatIndex);
    var $songUl = $("#song-" + songNum + " ul");
    $songUl.append($beatLi);
  }

  Remixer.prototype.appendBar = function(songNum, barIndex) {
    var that = this;
    var key = 'track' + songNum + '_bar' + barIndex;
    var song = this.songs[songNum - 1];
    this.dict[key] = song.analysis.bars[barIndex];
    var $barLi = this.$liEl(songNum, barIndex).attr('data-beats', 2);
    var $songUl = $("#song-" + songNum + " ul");
    $songUl.append($barLi);
  }

  Remixer.prototype.$liEl = function(songNum, beatIndex) {
    var key = 'track' + songNum + '_bar' + beatIndex;
    var beat = this.dict[key];
    var $beatLi = $('<li></li>').attr('remix-item', key)
                                .addClass('beat song-' + songNum + ' beat' + (beatIndex % 4 + 1))
                                .attr('data-beats', 1)
                                .attr('data-length', beat.duration);
    return $beatLi;
  };

  Remixer.prototype.bindSnippetPreview = function(songNum) {
    var that = this;
    var songLiSelector = "li.song-" + songNum;
    $(songLiSelector).click(function(event) {
      var snippet = [];
      var beatKey = $(event.target).attr('remix-item');
      snippet.push(that.dict[beatKey]);
      that.playSnippet(snippet);
    });
  };

  Remixer.prototype.songLength = function() {
    var that = this;
    var duration = 0;
    var $beatLis = $("#song-list li");
    $beatLis.each(function(idx, item) {
      var beatKey = $(item).attr('remix-item');
      var beat = that.dict[beatKey];
      var beatLength = parseFloat(beat.duration);
      duration += beatLength;
    })
    return duration;
  };

  return Remixer;

})(this);

window.remixer = new Remixer();
window.total_songs = 0;

$("#add-song").click(function() {
  window.total_songs++;
  var $item = $('#song-selector').find(":selected");
  var sel_track = $item.attr('id');
  var sel_url = $item.attr('url');
  remixer.addTrack(sel_track, sel_url);
  $item.remove();

  if ($("#song-selector").find('option').length == 0) {
    $("#add-songs").hide();
  }

  if (window.total_songs >=3) {
    $('#add-songs').remove();
  }

  return false;
});

$(".clear-songs").click(function() {
  $("#song-list").html("");
  remixed = [];
  return false;
});

//remixer.addTrack("TRUKTZP1416712D3B8", "https://dl.dropboxusercontent.com/u/34120492/songs/aint_it_funny.mp3");
//remixer.addTrack("TRPJHTS1416713A719", "https://dl.dropboxusercontent.com/u/34120492/songs/ask_myself.mp3");
//remixer.addTrack("TRYQMCZ1416A710F20", "https://dl.dropboxusercontent.com/u/34120492/songs/crazy_in_love.mp3");
