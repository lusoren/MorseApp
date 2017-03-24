var rectWidth = 0;
var rectHeight = 0;
var cornerRadius=25;

var counter= 0;
var timeout;

var store = [];

var myRect = new Rectangle({
    width:rectWidth,
    height:rectWidth
});

	
function onMouseDown() {	
    console.log("hello");
	counts();	
}

function onMouseUp(event) {
    counter=0;
    clearTimeout(timeout);
	
	cornerRadius=25;
	rectWidth=0;
	rectHeight=0;
	
	myRect.width=0;
	myRect.height=0;
    
    for(var i=0; i<store.length;i++){
        store[i].remove();
    }
    
    store= [];
}

function counts() {
    
	console.log(counter);
    
	if(counter<500){
		myRect.width=myRect.width   + (counter/10);
		myRect.height=myRect.height + (counter/10);		
    }

    roundCirc = new Path.Rectangle(myRect, cornerRadius);
	roundCirc.position= view.center;
	roundCirc.fillColor = 'black';
    
    store[counter]=roundCirc;
    counter++;
    
	timeout=setTimeout(function(){counts()},1);
}