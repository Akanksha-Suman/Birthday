let heartsStarted = false;
let countdownTimer = null;


/* =====================================================
   CRACKER SOUND
===================================================== */

function playCrackerSound() {

    let crackerSound =
        document.getElementById("crackerSound");

    if (!crackerSound) {

        crackerSound =
            document.createElement("audio");

        crackerSound.id =
            "crackerSound";

        crackerSound.preload =
            "auto";

        crackerSound.src =
            "sounds/crackers.mp3";

        crackerSound.volume =
            0.8;

        document.body.appendChild(
            crackerSound
        );
    }

    crackerSound.currentTime = 0;

    const playPromise =
        crackerSound.play();

    if (playPromise !== undefined) {

        playPromise.catch(error => {

            console.log(
                "Cracker sound could not be played:",
                error
            );

        });
    }
}


/* =====================================================
   CRACKER VISUAL BURST
===================================================== */

function createCrackerBurst() {

    const symbols = [
        "✨",
        "💖",
        "💕",
        "⭐",
        "🎉",
        "❤️"
    ];

    for (let i = 0; i < 35; i++) {

        const spark =
            document.createElement("div");

        spark.className =
            "cracker-spark";

        spark.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            Math.random() *
            350 +
            120;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        spark.style.setProperty(
            "--x",
            `${x}px`
        );

        spark.style.setProperty(
            "--y",
            `${y}px`
        );

        spark.style.fontSize =
            `${Math.random() * 15 + 12}px`;

        document.body.appendChild(
            spark
        );

        setTimeout(() => {

            spark.remove();

        }, 1800);
    }
}


/* =====================================================
   START SURPRISE
===================================================== */

function startSurprise() {

    playCrackerSound();

    createCrackerBurst();

    const intro =
        document.getElementById("intro");

    const main =
        document.getElementById("main-content");

    if (!intro || !main) {
        return;
    }

    intro.style.opacity =
        "0";

    intro.style.transition =
        "1.5s ease";

    setTimeout(() => {

        intro.style.display =
            "none";

        main.classList.remove(
            "hidden"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if (!heartsStarted) {

            createHearts();

            heartsStarted =
                true;
        }

    }, 1500);
}


/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    const birthday =
        new Date(
            "October 7, 2026 00:00:00"
        ).getTime();

    const now =
        new Date().getTime();

    const difference =
        birthday - now;

    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");

    const message =
        document.getElementById(
            "birthday-message"
        );

    if (
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) {
        return;
    }

    if (difference <= 0) {

        days.innerText = "00";
        hours.innerText = "00";
        minutes.innerText = "00";
        seconds.innerText = "00";

        if (message) {

            message.innerText =
                "TODAY IS YOUR DAY, MY CHAMPION! 🎂❤️";
        }

        return;
    }

    const d =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const h =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
            24
        );

    const m =
        Math.floor(
            (difference /
                (1000 * 60)) %
            60
        );

    const s =
        Math.floor(
            (difference / 1000) %
            60
        );

    days.innerText =
        String(d).padStart(2, "0");

    hours.innerText =
        String(h).padStart(2, "0");

    minutes.innerText =
        String(m).padStart(2, "0");

    seconds.innerText =
        String(s).padStart(2, "0");
}


updateCountdown();

countdownTimer =
    setInterval(
        updateCountdown,
        1000
    );


/* =====================================================
   MUSIC PLAYER
===================================================== */

const song =
    document.getElementById("song");

const musicButton =
    document.getElementById(
        "musicButton"
    );

const vinyl =
    document.querySelector(".vinyl");


function toggleMusic() {

    if (!song) {
        return;
    }

    if (song.paused) {

        const playPromise =
            song.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    if (musicButton) {

                        musicButton.innerHTML =
                            "❚❚";
                    }

                    if (vinyl) {

                        vinyl.classList.add(
                            "playing"
                        );
                    }

                })
                .catch(error => {

                    console.log(
                        "Music could not be played:",
                        error
                    );

                });
        }

    } else {

        song.pause();

        if (musicButton) {

            musicButton.innerHTML =
                "▶";
        }

        if (vinyl) {

            vinyl.classList.remove(
                "playing"
            );
        }
    }
}


/* =====================================================
   LOVE LETTER
===================================================== */

