'use strict';

angular.module('postOfficeProjectApp')
  .constant('Config', {
  	templates: [{
  		src: "images/red.jpg",
  		address: {
  			position: "absolute",
  			top: "280px",
  			left: "10px",
  			color: "black"
  		},
  		image: {
  			position: "absolute",
  			top: "300px",
  			left: "10px",
  			width: "300px",
  			height: "200px"	
  		},
  		agentPic: {
  			position: "absolute",
  			top: "0px",
  			left: "560px",
  			width: "150px",
  			height: "200px"		
  		},
  		agentName: {
  			position: "absolute",
  			top: "210px",
  			left: "600px",
  			color: "black"	
  		}
  	},{
  		src: "images/orange.jpeg",
  		address: {
  			position: "absolute",
  			top: "0",
  			left: "500px",
  			color: "black"
  		},
  		image: {
  			position: "absolute",
  			top: "0",
  			left: "500px",
  			width: "80px",
  			height: "80px"	
  		}
  	}]
  });
