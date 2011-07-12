/* jquery-jangle-0.3.js
 *
 * Last modified by: Cory Dorning
 * Last modified on: 05/04/11
 *
 * jAngle is a jQuery plugin that uses CSS3 (or appropriate
 * MS filters) to rotate an element using the passed angle
 * parameter.
 *
 */

(function($) {
  $.fn.jangle = function(a) {
        // set default if one isn't passed in
    var angle = a == parseInt(a, 10) ? a % 360 : 180,

        // crazy math algorithm voodoo - see http://msdn.microsoft.com/en-us/library/ms533014%28VS.85%29.aspx
        // and http://www.boogdesign.com/b2evo/index.php/element-rotation-ie-matrix-filter?blog=2
        rotation = Math.PI * (angle < 0 ? angle + 360 : angle) / 180,
        cos = Math.cos(rotation),
        sin = Math.sin(rotation),

        // CSS vendor prefixes and JS properites
        prefixes = ['-khtml-', '-moz-', '-ms-', '-o-', '-webkit-'],
        properties = ['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'],

        // css transform init
        styleTransform,

        // feature detection - pulled from modernizr.js - http://www.modernizr.com/
        mod = 'modernizr',
        modElem = document.createElement(mod),
        mStyle = modElem.style,

        cssTransforms = function() { // test function for transform support
          for ( var i in properties ) {
            if ( mStyle[ properties[i] ] !== undefined ) {
                return true;
            }
          }
        },

        // ie matrix offsets
        setOffsets = function(img) { // set IE origin to match other browsers - http://blog.siteroller.net/cross-browser-css-rotation
          if (img.style.position !== 'absolute' && img.style.position !== 'fixed') {
            img.style.position = 'relative';
            img.style.top = (img.clientHeight - img.offsetHeight) / 2;
            img.style.left = (img.clientWidth - img.offsetWidth) / 2;
          }
        };

    if (cssTransforms()) { // supports CSS transforms
      for (var i = 0; i <= prefixes.length; i++) {
        styleTransform = prefixes[i] ? prefixes[i] + 'transform' : 'transform';

        this
          .css(styleTransform, 'rotate(' + angle + 'deg)');

        /* issue fixed in jQuery 1.6 - will remove completely after further testing
            // jQuery issue with -ms- prefix - http://bugs.jquery.com/ticket/8346
            if (prefixes[i] === '-ms-') {
              $(this).css({msTransform: 'rotate(' + angle + 'deg)'});
            }
        */
      }
    } else { // doesn't support CSS transforms - use IE filters
      this.each(function() {
        this.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12="+(-sin)+",M21="+sin+",M22="+cos+",SizingMethod='auto expand')";
        setOffsets(this);
      });
    }

    // don't be the weakest link (preserve chainability)
    return this;
  };
})(jQuery);