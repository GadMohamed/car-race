

$(function(){
    
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
        var imgFullPath = ui.draggable.context.firstElementChild.src ;
        var indexOfImg = imgFullPath.lastIndexOf("img");
        var newPath = imgFullPath.slice(indexOfImg);    
        
       // var imgPlayerPath = $(".player").get(0).firstElementChild; 
            
        $(".player img").attr("src",newPath);
               
            
            
        $(".draggable").draggable("destroy"); 
        $(".show").children().fadeOut(1000,function(){
                
                $(".show").animate({height:"5px"},700);
                $(".show").animate({width:"0"},1000);
                $(".player").fadeIn(1000);
                
            });
            
        }
    });
    
    
    
    
});

    
  

    


    
            
            
            
                
            
                
                
                
               
                   
                   
              
            
   
                
                
                


            
            
            
            
            
            
            