$(document).ready(function(){
         $('#kitten').draggable({
    stop: function() {
        var $canvas = $('#canvas') ;
        var ctx = $canvas.get(0).getContext('2d') ;
        var $img = $('#bead') ;
        var imgpos = $img.offset() ;
        var cpos = $canvas.offset() ;
        ctx.drawImage($img.get(0),imgpos.left-cpos.left, imgpos.top-cpos.top) ;
                     
    }
});
        
     
  
        
    });