function openLetter() {

    const envelope =
        document.getElementById(
            "envelope"
        );

    const letter =
        document.getElementById(
            "letter"
        );

    if (!envelope || !letter) {
        return;
    }

    envelope.classList.toggle(
        "open"
    );

    if (
        envelope.classList.contains(
            "open"
        )
    ) {

        setTimeout(() => {

            letter.classList.remove(
                "hidden"
            );

            letter.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 800);

    } else {

        letter.classList.add(
            "hidden"
        );
    }
}


/* =====================================================
   REASON CARDS
===================================================== */

function revealReason(card) {

    if (!card) {
        return;
    }

    card.classList.toggle(
        "revealed"
    );

    if (
        card.classList.contains(
            "revealed"
        )
    ) {

        if (
            navigator.vibrate
        ) {

            navigator.vibrate(
                40
            );
        }
    }
}


/* =====================================================
   CANDLE ELEMENTS
===================================================== */

const startBtn =
    document.getElementById(
        "startBlowBtn"
    );

const blowText =
    document.getElementById(
        "blowText"
    );

const birthdaySong =
    document.getElementById(
        "birthdaySong"
    );

const birthdayMessage =
    document.getElementById(
        "birthdayMessage"
    );

const candles =
    document.querySelectorAll(
        ".candle"
    );


/* =====================================================
   CANDLE AUDIO VARIABLES
===================================================== */

let audioContext = null;

let analyser = null;

let microphone = null;

let micStream = null;

let timeData = null;

let frequencyData = null;

let isListening = false;

let candleBlown = false;

let noiseLevel = 0.02;

let blowFrames = 0;

let audioUnlocked = false;


/* =====================================================
   UNLOCK BIRTHDAY SONG
   IMPORTANT FOR MOBILE
===================================================== */

async function unlockBirthdaySong() {

    if (!birthdaySong) {
        return;
    }

    try {

        birthdaySong.volume = 0.8;

        birthdaySong.muted = true;

        const playPromise =
            birthdaySong.play();

        if (playPromise !== undefined) {

            await playPromise;
        }

        birthdaySong.pause();

        birthdaySong.currentTime = 0;

        birthdaySong.muted = false;

        audioUnlocked = true;

        console.log(
            "🎵 Birthday song unlocked!"
        );

    }

    catch (error) {

        console.log(
            "Birthday song unlock:",
            error
        );

        audioUnlocked = false;
    }
}


/* =====================================================
   START BUTTON
===================================================== */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        startCandleDetection
    );
}


/* =====================================================
   START CANDLE DETECTION
===================================================== */

async function startCandleDetection() {

    if (
        isListening ||
        candleBlown
    ) {
        return;
    }

    try {

        /* -----------------------------------------
           Check browser microphone support
        ----------------------------------------- */

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            if (blowText) {

                blowText.textContent =
                    "⚠️ Microphone is not supported here.";
            }

            showManualBlowButton();

            return;
        }


        /* -----------------------------------------
           Check secure connection
        ----------------------------------------- */

        if (
            location.protocol !== "https:" &&
            location.hostname !== "localhost" &&
            location.hostname !== "127.0.0.1"
        ) {

            if (blowText) {

                blowText.textContent =
                    "⚠️ Please open this website using HTTPS.";
            }

            showManualBlowButton();

            return;
        }


        /* -----------------------------------------
           Unlock birthday audio FIRST
           while this is still a user click
        ----------------------------------------- */

        await unlockBirthdaySong();


        /* -----------------------------------------
           Request microphone
        ----------------------------------------- */

        micStream =
            await navigator.mediaDevices.getUserMedia({

                audio: {

                    echoCancellation: false,

                    noiseSuppression: false,

                    autoGainControl: false
                }
            });


        console.log(
            "🎤 Microphone permission granted!"
        );


        /* -----------------------------------------
           Create AudioContext
        ----------------------------------------- */

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContextClass) {

            if (blowText) {

                blowText.textContent =
                    "⚠️ Audio detection is not supported.";
            }

            showManualBlowButton();

            stopMicrophone();

            return;
        }


        audioContext =
            new AudioContextClass();


        /* -----------------------------------------
           Resume AudioContext
        ----------------------------------------- */

        if (
            audioContext.state ===
            "suspended"
        ) {

            await audioContext.resume();
        }


        console.log(
            "AudioContext:",
            audioContext.state
        );


        /* -----------------------------------------
           Create microphone source
        ----------------------------------------- */

        microphone =
            audioContext.createMediaStreamSource(
                micStream
            );


        /* -----------------------------------------
           Create analyser
        ----------------------------------------- */

        analyser =
            audioContext.createAnalyser();


        analyser.fftSize =
            2048;


        analyser.smoothingTimeConstant =
            0.15;


        timeData =
            new Uint8Array(
                analyser.fftSize
            );


        frequencyData =
            new Uint8Array(
                analyser.frequencyBinCount
            );


        microphone.connect(
            analyser
        );


        isListening =
            true;

        candleBlown =
            false;

        blowFrames =
            0;


        startBtn.style.display =
            "none";


        if (blowText) {

            blowText.textContent =
                "🎤 Listening... stay quiet for a moment";
        }


        /* -----------------------------------------
           Calibrate microphone
        ----------------------------------------- */

        calibrateMicrophone();

    }

    catch (error) {

        console.error(
            "Microphone error:",
            error
        );


        if (blowText) {

            if (
                error.name ===
                "NotAllowedError"
            ) {

                blowText.textContent =
                    "⚠️ Microphone permission was denied. Please allow it and try again.";

            } else {

                blowText.textContent =
                    "⚠️ Could not start the microphone. Please try again.";
            }
        }


        showManualBlowButton();
    }
}


