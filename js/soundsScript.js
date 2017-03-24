$(document).ready(function(){
    
    var timeoutNoise;
    var timeoutSilence;
    
    var noiseCounter=0;
    var silenceCounter=0;
    
    var pressed= false;
    var curLetter="";
    
    var morse= [".-","-...","-.-.","-..",".","..-.","--.","....","..","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    var alpha= ["a","b","c","d","e","f","g","h","i","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    
    //$("body").css("background-color","white");
    //on space key down
    $(window).bind("touchstart",function() {
   
        pressed=true;
        
        addSpace(silenceCounter);
        silenceCounter=0;
        
        clearTimeout(timeoutSilence);
        count();
    
    });
    
    //on space key up
    $(window).bind( "touchend",function() {
        pressed=false;
        
        addMark(noiseCounter);
        noiseCounter=0;
        
        clearTimeout(timeoutNoise);
        countSilence();
    });
    
    function count() {
        $("#counter").html(noiseCounter);
        noiseCounter++;
        timeoutNoise=setTimeout(function(){count()}, 1);
    }
    
    function countSilence() {
        $("#silenceCounter").html(silenceCounter);
        silenceCounter++;
        if (silenceCounter>330) {
            generateLetter(curLetter);
            $("#textDump2").append("_");
            
            curLetter="";
            clearTimeout(timeoutSilence);
            return;
        }
        timeoutSilence=setTimeout(function(){countSilence()}, 1);
    }
    
    function addMark(count) {
        if (count<50) {
            $("#textDump").append(".");
            curLetter+= ".";
        } else {
            $("#textDump").append("-");
            curLetter+= "-";
        }
    }
    
    function addSpace(count) {
        if (count<60) {
            $("#textDump").append("");
            
        } else if(count<330) {
            generateLetter(curLetter);
            $("#textDump").html("");
            curLetter="";
            
        } else {
            curLetter="";
        }
    }
    
    function generateLetter(input) {
        var a = morse.indexOf(input);
        console.log(a);
        
        if (a<0) {
            $("#textDump2").append("");
            $("#textDump").html("");
        } else {
            $("#textDump2").append(alpha[a]);
            $("#bigLetter").html(alpha[a]);
            $("#textDump").html("");
        }
    }
});