// Autocompletado de Google Maps
var searchBox = new google.maps.places.SearchBox(document.querySelector('#city-search'));

// Obtener latitud y longitud de la ciudad
searchBox.addListener('places_changed', function() {
  var locale = searchBox.getPlaces()[0];
  var latitude = locale.geometry.location.lat();
  var longitude = locale.geometry.location.lng();
  // Conectando la API de Darksky
  $.ajax({
    url: 'https://api.darksky.net/forecast/270ef7d5dce3787ae4f2c2aa59cde814/' + latitude + ',' + longitude,
    // jasop para saltar protocolos de seguridad
    dataType: 'jsonp',

    success: function(forecast) {
      console.log(forecast);
      // Pidiendo a la data los datos a mostrar
      var temp = forecast.daily.data[0].apparentTemperatureHigh;
      var probRain = forecast.daily.data[0].precipProbability;
      var humidity = forecast.daily.data[0].humidity;
      var summary = forecast.daily.data[0].summary;
      var icon = forecast.daily.data[0].icon;
      // Creando modal donde mostrar la info del día
      $('#get-today').click(function() {
        $('.modal').modal();
        $('.container-modal').append('<div id="modal1" class="modal center-align"><div class="modal-content"><h4>Today</h4><img class="icon" src="assets/img/DarkSky-icons/PNG/' + icon + '.png"/><h5>T° Max. ' + ((temp - 32) / 1.8).toFixed() + '°</h5><h5>' + summary + '</h5><h6>Chance of rain ' + probRain + '%</h6><h6>Humidity ' + humidity + '%</h6></div></div>');
      });
      // Creando modal con los datos de la semana
      $('#get-week').click(function() {
        $('.modal').modal();
        for (i = 1; i < forecast.daily.data.length; i++) {
          var tempNext = forecast.daily.data[i].apparentTemperatureHigh;
          var iconNext = forecast.daily.data[i].icon;
          var summaryNext = forecast.daily.data[i].summary;
          var timeNext = forecast.daily.data[i].time;
          // Transformando Time Unix en fecha normal
          var time = new Date(timeNext * 1000);
          // Mostrar la fecha con el día abreviado y el numero
          var options = { weekday: 'short', 
            day: 'numeric' };
          var fecha = new Date(time);

          $('.next-week').append('<p><span>' + fecha.toLocaleDateString('es-ES', options) + '</span> - <span>' + ((tempNext - 32) / 1.8).toFixed() + '°</span><span>' + summaryNext + '</span><img src="assets/img/DarkSky-icons/PNG/' + iconNext + '.png"/></p>');
        }
      });
    }
  });
});
