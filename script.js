const rgbToCss = (rgb) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
const mixWithGray = (rgb, amount = 0.35) =>
    rgb.map(c => Math.round(c * (1 - amount) + 128 * amount));

const playPath = "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z";
const pausePath = "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z";

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player-1');
    const toggleBtn = document.getElementById('toggle-btn');
    const resetBtn = document.getElementById('reset-btn');
    const iconPath = document.getElementById('icon-path');
    const loadingRing = document.getElementById('loading-ring');
    const fillEl = document.getElementById('fill');
    const timeLeftEl = document.getElementById('time-left');

    function setLoading(isLoading) {
        if (isLoading) {
            loadingRing.classList.remove('hidden');
            iconPath.classList.add('opacity-50');
        } else {
            loadingRing.classList.add('hidden');
            iconPath.classList.remove('opacity-50');
        }
    }

    // https://oshoworld.com/ashtavakra-maha-geeta-01
    const audioLink = 'https://oshoworld.com/wp-content/uploads/2020/11/Hindi%20Audio/OSHO-Maha_Geeta_01.mp3'

    // Use the audio URL as the key so different files save their own times
    const STORAGE_KEY = `audio_progress_${audioLink}`;

    let audioInitialized = false;

    toggleBtn.addEventListener('click', () => {
        // 2. Lazy Load: Only set source and restore time on the first click
        if (!audioInitialized) {
            audioPlayer.src = audioLink;

            // Restore playback position now that src is set
            const savedTime = localStorage.getItem(STORAGE_KEY);
            if (savedTime) {
                // We set this immediately so the player starts at the right spot
                audioPlayer.currentTime = parseFloat(savedTime);
            }

            audioInitialized = true;
        }

        const currentState = toggleBtn.getAttribute('data-state');

        if (currentState === 'play') {
            audioPlayer.play();
            iconPath.setAttribute('d', pausePath);
            toggleBtn.setAttribute('data-state', 'pause');
        } else {
            audioPlayer.pause();
            iconPath.setAttribute('d', playPath);
            toggleBtn.setAttribute('data-state', 'play');
        }
    });

    resetBtn.addEventListener('click', () => {
        // If the user clicks reset before ever clicking play, we don't need to do anything
        if (!audioInitialized) return;

        audioPlayer.currentTime = 0;
        fillEl.style.width = '0%';
        timeLeftEl.textContent = formatTime(audioPlayer.duration);
        audioPlayer.pause();
        iconPath.setAttribute('d', playPath);
        toggleBtn.setAttribute('data-state', 'play');
        localStorage.removeItem(STORAGE_KEY);
    });

    audioPlayer.addEventListener('waiting', () => {
        setLoading(true);
    });

    audioPlayer.addEventListener('playing', () => {
        setLoading(false);
        iconPath.setAttribute('d', pausePath);
        toggleBtn.setAttribute('data-state', 'pause');
    });

    audioPlayer.addEventListener('pause', () => {
        setLoading(false);
        iconPath.setAttribute('d', playPath);
        toggleBtn.setAttribute('data-state', 'play');
    });

    audioPlayer.addEventListener('ended', () => {
        setLoading(false);
        iconPath.setAttribute('d', playPath);
        toggleBtn.setAttribute('data-state', 'play');
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        fillEl.style.width = percent + '%';
        timeLeftEl.textContent = formatTime(audioPlayer.duration - audioPlayer.currentTime);

        // --- NEW: Save current time to local storage ---
        if (audioPlayer.currentTime > 0) {
            localStorage.setItem(STORAGE_KEY, audioPlayer.currentTime);
        }
    });

    // --- NEW: Clear storage when audio finishes completely ---
    audioPlayer.addEventListener('ended', () => {
        localStorage.removeItem(STORAGE_KEY);
        // Optional: Reset UI to play state
        iconPath.setAttribute('d', playPath);
        toggleBtn.setAttribute('data-state', 'play');
    });

    function formatTime(seconds) {
        if (isNaN(seconds)) return "Loading..."; // Handle initial NaN state
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const hourDisplay = hours > 0 ? `${hours}h ` : '';
        return `${hourDisplay}${minutes}m left`;
    }



    const img = document.getElementById("banner");
    const bg = document.getElementById("bg");
    const currentTrack = document.getElementById("current-track");
    const colorThief = new ColorThief();

    function applyGradient() {
        try {
            const palette = colorThief.getPalette(img, 5);
            const base = palette[1] || palette[0];
            const muted = mixWithGray(base);

            bg.style.backgroundImage = `
                linear-gradient(
                    180deg,
                    ${rgbToCss(muted)} 0%,
                    #171717ff 85%
                )
            `;

            currentTrack.style.backgroundColor = rgbToCss(mixWithGray(base, 0.4).map(c => Math.round(c * 0.7)));
        } catch (e) {
            console.error("Color extraction failed:", e);
        }
    }

    if (img.complete && img.naturalWidth !== 0) {
        applyGradient();
    } else {
        img.addEventListener("load", applyGradient);
    }
});