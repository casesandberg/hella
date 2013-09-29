$(function(){
	
	var $mixBucket = $("#song-mix").find('.bucket'),
		$mixBeats = $mixBucket.find('.beat'), 
		$songBeats = $("#song-1, #song-2").find('.beat');
	
	$mixBucket.sortable({
		revert: true
    });
    $songBeats.draggable({
		connectToSortable: $mixBucket,
		helper: "clone",
		revert: "invalid"
    });
    $( "ul, li" ).disableSelection();
    
    $("#song-mix").find('.beat').on('mouseup',function(){
		$(this).remove();
	});
	
	$mixBeats.each(function(){
		$(this).css('width', '');
	});
});