$(document).ready(function() {
	$('lightSelect').material_select();
    $("#toggle").click(function(){
		$.ajax({
			url: 'https://api.lifx.com/v1beta1/lights/label:Living/toggle',
			type: 'POST',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer cea684759618f96da6bb74b88ac59dfaa3550ae9919ebd13abcf1ef4e23bec9e');
				toast_msg('Sending..')
			},
			dataType:'json',
			data: {},
			contentType: 'application/json',
			success: function (response) { /*toast_msg("Sent");*/updateOpts(response);},
			error: function () { toast_msg("Failure")},
		});
    });
	
	
	function toast_msg(msg){
		Materialize.toast(msg, 2000, 'rounded')
	}
	
	function updateOpts(response){
	$('#theDiv').html(response[0]);
	var newOptions = {"Option 1": "value1",
	  "Option 2": "value2",
	  "Option 3": "value3"
	};

	var $el = $("#lightSelect");
	$el.empty(); // remove old options
	$.each(newOptions, function(value,key) {
	  $el.append($("<option></option>")
	     .attr("value", value).text(key));
	});
	}
});