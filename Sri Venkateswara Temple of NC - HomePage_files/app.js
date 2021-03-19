$(function() {
	
	
	$(".toggle-password").click(function() {

		  $(this).find("i").toggleClass("fa-eye fa-eye-slash");
		  var input = $($(this).parent().parent().find("input"));
		  
		  if (input.attr("type") == "password") {
		    input.attr("type", "text");
		  } else {
		    input.attr("type", "password");
		  }
		  
		});
	
/*	$('form').submit(function() {
		  $(this).find("button[type='submit']").prop('disabled',true);
		});
*/	
    var audioElement = document.getElementById('audio1');
    $('#play').show();
    $('#stop').hide();
    $('#play').click(function() {
        $('#play').hide();
        $('#stop').show();
         audioElement.play();
    });

    $('#stop').click(function() {
        $('#play').show();
        $('#stop').hide();
        audioElement.pause();
    });

    /*$(".closable-alert").fadeTo(10000, 500).slideUp(500, function(){
        $(".closable-alert").slideUp(500);
    });
    */
    $(".closable-alert").on("closed.bs.alert", function(){
     	$.ajax({
          	 type: "POST",
  		     url: $(this).attr("data-href"),
  		     success: function(msg) {
  		    	 console.log("Success " + msg);
               },
  		     error: function(xhr){
  		    	 console.log("Error " + xhr.responseText); 
  		     }
           });
    });
 
    $('#forgotModal').on('show.bs.modal', function (e) {
     	$("#loginModal").modal("hide");
    	$(this).find("#forgotPwdMsg").html("");
	})
	
	$('#forgotModal').on('hidden.bs.modal', function (e) {
    	$(this).find("#forgotPwdMsg").html("");
	})
	
	$('#activationModal').on('show.bs.modal', function (e) {
     	$("#loginModal").modal("hide");
        $("#forgotModal").modal("hide");
    	$(this).find("#activationMsg").html("");
	})
	
  
    var csrftoken = $("meta[name='_csrf']").attr("content");
	var csrfheader = $("meta[name='_csrf_header']").attr("content"); 

    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(csrfheader, csrftoken);
    });
    
    $("#logoutAtion").click(function(e) {
    	$.ajax({
          	 type: "POST",
  		     url: "/logout",
  		     //data: $(form).serialize(),
               success: function(msg) {
                 alert("Logout Success"); 
               },
  		     error: function(xhr){
  		    	 alert("Logout Fail: " +   xhr.responseText  );
  		     }
    	});
    });
    
    /*$("button#forgotPwdSubmit").click(function(){
        $.ajax({
        	 type: "POST",
		     url: $('#forgotPwdForm').attr("action"),
		     data: $('#forgotPwdForm').serialize(),
             success: function(msg) {
               $("#forgotPwdMsg").html(
            		 "<div class='alert alert-success'>" +   msg + "</div>")
               //$("#form-content").modal('hide'); 
             },
		     error: function(xhr){
		    	 $("#forgotPwdMsg").html("<div class='alert alert-danger'>" +   xhr.responseText  + "</div>");
		     }
         });
     });
    */
    
    $("input[type='tel']").mask("999-999-9999");
    $("input.zipcode").mask("99999");
   
   $("input[type='date']").datepicker({dateFormat: "yy-mm-dd"});
    
    
    $('#forgotPwdForm').validate({

        rules: {
        	forgotusername: {
        		required: true,
        		email : true
        	} 
        },
        messages: {
        	forgotusername: {
        		required: 'Email Address is required',
        		email : 'Enter Proper Email Address'
        	}
        },
        	
        submitHandler: function(form) {
        	$.ajax({
           	 type: "POST",
   		     url: $(form).attr("action"),
   		     data: $(form).serialize(),
                success: function(msg) {
                  $("#forgotPwdMsg").html(
               		 "<div class='alert alert-success'>" +   msg + "</div>")
                  //$("#form-content").modal('hide'); 
                },
   		     error: function(xhr){
   		    	 $("#forgotPwdMsg").html("<div class='alert alert-danger'>" +   xhr.responseText  + "</div>");
   		     }
            });
        }
    });

    
    $('#activationForm').validate({

        rules: {
        	activationusername: {
        		required: true,
        		email : true
        	} 
        },
        messages: {
        	activationusername: {
        		required: 'Email Address is required',
        		email : 'Enter Proper Email Address'
        	}
        },
        	
        submitHandler: function(form) {
        	$.ajax({
           	 type: "POST",
   		     url: $(form).attr("action"),
   		     data: $(form).serialize(),
                success: function(msg) {
                  $("#activationMsg").html(
               		 "<div class='alert alert-success'>" +   msg + "</div>")
                  //$("#form-content").modal('hide'); 
                },
   		     error: function(xhr){
   		    	 $("#activationMsg").html("<div class='alert alert-danger'>" +   xhr.responseText  + "</div>");
   		     }
            });
        }
    });
    
    
    var loginValidator = $("#login-nav").validate({
        rules: {
        	musername: {
        		required: true,
        		email : true
        	},
        	mpassword: {
        		required: true
        	}
        },
        messages: {
        	musername: {
        		required: 'Email Address is required',
        		email : 'Enter Proper Email Address'
        	},
        	mpassword: {
        		required: 'Password is required'
        	}
        },
        errorElement: "div",
        errorClass: "invalid-feedback",
		errorPlacement: function ( error, element ) {
			 			
			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else if ( element.prop( "type" ) === "select-one" ) {
				error.insertAfter( element );
			} else {
				 element.parent().append(error) ;
			}
			
		},
		success: function ( label, element ) {
			$(element).parents(".form-group").removeClass("has-error");
		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).removeClass( "is-invalid" ).addClass( "is-valid" );
		} 
    });
    
    $('#myModal').on('hidden.bs.modal', function() {	
    	loginValidator.resetForm();
    	$('#login-nav div.has-error').removeClass('has-error').removeClass('has-feedback');
    	$('#login-messages').html('');

    });
    
    $(".navbar-nav .notAuthorized").click(function(e) {
    	   //alert("Please login to access this URL");
    	$('#notAuthModal').modal('show') ;  
    	e.preventDefault();
    });

    
});

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
