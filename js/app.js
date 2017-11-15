let audioCtx = null;
let tag = null;
let airhorn_buffer = null;

document.addEventListener('DOMContentLoaded', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //sets up the audio based on the html sound of the airhorn
    toggleMoreInfo();
    _setupAudioBuffer();
});

/* AUDIO SETUP */
var _setupAudioBuffer = function(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://samsunginter.net/airhorn/sound/airhorn.mp3', true);
    request.responseType = 'arraybuffer';
    //Decode async
    request.onload = function(){
        // audioCtx.decodeAudioData(request.response).then(function(decodedData){
        //     airhorn_buffer = decodedData;
        // });

        audioCtx.decodeAudioData(request.response, function(theBuffer){
            airhorn_buffer = theBuffer;
        }, onAudioLoadError);

    };
    request.send();
};

var onAudioLoadError = function(){
    console.log('error');
};

function playSound(){
    var source = audioCtx.createBufferSource();
    source.buffer = airhorn_buffer;
    source.connect(audioCtx.destination);
    source.start(0);
}

var toggleMoreInfo = function(){
    var moreInfoDiv = document.querySelector('#more');
    switch(moreInfoDiv.style.display){
        case 'none':
            moreInfoDiv.style.display = 'block';
        break;
        case 'block':
            moreInfoDiv.style.display = 'none';
        break;
        default:
            moreInfoDiv.style.display = 'none';
    }
};

var playAirhorn = function(){
    playSound();
};

var hideSplash = function(){
    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#airhorn_audio').load();
    document.querySelector('#virt_airhorn').addEventListener('click', playAirhorn);
    document.querySelector('#virt_airhorn').emit('startHorn');

};