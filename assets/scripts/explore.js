// explore.js

window.addEventListener('DOMContentLoaded', init);

//declare variables
const voicesDropdown = document.getElementById('voice-select');
const speechSynth = window.speechSynthesis;
const talkButton = document.querySelector('button');
let voices = [];

function init() {
    speechSynth.onvoiceschanged = () => {
      voices = speechSynth.getVoices();
      //loop through each voice and put it in the dropdown menu
      voices.forEach((voice) => {
        const voiceOption = document.createElement('option');
        voiceOption.textContent = `${voice.name} (${voice.lang})`;
        voiceOption.setAttribute('value', voice.name);
        voicesDropdown.appendChild(voiceOption);
      });
    };
    //only talk if the Press to Talk button was clicked
      talkButton.addEventListener('click', () => {
      const textToSpeak = document.getElementById('text-to-speak').value;
      const selectedVoice = voicesDropdown.value;
      if (selectedVoice !== "select"){
          const talking = new SpeechSynthesisUtterance(textToSpeak);
          const currVoice = voices.find(voice => voice.name === selectedVoice);
          talking.voice = currVoice;
          speechSynth.speak(talking);
  
          const smilingImg = document.querySelector('img');
          smilingImg.setAttribute('src','assets/images/smiling-open.png');
          const check = setInterval(function(){
              if(speechSynth.speaking == false){
              smilingImg.setAttribute('src', 'assets/images/smiling.png');
              clearInterval(check);
              }
          }, 100);
      }
    }); 
}