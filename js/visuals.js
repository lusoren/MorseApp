var dotTime =   20;
var dashTime =  60;
var spaceTime = 140;

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
    growCounter+=1;
   
    if (growCounter<dotTime) {
        
        curWidth+= 10/dotTime;
        curHeight+=10/dotTime;

        $("#dot").css("width",  curWidth);
        $("#dot").css("height", curHeight);
        
    } else if (growCounter> dotTime + 5 && growCounter<=dashTime) {
       
        curWidth+= 30/(dashTime-dotTime-5);
        bordRadius-= 30/(dashTime-dotTime-5);
        $("#dot").css("width",  curWidth);
        $("#dot").css("border-radius",  bordRadius);
        
    } 
}


var docWidth= $(document).width();

var increment= docWidth/dashTime;
var increment2= docWidth/spaceTime;

var iterations=0;

$(window).bind("touchend",function() {
    moveBar();
});

$(window).bind( "touchstart",function() {
    iterations=0;
    $("#wordProgress").width(0);
    $("#letterProgress").width(0);
});


function moveBar() {
    iterations++;
    
    //var curWidth=$("#letterProgress").width();
    //var curWidth2=$("#wordProgress").width();
    
    //if (iterations<=dashTime) {
    //    $("#letterProgress").width(iterations * increment);
    //} else if(iterations<=spaceTime) {
    //    $("#wordProgress").width((iterations-dashTime) * increment2);
    //}
    
    $("#wordProgress").width(iterations * increment2);
}
