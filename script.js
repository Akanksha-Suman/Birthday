/* =====================================================
   START SURPRISE
===================================================== */

function startSurprise() {

    const intro = document.getElementById("intro");
    const main = document.getElementById("main-content");

    intro.style.opacity = "0";
    intro.style.transition = "1.5s";

    setTimeout(() => {

        intro.style.display = "none";

        main.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        createHearts();

    }, 1500);
}



/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    const birthday = new Date("October 7, 2026 00:00:00").getTime();

    const now = new Date().getTime();

    const difference = birthday - now;


    if (difference <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        document.getElementById("birthday-message").innerText =
            "TODAY IS YOUR DAY, MY CHAMPION! 🎂❤️";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


setInterval(updateCountdown, 1000);

updateCountdown();



/* =====================================================
   MUSIC PLAYER
===================================================== */

const song = document.getElementById("song");

const musicButton = document.getElementById("musicButton");

const vinyl = document.querySelector(".vinyl");


function toggleMusic() {

    if (song.paused) {

        song.play();

        musicButton.innerHTML = "❚❚";

        vinyl.classList.add("playing");

    } else {

        song.pause();

        musicButton.innerHTML = "▶";

        vinyl.classList.remove("playing");

    }

}



/* =====================================================
   LOVE LETTER
===================================================== */

function openLetter() {

    const envelope =
        document.getElementById("envelope");

    const letter =
        document.getElementById("letter");

    envelope.classList.add("open");

    setTimeout(() => {

        letter.classList.remove("hidden");

        letter.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 800);

}



/* =====================================================
   REASONS CARDS
===================================================== */

// function revealReason(card) {

//     card.classList.toggle("revealed");

// }
 function revealReason(card) {

    // Reveal the selected card
    card.classList.toggle("revealed");

}



/* =====================================================
   BLOW CANDLES
===================================================== */

function blowCandles() {

    const cake =
        document.querySelector(".cake");

    cake.classList.add("candles-out");

    const button =
        document.querySelector(".blow-btn");

    button.style.display = "none";


    createFireworks();


    setTimeout(() => {

        const message =
            document.getElementById("final-message");

        message.classList.remove("hidden");

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 1500);

}



/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHearts() {

    const container =
        document.getElementById("heart-container");


    setInterval(() => {

        const heart =
            document.createElement("div");

        heart.classList.add("floating-heart");

        heart.innerHTML =
            ["❤️", "💕", "💗", "💖", "✨"][
                Math.floor(Math.random() * 5)
            ];

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            Math.random() * 20 + 10 + "px";

        heart.style.animationDuration =
            Math.random() * 5 + 5 + "s";


        container.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 10000);


    }, 700);

}



/* =====================================================
   FIREWORKS
===================================================== */

function createFireworks() {

    for (let i = 0; i < 60; i++) {

        const spark =
            document.createElement("div");

        spark.innerHTML =
            ["✨", "❤️", "💖", "⭐", "💕"][
                Math.floor(Math.random() * 5)
            ];

        spark.style.position = "fixed";

        spark.style.left = "50%";

        spark.style.top = "50%";

        spark.style.fontSize =
            Math.random() * 20 + 10 + "px";

        spark.style.zIndex = "100";

        spark.style.pointerEvents = "none";


        document.body.appendChild(spark);


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 400 + 100;


        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        spark.animate(

            [
                {
                    transform: "translate(-50%, -50%) scale(1)",
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
                duration: 1500 + Math.random() * 1000,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }

        );


        setTimeout(() => {

            spark.remove();

        }, 3000);

    }

}



/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


document.querySelectorAll(
    ".photo-card, .reason-card, .letter, .music-player"
).forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(40px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});