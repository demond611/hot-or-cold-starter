
$(function (){

	var DEBUG_MODE = false;

	var debug = function(msg) {
	    if (DEBUG_MODE == true) {
	        console.log("DEBUG:", msg);
	    }
	}

    var secretNumber, guessCounter, myGuess = 0;
    var guesses = [];

    /* START A NEW GAME ON DOCUMENT LOAD */
    NewGame();

    /* SUBMITS INFO ON FORM SUBMIT */
    $("form").submit(function (event){
    	event.preventDefault();

    	myGuess = parseInt($("#userGuess").val());

    	if (isNaN(myGuess) || myGuess > 100 || myGuess <= 0) {

    		$("#feedback").text("PLEASE ENTER ONLY NUMBERS BETWEEN 1-100");
    		$("#userGuess").val("").focus();

    	} else {

	    	guessNumber();

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
		debug(secretNumber);
		// SET DEFAULTS
		$("#feedback").text("Make Your Guess!");
		$("#userGuess").val("");
		$("#guessList").empty();
		$("#count").text("0");
		guessCounter = 0;
		guesses = [];
		// CHANGE PANEL COLOR TO INDICATE NEW GAME
		$("h2").css("background-color", getRandomColor());
	}

    function GenerateNumber(){
    	var createNumber = Math.floor( (Math.random() * 100) + 1 );
    	//debug("Generated Number: " + createNumber);
    	return createNumber;
    }

    function guessNumber (){
    	var distance, previous, target = 0

    	if (myGuess === secretNumber){
    		$("#feedback").text("YOU GUESSED CORRECTLY!");
    		// CORRECT SOUND
    	} else {
    		guesses.push(myGuess);
	    	// debug(guesses);
	    	distance = Math.abs(secretNumber - myGuess);
	    	// debug("CURRENT DISTANCE: " + distance);

	    	if (myGuess != secretNumber) {

	    		target = distance;
	    		if (target > 40) $("#feedback").text("EXTREMELY COLD, NOT EVEN CLOSE");
	    		else if (target > 30) $("#feedback").text("VERY COLD");
	    		else if (target >= 25) $("#feedback").text("COLD");
	    		else if (target >= 20) $("#feedback").text("WARM");
	    		else if (target >= 15) $("#feedback").text("GETTING WARMER");
	    		else if (target >= 10) $("#feedback").text("HOT");
	    		else if (target >= 5) $("#feedback").text("EXTREMELY HOT");
	    		else if (target >=2 || target < 2) $("#feedback").text("JUST ABOUT GOT IT");
	    	}
	    	debug("TARGET #: " + target);

    		// CHECK FOR DUPES
    		// INCREMENT COUNTER
    		guessCounter++;
    		$("#count").text(guessCounter);
    		// ADD GUESSES TO LIST
    		$("<li>"+myGuess+"</li>").appendTo("#guessList");
    		// CLEAR AND FOCUS INPUT
    		$("#userGuess").val("").focus();
    		// WRONG SOUND
    	}

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