/* =====================================================
   MICROPHONE CALIBRATION
===================================================== */

function calibrateMicrophone() {

    if (
        !isListening ||
        !analyser
    ) {
        return;
    }


    let total =
        0;

    let samples =
        0;

    const startTime =
        performance.now();


    function collectNoise() {

        if (
            !isListening ||
            candleBlown
        ) {
            return;
        }


        analyser.getByteTimeDomainData(
            timeData
        );


        let sumSquares =
            0;


        for (
            let i = 0;
            i < timeData.length;
            i++
        ) {

            const value =
                (timeData[i] - 128) /
                128;


            sumSquares +=
                value * value;
        }


        const rms =
            Math.sqrt(
                sumSquares /
                timeData.length
            );


        total +=
            rms;

        samples++;


        const elapsed =
            performance.now() -
            startTime;


        if (elapsed < 1200) {

            if (blowText) {

                blowText.textContent =
                    "🎤 Keep quiet... preparing microphone...";
            }


            requestAnimationFrame(
                collectNoise
            );

            return;
        }


        noiseLevel =
            samples > 0
                ? total / samples
                : 0.015;


        /*
           Prevent an extremely high
           background level from making
           detection impossible.
        */

        noiseLevel =
            Math.min(
                noiseLevel,
                0.08
            );


        console.log(
            "🎤 Background noise:",
            noiseLevel.toFixed(4)
        );


        if (blowText) {

            blowText.textContent =
                "💨 Now blow toward your microphone!";
        }


        detectBlow();
    }


    collectNoise();
}


/* =====================================================
   CALCULATE MICROPHONE LEVEL
===================================================== */

function getMicrophoneLevel() {

    if (!analyser) {
        return {
            rms: 0,
            peak: 0,
            frequencyAverage: 0
        };
    }


    analyser.getByteTimeDomainData(
        timeData
    );


    let sumSquares =
        0;

    let peak =
        0;


    for (
        let i = 0;
        i < timeData.length;
        i++
    ) {

        const value =
            Math.abs(
                (timeData[i] - 128) /
                128
            );


        sumSquares +=
            value * value;


        if (value > peak) {

            peak =
                value;
        }
    }


    const rms =
        Math.sqrt(
            sumSquares /
            timeData.length
        );


    analyser.getByteFrequencyData(
        frequencyData
    );


    let frequencySum =
        0;


    for (
        let i = 0;
        i < frequencyData.length;
        i++
    ) {

        frequencySum +=
            frequencyData[i];
    }


    const frequencyAverage =
        frequencyData.length > 0
            ? frequencySum /
              frequencyData.length
            : 0;


    return {
        rms: rms,
        peak: peak,
        frequencyAverage:
            frequencyAverage
    };
}


/* =====================================================
   DETECT BLOW
===================================================== */

