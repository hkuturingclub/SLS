addMachines = function(machines, machine_type, selector) {
  $.each(machines, function(key, machine){
    html_element = $('<li>').addClass('list-group-item d-flex justify-content-between align-items-center');
    html_element.text([machine_type, machine.id].join(' '));

    badge_element = $('<span>').addClass('badge badge-pill');
    if (machine.status.is_free) {
        badge_element.addClass('badge-success').text('Free');
        html_element.addClass('text-success');
    } else {
        badge_element.addClass('badge-danger').text('Busy');
    }
    html_element.append(badge_element);

    $(selector).append(html_element);
  });
};
getLaundryStatus = function() {
	endpoint_url = 'https://cstc.azurewebsites.net/laundry/status';
  $.get(endpoint_url, function(response) {
    addMachines(response.dryer, 'Dryer', '#dryer_status');
    addMachines(response.washer, 'Washer', '#washer_status');
  }).done(function(){
          $("#loading-indicator").hide();
  });

};

addLoadingIndicator = function() {
 	$("#loading-indicator").show();
}

$(function() {
	addLoadingIndicator();
	getLaundryStatus();
});
