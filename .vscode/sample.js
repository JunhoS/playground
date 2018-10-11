function jQuery(a,c) {
    // Shortcut for document ready (because $(document).each() is silly)
    if ( a && a.constructor == Function && jQuery.fn.ready )
      return jQuery(document).ready(a); // (1)
   // Make sure that a selection was provided
    a = a || jQuery.context || document; // (2)
   // Watch for when a jQuery object is passed as the selector
    if ( a.jquery )
      return $( jQuery.merge( a, [] ) ); // (3)
   // Watch for when a jQuery object is passed at the context
    if ( c && c.jquery )
      return $( c ).find(a); // (4)
   // If the context is global, return a new object
    if ( window == this )
      return new jQuery(a,c); // (5)
   // Handle HTML strings
    var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
    if ( m ) a = jQuery.clean( [ m[1] ] ); // (6)
   // Watch for when an array is passed in
    this.get( a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
    // Assume that it is an array of DOM Elements
    jQuery.merge( a, [] ) :
   // Find the matching elements and save them for later
    jQuery.find( a, c ) ); // (7)
   // See if an extra function was provided
    var fn = arguments[ arguments.length - 1 ]; // (8)
   // If so, execute it in context
    if ( fn && fn.constructor == Function ) // (9)
      this.each(fn);
  }
  // Map over the $ in case of overwrite
  if ( typeof $ != "undefined" )
    jQuery._$ = $;
  // Map the jQuery namespace to the '$' one
  var $ = jQuery;