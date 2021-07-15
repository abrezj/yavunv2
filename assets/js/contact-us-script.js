const form = document.getElementById("contact-us-form");
 const subscribeForm = document.getElementById("subscribe-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var country = $("#country-select").val();
  var company = $("#company").val();
  var email = $("#email").val();
  var phone = $("#phone").val();
  var message = $("#message").val();

  if (firstName == "") {
    $("span.name_error").show();
  }
  if (country == "") {
    $("span.countrySelect_error").show();
  }
  if (email == "") {
    $("span.email_error").show();
  }
  if (!validPhoneNumber(phone)) {
    $("span.phone_error").show();
  }
  if (message == "") {
    $("span.message_error").show();
  }
  if (company == "") {
    $("span.company_error").show();
  }

  if (
    firstName == "" ||
    country == "" ||
    email == "" ||
    !validPhoneNumber(phone) ||
    message == "" ||
    company == ""
  ) {
    $("input#fname").focus();
  } else {
    $(".error-message").hide();

    setTimeout(function () {
      $(".successful-message").hide();
    }, 3000);
    apiFunction(firstName, country, email, phone, message, company);
  }
});

function touchField(field) {
  if (field == "firstName") {
    $("span.name_error").hide();
  }
  if (field == "countrySelect") {
    $("span.countrySelect_error").hide();
  }
  if (field == "email") {
    $("span.email_error").hide();
  }
  if (field == "phone") {
    $("span.phone_error").hide();
  }
  if (field == "message") {
    $("span.message_error").hide();
  }
  if (field == "company") {
    $("span.company_error").hide();
  }
  if (field == "subscribe_form") {
    $("div.valid-mail_error").hide();
  }
}

function apiFunction(firstName, country, email, phone, message, company) {
  $(".spinner-border").show();
  $(".container").css("background-color", "#3F48BF");

  var emailRecipients =
    "&firstName=" +
    firstName +
    "&country=" +
    country +
    "&company=" +
    company +
    "&email=" +
    email +
    "&phone=" +
    phone +
    "&listId=" +
    "982";
  if (firstName == "" || country == "" || company == "") {
    $(".success").fadeOut(200).hide();
    $(".error").fadeOut(200).show();
  } else {
    $.ajax({
      type: "POST",
      url: "http://api.yavun.com/api/1477/recipients",
      data: emailRecipients,
      success: function (res) {
        $(".spinner-border").hide();
        $(".successful-message").show();
        $(".container").css("background-color", "#8cd1ff");
        console.log(res);
        form.reset();
      },
      error: function () {
        $(".error-message").show();
        $(".spinner-border").hide();
      },
    });
  }
}

$("#subscribe").on("click", function () {
  var email = $("#subscribe_form").val();
  console.log(email);
  if (validateEmail(email)) {
    // Call API As in Contact form

    var emailValid = "&email=" + email + "&listId=" + "982";
    $.ajax({
      type: "POST",
      url: "http://api.yavun.com/api/1477/recipients",
      data: emailValid,
      success: function (res) {
        console.log(res);
        $(".not-valid-message").hide();
        subscribeForm.reset();
      },
      error: function () {
        $(".not-valid-message").show(); // toaster message we get when api response is false regards to that email
      },
    });
    console.log("validate");
  } else {
    $("div.valid-mail_error").show();
  }
});

var validateEmail = function (email) {
  var regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    email !== "" && email !== null && email !== undefined && regEx.test(email)
  );
};

var validPhoneNumber = function (phone) {
  var phoneNo = /^\d{10}$/;

  return (
    phone !== "" && phone !== null && phone !== undefined && phoneNo.test(phone)
  );

};