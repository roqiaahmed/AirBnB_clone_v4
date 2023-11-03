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
});
