
var test 	 = require( 'tape' );

var Proxy	 = require( 'jux-bounds-proxy' );
var Layout 	 = require( 'jux-layout' );
var Renderer = require( '../Renderer' );


test( 'Renderer', function( t ){

	var data = [0,1,2,3,4,5,6,7,8,9];
	var layout = new Layout( data, {
		layoutOpts:{
			itemWidth: 100,
			itemHeight: 100,
			itemSpacing: 0
		}
	});

	layout.update();

	var proxy = new Proxy(); // use fake bounds proxy for testing.
	var renderer = new Renderer( layout, proxy, null );

	proxy.extend( {

		create: function( data ){

		},
		data_set: function( object, data ){

		},
		add:function( container, object ){

		},
		remove: function( container, object ){

		},
		position_set: function( object, x, y ){

		},
		size_set: function( object, width, height ){

		}
	});

	t.end();

});