$(document).ready(function () {
  const amenitDict = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(":checked")) {
      amenitDict[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenitDict[$(this).attr("data-id")];
    }
    $(".amenities h4").text(Object.values(amenitDict).join(", "));
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        const html = `
          <article>
          <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">${place.max_guest} Guest${
          place.max_guest !== 1 ? "s" : ""
        }</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${
          place.number_rooms !== 1 ? "s" : ""
        }</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
          place.number_bathrooms !== 1 ? "s" : ""
        }</div>
          <div class="user">
          <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
          </div>
          </div>
          <div class="description">
          ${place.description}
          </div>
          </article>
          `;
        $("section.places").append(html);
      }
    },
  });
  $("button").click(function () {
    $("section.places").empty();
    $.ajax({
      url: "http://http://0.0.0.0:5001/api/v1/places_search/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ amenities: Object.keys(amenitDict) }),
      success: function (data) {
        searchPlaces(data);
        for (const place of data) {
          const html = `
          <article>
          <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">${place.max_guest} Guest${
            place.max_guest !== 1 ? "s" : ""
          }</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? "s" : ""
          }</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
            place.number_bathrooms !== 1 ? "s" : ""
          }</div>
          <div class="user">
          <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
          </div>
          </div>
          <div class="description">
          ${place.description}
          </div>
          </article>
          `;
          $("section.places").append(html);
        }
      },
    });
  });
});
