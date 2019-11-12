

window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) {
        //console.log("this is a search")
        getSearchData();
    } else if(id) {
        getSingleEvent();
    } else if(category){
            //category
     getCategoryData(category);
    } else {
        //console.log("NOT searching")
        getEventsData();
    }
    getNavigation()
}

function getNavigation (){
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/categories?")
    .then(res => res.json())
        .then(data=>{
        //console.log(data)
        data.forEach(addLink)
    } )
}

function addLink(oneItem){
   //console.log(oneItem);
   // document.querySelector("nav").innerHTML=oneItem.name
    if(oneItem.parent === 0 && oneItem.count> 0){
    const link = document.createElement("a");
    link.textContent = oneItem.name;
    link.setAttribute("href", "category.html?category="+oneItem.id);
    document.querySelector("nav").appendChild(link);
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

function getCategoryData(categoryId) {
    console.log("categoryId");
      fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve?_embed&categories="+ categoryId)
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

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function setMenu() {
  var x = document.getElementById("menuBar");
  if (x.className === "menu") {
    x.className += "responsive";
  } else {
    x.className = "menu";
  }
}
