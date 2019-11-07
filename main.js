window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");

    if (search) {
        console.log("this is a search")
        getSearchData();
    } else if(id) {
              getSingleEvent();

    } else {
        console.log("NOT searching")
        getEventsData();
    }
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");



    //console.log("getData")
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve?_embed&search=" + search)
        .then(res => res.json())
        .then(useData)
}



function getEventsData() {
    //console.log("getData")
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve?_embed")
        .then(res => res.json())
        .then(useData)
}

function getSingleEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id)


    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve/" + id)
        .then(res => res.json())
        .then(showEvent)

    function showEvent(event) {
        console.log(event)
        document.querySelector("article h1").textContent = event.title.rendered;
        document.querySelector(".longdescription").textContent = event.content.rendered;
        document.querySelector(".artist").textContent = event.support_artist;
    }

}

function useData(myData) {
    //console.log(myData)

    //1- Loop the array
    myData.forEach(showEvent)
}

function showEvent(event) {
    //console.log(event)
    //2- Clone the template
    //image
    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
    //console.log(imgPath)
    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);
    //3- textcontent and ineer HTML
    const h1 = eventCopy.querySelector("h1");
    h1.textContent = event.title.rendered;

    const prices = eventCopy.querySelector(".prices");
    prices.innerHTML = event.price;

    const date = eventCopy.querySelector(".date");
    date.textContent = event.time_and_date;

    const shortdescription = eventCopy.querySelector(".shortdescription");
    shortdescription.textContent = event.description;






    //image
    const img = eventCopy.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Image of" + event.title.rendered)

    //subpage
    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id

    //4- Append
    document.querySelector("#events").appendChild(eventCopy);

}
