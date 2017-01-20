geo.controller('GeoCtrl', ['$scope',
                           '$cordovaGeolocation',
                           '$interval',
                           function ($scope, $cordovaGeolocation, $interval) {



    /*
    
    if (typeof (Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function () {
        return this * Math.PI / 180;
      }
    }
    window.navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;
      var lat1 = -0.175532;
      var lon1 = -78.500938;


      console.log(distance(lon, lat, lon1, lat1));
    });
    function distance(lon1, lat1, lon2, lat2) {
      var R = 6371; // Radius of the earth in km
      var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
      var dLon = (lon2 - lon1).toRad();
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }*/





    console.log("Controlador Geolocalizacion");
//        La variable Number.prototype.toRad esta dentro del prototype.js, y es para transformar a radianes                        
    if (typeof (Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function () {
        return this * Math.PI / 180;
      }
    }
    $scope.lat = 0;
    $scope.long = 0;

    $scope.distancia = 0;

    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    };


    $scope.oficina = {
      nombre: 'Oficina Duran',
      lat: -0.2100532,
      long: -78.4886495
    }

    $scope.Uni = {
      nombre: 'Eloy Alfaro',
      lat: -0.2070576,
      long: -78.4922316
    }

    $scope.Tenis = {
      nombre: 'Quito Tenis',
      lat: -0.1400951,
      long: -78.4934603

    }

    $scope.lugar = {
      latmax: 0,
      longmax: 0,
      latmin: 0,
      longmin: 0
    }



    $scope.obtenerPosicion = function () {

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          $scope.lat = lat;
          $scope.long = long;
        }, function (err) {
          console.log(err);
        });

      $scope.distancia = $scope.calcularDistancia($scope.Tenis.long, $scope.Tenis.lat ,$scope.long, $scope.lat);


    }

    $scope.calcularDistancia = function (lon1, lat1, lon2, lat2) {
      var R = 6371; // Radius of the earth in km
      var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
      var dLon = (lon2 - lon1).toRad();
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }

    $scope.dondeEstoy = function (lugarPublicidad) {

      var latmin = lugarPublicidad.lat - 5;
      var latmax = lugarPublicidad.lat + 5;
      var longmin = lugarPublicidad.long - 5;
      var longmax = lugarPublicidad.long + 5;
      console.log("lat: " + lugarPublicidad.lat);
      console.log("long: " + lugarPublicidad.long);
      console.log("latmin: " + latmin);
      console.log("latmax: " + latmax);
      console.log("longmin: " + longmin);
      console.log("longmax: " + longmax);
      console.log($scope.lat);
      console.log($scope.long);


      if ($scope.lat >= latmin && $scope.lat <= latmax && $scope.long >= longmin && $scope.long <= longmax) {
        $scope.lugarEncontrado = lugarPublicidad.nombre;
      } else {

        $scope.lugarEncontrado = 'No registrado';
      }


    }

    $scope.revisarUbicacion = function () {

      if ($scope.lat == 0 && $scope.long == 0) {
        $scope.obtenerPosicion();

      } else {
        $scope.distancia = $scope.calcularDistancia($scope.Tenis.long, $scope.Tenis.lat ,$scope.long, $scope.lat);
        //$scope.dondeEstoy($scope.oficina);
        console.log("no pasa nada");
      }
    }

    $interval($scope.revisarUbicacion, 3000);


    //$scope.obtenerPosicion();

}]);
