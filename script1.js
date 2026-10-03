/* =====================================================
   START SURPRISE
===================================================== */

let heartsStarted = false;
let countdownTimer = null;


function playCrackerSound() {

    /*
        Put your cracker sound here:

        sounds/crackers.mp3
    */

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
            350 + 120;


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

    /*
        Sound starts directly from the
        button click.
    */

    playCrackerSound();


    /*
        Visual cracker burst.
    */

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


        if (
            playPromise !== undefined
        ) {

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


    /*
       Small vibration on supported phones.
    */

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
   BLOW CANDLES
===================================================== */

// let candlesBlown =
//     false;


// function blowCandles() {

//     if (candlesBlown) {
//         return;
//     }


//     candlesBlown =
//         true;


//     const cake =
//         document.querySelector(
//             ".cake"
//         );


//     if (cake) {

//         cake.classList.add(
//             "candles-out"
//         );

//     }


//     const button =
//         document.querySelector(
//             ".blow-btn"
//         );


//     if (button) {

//         button.style.display =
//             "none";

//     }


//     createFireworks();


//     setTimeout(() => {

//         const message =
//             document.getElementById(
//                 "final-message"
//             );


//         if (!message) {
//             return;
//         }


//         message.classList.remove(
//             "hidden"
//         );


//         message.scrollIntoView({
//             behavior: "smooth",
//             block: "center"
//         });


//     }, 1500);
// }
// const startBtn = document.getElementById("startBlowBtn");
// const blowText = document.getElementById("blowText");
// const birthdaySong = document.getElementById("birthdaySong");
// const birthdayMessage = document.getElementById("birthdayMessage");

// const candles = document.querySelectorAll(".candle");

// let audioContext;
// let analyser;
// let microphone;
// let dataArray;

// let isListening = false;
// let candleBlown = false;


// /* ==========================================
//    START MICROPHONE
// ========================================== */

// startBtn.addEventListener("click", async () => {

//     try {

//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true
//         });

//         audioContext = new AudioContext();

//         microphone = audioContext.createMediaStreamSource(stream);

//         analyser = audioContext.createAnalyser();

//         analyser.fftSize = 512;

//         dataArray = new Uint8Array(
//             analyser.frequencyBinCount
//         );

//         microphone.connect(analyser);

//         isListening = true;

//         startBtn.style.display = "none";

//         blowText.textContent =
//             "💨 Now blow into your microphone!";

//         detectBlow();

//     } catch (error) {

//         console.error(error);

//         blowText.textContent =
//             "⚠️ Please allow microphone access.";

//     }

// });


// /* ==========================================
//    DETECT BLOW
// ========================================== */

// function detectBlow() {

//     if (!isListening || candleBlown) {
//         return;
//     }

//     analyser.getByteFrequencyData(dataArray);

//     let sum = 0;

//     for (let i = 0; i < dataArray.length; i++) {
//         sum += dataArray[i];
//     }

//     const average = sum / dataArray.length;


//     /*
//        Higher value = louder sound.

//        You can adjust this number.
//        Try 45–80 depending on microphone.
//     */

//     if (average > 55) {

//         blowOutCandles();

//         return;
//     }


//     requestAnimationFrame(detectBlow);
// }


// /* ==========================================
//    BLOW OUT CANDLES
// ========================================== */

// function blowOutCandles() {

//     candleBlown = true;
//     isListening = false;

//     candles.forEach((candle, index) => {

//         setTimeout(() => {

//             candle.classList.add("blown");

//         }, index * 250);

//     });


//    blowText.textContent =
    //    "🎉 Wish made! Happy Birthday! ❤️";

//        Start song after candles go out
//     */

//     setTimeout(() => {

//         birthdaySong.currentTime = 0;

//         birthdaySong.play()
//             .then(() => {

//                 console.log("Birthday song started!");

//             })
//             .catch(error => {

//                 console.log(
//                     "Song could not autoplay:",
//                     error
//                 );

//             });

//     }, 800);


//     /*
//        Show birthday message
//     */

//     setTimeout(() => {

//         birthdayMessage.classList.remove("hidden");

//         createConfetti();

//     }, 1200);

// }


// /* ==========================================
//    CONFETTI
// ========================================== */

// function createConfetti() {

//     for (let i = 0; i < 80; i++) {

//         const confetti =
//             document.createElement("div");

//         confetti.innerHTML = "✨";

//         confetti.style.position = "fixed";
//         confetti.style.left =
//             Math.random() * 100 + "vw";

//         confetti.style.top = "-20px";

//         confetti.style.fontSize =
//             Math.random() * 20 + 10 + "px";

//         confetti.style.zIndex = "200";

//         confetti.style.animation =
//             `fall ${Math.random() * 3 + 2}s linear forwards`;

//         document.body.appendChild(confetti);


//         setTimeout(() => {
//             confetti.remove();
//         }, 5000);

//     }

// }
const startBtn = document.getElementById("startBlowBtn");
const blowText = document.getElementById("blowText");
const birthdaySong = document.getElementById("birthdaySong");
const birthdayMessage = document.getElementById("birthdayMessage");

const candles = document.querySelectorAll(".candle");

let audioContext;
let analyser;
let microphone;
let dataArray;

let isListening = false;
let candleBlown = false;


/* ==========================================
   START MICROPHONE + UNLOCK SONG
========================================== */

startBtn.addEventListener("click", async () => {

    try {

        // Ask for microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        // Create audio context
        audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();

        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }


        /* --------------------------------------
           IMPORTANT:
           Unlock the audio element while this
           click is still considered a user action.
        -------------------------------------- */

        birthdaySong.volume = 0.8;

        birthdaySong.muted = true;

        await birthdaySong.play();

        birthdaySong.pause();

        birthdaySong.currentTime = 0;

        birthdaySong.muted = false;


        // Microphone analyser
        microphone =
            audioContext.createMediaStreamSource(stream);

        analyser =
            audioContext.createAnalyser();

        analyser.fftSize = 512;

        dataArray =
            new Uint8Array(analyser.frequencyBinCount);

        microphone.connect(analyser);

        isListening = true;

        startBtn.style.display = "none";

        blowText.textContent =
            "💨 Blow into the microphone!";

        detectBlow();

    }

    catch (error) {

        console.error("Microphone error:", error);

        blowText.textContent =
            "⚠️ Please allow microphone access and try again.";

    }

});


/* ==========================================
   DETECT BLOW
========================================== */

function detectBlow() {

    if (!isListening || candleBlown) {
        return;
    }

    analyser.getByteFrequencyData(dataArray);

    let sum = 0;

    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }

    const average =
        sum / dataArray.length;


    console.log("Mic level:", average);


    // Adjust this if necessary
    if (average > 55) {

        blowOutCandles();

        return;
    }

    requestAnimationFrame(detectBlow);
}


