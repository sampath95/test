function getLocation(){
  var msg; 
  if('geolocation' in navigator){
    requestLocation();
  }
  function requestLocation(){  
    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
      navigator.geolocation.getCurrentPosition(success, error, options); 
      function success(pos){
      var lng = pos.coords.longitude;
      var lat = pos.coords.latitude;
      msg = 'You appear to be at longitude: ' + lng + ' and latitude: ' + lat;
      var dis1=getDistanceFromLatLonInKm(lat,lng,48.8566,2.3522);
      var dis2=getDistanceFromLatLonInKm(lng,lat,45,7640,4.8357);
      var dis3=getDistanceFromLatLonInKm(lng,lat,43.2965,5.3698);
      var min=dis1;
       var city;
      if (min>dis2){ min=dis2}else if(min>dis3){ min=dis3; }
      if(min==dis1){alert("paris"); city="Paris";}else if(min==dis2){alert("lyon"); city="Lyon"}else{alert("marseille"); city="Marseille";}
      $(document).ready(function(){
        var key="b63e9291f4e5421bc99c5edda90b6759";
        $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather',
          dataType:'json',
          type:'GET',
          data:{q:city,appid:key,units:"metric"},
          success:function(data){
            console.log(data);
        alert('tempurature est' +data.main.temp)
          }
        })
      })
      outputResult(msg); 
    }
      function error(err){
      msg = 'Error: ' + err + ' :(';
      outputResult(msg);    }  
  } 
  function outputResult(msg){
    $('.result').addClass('result').html(msg);
  }
} 
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}



