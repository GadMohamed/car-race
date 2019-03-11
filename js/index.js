

$(function(){


    

    //========================== All Variables ==================================

    var anim_id;

    const container = $('#container');
    const car = $('#car');
    const car_1 = $('#car1');
    const car_2 = $('#car2');
    const car_3 = $('#car3');
    const line_1 = $('#line1');
    const line_2 = $('#line2');
    const line_3 = $('#line3');
    const restart_div = $('#restart_div');
    const restart_btn = $('#restart');
    const score = $('#score');
    const audio = document.getElementById("audio"); 
    const audio_game_over = document.getElementById('audio_game_over'); 
    

    //saving some initial setup
    let container_left = parseInt(container.css('left'));
    let container_width = parseInt(container.width());
    let container_height = parseInt(container.height());
    let car_width = parseInt(car.width());
    let car_height = parseInt(car.height());

    //some other declarations
    let game_over = false;

    let score_counter = 1;

    let speed = 3;
    let line_speed = 5;

    let move_right = false;
    let move_left = false;
    let move_up = false;
    let move_down = false;


    //=========================== End Variables Declaration ==================================

    //===========================================================================
  
    //disappear all element 
    $('#container').css('opacity','0');
    $('#score').css('opacity','0');
   
    new WOW().init();
    
    $(".show").animate({width:"100%"},1000);
    $(".show").animate({height:"100vh"},700,function(){
        
        $(".show").children().fadeIn(1000);
        
    });
    
    
    $(".draggable").draggable(
    {
       containment : ".show",
        zIndex: 1000,
        
    });
    
    $(".dropable").droppable(
    {
        accept: "*",
        drop: function(event, ui) {
        let imgFullPath = ui.draggable.context.firstElementChild.src ;
        let indexOfImg = imgFullPath.lastIndexOf("img");
        let newPath = imgFullPath.slice(indexOfImg);    
        
       // let imgPlayerPath = $(".player").get(0).firstElementChild; 
            
        $(".player img").attr("src",newPath);
               
            
            
        $(".draggable").draggable("destroy"); 
        $(".show").children().fadeOut(1000,function(){
        
                $(".show").animate({height:"3px"},700);
                $(".show").animate({width:"0"},1000);
                $(".player").fadeIn(1000,function(){
                    $('#container').animate({opacity : 1},1000);
                    $('#score').animate({opacity : 1},1000);
                    //play audio
                       audio.play();                  
                });
                
                
            });
            
        }
    });



    //==============================================================================

    
    
      

      

    /* ===============================GAME CODE START HERE=============================== */

    //handel keydown events . حركه السياره
    $(document).on('keydown',function(e){
        if( game_over === false ){
            let key = e.keyCode;
            if( key === 37 ){
                move_left = requestAnimationFrame(left);
            } 
            else if( key === 39 ){
                move_right = requestAnimationFrame(right);
            }
            else if( key === 38 ){
                move_up = requestAnimationFrame(up);
            }
            else if( key === 40 ){
                move_down = requestAnimationFrame(down);
            }
                
        }
            
    })

    // handel keyUp events . وقف حركه السياره
    $(document).on('keyup',function(e){

        if( game_over === false ){
            let key = e.keyCode;
            if( key === 37 ){
             cancelAnimationFrame(move_left);
            }
            else if( key === 39 ){
                cancelAnimationFrame(move_right);
            }
            else if( key === 38 ){
                cancelAnimationFrame(move_up);
            }
            else if( key === 40 ){
                cancelAnimationFrame(move_down);
            }
        }
        

    })
    
    //when press left bottom
    function left(){
        let carLeft = parseInt(car.css('left'));
        if( game_over === false && carLeft > 2 ){       
          car.css( 'left', carLeft - 5);  
          move_left = requestAnimationFrame(left);
        }

    }

    //when press right bottom 
    function right()
    {
        let carLeft = parseInt(car.css('left'));
        if ( game_over === false && carLeft < container_width - car_width - 10 ){
           car.css( 'left' , parseInt(car.css('left')) + 5 );
           move_right = requestAnimationFrame(right);
        }

    }

    //when press up bottom
    function up()
    {
        let carTop = parseInt(car.css('top'));
        if ( game_over === false && carTop > 7  ){
           car.css( 'top' , carTop - 5 );
           move_up = requestAnimationFrame(up);
        }

    }

    //when press down bottom
    function down()
    {
        let carTop = parseInt(car.css('top'));
        if ( game_over === false && carTop < container_height - car_height ){
           car.css( 'top' , carTop + 5 );
           move_down = requestAnimationFrame(down);
        }

    }


    // move cars and lines with animation
    anim_id = requestAnimationFrame(repeat);

    function repeat()
    {
        if( game_over === false ){
          
            //
            score_counter++;
            if(score_counter % 20 === 0) // to reduce time 
            {
                score.text(parseInt(score.text()) + 1 );
            }
            
            moveCar(car_1);
            moveCar(car_2);
            moveCar(car_3);

            moveLine(line_1);
            moveLine(line_2);
            moveLine(line_3);

            if(crash(car,car_1)||crash(car,car_2)||crash(car,car_3))
            {
                stopGame();
            }
  
            anim_id = requestAnimationFrame(repeat);
    
        }
    }

    //car move
    function moveCar(_car)
    {
       carTop = parseInt(_car.css('top'));
       if( carTop > container_height )
       {
        carTop = -200; 
        let carLeft = parseInt( Math.random() * (container_width - car_width) );
        _car.css('left' , carLeft );
       }
       //increase top of car (car move until top > container height)
       _car.css( 'top' , carTop + speed );
    }

    //line move
    function moveLine(line)
    {
        lineTop = parseInt(line.css('top'));
        if( lineTop > container_height )
        {
            lineTop = -200;
        }
        line.css( 'top' , lineTop + line_speed)
    }

    //when game over 
    function stopGame()
    {
        game_over = true;
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        cancelAnimationFrame(anim_id);
        restart_div.fadeIn(200);
        restart_btn.focus();
        audio.pause();
        audio_game_over.play();
    }

    //when click restart button
    restart_btn.click(function(){
        //location.reload();
        restart_div.fadeOut(50);
        game_over = false;
        requestAnimationFrame(left);
        requestAnimationFrame(right);
        requestAnimationFrame(up);
        requestAnimationFrame(down);
        requestAnimationFrame(repeat); 
        car.css('top','80%');
        car_1.css('top','-30%');
        car_2.css('top','-50%');
        car_3.css('top','-60%');
        //reload audi from start when game over
        audio.currentTime = 1;
        audio.play();
    });

    // reload audio from start لما يوصل الثانيه العاشره
    window.setInterval(function(){

        if( game_over === false )
        {
           if( audio.currentTime > 10 )
            {
                audio.currentTime = 2;
            }
        }
        
    },1000)


    
    
    /* ===============================GAME CODE ENDS HERE=============================== */


    // ====================== Check Game Over ==================================

    function crash($div1, $div2) {

        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        let b1 = y1 + h1;
        let r1 = x1 + w1;
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);
        let b2 = y2 + h2;
        let r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    
    
    
});

    
  

    


    
            
            
            
                
            
                
                
                
               
                   
                   
              
            
   
                
                
                


            
            
            
            
            
            
            