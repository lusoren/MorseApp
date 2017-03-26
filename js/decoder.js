$(document).ready(function(){
    
    var timeoutNoise;
    var timeoutSilence;
    
    var noiseCounter=0;
    var silenceCounter=0;
    
    var pressed= false;
    var curLetter="";
    
    var morse= [".-","-...","-.-.","-..",".","..-.","--.","....","..","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    var alpha= ["a","b","c","d","e","f","g","h","i","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    var touchTimeout;
    var releaseTimeout;

    //on touch
    $(window).bind("touchstart",function() {
        console.log("DOWN");
        //clear timout
        clearTimeout(releaseTimeout);
        
        //start touch timeout
        touchTimeout = setInterval(touchDown, 10);
        
        //change dot display
        $("#dot").css("display","inherit");
        pressed=true;
        
        //add space
        addSpace(silenceCounter);
        
        //reset silence counter
        silenceCounter=0;
        
    });
    
    //looping function while touched
    function touchDown() {
        console.log("ITER");
        growIt();
        noiseCounter++;
    }
    
    //on release
    $(window).bind( "touchend",function() {
        console.log("UP");
        releaseTimeout = setInterval(touchUp, 10);
        pressed=false;
        
        addMark(noiseCounter);
        resetDot();
        noiseCounter=0;
        
        clearTimeout(touchTimeout);
    });
    
    //looping function while released
    function touchUp() {
        silenceCounter++;
        moveBar();
        
        //NEW LETTER
        //if dash duration has passed, generate letter
        if (silenceCounter == dashTime) {
            $("#dotOutput").append(" ");
            
            generateLetter(curLetter);
            clearBoxes();
            curLetter="";
        }
        
        //NEW WORD
        //if space duration has passed, add space
        if (silenceCounter == spaceTime) {
                
            $("#dotOutput").append("/");
            $("#wordOutput").append(" ");
            
            curLetter="";
            clearTimeout(timeoutSilence);
            return;
        }        
    }
    
    
    //add mark depending on noiseCounter
    function addMark(count) {

        if (count<dashTime) {
            $("#dotOutput").append(".");
            updateBoxes(true);
            curLetter+= ".";
        } else {
            $("#dotOutput").append("-");
            updateBoxes(false);
            curLetter+= "-";
        }
    }
    
    function addSpace(count) {
        if (count<dashTime) {
            
        } else if(count<spaceTime) {
            curLetter="";
            
        } else {
            curLetter="";
        }
    }
    
    //generate letter from dots and dashes
    function generateLetter(input) {
        var a = morse.indexOf(input);
        if (a<0) {
            $("#bigLetter").html("?");
        } else {
            $("#wordOutput").append(alpha[a]);
            $("#bigLetter").html(alpha[a]);
        }
    }
    
    var cellCounter = 1;
    function updateBoxes(isDot) {
        if (isDot) {
            $("#cell" + cellCounter).html($('<div>', {class: 'dot'}));
        } else {
            $("#cell" + cellCounter).html($('<div>', {class: 'dash'}));
        }
        
        cellCounter++;
    }
    
    function clearBoxes() {
        cellCounter =1;
        for(var i=1; i < 5;++i){
            $("#cell" + i).html("");
        }
    }
});