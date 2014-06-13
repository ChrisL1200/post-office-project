'use strict';

angular.module('postOfficeProjectApp')
  .constant('Config', {
    spark: {
      loginURL: "https://sparkplatform.com/openid?openid.mode=checkid_setup&openid.return_to=https://post-office-project.herokuapp.com&openid.spark.client_id=2784vbb6k8i7ejdy0vkd0r8ll&openid.spark.combined_flow=true"
    },
  	searchFields: ["City","StateOrProvince"],
    styles: {
      colors: ["black","green", "red","white"]
    },
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
  	}]
  });
