console.clear();

let repeats = 0;
let loaded = false;

function createCharSpans(targetClass) {
    const animatedEls = document.querySelectorAll(targetClass);
    const returnChars = [];
    animatedEls.forEach((el) => {
        const chars = el.innerText.split("");
        console.log(chars);
        el.innerHTML = "";
        chars.forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.innerHTML = char.replace(" ", "&nbsp;");

            el.appendChild(charSpan);
        });
    });
}

function animatePreloaderText() {
    createCharSpans(".preloader__text");
    const chars = gsap.utils.toArray(".preloader__text span");
    const tl = gsap.timeline().to(chars, {
        y: "-=15",
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        onRepeat() {
            if (loaded) {
                repeats += 1;
                if (repeats > 2) {
                    preloaderTextTl.repeat(1).pause();
                    // animatePreloaderPane();
                    loadTl.play("end");
                }
            }
        }
    });
    return tl;
}

function animatePreloaderPane() {
    return gsap.timeline().to(".preloader__pane", { scaleX: 1 });
}

const loadTl = gsap.timeline();
const preloaderTextTl = animatePreloaderText();
loadTl.add(preloaderTextTl);

window.addEventListener("DOMContentLoaded", () => {
    loadTl.add(animatePreloaderPane(), "end");
    setTimeout(() => {
        loaded = true;
    }, 3500);
});

//au bous de 3s rediriger vers la page main
setTimeout(function(){
    window.location.href = "main.html";

},3000);

const tl = new TimelineMax()

const $progressBar = document.getElementById('progressbar')

tl
    .to($progressBar, 3, {
        value: 100,
        ease: Power2.easeInOut
    })
    .repeat(-1)




