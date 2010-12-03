var update_form_data = function()
{
    $('.gmap_address').val(marker.google_position);
    $('.gmap_lng').html(this.position.lng());
    //$('#sf_guard_user_gps_precision').val(this.gps_precision);
    //console.log('position lue ' + marker.google_position);
    $('.gmap_lat').html(this.position.lat());
}

var set_clicked_location = function(response, status)
{
  if(status != google.maps.GeocoderStatus.OK)
  {
    alert('Oops... adress not recognized by Google !');
    return false;
  }
  
  var zoom=15;
  //console.log(response[0].geometry);
  //console.log(response[0].geometry.location_type);
  switch(response[0].geometry.location_type)
  {
    // country level
    case google.maps.GeocoderLocationType.APPROXIMATE:
      zoom=9;
      break;
    case google.maps.GeocoderLocationType.GEOMETRIC_CENTER:
      zoom=11;
      break;
    // city level
    case google.maps.GeocoderLocationType.RANGE_INTERPOLATED:
      zoom=13;
      break;
    case google.maps.GeocoderLocationType.ROOFTOP:
      zoom=14;
      break;
    default:      
      zoom=14;
      break;
  }
  
  point = response[0].geometry.location;
  //console.log(point);
  
  if (typeof marker == 'undefined')
  {
    marker = new google.maps.Marker({'map': map, draggable: true});
    google.maps.event.addListener(marker, 'position_changed', update_form_data)
  }
  marker.google_position = response[0].formatted_address;
  marker.gps_precision = zoom;
  
  marker.setPosition(point);
  marker.setVisible(true);
  //map.setZoom(zoom);
  //map.setCenter(point);
}

var geocode_clicked = function (event)
{
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'location': event.latLng}, set_clicked_location);
}

