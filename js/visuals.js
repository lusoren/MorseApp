$(document).ready(function(){
    
    var dotTime = 50;
    var dashTime = 150;
    var spaceTime = 300;
    
    var growCounter=0;
    
    var myVar;
    
    var firstIncrement = 20;
    var secondIncrement = 30;
    var thirdIncrement = 0;

    //on touch
    $(window).bind("touchstart",function() {
        $("#dot").css("display","inherit");

        myVar = setInterval(growIt, 10);
    });
    
    var curWidth  = 20;
    var curHeight = 20
    var bordRadius= 30;
    
    //on release
    $(window).bind( "touchend",function() {
        clearInterval(myVar);
        $("#dot").css("display","none");
        
        
        curWidth  = 20;
        curHeight = 20
        bordRadius= 30;
        
        $("#dot").css("width",  curWidth);
        $("#dot").css("height", curHeight);
        $("#dot").css("bordRadius",  bordRadius);

        growCounter=0;
    });
    
    function growIt() {
        growCounter++;
       
        if (growCounter<dotTime) {
            
            curWidth+= 10/dotTime;
            curHeight+=10/dotTime;
 
            $("#dot").css("width",  curWidth);
            $("#dot").css("height", curHeight);
            
        } else if (growCounter>dotTime + 20 && growCounter<dashTime) {
           
            curWidth+=.5;
            bordRadius-= .5;
            $("#dot").css("width",  curWidth);
            $("#dot").css("border-radius",  bordRadius);
            
        } 
    }
});