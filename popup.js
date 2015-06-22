$(document).ready(function() {
	$('lightSelect').material_select();
    $("#toggle").click(function(){
		$.ajax({
			url: 'https://api.lifx.com/v1beta1/lights/label:Living/effects/breathe',
			type: 'POST',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer cea684759618f96da6bb74b88ac59dfaa3550ae9919ebd13abcf1ef4e23bec9e');
				xhr.setRequestHeader('Content-Type', 'application/json');
				toast_msg('Sending..')
			},
			dataType:'json',
			data: '{"color":"red", "cycles":5}',
			contentType: 'application/json',
			success: function (response) { 
				toast_msg("Sent");
				toast_msg(response);
			},
			error: function (response) {
				toast_msg(response.responseJSON);
			},
		});
    });
	
	
	function toast_msg(msg){
		Materialize.toast(msg, 2000, 'rounded')
	}
	
	function updateOpts(response){
	
	}
});