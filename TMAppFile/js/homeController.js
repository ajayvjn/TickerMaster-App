/**
 * Controller for homepage after login.
 */


app.controller('HomeCtrl', function ($scope, $resource, $location, $timeout, dataOnLoc) {
    $scope.errorMsg="";

    $scope.username = "abc";
    $scope.events = [];
    var init_pos = {lat: 0, lng: 0};
    var map = null;
    var infoWindow = new google.maps.InfoWindow();

    function initMap() {
        init_pos = {lat: 33.424564, lng: -111.928001};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: init_pos
        });

        createMarker(map, init_pos, "You", "user");
      }

      initMap();

       $timeout(function(){
           dataOnLoc.get({loc: init_pos.lat+"," +init_pos.lng})
            .$promise.then(function(resp) {
                $scope.events = resp._embedded.events;
                var marker = null;
                console.log($scope.events);

                for (i in $scope.events) {
                   //console.log(events[i].name);
                   //console.log(events[i]._embedded.venues[0].location);
                   latlng = {lat: parseFloat($scope.events[i]._embedded.venues[0].location.latitude),
                                lng: parseFloat($scope.events[i]._embedded.venues[0].location.longitude)};
                   marker = createMarker(map, latlng, $scope.events[i].name, "default");
               }
            });
       }, 500);

    function createMarker (map, myLatLng, title, icon){
        var image = null;
        if(icon == "user"){
            image = {
                url: 'img/you.png',
                scaledSize : new google.maps.Size(32, 32),
            };
        }

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: title,
            icon: image
        });

        google.maps.event.addListener(marker, "click", function () {
            infoWindow.setContent(title);
            infoWindow.open(map, this);
          });


        return marker;
    }

});

app.factory('dataOnLoc', ['$resource', function($resource) {
   return $resource('https://app.ticketmaster.com/discovery/v2/events.json?apikey='+c_key+'&latlong=:loc', null);
}]);