/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

const sections = [...document.querySelectorAll("section")]; //destructuring just to be safe as nodelist might not have forEach on all browsers

// Creates a li tag with a href inside it, that can link to a section. Uses the window fragment identifier to jump to sections on click
const createLiElem = (section) => {
    const liTag = document.createElement("li");
    let anchorTag = document.createElement("a");

    anchorTag.href = `#${section.id}`;
    anchorTag.innerText = section.dataset.nav;
    anchorTag.classList.add("menu__link");
    anchorTag.onclick = () => {
        window.removeEventListener("scroll", onScroll);
        const activeElements = document.querySelectorAll(".active");
        activeElements.forEach((elem) => elem.classList.remove("active"));
        anchorTag.classList.add("active");
        window.addEventListener("scroll", onScroll);
    };
    liTag.appendChild(anchorTag);
    return liTag;
};

/* https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/ */
const inViewport = (elem) => {
    const boundingClient = elem.getBoundingClientRect();
    return (
        boundingClient.top >= 0 &&
        boundingClient.left >= 0 &&
        boundingClient.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        boundingClient.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

//On scroll event, check if element is in viewport and then add active class to it
const onScroll = () => {
    sections.forEach((section) => {
        if (inViewport(section)) {
            section.classList.add("your-active-class");
            document.querySelector(`a[href="#${section.id}"]`).classList.add("active");
        } else {
            section.classList.remove("your-active-class");
            document.querySelector(`a[href="#${section.id}"]`).classList.remove("active");
        }
    });
};

//create the nav
sections.forEach((section) => {
    const liTag = createLiElem(section);
    document.querySelector("ul").appendChild(liTag);
});

window.addEventListener("scroll", onScroll);
