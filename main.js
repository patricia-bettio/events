window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");
    const tag = urlParams.get("tag");

    if (search) {
        //console.log("this is a search")
        getSearchData();
    } else if (id) {
        getSingleEvent();
    } else if (category) {
        //category
        getCategoryData(category);
    } else if (tag) {
        getTagData(tag); // the id of the tag
    } else {
        //console.log("NOT searching")
        getEventsData();
    }
    getNavigation()
    getTags();
    getVenue();

}


//BASTARD CAFE page

function getVenue() {
    //console.log("getVenue")
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/venues/48")
        .then(res => res.json())
        .then(showVenue)


    function showVenue(venue) {
        //console.log(venue);
        //1.clone the template
        const template = document.querySelector(".venueTemplate").content;
        const venueCopy = template.cloneNode(true);
        //2.text content and inner html
        const house = venueCopy.querySelector(".venueHouse");
        house.innerHTML = venue.title.rendered;

        const venueDescription = venueCopy.querySelector(".venueDescription");
        venueDescription.innerHTML = venue.content.rendered;

        const location = venueCopy.querySelector(".location");
        location.textContent = venue.location;

        const hours = venueCopy.querySelector(".hours");
        hours.textContent = venue.hours;

        /*
        Create function: IF they exist, Display. Otherwise, not.
        const name = venueCopy.querySelector(".contactName");
          name.textContent = venue.contact_name;

          const email = venueCopy.querySelector(".contactEmail");
          email.textContent = venue.contact_email;*/

        const phone = venueCopy.querySelector(".phone");
        phone.textContent = venue.contact_phone;

        const site = venueCopy.querySelector(".externalSite");
        site.textContent = venue.external_site;


        //3. append
        document.querySelector("#venues").appendChild(venueCopy);
    }

}

//*****bastard cafe ends*****//

//get Navbar with categories
function getNavigation() {
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/categories?")
        .then(res => res.json())
        .then(data => {
            //console.log("categories here", data)
            data.forEach(addLink)
        })
}

//get Tags
function getTags() {
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/tags?")
        .then(res => res.json())
        .then(data => {
            //console.log("tags here", data);
            data.forEach(addTagLink);
        })
}


function addTagLink(tag) {
    //    console.log(tag.name);
    if (tag.name) {
        const link = document.createElement("a");
        link.textContent = tag.name;
        //        console.log(link);
        link.setAttribute("href", "tags.html?tag=" + tag.id);
        // check if the URL contains the word "tags"
        if (window.location.href.indexOf("search") == -1) // if equal to -1 then it does not contain the string ****
            document.querySelector("#tagNav").appendChild(link);
    }
}

//adding the categories under the same parent: categories which parent is Venue
function addLink(oneItem) {
    //console.log(oneItem);
    // document.querySelector("nav").innerHTML=oneItem.name
    if (oneItem.parent === 3 && oneItem.count > 0) {
        const link = document.createElement("a");
        link.textContent = oneItem.name;
        link.setAttribute("href", "category.html?category=" + oneItem.id);
        document.querySelector("nav").appendChild(link);
    }
}


//search
function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");



    //console.log("getData")
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/events?_embed&search=" + search)
        .then(res => res.json())
        .then(useData)
}


//fecthing individual Events
function getEventsData() {
    //console.log("getData")
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/events?_embed")
        .then(res => res.json())
        .then(useData)
}

function getCategoryData(categoryId) {
    //console.log("categoryId");
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/events?_embed&categories=" + categoryId)
        .then(res => res.json())
        .then(useData)

}

function getTagData(tagId) {
    //console.log("tag id", tagId);
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/events?_embed&tags=" + tagId) // if tag is empty, then the result of the link would be []
        .then(res => res.json()) //
        .then(useData)
}

//page with Individual events- detailed events
function getSingleEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    //console.log(id)


    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/events/" + id)
        .then(res => res.json())
        .then(showEvent)

    function showEvent(event) {
       // console.log(event)
        document.querySelector("article h1").textContent = event.title.rendered;
        document.querySelector(".cover").setAttribute("src", event.image.guid);
        document.querySelector(".longdescription").innerHTML = event.content.rendered;
        document.querySelector(".artist").textContent = event.artist;
    }

}

//no events message
function useData(myData) { // if the tag returns empty array, then myData = []
    if (myData.length > 0) { // if there are events
        myData.forEach(showEvent);
    } else { // if there are no events
        //console.log("sorry no data");
        document.querySelector(".no-events-text").classList.add("show");
    }
    //console.log(myData)
}

//TEMPLATE
function showEvent(event) {
    //console.log(event)
    //2- Clone the template
    //image
    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    //console.log(imgPath)

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3- textcontent and ineer HTML
    const h1 = eventCopy.querySelector("h1");
    h1.innerHTML = event.title.rendered;

    const prices = eventCopy.querySelector(".prices");
    prices.innerHTML = event.price;

    const date = eventCopy.querySelector(".date");
    date.textContent = event.when;

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

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on   the icon */
function setMenu() {
    console.log(setMenu);
    var x = document.getElementById("menuBar");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}
