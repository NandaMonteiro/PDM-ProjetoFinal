angular.module('controllers', [])

.controller('ctrl', ['$scope', '$rootScope', '$cordovaCamera', function($scope, $rootScope, $cordovaCamera) {

	$scope.ready = false;
	$scope.images = [];
	
	$rootScope.$watch('appReady.status', function() {
		console.log('watch fired '+$rootScope.appReady.status);
		if($rootScope.appReady.status) $scope.ready = true;
	});
	
	$scope.selImages = function() {
		
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			targetWidth: 200,
			targetHeight: 200
		};

		$cordovaCamera.getPicture(options).then(function(imageUri) {
			console.log('img', imageUri);
			$scope.images.push(imageUri);
					
		}, function(err) {
			//alert('Erro: ' + err);
		});

	};

	$scope.takePicture = function(){

		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,			
			targetWidth: 200,
			targetHeight: 200			
		};

		$cordovaCamera.getPicture(options).then(function(imageUri) {
			console.log('img', imageUri);
			$scope.images.push(imageUri);
					
		}, function(err) {
			//alert('Erro: ' + err);
		});
	};
	
}])

var pictureSource;
var destinationType;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageURI) {
	alert(imageURI);
	$scope.images.push(imageURI);	
}

function onFail(message) {
	alert('Failed because: ' + message);
}
