let audioCtx = null;
let tag = null;

document.addEventListener('DOMContentLoaded', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //sets up the audio based on the html sound of the airhorn
    _setupTag();
    toggleMoreInfo();
});

var _setupTag = function(){
    //gets the tag with the media element
    tag = document.getElementById('airhorn_audio');
    //creates a source based on this element
    var src = audioCtx.createMediaElementSource(tag);
    //gain node for volume
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    //connects nodes
    src.connect(gainNode);
    gainNode.connect(audioCtx.destination);
};

var playTag = function(){
    tag.play();
};

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

var hideSplash = function(){
    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#airhorn_audio').load();
    document.querySelector('#virt_airhorn').addEventListener('click', playTag);
    document.querySelector('#virt_airhorn').emit('startHorn');

};