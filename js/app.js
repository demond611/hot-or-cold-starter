
$(function (){

	var DEBUG_MODE = true;

	var debug = function(msg) {
	    if (DEBUG_MODE == true) {
	        console.log("DEBUG:", msg);
	    }
	}

    var secretNumber = 0, guessCounter = 0, myGuess = 0;
    var foundNumber = false;

    /* START A NEW GAME ON DOCUMENT LOAD */
    NewGame();


    /* SUBMITS INFO ON FORM SUBMIT */
    $("form").submit(function (event){
    	event.preventDefault();

    	myGuess = parseInt($("#userGuess").val());

    	if (myGuess === secretNumber){
    		$("#feedback").text("YOU GUESSED CORRECTLY!");
    		// CORRECT SOUND
    	} else {
    		// BINARY SEARCH ALGORITHM TO FIND HOW CLOSE
    		// INCREMENT COUNTER
    		// ADD GUESSES TO LIST
    		$("<li>"+myGuess+"</li>").appendTo("#guessList");
    		// WRONG SOUND
    	}
    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }


	function NewGame(){
		// GET NEW SECRET NUMBER
		secretNumber = GenerateNumber();
		// SET DEFAULTS
		$("#feedback").text("Make Your Guess!");
		$("#userGuess").val("");
		$("#guessList").empty();
		// CLEAR GUESSES
		// CHANGE PANEL COLOR TO INDICATE NEW GAME
		$("h2").css("background-color", getRandomColor());
	}

    function GenerateNumber(){
    	var createNumber = Math.floor( (Math.random() * 100) + 1 );
    	debug("Generated Number: " + createNumber);
    	return createNumber;
    }

    $(".new").click(function (){
	  	NewGame();
  	});


	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});


  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});


});