function detectBlow() {

    if (
        !isListening ||
        candleBlown ||
        !analyser
    ) {
        return;
    }


    const level =
        getMicrophoneLevel();


    const rms =
        level.rms;

    const peak =
        level.peak;

    const frequencyAverage =
        level.frequencyAverage;


    /*
       Dynamic threshold.

       This is intentionally not too high
       because phone microphones often
       behave differently from laptop
       microphones.
    */

    const dynamicThreshold =
        Math.max(
            noiseLevel + 0.018,
            0.035
        );


    /*
       A blow usually produces a stronger
       broad microphone signal.

       We use more than one condition so
       normal tiny background sounds are
       less likely to trigger it.
    */

    const loudEnough =
        rms > dynamicThreshold;

    const strongPeak =
        peak > 0.18;

    const strongSound =
        frequencyAverage > 8;


    const isBlow =
        loudEnough &&
        (
            strongPeak ||
            strongSound
        );


    if (isBlow) {

        blowFrames += 1;

    } else {

        blowFrames =
            Math.max(
                0,
                blowFrames - 1
            );
    }


    /*
       Display microphone level.
       This is useful while testing
       on your phone.
    */

    if (blowText) {

        blowText.textContent =
            `💨 Blow now! Level: ${rms.toFixed(3)}`;
    }


    console.log(
        "Mic level:",
        rms.toFixed(3),
        "Peak:",
        peak.toFixed(3),
        "Frequency:",
        frequencyAverage.toFixed(1),
        "Threshold:",
        dynamicThreshold.toFixed(3),
        "Frames:",
        blowFrames
    );


    /*
       Four consecutive readings are
       required before candles blow out.
    */

    if (blowFrames >= 4) {

        blowOutCandles();

        return;
    }


    requestAnimationFrame(
        detectBlow
    );
}


/* =====================================================
   STOP MICROPHONE
===================================================== */

function stopMicrophone() {

    isListening =
        false;


    if (microphone) {

        try {

            microphone.disconnect();

        }

        catch (error) {

            console.log(
                "Microphone disconnect error:",
                error
            );
        }

        microphone =
            null;
    }


    if (micStream) {

        micStream
            .getTracks()
            .forEach(track => {

                track.stop();
            });


        micStream =
            null;
    }
}


/* =====================================================
   BLOW OUT CANDLES
===================================================== */

function blowOutCandles() {

    if (candleBlown) {
        return;
    }


    candleBlown =
        true;


    stopMicrophone();


    /* -----------------------------------------
       Blow out candles one by one
    ----------------------------------------- */

    candles.forEach(
        (candle, index) => {

            setTimeout(() => {

                candle.classList.add(
                    "blown"
                );

            }, index * 220);
        }
    );


    if (blowText) {

        blowText.textContent =
            "🎉 Wish made! Happy Birthday, My Love! ❤️";
    }


    /* -----------------------------------------
       Phone vibration
    ----------------------------------------- */

    if (
        navigator.vibrate
    ) {

        navigator.vibrate([
            60,
            40,
            100
        ]);
    }


    /* -----------------------------------------
       Birthday song
    ----------------------------------------- */

    setTimeout(() => {

        playBirthdaySong();

    }, 900);


    /* -----------------------------------------
       Birthday message + effects
    ----------------------------------------- */

    setTimeout(() => {

        if (birthdayMessage) {

            birthdayMessage.classList.remove(
                "hidden"
            );
        }


        createConfetti();


        createCrackerBurst();


        playCrackerSound();


    }, 1200);
}


/* =====================================================
   PLAY BIRTHDAY SONG
===================================================== */

function playBirthdaySong() {

    if (!birthdaySong) {

        console.log(
            "Birthday audio element not found."
        );

        return;
    }


    birthdaySong.currentTime =
        0;

    birthdaySong.volume =
        0.8;

    birthdaySong.muted =
        false;


    const playPromise =
        birthdaySong.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                audioUnlocked =
                    true;

                console.log(
                    "🎵 HAPPY BIRTHDAY SONG STARTED!"
                );

            })
            .catch(error => {

                console.error(
                    "Birthday song was blocked:",
                    error
                );


                /*
                   If the browser blocks
                   automatic playback, show
                   a button the user can tap.
                */

                showPlaySongButton();
            });
    }
}


/* =====================================================
   MANUAL CANDLE FALLBACK
===================================================== */

function showManualBlowButton() {

    let manualButton =
        document.getElementById(
            "manualBlowBtn"
        );


    if (manualButton) {

        manualButton.classList.remove(
            "hidden"
        );

        return;
    }


    manualButton =
        document.createElement(
            "button"
        );


    manualButton.id =
        "manualBlowBtn";


    manualButton.textContent =
        "💨 Tap here to blow the candles";


    manualButton.style.marginTop =
        "15px";


    manualButton.style.padding =
        "14px 25px";


    manualButton.style.border =
        "none";


    manualButton.style.borderRadius =
        "30px";


    manualButton.style.background =
        "#ff4f91";


    manualButton.style.color =
        "white";


    manualButton.style.fontSize =
        "15px";


    manualButton.style.cursor =
        "pointer";


    manualButton.style.boxShadow =
        "0 0 20px rgba(255,79,145,.5)";


    manualButton.addEventListener(
        "click",
        () => {

            blowOutCandles();
        }
    );


    if (
        startBtn &&
        startBtn.parentNode
    ) {

        startBtn.parentNode.appendChild(
            manualButton
        );
    }
}


