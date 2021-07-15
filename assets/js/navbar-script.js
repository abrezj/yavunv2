// for navbar functionality
$(function () {
    $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("navbar-collapse in");
      if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $("button.navbar-toggle").click();
      }
    });
  });

  var flag = true;
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 100) {
      if (flag) {
        //$(".header_design").fadeOut("fast");
        setTimeout(function () {
          $(".header_design").fadeIn("slow");
        }, 1000);
        $("header.header_design").addClass("fixed_header");
        console.log("true");
        flag = false;
      }
    } else {
      $("header.header_design").removeClass("fixed_header");
      setTimeout(function () {
        $(".header_design").fadeIn("slow");
      }, 1000);
      console.log("false");
      flag = true;
    }
  });
  
  $(function () {
    // $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      //$(document).off("scroll");

      $("a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      $target = $(target);
      var fixedHeight =
        $(".fixed_header").height() || $(".header_design").height() - 12;
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top - fixedHeight,
          },
          1000,
          "swing",
          function () {
            //window.location.hash = target;
           // $(document).on("scroll", onScroll);
          }
        );
    });
  });

  // animation circle
  let i = 2;

  $(document).ready(function () {
    var radius = 200;
    var fields = $(".itemDot");
    var container = $(".dotCircle");
    var width = container.width();
    radius = width / 2.5;

    var height = container.height();
    var angle = 0,
      step = (2 * Math.PI) / fields.length;
    fields.each(function () {
      var x = Math.round(
        width / 2 + radius * Math.cos(angle) - $(this).width() / 2
      );
      var y = Math.round(
        height / 2 + radius * Math.sin(angle) - $(this).height() / 2
      );
      if (window.console) {
        console.log($(this).text(), x, y);
      }

      $(this).css({
        left: x + "px",
        top: y + "px",
      });
      angle += step;
    });

    $(".itemDot").click(function () {
      var dataTab = $(this).data("tab");
      $(".itemDot").removeClass("active");
      $(this).addClass("active");
      $(".CirItem").removeClass("active");
      $(".CirItem" + dataTab).addClass("active");
      i = dataTab;

      $(".dotCircle").css({
        transform: "rotate(" + (360 - (i - 1) * 36) + "deg)",
        transition: "2s",
      });
      $(".itemDot").css({
        transform: "rotate(" + (i - 1) * 36 + "deg)",
        transition: "1s",
      });
    });

    setInterval(function () {
      var dataTab = $(".itemDot.active").data("tab");
      if (dataTab > 6 || i > 6) {
        dataTab = 1;
        i = 1;
      }
      $(".itemDot").removeClass("active");
      $('[data-tab="' + i + '"]').addClass("active");
      $(".CirItem").removeClass("active");
      $(".CirItem" + i).addClass("active");
      i++;

      $(".dotCircle").css({
        transform: "rotate(" + (360 - (i - 2) * 36) + "deg)",
        transition: "2s",
      });
      $(".itemDot").css({
        transform: "rotate(" + (i - 2) * 36 + "deg)",
        transition: "1s",
      });
    }, 5000);
  });