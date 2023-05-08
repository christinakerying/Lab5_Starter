// expose.js

window.addEventListener('DOMContentLoaded', init);

//locations of the images, sounds, and icons files
const hornImages = {
  'air-horn': 'assets/images/air-horn.svg',
  'car-horn': 'assets/images/car-horn.svg',
  'party-horn': 'assets/images/party-horn.svg'
};
const hornSounds = {
  'air-horn': 'assets/audio/air-horn.mp3',
  'car-horn': 'assets/audio/car-horn.mp3',
  'party-horn': 'assets/audio/party-horn.mp3'
};
const volumeLevels = {
  '0': 'assets/icons/volume-level-0.svg',
  '1': 'assets/icons/volume-level-1.svg',
  '2': 'assets/icons/volume-level-2.svg',
  '3': 'assets/icons/volume-level-3.svg'
};

//link stuff to html
const hornSelect = document.getElementById('horn-select');
const hornImage = document.querySelector('#expose img');
const hornAudioElement = document.querySelector('#expose audio');
const playSoundButton = document.querySelector('#expose button');
const volumeSlider = document.getElementById('volume');
const volumeIcon = document.querySelector('#expose img');



function init() {
  //select the correct image for each horn
  hornSelect.addEventListener('change', () => {
    const selectedHorn = hornSelect.value;
    const selectedImage = hornImages[selectedHorn];
    hornImage.src = selectedImage;
    const selectedAudio = hornSounds[selectedHorn];
    hornAudioElement.src = selectedAudio;

  });

  volumeSlider.addEventListener('input', () => {
    // Update the volume icon based on the current value of the volume slider
    if (volumeSlider.value == 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
    } else if (volumeSlider.value >= 1 && volumeSlider.value < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
    } else if (volumeSlider.value >= 33 && volumeSlider.value <= 66) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
    } else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
    }
    hornAudioElement.volume = volumeSlider.value / 100;
  });
  
  //play sound if the play sound button is clicked
  playSoundButton.addEventListener('click', () => {
    hornAudioElement.play();

    //show confetti if it's party horn
    if (hornSelect.value === 'party-horn') {
      const confetti = new JSConfetti();
      confetti.addConfetti();
    }
  });

}