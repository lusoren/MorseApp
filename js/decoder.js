$(document).ready(function(){
    
    var timeoutNoise;
    var timeoutSilence;
    
    var noiseCounter=0;
    var silenceCounter=0;
    
    var pressed= false;
    var curLetter="";
    
    var morse= [".-","-...","-.-.","-..",".","..-.","--.","....","..","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    var alpha= ["a","b","c","d","e","f","g","h","i","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    
    var dotTime = 50;
    var dashTime = 150;
    var spaceTime = 350;

    //on touch
    $(window).bind("touchstart",function() {
        pressed=true;
        
        addSpace(silenceCounter);
        silenceCounter=0;
        
        clearTimeout(timeoutSilence);
        count();
    });
    
    //on release
    $(window).bind( "touchend",function() {
        pressed=false;
        
        addMark(noiseCounter);
        noiseCounter=0;
        
        clearTimeout(timeoutNoise);
        countSilence();
    });
    
    //count how long held
    function count() {
        noiseCounter++;
        timeoutNoise=setTimeout(function(){count()}, 1);
    }
    
    //count time between tones
    function countSilence() {
        silenceCounter++;
        
        //NEW LETTER
        //if dash duration has passed, generate letter
        if (silenceCounter> dashTime) {
            $("#dotOutput").append(" ");
            
            generateLetter(curLetter);
            clearBoxes();
            curLetter="";
        }
        
        //NEW WORD
        //if space duration has passed, add space
        if (silenceCounter>spaceTime) {
                
            $("#dotOutput").append("/");
            $("#wordOutput").append("_");
            
            curLetter="";
            clearTimeout(timeoutSilence);
            return;
        }
        
        //loop
        timeoutSilence=setTimeout(function(){countSilence()}, 1);
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
            generateLetter(curLetter);
            curLetter="";
            
        } else {
            curLetter="";
        }
    }
    
    //generate letter from dots and dashes
    function generateLetter(input) {
        var a = morse.indexOf(input);
        if (a<0) {

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