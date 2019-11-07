const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)


fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve/" + id)
    .then(res => res.json())
    .then(showEvent)

function showEvent(event) {
    console.log(event)

        //console.log(imgPath)

    document.querySelector("article h1").textContent = event.title.rendered;

    document.querySelector(".longdescription").textContent = event.content.rendered;

    document.querySelector(".artist").textContent = event.support_artist;

    //image settings



}
