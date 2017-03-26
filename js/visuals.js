var dotTime = 50;
var dashTime = 150;
var spaceTime = 350;

var growCounter=0;  
var myVar;

var curWidth  = 20;
var curHeight = 20
var bordRadius= 30;

//on release
function resetDot() {
    $("#dot").css("display","none");
    
    curWidth  = 20;
    curHeight = 20
    bordRadius= 30;
    
    $("#dot").css("width",  curWidth);
    $("#dot").css("height", curHeight);
    $("#dot").css("border-radius",  bordRadius);

    growCounter=0;
}

function growIt() {
    growCounter++;
   
    if (growCounter<dotTime) {
        
        curWidth+= 10/dotTime;
        curHeight+=10/dotTime;

        $("#dot").css("width",  curWidth);
        $("#dot").css("height", curHeight);
        
    } else if (growCounter> dotTime + 50 && growCounter<dashTime) {
       
        curWidth+=1;
        bordRadius-= .6;
        $("#dot").css("width",  curWidth);
        $("#dot").css("border-radius",  bordRadius);
        
    } 
}


var timeoutNoise;
var docWidth= $(document).width();

var increment= docWidth/dashTime;
var increment2= docWidth/(spaceTime-dashTime);

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
    
    if (iterations<=dashTime) {
        $("#letterProgress").width(iterations * increment);
    } else if(iterations<=spaceTime) {
        $("#wordProgress").width((iterations-dashTime) * increment2);
    }
}
