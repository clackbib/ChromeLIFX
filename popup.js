$(document).ready(function() {
	var select = $('#lightSelect');
	var hue = $('#hue');
	var sat = $('#saturation')
	var bright = $('#brightness')
	
	loadLights();
	
	//Init Listeners
    $("#toggle").click(function(){
		var selectedId = select.val();
		if(selectedId ==null || selectedId == "-1"){
			toast_msg("Select a light first.");
		}else{
			sendLIFXCommand('id:'+selectedId, '/toggle', 'POST','', function(){toast_msg("Success");}, function(){toast_msg("Failure");})
		}
    });
	$("#refresh").click(function(){
		loadLights();
	});
	
	hue.on("change", function() {
		updateLights();
	});
	
	sat.on("change", function() {
		updateLights();
	});
	
	bright.on("change", function() {
		updateLights();
	});
	
	
	function updateLights(){
		var hueVal = hue.val()/100;
		var satVal = sat.val()/100;
		var bVal = bright.val()/100;
		var colorStr = 'hsb:'+hueVal+","+satVal+","+bVal;
		var selectedId = select.val();
		if(selectedId != null && selectedId != "-1"){
			sendLIFXCommand('id:'+selectedId, '/color', 'PUT','{"color": "'+colorStr+'"}', null, function(){toast_msg("Failure");})
		}
	}
	
	function loadLights(){
		sendLIFXCommand('all', '', 'GET','', 
		function(response){
			var light;
			var $el = $("#lightSelect");
			$el.empty();
			$el.html('<option value="-1" disabled selected>Choose Light/Group</option>')
			for (i = 0; i < response.length; i++) { 
				var element = response[i];
			    var optString = '<option value="'+element.id+'">'+element.label+'</option>';
				$el.append(optString);
			}
			updateSelect();
		}, 
		function(response){
			toast_msg("Failure");
		})
	}
	
	
	function updateSelect(){
		select.material_select();
	}
	
	function sendLIFXCommand(selector, endpoint,reqType, payload, successCB, failureCB){
		$.ajax({
			url: 'https://api.lifx.com/v1beta1/lights/'+selector+endpoint,
			type: reqType,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer cea684759618f96da6bb74b88ac59dfaa3550ae9919ebd13abcf1ef4e23bec9e');
				xhr.setRequestHeader('Content-Type', 'application/json');
			},
			dataType:'json',
			data: payload,
			contentType: 'application/json',
			success: successCB,
			error: failureCB,
		});
	}
	
	
	function toast_msg(msg){
		Materialize.toast(msg, 2000, 'rounded')
	}
	
	
	
});