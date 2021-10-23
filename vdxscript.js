var version = "Commit: 1.12 AW";
if (window.console) console.log(version);

$( function() {
  $('div.Date_Picker').datepicker({
      inline: true,
      altField: '#562622_216785pi_562622_216785',
    firstDay: 1, dayNamesMin:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
      beforeShowDay: function(date) {
      var day = date.getDay();
      return [(day != 0 && day != 6)];}, 
      minDate: 0, maxDate: "+1M +10D" 
  });
});

$( function() {
  $('#562622_216785pi_562622_216785').change(function(){
  $('div.Date_Picker').datepicker('setDate', $(this).val());
  });
});

$( function () {
  $(".timepicker select").val("1524099");
  /*$(".timezone select").val("1524063");*/
});



// Adds additional text to Demo
$( '<div class="field_full"><h2 class="section-intro field_full">1. Tell us about you</h2></div>' ).insertBefore( ".first-intro-text" );
$( '<div class="field_full"><h2 class="section-intro field_full">2. Your industry</h2></div>' ).insertBefore( ".second-intro-text" );
$( '<div class="field_full"><h2 class="section-intro field_full">3. Meeting time</h2></div>' ).insertBefore( ".third-intro-text" );



// Adds additional classes to elements for script to run
  $('.primary-interest span.value span:nth-child(1) input').addClass('int-ehs');
  $('.primary-interest span.value span:nth-child(2) input').addClass('int-opex');
  $('.primary-interest span.value span:nth-child(3) input').addClass('int-sb');
  $('.primary-interest span.value span:nth-child(4) input').addClass('int-esg');
  $('.user-needs span.value span:nth-child(5) input').addClass('other-cat');
  $('.email span.description').addClass('field_full');


// Checks if there is an error on the page and then makes sure to remove relevant fields
$( window ).load(function() {
  if(!$("div").hasClass("error")) { 
    if($(".primary-interest input").is(":checked")) {
      $('.primary-interest').remove();
      $('.secondary-interest').remove();
    }
  }
  if( !$('.primary-interest').length ){ $('.secondary-interest').remove(); }
  if( !$('.user-needs').length ){ $('.other-hidden').remove(); }
});


// Check which primary interest has been changed
$(function() {
  $(".primary-interest input[type=radio]").change(function() {
    practiceCheck();// Checks which primary interest has been is clicked
  });
  $(".user-needs input[type=radio]").change(function() {
    var radioSelector = ".user-needs input[type=radio]"
	  radioOpacity(radioSelector); // Runs opacity function for primary interests
  });
  $('.user-needs input').change(function() {
    if ( $(this).attr('class') == 'other-cat') {
      $('.User_Needs_Other').removeClass("other-hidden");
    }else{
      $('.User_Needs_Other').addClass("other-hidden")
    }
  });
});

// Checks functions after submissions with error, or pre-filled data on form load
$( window ).load(function() {
	if($(".primary-interest input[type=radio]").is(":checked")) {
		practiceCheck(); // Checks which primary interest has been is checked
	}
  if($(".user-needs input[type=radio]").is(":checked")) {
    var radioSelector = ".user-needs input[type=radio]"
	  radioOpacity(radioSelector); // Runs opacity function for primary interests
  };
  if($(".user-needs span.value span:nth-child(5) input").is(":checked")) {
    $('.User_Needs_Other').removeClass("other-hidden");// Checks if the 'Other' field has been checked and displays the text field
  }
});

// Checks which primary interest has been checked
function practiceCheck(){
	var radioSelector = ".primary-interest input[type=radio]"
	radioOpacity(radioSelector); // Runs opacity function for primary interests
  var practiceSelector = $(":checked") 
                      .map(function() { return $(this).attr('class'); }) 
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
$(function (){
  $('.add-interest').wrapAll('<div class="form-field secondary-interest interest field_full" />')
  $('.add-interest').wrapAll('<span class="value add-interest-label" />')
  $( '<label class="field-label">Secondary interests</label>' ).insertBefore( "span.add-interest-label" );
});

// Changes the 'Not you?' text
$(document).ready(function(){
  var span = $('.email span.description').first();
  span.html(span.html().replace("Click Here","Have your details changed? Update your profile"));
  var link = $('.email span.description').children('a');
  $('.email span.description').html(link);
});
