// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');

  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
  } else {
    progressBar.classList.remove('hide');
    if (event.detail.totalProgress === 0) {
      event.target.querySelector('.center-pre-prompt').classList.add('hide');
    }
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

function clickButton() {
  document.getElementById('ar-button').click();
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    setTimeout(clickButton, 2000);
  }
};

// Selects a random 3D model to be displayed within model-viewer window
const nowRoundelModel =
  'https://foundryar.blob.core.windows.net/datacom-qr-code/NoW AR Model_lowpoly_Animation.glb';

const nowRoundelIosModel =
  'https://foundryar.blob.core.windows.net/datacom-qr-code/NoW AR Model_lowpoly.usdz';

const array = [nowRoundelModel];
const arrayIos = [nowRoundelIosModel];

const chooseModel = array[0];
const chooseIosModel = arrayIos[0];

let elem = document.getElementById('model-viewer');

if (getMobileOperatingSystem() == 'Android') {
  console.log('Android', chooseModel);
  elem.src = chooseModel;
} else if (getMobileOperatingSystem() == 'iOS') {
  console.log('iOS', chooseIosModel);
  elem.setAttribute('ios-src', chooseIosModel);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
}
