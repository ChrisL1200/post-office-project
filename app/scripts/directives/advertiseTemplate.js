'use strict';

angular.module('postOfficeProjectApp')
  .directive('advertiseTemplate', function () {
    return {
      restrict: 'A',
      scope: {
        template: '=',
        layout: '=',
        agentPhoto: '=',
        propertyPhoto: '='
      },
      link: function(scope, element, attrs) {
        var context = element[0].getContext('2d');
        function loadImages(sources) {
          var images = [];
          var loadedImages = 0;
          var numImages = 0;
          angular.forEach(sources, function(source, key){
            var image = new Image();
            image.src = source;
            // if(key === 'propertyPhoto') {
            //   image.crossOrigin = "Anonymous";
            // }
            
            images.push({object: image, label: key});
            image.onload = function() {
              loadedImages++;
              if(loadedImages === 3) {
                //Draw Images
                angular.forEach(images, function(image){
                  if(image.label !== 'background') {
                    context.drawImage(image.object, scope.layout[image.label]['xPos'], scope.layout[image.label]['yPos']);
                  }
                  else {
                    context.drawImage(image.object, 0, 0, 900, 600);
                  }
                });

                //Draw Text
                context.fillText(scope.template.fields.agentName.value, scope.layout.agentName.xPos, scope.layout.agentName.yPos);
                context.fillText(scope.template.fields.summary.value, scope.layout.summary.xPos, scope.layout.summary.yPos);
                context.fillText(scope.template.fields.address.value, scope.layout.address.xPos, scope.layout.address.yPos);
              }
            }
          });
        }

        loadImages({ background: scope.template.src, agentPhoto: scope.agentPhoto, propertyPhoto: "/api/imageProxy?url="+scope.propertyPhoto});
        // var background = new Image();        
        // context.fillStyle = '#f00';
        // context.font = 'italic bold 14px sans-serif';
        // context.textBaseline = 'bottom';
        // // context.scale(3,3);
        // background.src = scope.template.src;
        // background.onload = function() {
        //   //Background first
        //   context.drawImage(background, 0, 0); 
        //   //Agent Pic

        //   //Home Pic

        //   context.fillText('HTML5 is cool!', 50, 100);
        //   context.scale(3,3);
        // }
      }
    };
  });