/* ==========================================
   BLOW OUT CANDLES
========================================== */

// function blowOutCandles() {

//     candleBlown = true;
//     isListening = false;

//     // Stop microphone
//     if (microphone) {
//         microphone.disconnect();
//     }


//     /* --------------------------------------
//        Blow out candles one by one
//     -------------------------------------- */

//     candles.forEach((candle, index) => {

//         setTimeout(() => {

//             candle.classList.add("blown");

//         }, index * 200);

//     });


//     blowText.textContent =
//         "🎉 Wish made! Happy Birthday! ❤️";


//     /* --------------------------------------
//        PLAY SONG
//     -------------------------------------- */

//     setTimeout(() => {

//         birthdaySong.currentTime = 0;

//         birthdaySong.muted = false;

//         birthdaySong.volume = 0.8;

//         const playPromise =
//             birthdaySong.play();

//         if (playPromise !== undefined) {

//             playPromise
//                 .then(() => {

//                     console.log(
//                         "🎵 Birthday song is playing!"
//                     );

//                 })
//                 .catch(error => {

//                     console.error(
//                         "Song playback failed:",
//                         error
//                     );

//                     blowText.textContent =
//                         "🎵 Click anywhere to start the birthday song.";

//                 });

//         }

//     }, 800);


//     /* --------------------------------------
//        Birthday message
//     -------------------------------------- */

//     setTimeout(() => {

//         birthdayMessage.classList.remove("hidden");

//         createConfetti();

//     }, 1200);

// }
function blowOutCandles() {

    candleBlown = true;
    isListening = false;


    // Stop microphone
    if (microphone) {
        microphone.disconnect();
    }


    /* =================================
       BLOW OUT CANDLES ONE BY ONE
    ================================= */

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add("blown");

        }, index * 250);

    });


    blowText.textContent =
        "🎉 Wish made! ❤️";


    /* =================================
       PLAY BIRTHDAY SONG
    ================================= */

    setTimeout(() => {

        birthdaySong.currentTime = 0;

        birthdaySong.volume = 0.8;

        birthdaySong.muted = false;

        birthdaySong.play()
            .then(() => {

                console.log("🎵 Song started!");

            })
            .catch(error => {

                console.error(
                    "Song could not play:",
                    error
                );

            });

    }, 700);


    /* =================================
       SHOW YOUR LOVE MESSAGE
    ================================= */

    setTimeout(() => {

        birthdayMessage.classList.remove("hidden");

        createConfetti();

    }, 900);

}


/* ==========================================
   CONFETTI
========================================== */

function createConfetti() {

    for (let i = 0; i < 80; i++) {

        const confetti =
            document.createElement("div");

        confetti.innerHTML = "✨";

        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-20px";

        confetti.style.fontSize =
            Math.random() * 20 + 10 + "px";

        confetti.style.zIndex = "200";

        confetti.style.animation =
            `fall ${Math.random() * 3 + 2}s linear forwards`;

        document.body.appendChild(confetti);

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