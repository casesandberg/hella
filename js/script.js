var draggin = function() {
	
	var $mixBucket = $('#song-mix').find('.bucket'),
		$mixBeats = $mixBucket.find('.beat'), 
		$songBeats = $('#songs').find('.beat'),
		
		$mixWidth = $mixBucket.width() - 20;
		
	resize();
	
	$('#controls').find('.play').click(function(){
		playhead('play');
		return false;
	});
	
	$mixBucket.sortable({
		revert: true,
		update: function (event, ui){        	
	        resize();
        },
        
        placeholder: 'placeholder',
        
        over: function (event, ui){ 
        	console.log('over');       	
	        resize();
	        var draggedBeats = $('.ui-draggable-dragging').attr('data-beats');
	        sameWidth = $mixBucket.find('.beat[data-beats="' + draggedBeats + '"]').eq(0).width() - 1;
	        console.log('over' + sameWidth);
	        $('.ui-draggable-dragging').css('width', sameWidth);
	        
	        ui.placeholder.addClass('beat').css('width', sameWidth - 1);
        },
        
        
        start: function(event, ui) {
        	//console.log('start' + sameWidth);
			
        },
    });
    
    $songBeats.draggable({
		connectToSortable: $mixBucket,
		helper: 'clone',
		revert: 'invalid',
		
		drag: function (event, ui){
			$(this).parent().addClass('dragging');
        },

        stop: function (event, ui){
        	resize();
        	$(this).parent().removeClass('dragging');
        },
            
    });
    
    $('#scrubbing').find('.handle').draggable({
		containment: '#scrubbing',
		axis: 'x'
    });
    
    $('ul, li').disableSelection();
        
    $mixBeats.on('mouseup',function(){
		$(this).css('width', $(this).width());
	});

	function resize(){
		console.log('resizing');
		$mixBeats = $mixBucket.find('.beat').not('.placeholder');
		var numberOfBeats = 0;
		for(var i = 0; i < $mixBeats.length; i++){
			numberOfBeats = numberOfBeats + parseInt($mixBeats.eq(i).attr('data-beats'));
		}
		if ($mixBeats.length < 10){
			numberOfBeats = 20;
		}
		for(var j = 0; j < $mixBeats.length; j++){
			$mixBeats.eq(j).css('width', (($mixBeats.eq(j).attr('data-beats') * $mixWidth) / numberOfBeats) -1);
		}
	}
	
	function playhead(aciton, place){
		if (action = 'play'){
			$secondPush = (convert('2:29.460') / $mixWidth);
			var count = setTimeout(counting, 2000);
		}
	}
	
	function convert(input){
	    var parts = input.split(':');
	    var result = Number(parts[0]) * 60 + Number(parts[1]);
		return(result.toFixed(3));
	}
	
	var counter = 0;
	function counting(){
		var $play = $('#play');
		counter = counter + $secondPush;
		console.log(counter);
		count = setTimeout(counting, 2000);
		$play.css('left', count + '%');
		$play.find('.time').html(counter)
	}
	
	function abortTimer(){
		clearTimeout(count);
	}
}