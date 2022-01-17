var version = "Commit: 1.39 AW";
if (window.console) console.log(version);

// Adds additional classes to elements for script to run
$('.primary-interest span.value span:nth-child(1) input').addClass('int-ehs');
$('.primary-interest span.value span:nth-child(2) input').addClass('int-opex');
$('.primary-interest span.value span:nth-child(3) input').addClass('int-sb');
$('.primary-interest span.value span:nth-child(4) input').addClass('int-esg');
$('.email span.description').addClass('field_full');

// Checks if there is an error on the page and then makes sure to remove relevant fields
$(window).load(function () {
  if (!$("div").hasClass("error")) {
    if ($(".primary-interest input").is(":checked")) {
      $('.primary-interest').remove();
      $('.secondary-interest').remove();
    }
  }
  if (!$('.primary-interest').length) {
    $('.secondary-interest').remove();
  } else {
    $('.secondary-interest').css("opacity", "1").fadeIn(1000).css("display", "grid");
  }
  if (!$('.user-needs').length) {
    $('.other-hidden').remove();
  }
});

// Check which primary interest has been changed
$(function () {
  $(".primary-interest input[type=radio]").change(function () {
    practiceCheck(); // Checks which primary interest has been is clicked
  });
});

$(function () {
  $(".user-needs input[type=radio]").change(function () {
    var radioSelector = ".user-needs input[type=radio]"
    radioOpacity(radioSelector); // Runs opacity function for primary interests
  });
  $('.user-needs input').change(function () {
    if ($('.User_Needs span.value span:last-child input').is(":checked")) {
      $('.User_Needs_Other').fadeIn(500).css("display", "grid").removeClass("other-hidden");
    } else {
      $('.User_Needs_Other').fadeOut(500).addClass("other-hidden").removeClass("required error");
      $('p.User_Needs_Other-error').remove();
    }
  });
});

// Checks functions after submissions with error, or pre-filled data on form load
$(window).load(function () {
  if ($(".primary-interest input[type=radio]").is(":checked")) {
    practiceCheck(); // Checks which primary interest has been is checked
  }
  if ($(".user-needs input[type=radio]").is(":checked")) {
    var radioSelector = ".user-needs input[type=radio]"
    radioOpacity(radioSelector); // Runs opacity function for primary interests
  };
  if ($(".user-needs span.value span:nth-child(5) input").is(":checked")) {
    $('.User_Needs_Other').removeClass("other-hidden").addClass("required");; // Checks if the 'Other' field has been checked and displays the text field
    if (!$('.User_Needs_Other').val()) {
      $('.User_Needs_Other').addClass("error");
      $('<p class="error no-label User_Needs_Other-error"></p>').insertAfter(".User_Needs_Other label");
    }
  }
});

// Checks which primary interest has been checked
function practiceCheck() {
  var radioSelector = ".primary-interest input[type=radio]"
  radioOpacity(radioSelector); // Runs opacity function for primary interests
  var practiceSelector = $(":checked")
    .map(function () {
      return $(this).attr('class');
    })
    .get().join('.');
  practiceChecked(practiceSelector); // Runs opacity function for radio
}

function practiceChecked(practiceSelector) {
  $('.add-interest input').prop('disabled', false);
  $('.add-interest label').removeClass('noselect');
  $(".add-interest." + practiceSelector + " input").prop('checked', true).prop('disabled', true);
  $(".add-interest." + practiceSelector + " label").addClass('noselect');
}

function radioOpacity(radioSelector) {
  $(radioSelector + ":checked+label").css("opacity", "1");
  $(radioSelector + ":not(:checked)+label").css("opacity", "0.5");
}

// Wraps secondary interests in to one div
$(function () {
  $('.add-interest').wrapAll('<div class="form-field secondary-interest interest field_full" />')
  $('.add-interest').wrapAll('<span class="value add-interest-label" />')
  $('<label class="field-label">Secondary interests</label>').insertBefore("span.add-interest-label");
});

// Changes the 'Not you?' text
$(document).ready(function () {
  if (!$('.first_name').length) {
    var span = $('.email span.description').first();
    span.html(span.html().replace("Click Here", "Have your details changed? Update your profile"));
    var link = $('.email span.description').children('a');
    $('.email span.description').html(link);
  }
});