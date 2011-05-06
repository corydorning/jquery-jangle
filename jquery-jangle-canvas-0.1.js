/* jquery-jangle-0.1.js
 *
 * Last modified by: Cory Dorning
 * Last modified on: 4/27/11
 *
 * jangle is a jQuery plugin that converts an image
 * into a canvas element (or uses appropriate MS filters)
 * and rotates the image using the specified angle
 * parameter.
 *
 * Comment Anchors (For Developer Use)
 * =conversion
 * =algroithm
 * =rotate
 *
 */

(function($) {
  $.fn.jangle = function(a) {
    var angle = a || 180,
        oImage = this[0],
        canvas = document.createElement('canvas'),
        canvasExists = !!(canvas.getContext && canvas.getContext('2d')),
        rotation = Math.PI * (angle < 0 ? angle + 360 : angle) / 180,
        cos = Math.cos(rotation),
        sin = Math.sin(rotation);

    // =conversion
    // check for Canvas support
    if (canvasExists) {
      // convert image to canvas
      //var context = canvas.getContext('2d'),
      var originX, originY, origin,
          translateX, translateY,
          transform;

      if (rotation <= Math.PI / 2) {
        originX = 0;
        originY = 0;
        translateX = sin * oImage.height;
        translateY = 0;
      } else if (rotation <= Math.PI) {
        originX = 0;
        originY = 0;
        translateX = canvas.width;
        translateY = -cos*oImage.height;
      } else if (rotation <= 1.5 * Math.PI) {
        originX = 0;
        originY = 0;
        translateX = -cos*oImage.width;
        translateY = canvas.height;
      } else {
        originX = 0;
        originY = 0;
        translateX = 0;
        translateY = -sin*oImage.width;
      }
console.log(sin * oImage.height, canvas.width, -cos*oImage.height, -cos*oImage.width, canvas.height, -sin*oImage.width)
      origin = originX + 'px ' + originY + 'px',
      transform = 'translate(' + translateX + 'px, ' + translateY + 'px) rotate(' + angle + 'deg)';

      /*canvas.id = oImage.id;
      canvas.style.width = canvas.width = Math.abs(cos*oImage.width) + Math.abs(sin*oImage.height);
      canvas.style.height = canvas.height = Math.abs(cos*oImage.height) + Math.abs(sin*oImage.width);

      if (rotation <= Math.PI/2) {
        context.translate(sin*oImage.height,0);
      } else if (rotation <= Math.PI) {
        context.translate(canvas.width,-cos*oImage.height);
      } else if (rotation <= 1.5*Math.PI) {
        context.translate(-cos*oImage.width,canvas.height);
      } else {
        context.translate(0,-sin*oImage.width);
      }

      context.rotate(rotation);
      context.drawImage(oImage, 0, 0, oImage.width, oImage.height);

      $(oImage).replaceWith(canvas);*/

      // attempt with CSS only
      $(oImage)
        .css('-moz-transform', transform)
        .css('-ms-transform', transform)
        .css('-o-transform', transform)
        .css('-webkit-transform', transform)
        .css('transform', transform)
        .css('-moz-transform-origin', origin)
        .css('-ms-transform-origin', origin)
        .css('-o-transform-origin', origin)
        .css('-webkit-transform-origin', origin)
        .css('transform-origin', origin);
    } else {
      oImage.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12="+(-sin)+",M21="+sin+",M22="+cos+",SizingMethod='auto expand')";
    }

    return this;
  };
})(jQuery);