// Récupération du body
const body = document.body;

// Création du container principal
const container = document.createElement('div');
container.setAttribute('class', 'container');
body.appendChild(container);

// Création du container de la video
const containerVideo = document.createElement('div');
containerVideo.setAttribute('class', 'containerVideo');
container.appendChild(containerVideo);

// Création de la video
const video = document.createElement('video');
video.setAttribute('src', 'ressources/video.mp4');
video.addEventListener('timeupdate', progressionTimer);
containerVideo.appendChild(video);

// Création de la barre des controles
const controles = document.createElement('div');
controles.setAttribute('class', 'controles');
containerVideo.appendChild(controles);

// Création des boutons de controles

    /* Avancée de la vidéo */
    const progressBar = document.createElement('progress');
    progressBar.setAttribute('class', 'progressBar');
    progressBar.setAttribute('aria-label', 'Barre de progression de la vidéo');
    progressBar.setAttribute('min', 0);
    progressBar.setAttribute('max', video.duration);
    progressBar.value = 0 ;
    progressBar.addEventListener('click', changeTime)
    controles.appendChild(progressBar);   

    /* Container des boutons de controles */

    const containerBtns = document.createElement('div');
    containerBtns.setAttribute('class', 'containerBtns');
    controles.appendChild(containerBtns);

    /* Pause / Play */

    const pausePlay = document.createElement('div');
    pausePlay.setAttribute('class', 'pausePlay');
    pausePlay.setAttribute('aria-label', 'Bouton pour activer ou désactiver la vidéo');
    pausePlay.addEventListener('click', pauseAndPlay);
    containerBtns.appendChild(pausePlay);

    /* Mute */

    const muted = document.createElement('div');
    muted.setAttribute('class', 'muted');
    pausePlay.setAttribute('aria-label', 'Bouton pour couper le son de la vidéo');
    muted.innerText = 'Mute';
    muted.addEventListener('click', muteOrNot)
    containerBtns.appendChild(muted);

    /* Volume */
    const volumeBtn = document.createElement('input');
    volumeBtn.setAttribute('type', 'range');
    volumeBtn.setAttribute('min', 0);
    volumeBtn.setAttribute('max', 100);
    volumeBtn.setAttribute('value', 50);
    volumeBtn.setAttribute('class', 'volume');
    volumeBtn.addEventListener('input', modifVolume);
    containerBtns.appendChild(volumeBtn);

    /* Full Screen*/
    const fullscreen = document.createElement('div');
    fullscreen.setAttribute('class', 'fullscreen');
    fullscreen.addEventListener('click', modifEcran);
    containerBtns.appendChild(fullscreen);

/* Fonctions */
function progressionTimer()
{
    progressBar.value = video.currentTime / video.duration;

    if(video.ended)
    {
        pausePlay.classList.remove('pause');
        pausePlay.style.background = 'url(../ressources/play.svg)';
    }
}

function changeTime(e)
{
    let barre = progressBar.getBoundingClientRect();
    let barreWidth = barre.width;

    let positionClick = e.clientX - barre.left;
    let widthPercent = positionClick/barreWidth;
    
    video.currentTime = video.duration * (widthPercent);
}

function pauseAndPlay()
{
    pausePlay.classList.toggle('pause');
    
    if(pausePlay.classList.contains('pause'))
    {
        video.play();
    }
    else
    {
        video.pause();
    }
}

function muteOrNot()
{
    if(muted.innerText === 'Mute')
    {
        muted.innerText = 'Unmute';
        video.muted = true;
    }
    else
    {
        muted.innerText = 'Mute';
        video.muted = false;
    }
}

function modifVolume()
{
    volumeBtn.setAttribute('value', volumeBtn.value);
    video.volume = volumeBtn.value/100;
}

function modifEcran()
{
    if(containerVideo.requestFullscreen())
    {
        document.exitFullscreen();
    }
    else
    {
        containerVideo.requestFullscreen();
    }
}
