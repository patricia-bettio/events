window.addEventListener("DOMContentLoaded", getVenue);

function getVenue(){
    console.log ("getVenue")
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/venues/48")
    .then(res=>res.json())
    .then(showVenue)


function showVenue(venue){
    console.log(venue);
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
