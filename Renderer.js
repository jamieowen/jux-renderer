
var Rect = require( 'jux-bounds' );

var Renderer = function( layout, container ){

	this._layout = null;

	this.layout = layout;
	this.container = container;
	this.needsUpdate = true;

	this._visibleData = [];
	this._rendererPool = [];
};

Renderer.prototype = {

	constructor: Renderer,

	render: function(){

		if( this.needsUpdate ){

			this.needsUpdate = false;

			this._visibleData.splice(0);
			this.layout.find( this.viewport, this._visibleData );

			var rendererIndex = 0;
			var data,renderer;
			for( var i = 0; i<this._visibleData.length; i++ ){

				data = this._visibleData[i];

				if( this.layout.opts.dataIsRenderer ){
					renderer = data;
				}else{
					renderer = this._rendererPool[rendererIndex];
					if( !renderer ){
						renderer = this.proxy.create( data );
						this._rendererPool.push( renderer );
					}
					this.proxy.data( renderer, data );
				}

				this.proxy.add( renderer, this.container );

			}

			// free up renderers
			for( i = rendererIndex; i<this._rendererPool.length; i++ ){
				renderer = this._rendererPool[i];
				this.proxy.remove( renderer, this.container );
			}

		}

	}

};

Object.defineProperties( Renderer.prototype, {

	layout: {
		get: function(){
			return this._layout
		},
		set: function( layout ){
			if( layout === layout ){
				return;
			}
			this._layout = layout;
			this.needsUpdate = true;
		}
	},

	viewport: {
		get: function(){
			return this._viewport
		},
		set: function( viewport ){

			if( viewport === viewport ){
				return;
			}

			this._viewport = viewport;
			this.needsUpdate = true;
		}
	}	
});