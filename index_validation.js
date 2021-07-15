const subscribeForm = document.getElementById("subscribe-form");
const errorMessage = document.getElementsByClassName("not-valid-message")[0];
const form = document.querySelector("#subscribe-form");
const successAlert = document.querySelector("#successAlert");
const serverIssue = document.querySelector("#serverIssue");

validateEmail = (email) => {
  var match = /^\w+[-\.\w]@(\w+[-\.\w]?\.\w{2,4})$/;

  if (!match.test(email)) {
    console.log("email invalid");
    // errorMessage.style.display = "block";
    // setTimeout(() => {
    //   errorMessage.style.display = "none";
    // }, 3000);
    return false;
  }
  // console.log("email valid");

  return true;
};

form.addEventListener("submit", (event) => {
  //so that it doesn't refresh when form is submitted, which is the default behaviour
  event.preventDefault();
  var email = $("#subscribe_form").val();
  console.log(email);
  if (validateEmail(email)) {
    var formdata = { email: email, listId: 982, segmentId: 1617 };
    $.ajax({
      type: "POST",
      url: "https://api.yavun.com/api/1477/userData",
      data: formdata,
      success: (res) => {
        console.log(res);
        $(".not-valid-message").hide();
        successAlert.style.display = "block";
        setTimeout(() => {
          successAlert.style.display = "none";
        }, 3000);
        form.reset();
      },
      error: function () {
        console.log("server error");
        serverIssue.style.display = "block";
        setTimeout(() => {
          serverIssue.style.display = "none";
        }, 3000); // toaster message we get when api response is false regards to that email
      },
    });
  } else {
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
  }
});
