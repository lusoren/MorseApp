$(document).ready(function(){
    
    var dotTime = 50;
    var dashTime = 150;
    var spaceTime = 300;
    
    var growCounter=0;
    
    var myVar;


    //on touch
    $(window).bind("touchstart",function() {
        $("#dot").css("display","inherit");
        myVar = setInterval(growIt, 1);
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
        $("#dot").css("border-radius",  bordRadius);

        growCounter=0;
    });
    
    function growIt() {
        growCounter++;
       
        if (growCounter<dotTime) {
            
            curWidth+= 10/dotTime;
            curHeight+=10/dotTime;
 
            $("#dot").css("width",  curWidth);
            $("#dot").css("height", curHeight);
            
        } else if (growCounter> dotTime + 50 && growCounter<dashTime) {
           
            curWidth+=.9;
            bordRadius-= .6;
            $("#dot").css("width",  curWidth);
            $("#dot").css("border-radius",  bordRadius);
            
        } 
    }
    
    
    var timeoutNoise;
    var docWidth= $(document).width();
    
    
    
    var increment= docWidth/150;
    console.log(increment);
    var increment2= docWidth/200;
    var iterations=0;
    
    $(window).bind("touchend",function() {
        moveBar();
    });
    
    $(window).bind( "touchstart",function() {
        iterations=0;
        $("#wordProgress").width(0);
        $("#letterProgress").width(0);
        
        clearTimeout(timeoutNoise);
    });
    
   
    function moveBar() {
        iterations++;
        
        var curWidth=$("#letterProgress").width();
        var curWidth2=$("#wordProgress").width();
        
        if (iterations<=150) {
            $("#letterProgress").width(iterations * increment);
        } else if(iterations<=350) {
            $("#wordProgress").width(curWidth2 + increment2);
        }
        
        timeoutNoise=setTimeout(function(){moveBar()}, 1);
    }
});