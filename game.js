

         	var COLS=26,ROWS=26,s=0,p=0;
            var j=0;
         	var EMPTY = 0,SNAKE = 1, FRUIT=2,BOMB=3;
         	var LEFT=0,UP=1,RIGHT=2,DOWN=3;
         	var KEY_LEFT=37,KEY_UP=38,KEY_RIGHT=39,KEY_DOWN=40;

              function sound()
            {
                
                if(s==0)
                {   
                        ctx.font="20px Arcade";
                 ctx.fillStyle="#fff";
                ctx.fillText("sound is on",30,30);
                    s++;
               //ctx.font="20px Arcade";
               ctx.fillStyle="#f00";
                ctx.fillText("sound is off",30,30);

                  
                }
                else{
                      ctx.font="20px Arcade";
                 ctx.fillStyle="#fff";
                ctx.fillText("sound is off",30,30);
                    s--;
                 //   ctx.font="20px Arcade";
                ctx.fillStyle="#f00";
                ctx.fillText("sound is on",30,30);

                   
                }
            }
           function pause() {
          if(p==0)
                  {

                      }
            else{
                 var pause = confirm("You paused the game, click 'OK' to continue your game "); 
      
                 if (pause == false) { 

         
                    ReDopause();
                    return;
                  }
                     }
                            }
 

             var ReDopause = function() {
                   pause(); 
                     }

                     
         	var grid={
         		width: null,
         		height: null,
         		_grid: null,
              
            
         		init: function (d,c,r)        //initiate 2d array b value of EMPTY
         		{  
                    this.width= c;
                    this.height = r;
                    this._grid = [];
                    for(var x=0;x<c;x++)
                    {
                    	this._grid.push([]);
                    	for (var y=0;y<r;y++)
                    	{
                    		this._grid[x].push(d);
                    	}
                    }

         		},

  				set: function(val,x,y)
  				{
  					this._grid[x][y]=val;   // put SNAKE or fruit value in position  in grid array  so grid array will have values 0 ->empty 1-> postion snake 2->fruit


  				},

  				get: function (x,y)
  				{
  					return this._grid[x][y];
  				}

         	}

         	var snake ={
         		direction: null,
         		last: null,
         		_queue: null,

         		init: function (d,x,y)
         		{
                    this.direction = d;
                    this._queue=[];
                    this.insert(x,y);
         		},

         		insert: function(x,y)
         		{
         			this._queue.unshift({x, y});    // append array  in beginning of array
         			this.last = this._queue[0];
         		},

         		remove: function ()
         		{
         			return this._queue.pop();      //get last element
         		}

         	}

         	function setFood()
         	{   j=Math.floor(Math.random()*img.length);
         		var empty= [];
         		for(var x=0;x<grid.width;x++)    // put fruit in  random empty cell in grid array
         		{
         			for(var y=0;y<grid.height;y++)
         			{
         				if(grid.get(x,y)=== EMPTY)
         				{
         					empty.push({x, y});
         				}
         			}

         		}
         		 var randpos = empty[Math.floor(Math.random()*empty.length)];   
				grid.set(FRUIT, randpos.x, randpos.y);


         	}
            function setbomb()
            {
                var empty1= [];
                for(var x=0;x<grid.width;x++)    // put fruit in  random empty cell in grid array
                {
                    for(var y=0;y<grid.height;y++)
                    {
                        if(grid.get(x,y)=== EMPTY)
                        {
                            empty1.push({x, y});
                        }
                    }

                }
                 var randpos1 = empty1[Math.floor(Math.random()*empty1.length)];  
                  
                grid.set(BOMB, randpos1.x, randpos1.y);

                  setTimeout(function() {
              
              grid.set(EMPTY, randpos1.x, randpos1.y); 
    }, 6000); 
            }

         	var canvas, ctx, keystate , frames,score;
         	function main(){
            sign = prompt("What's your name?");
            if (sign==null||sign=="")
            {
                
            }
               
         		
             else {
                
                    p=1;
                 ctx.font="30px Arcade";
                   
         		frames= 0;
                //s=0;
         		keystate=[];
         		document.addEventListener("keydown", function(evt) {
					keystate[evt.keyCode] = true;
				});
				document.addEventListener("keyup", function(evt) {
					delete keystate[evt.keyCode];
				});
   	      		init ();
         		loop();
            }

         	}

         	function init()
         	{   
         		score=0;
         		grid.init(EMPTY,COLS,ROWS);
         		//var sp={ x:Math.floor(COLS/2),y:ROWS-1};
         		snake.init(UP,COLS-10,ROWS-1);           // starting postion of snake
         		grid.set(SNAKE,COLS-10,ROWS-1);
         		setFood();
               looop();
                function looop (){
    var rand = Math.round(Math.random() * (3000 - 1000)) + 2000;
    setTimeout(function() {
            setbomb();
             
            looop();  
    }, rand);
}
               // setbomb();
         	}

         	function loop(){
                
         		update();
         		draw();
         		window.requestAnimationFrame(loop,canvas);
         	}

         	function update()
         	{
             frames++;                //rate of changing between frames

         		if (keystate[KEY_LEFT]&& snake.direction!==RIGHT)
         		 snake.direction = LEFT;
         		if (keystate[KEY_UP]&& snake.direction!==DOWN) 
         			snake.direction = UP;
         		if (keystate[KEY_RIGHT]&& snake.direction!==LEFT) 
         			snake.direction = RIGHT;
         		if (keystate[KEY_DOWN]&& snake.direction!==UP) 
         			snake.direction = DOWN;
         		if(frames%9===0){               // speed rate of snake
         			var nx=snake.last.x;        // get last postion of snake
         			var ny=snake.last.y;
         			switch(snake.direction){
         				case LEFT:
         				nx--;
         				break;
         				case UP:
         				ny--;
         				break;
         				case RIGHT:
         				nx++;
         				break;
         				case DOWN:
         				ny++;
         				break;
         			}
         			if(0>nx||nx>grid.width-1||0>ny||ny>grid.height-1||grid.get(nx,ny)===SNAKE||grid.get(nx,ny)===BOMB) // gameover cases
         			{   p=0;
                        if(s==0) {
                            var audio = new Audio('Jingle_Lose_00.mp3');
                        audio.play();

                        }
                        
                        ctx.font="60px Arcade";
                        ctx.fillStyle="#f00";
                        ctx.fillText("Game over",canvas.width-400,canvas.height/2);
                        var min=scores[0];
                        var r;
                         for (i=1;i<10;i++)
                         {  var ee= parseInt(scores[i]);
                            
                            if (ee<min )
                            {
                                min=ee;
                                r=i;
                            }
                         }
                         if(score> min )
                         {
                            var fi=score.toString();
                            scores[r]=fi;
                            array[r]=sign;
                         }

                        write();

                        print();
                        sleepfor(4000);
                       
                     
         				return init();
                        //return 0;
         			}
         			if(grid.get(nx,ny)===FRUIT)   // if snake ate the fruit
         			{
         				var tail={x:nx,y:ny};      // snake twal w score zad by 1 w 3ml random l new fruit
         				score++;
                        if(s==0) {
                        var audio = new Audio('Collect_Point_00.mp3');
                        audio.play();
                        }
         				setFood();

         			}
         			else
         			{
         				var tail=snake.remove();   // get last position 25r 7eta mn  snake
         			grid.set(EMPTY,tail.x,tail.y);   // hy7ot f position da zero 3shan snake 2t7rk mno 
         			tail.x=nx;                       // mkan x gdid elly snake ra7o
         			tail.y=ny;                       // mkan y gdid elly snake ra7o
         			}
         			
         			grid.set(SNAKE,tail.x,tail.y);       // hy7ot f grid one f mkan elly gdid elly snake feh nw
         			snake.insert(tail.x,tail.y);         // hy7ot f queue 25r position l snake


         		}



         	}
            

         	function draw(){

                
                var imgg=document.getElementById("bomb");
         		var tw=canvas.width/grid.width;   
         		var th=canvas.height/grid.height;
              
         		for(var x=0;x<grid.width;x++)
         		{
         			for(var y=0;y<grid.height;y++)
         			{
         				switch (grid.get(x,y))
         				{
         					case EMPTY:
         					  ctx.fillStyle="#39B7CD";
                              ctx.fillRect(x*tw,y*th,tw,th);
         					  break;
         					case SNAKE:
         					  ctx.fillStyle="yellow";
                              ctx.fillRect(x*tw,y*th,tw,th);
         					  break;
         					case FRUIT:
         					  //ctx.fillStyle="#f00";
                              //ctx.fillRect(x*tw,y*th,tw,th);
                            
                            
                                

                               ctx.drawImage(img[j],x*tw,y*th);
                               

    					  break;
                           case BOMB:
                               ctx.drawImage(imgg,x*tw,y*th);
                               break;
         				}

         				

         			}

         		}
         		ctx.fillStyle="#000";
         		ctx.fillText("SCORE:"+score,10,canvas.height-10);
                if(s==0)
                {   
                    ctx.font="20px Arcade";
                    ctx.fillStyle="#39B7CD";
                    ctx.fillText("sound is off",30,30);
                    ctx.fillStyle="#f00";
                    ctx.fillText("sound is on",30,30);

                }
                if(s==1)
                {   
                    ctx.font="20px Arcade";
                    ctx.fillStyle="#39B7CD";
                    ctx.fillText("sound is on",30,30);
                    ctx.fillStyle="#f00";
                    ctx.fillText("sound is off",30,30);

                }
                      ctx.font="20px Arcade";
                 ctx.fillStyle="#f00";
                ctx.fillText("name : "+sign,30,50);
              

         	}
            
          
                function print()
                {
                    ctx.font="15px Arcade";
                        ctx.fillStyle="#f00";
                        ctx.fillText(localStorage.key(0),canvas.width-500,canvas.height-250);
                        ctx.fillText( localStorage.getItem(localStorage.key(0)),canvas.width-100,canvas.height-250);
                        ctx.fillText(localStorage.key(1),canvas.width-500,canvas.height-230);
                        ctx.fillText( localStorage.getItem(localStorage.key(1)),canvas.width-100,canvas.height-230);
                        ctx.fillText(localStorage.key(2),canvas.width-500,canvas.height-210);
                        ctx.fillText( localStorage.getItem(localStorage.key(2)),canvas.width-100,canvas.height-210);
                        ctx.fillText(localStorage.key(3),canvas.width-500,canvas.height-190);
                        ctx.fillText( localStorage.getItem(localStorage.key(3)),canvas.width-100,canvas.height-190);
                        ctx.fillText(localStorage.key(4),canvas.width-500,canvas.height-170);
                        ctx.fillText( localStorage.getItem(localStorage.key(4)),canvas.width-100,canvas.height-170);
                        ctx.fillText(localStorage.key(5),canvas.width-500,canvas.height-150);
                        ctx.fillText( localStorage.getItem(localStorage.key(5)),canvas.width-100,canvas.height-150);
                        ctx.fillText(localStorage.key(6),canvas.width-500,canvas.height-130);
                        ctx.fillText( localStorage.getItem(localStorage.key(6)),canvas.width-100,canvas.height-130);
                        ctx.fillText(localStorage.key(7),canvas.width-500,canvas.height-110);
                        ctx.fillText( localStorage.getItem(localStorage.key(7)),canvas.width-100,canvas.height-110);
                        ctx.fillText(localStorage.key(8),canvas.width-500,canvas.height-90);
                        ctx.fillText( localStorage.getItem(localStorage.key(8)),canvas.width-100,canvas.height-90);
                        ctx.fillText(localStorage.key(9),canvas.width-500,canvas.height-70);
                        ctx.fillText( localStorage.getItem(localStorage.key(9)),canvas.width-100,canvas.height-70);

                        

                    
               
                    
                }
                function write()
                {
                                 localStorage.clear();
                if(localStorage.length==0)
                {

     
    localStorage.setItem(array[0],scores[0]);
    localStorage.setItem(array[1],scores[1]);
    localStorage.setItem(array[2],scores[2]);

    localStorage.setItem(array[3],scores[3]);
    localStorage.setItem(array[4],scores[4]);
    localStorage.setItem(array[5],scores[5]);

    localStorage.setItem(array[6],scores[6]);
    localStorage.setItem(array[7],scores[7]);
    localStorage.setItem(array[8],scores[8]);

    localStorage.setItem(array[9],scores[9]);

                }
                }

               var array=[],scores=[];
               array[0]="rana";
               scores[0]="100";
                array[1]="nour";
               scores[1]="99";
                array[2]="eyad";
               scores[2]="60";
                array[3]="hend";
               scores[3]="55";
                array[4]="mohamed";
               scores[4]="50";
               array[5]="ahmed";
               scores[5]="45";
                array[6]="gege";
               scores[6]="30";
                array[7]="ola";
               scores[7]="25";
                array[8]="hoda";
               scores[8]="20";
               array[9]="semsem";
               scores[9]="10";

               write();


               canvas = document.getElementById("canvas");
                
                ctx =canvas.getContext("2d");
            
                 ctx.font="60px Arcade";
                 ctx.fillStyle="#f00";
                ctx.fillText("PRESS PLAY ME!!!",canvas.width-510,canvas.height/2);
                 ctx.font="20px Arcade";
                 ctx.fillStyle="#f00";
                ctx.fillText("sound is on",30,30);
                  var sign="";
                

               var img= [];
                img[0]= document.getElementById("melon");
                img[1]= document.getElementById("straw");
                img[2]= document.getElementById("grapes");

             
