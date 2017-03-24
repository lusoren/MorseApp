    $(".audioDemo").trigger('load');
    
    $(".audioDemo").bind("load",function(){
        alert("LOAD");
    });
        
    $(window).bind("touchstart",function() {
        $(".audioDemo").trigger('play');
    });
    
    $(window).bind("touchend",function() {
        console.log("bullshits");
        $(".audioDemo").prop("currentTime",0);
        $(".audioDemo").trigger('pause');
    });
