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
    var spaceTime = 300;

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
        
        //if dash duration has passed, generate letter
        if (silenceCounter> dashTime) {
            generateLetter(curLetter);
            curLetter="";
        }
        
        //if space duration has passed, add space
        if (silenceCounter>spaceTime) {
                
            $("#textDump").append("/");
            $("#textDump2").append("_");
            
            curLetter="";
            clearTimeout(timeoutSilence);
            return;
        }
        
        //loop
        timeoutSilence=setTimeout(function(){countSilence()}, 1);
    }
    
    //add mark depending on noiseCounter
    function addMark(count) {

        if (count<dotTime) {
            $("#dotOutput").append(".");
            curLetter+= ".";
        } else {
            $("#dotOutput").append("-");
            curLetter+= "-";
        }
    }
    
    function addSpace(count) {
        if (count<dotTime) {
            $("#textDump").append("");
            
        } else if(count<spaceTime) {
            generateLetter(curLetter);
            $("#dotOutput").append("/");
            $("#wordOutput").append(" ");
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

        }
    }
});