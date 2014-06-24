'use strict';

angular.module('postOfficeProjectApp')
  .constant('Config', {
    spark: {
      loginURL: "https://sparkplatform.com/openid?openid.mode=checkid_setup&openid.return_to=https://post-office-project.herokuapp.com&openid.spark.client_id=r4pjgm1lhd7e7d2cbbplzz16&openid.spark.combined_flow=true"
    },
  	searchFields: ["City","StateOrProvince"],
    styles: {
      colors: ["black","green", "red","white"],
      layouts: [{
        label: "Basic",
        active: true,
        address: {
          xPos: 0,
          yPos: 300
        },
        agentPhoto: {
          xPos: 450,
          yPos: 300
        },
        agentName: {
          xPos: 450,
          yPos: 270
        },
        propertyPhoto: {
          xPos: 10,
          yPos: 10
        },
        summary: {
          xPos: 350,
          yPos: 50
        }
      }]
    },
  	templates: [{
  		src: "images/blue_bricks.gif",
      fields: {
        agentName: {
          label: "Agent Name"
        },
        address: {
          label: "Property Address"
        },
        summary: {
          label: "Property Address"
        }
      }
  	},{
  		src: "images/gold_bricks.gif",
      fields: {
        agentName: {
          label: "Agent Name"
        },
        address: {
          label: "Property Address"
        },
        summary: {
          label: "Property Address"
        }
      }
  	}]
  });