/* =====================================================
   PLAY SONG FALLBACK BUTTON
===================================================== */

function showPlaySongButton() {

    if (
        document.getElementById(
            "playBirthdaySongBtn"
        )
    ) {
        return;
    }


    const button =
        document.createElement(
            "button"
        );


    button.id =
        "playBirthdaySongBtn";


    button.textContent =
        "🎵 Play Birthday Song ❤️";


    button.style.position =
        "fixed";


    button.style.bottom =
        "25px";


    button.style.left =
        "50%";


    button.style.transform =
        "translateX(-50%)";


    button.style.zIndex =
        "2000";


    button.style.padding =
        "14px 25px";


    button.style.border =
        "none";


    button.style.borderRadius =
        "30px";


    button.style.background =
        "#ff4f91";


    button.style.color =
        "white";


    button.style.fontSize =
        "16px";


    button.style.cursor =
        "pointer";


    button.style.boxShadow =
        "0 0 20px rgba(255,79,145,.5)";


    document.body.appendChild(
        button
    );


    button.addEventListener(
        "click",
        () => {

            birthdaySong.currentTime =
                0;

            birthdaySong.volume =
                0.8;

            birthdaySong.muted =
                false;


            const playPromise =
                birthdaySong.play();


            if (
                playPromise !== undefined
            ) {

                playPromise
                    .then(() => {

                        button.remove();

                    })
                    .catch(error => {

                        console.error(
                            "Birthday song could not play:",
                            error
                        );
                    });
            }
        }
    );
}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.innerHTML =
            "✨";


        confetti.style.position =
            "fixed";


        confetti.style.left =
            Math.random() *
            100 +
            "vw";


        confetti.style.top =
            "-20px";


        confetti.style.fontSize =
            Math.random() *
            20 +
            10 +
            "px";


        confetti.style.zIndex =
            "200";


        confetti.style.pointerEvents =
            "none";


        confetti.style.animation =
            `fall ${
                Math.random() * 3 + 2
            }s linear forwards`;


        document.body.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 5000);
    }
}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHearts() {

    const container =
        document.getElementById(
            "heart-container"
        );


    if (!container) {
        return;
    }


    setInterval(() => {

        const heart =
            document.createElement(
                "div"
            );


        heart.classList.add(
            "floating-heart"
        );


        const hearts = [
            "❤️",
            "💕",
            "💗",
            "💖",
            "✨"
        ];


        heart.innerHTML =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            Math.random() *
            100 +
            "vw";


        heart.style.fontSize =
            Math.random() *
            20 +
            10 +
            "px";


        heart.style.animationDuration =
            Math.random() *
            5 +
            5 +
            "s";


        container.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 10000);


    }, 700);
}


/* =====================================================
   FIREWORKS
===================================================== */

function createFireworks() {

    const symbols = [
        "✨",
        "❤️",
        "💖",
        "⭐",
        "💕"
    ];


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const spark =
            document.createElement(
                "div"
            );


        spark.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        spark.style.position =
            "fixed";


        spark.style.left =
            "50%";


        spark.style.top =
            "50%";


        spark.style.fontSize =
            Math.random() *
            20 +
            10 +
            "px";


        spark.style.zIndex =
            "100";


        spark.style.pointerEvents =
            "none";


        document.body.appendChild(
            spark
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() *
            400 +
            100;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        const animation =
            spark.animate(

                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${x}px),
                                calc(-50% + ${y}px)
                            ) scale(0)`,

                        opacity: 0
                    }
                ],

                {
                    duration:
                        1500 +
                        Math.random() *
                        1000,

                    easing:
                        "cubic-bezier(.2,.8,.3,1)"
                }
            );


        animation.onfinish =
            () => {

                spark.remove();
            };
    }
}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },

        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(
        ".photo-card, .reason-card, .letter, .music-player"
    )
    .forEach(element => {

        element.style.opacity =
            "0";


        element.style.transform =
            "translateY(40px)";


        element.style.transition =
            "opacity 1s ease, transform 1s ease";


        observer.observe(
            element
        );
    });