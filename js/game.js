cgiGame = function(io){

	io.setBGImage('img/map.jpeg');

   var grid = io.addObj((new iio.Grid(90,100,20,20,20))
                  .setStrokeStyle('white',2));
		 
	  io.canvas.addEventListener('mousedown', function(event){

	  	var cell = grid.getCellAt(io.getEventPosition(event));
		
		if(cell){
			alert(cell.toString());
		 
		    var cellCenter = grid.getCellCenter(io.getEventPosition(event),true);	 
		   
	      	io.addObj(new iio.XShape(cellCenter, 20));	   
		}
		
	  });

	var LEFT = 0;
    var RIGHT = 1;
    var UP = 2;
    var DOWN = 3;
    var input = [];

    window.addEventListener('keydown', function(event){
            updateInput(event, true);
	});
	window.addEventListener('keyup', function(event){
            updateInput(event, false);
	});

    updateInput = function(event, boolValue){
        if (iio.keyCodeIs('left arrow', event) || iio.keyCodeIs('a', event))
            input[LEFT] = boolValue;
        if (iio.keyCodeIs('right arrow', event) || iio.keyCodeIs('d', event))
            input[RIGHT] = boolValue;
        if (iio.keyCodeIs('up arrow', event) || iio.keyCodeIs('w', event)){
            input[UP] = boolValue;
            event.preventDefault();
        }
        if (iio.keyCodeIs('down arrow', event) || iio.keyCodeIs('s', event)){
            input[DOWN] = boolValue;
            event.preventDefault();
        }
    }

    var animating=false; //prevent continuous triggering of animation
	var cowSpeed=1;
	var lastAnimation;

	function update(){

		randomEvent();

		if (animating &&!input[LEFT] && !input[RIGHT] && !input[DOWN] && !input[UP]){
				cow.vel.x=0;
				cow.vel.y=0;
				resetAnimation();		       
		        animating=false;
			} 
	
		else if (input[LEFT] && cow.pos.x - cow.width/2 > 0){
			if (!animating) {				
	        	cow.playAnim('left',8,io);
				animating=true;
				lastAnimation ="left";
			}
			cow.vel.x=-cowSpeed;
		} 
		else if (input[RIGHT] && cow.pos.x + cow.width/2 < io.canvas.width){
			if (!animating) {				
	        	cow.playAnim('right',8,io);
	        	animating=true;
	        	lastAnimation ="right";
			}
			cow.vel.x=cowSpeed;
		}else if (input[DOWN] && cow.pos.y + cow.width/2 < io.canvas.height){
			if (!animating) {
				cow.playAnim('down',8,io);		        
		        animating=true;
		        lastAnimation ="down";
			}
			cow.vel.y=cowSpeed;	
		}
		else if (input[UP] && cow.pos.y - cow.width/2 > 0){
			if (!animating) {
				cow.playAnim('up',8,io);	        
		        animating=true;
		        lastAnimation ="up";
			}
			cow.vel.y=-cowSpeed;	
		}
		
		
	} 

	function randomEvent(){
		
	} 

	function resetAnimation(){
	 	cow.stopAnim('left');
        cow.stopAnim('up');
        cow.stopAnim('down');
        cow.stopAnim('right');
        cow.stopAnim('lastAnimation');
	}

	var cow;
	
	var cowSprites = new iio.SpriteMap('img/cow2.png',33,32,function(){

		//code calls when image has loaded
		cow = new iio.Rect(100, 100)
			 .createWithAnim(cowSprites.getSprite(6,8),'right')
			 .enableKinematics();

	 	cow.setVel();
		cow.addAnim(cowSprites.getSprite(0,2),'down');
		cow.addAnim(cowSprites.getSprite(3,5),'left');
		cow.addAnim(cowSprites.getSprite(9,11),'up');
		io.addObj(cow);
		io.setFramerate(20,update);
	});

};

