addMachines = function(machines, machine_type, selector) {
  $.each(machines, function(key, machine){
    status = machine.status.is_free ? 'Free' : 'Busy';
    html_element = $('<li>').text(machine_type + ' ' + machine.id + ': ' + status);
    $(selector).append(html_element);
  });
};

getLaundryStatus = function() {
  endpoint_url = 'https://cstc.azurewebsites.net/laundry/status';
  $.get(endpoint_url, function(response) {
    addMachines(response.dryer, 'Dryer', '#dryer_status');
    addMachines(response.washer, 'Washer', '#washer_status');
  });
};

$(function() {
  getLaundryStatus();
});
