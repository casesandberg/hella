var songs = [
	//{"track_id" :"SOUOAJT1311AFDC28C", "artist_name":"Britney Spears", "song_name":"Thinkin' About You", "audio_path":"music/thinkin_about_you.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/xawgMAbG5l9-7WwVQnWpo0zJqT0H4jboiXGYiA/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407274&Signature=Qrwsz%2B74vRg6SeYBNkzSnoespOI%3D"},
	{"track_id" :"TRUKTZP1416712D3B8", "artist_name":"Jennifer Lopez", "song_name":"Ain't It Funny", "audio_path":"music/aint_it_funny.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/cuxEogOKoAOylZzUDLTlAo9dVJmoPctfewlwMz/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407274&Signature=CBBouGykD9KVahIOS3Dhyq6pPUY%3D"},
	{"track_id" :"TRPJHTS1416713A719", "artist_name":"Robin Thicke", "song_name":"Ask Myself", "audio_path":"music/ask_myself.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/Y-6m3AY7bClO5EOMl7G0vGwe0iNP-H4yVRbZXsnzLk2yofnvI%3D/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407274&Signature=YjQuW8o/vRIxD5ETi05Sn0Bs%2BLI%3D"},
	{"track_id" :"SOIWJUI1374E66F8C1", "artist_name":"Mariah Carey", "song_name":"HEARTBREAKER (Intro Edit)/(W/O Rap)", "audio_path":"music/heartbreaker.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/TRDRVMF12BF99875EB/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407275&Signature=hl8vyhVt4ihijh%2BYqffiYtMTcZ8%3D"},
	{"track_id" :"SODRCZC12AF72A3BFD", "artist_name":"Britney Spears", "song_name":"The Answer", "audio_path":"music/the_answer.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/D5GvCQDBYQ00_d4ZWqBXMn-ZfYQdR3eLyEDkOL/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407275&Signature=Gz0nQlYLi1pzlXYwwZWgzvVrQwc%3D"},
	{"track_id" :"SOBIJML127D9789746", "artist_name":"Lady Gaga", "song_name":"So Happy I Could Die", "audio_path":"music/so_happy_i_could_die.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/2v9ysAQgbS75sqi-2ru9vVj-XYAfJCZSOFXz_EaAIxmJZZuHc%3D/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407275&Signature=kE9n5sNgo0kHy4AoKrTObKgVVhs%3D"},
	{"track_id" :"SOYXXAA130516DEE2D", "artist_name":"Michael Jackson", "song_name":"Best Of Joy", "audio_path":"best_of_joy.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/vbfejwYcKZAR6-kWYYYAuif1M9CF-hmeVIFuiK/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407275&Signature=ZNiVWkWv/Od0pMzswykHO2V4cf8%3D"},
	{"track_id" :"SODYJML130516E0328", "artist_name":"Miley Cyrus", "song_name":"Forgiveness And Love", "audio_path":"music/forgiveness_and_love.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/A1Ol2gv9cBKlsqV-5HHRyqYCXzdmBVEzXwqrDLemgTdNwvgI0%3D/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407275&Signature=5VUfbgAa2mNwSkgfrL3iy09/w3g%3D"},
	{"track_id" :"SOXLGHN1373E95A7FC", "artist_name":"Emeli Sande", "song_name":"River", "audio_path":"music/river.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/SA7RpAEtZEzW5HA8cUNOwQB8Lr-M0zFTiriKgEDYMx2VoSvx8%3D/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407275&Signature=8Ms40RaeUXQLeKH15aJLOEhx2a4%3D"},
	{"track_id" :"SOKXACK12A8C13376E", "artist_name":"Beyoncé", "song_name":"Crazy In Love", "audio_path":"crazy_in_love.mp3", "analysis_url":"http://echonest-analysis.s3.amazonaws.com/TR/yN8VjwRH7ZcqBwaaebBwBOxAtoDUH24YYOs8s87EvQF28Vd20%3D/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1380407275&Signature=DekK2lFbhuJPNKe6cwU9xr4u9vA%3D"}
];

var apiKey = 'CXUQGUSG0ZNDWJQGH';
console.log(songs[0].track_id);
var trackID = songs[0].track_id;
var trackURL = songs[0].audio_path;
var trackID2 = songs[1].track_id;
var trackURL2 = songs[1].audio_path;


var remixer;
var player;
var track;
var remixed = new Array();;
var track, track2;
var dict = {};


var createInitialRemix = function(track1, track2) {
    var i=0, j=0;

    tr1_len = track1.analysis.bars.length;
    tr2_len = track2.analysis.bars.length;

    bars1 = track1.analysis.bars;
    bars2 = track2.analysis.bars;

    for (i=32; i<44; i++) {
        key = 'track1_bar' + i;
        dict[key] = track1.analysis.beats[i];
        $("#song-1 ul").append($('<li></li>').attr('remix-item', key).addClass('ui-draggable beat song-1 beat' + (i%4+1)).attr('data-beats', 1));
    }

    for (i=32; i<44; i++) {
        key = 'track2_bar' + i;
        dict[key] = track2.analysis.beats[i];
        $("#song-2 ul").append($('<li></li>').attr('remix-item', key).addClass('ui-draggable beat song-2 beat' + (i%4+1)).attr('data-beats', 1));
    }

    draggin();
    set_list_callbacks();
}

$("#play").click(function() {
    remixed = [];
    $("#song-list li").each(function(idx, item) {
        remixed.push(dict[$(item).attr('remix-item')]);
    });
    player.play(0, remixed);
});

var set_list_callbacks = function() {
    $("#song-1 ul li").click(function(item) {
        remixed = [];
        remixed.push(dict[$(item.target).attr('remix-item')]);
        player.play(0, remixed);
    });

    $("#song-2 ul li").click(function(item) {
        remixed = [];
        remixed.push(dict[$(item.target).attr('remix-item')]);
        player.play(0, remixed);
    });
}

var init = function() {
    if (window.webkitAudioContext === undefined) {
        error("Sorry, this app needs advanced web audio. Your browser doesn't"
            + " support it. Try the latest version of Chrome");
    } else {
        var context = new webkitAudioContext();

        remixer = createJRemixer(context, $, apiKey);
        player = remixer.getPlayer();
        $("#info").text("Loading analysis data...");

        remixer.remixTrackById(trackID, trackURL, function(t, percent) {
            track = t;
            $("#info").text(percent + "% of the first track loaded...");
            if (percent == 100) {
                $("#info").text(percent + "% of the first track loaded, checking status and preparing for second track...");
            }

            if (track.status == 'ok') {
                remixer.remixTrackById(trackID2, trackURL2, function(t, percent) {
                    track2 = t;
                    $("#info").text(percent + "% of the second track loaded...");
                    if (percent == 100) {
                        $("#info").text(percent + "% of both tracks loaded, remixing...");
                    }

                    if (track2.status == 'ok') {
 						createInitialRemix(track, track2, .1);
                        $("#info").text("Remix complete!");
                    }
                });
            }
        });
    }
}

init();