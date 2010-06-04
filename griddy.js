/*
 *  Griddy - Simple Gridy Overlay
 *  Copyright 2010 Monjurul Dolon, http://mdolon.com/
 *  modified 2010 Sam Sherlock, http://samsherlock.com/
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://devgrow.com/griddy-overlay
 * 
 * @Modified
 *   Wrap griddy function make expanded jquery object
 *   wrap griddy interface in div - ready to expand available actions eg add, info etc
 *   created placeholder for actions
 *   created placeholder for grids (grid sets)
 *   added forceHeight (a better way might exist)
 *
 * @Todo
 *   make this jQuery best practice - could it be more efficient
 *   add some basic styles to format additional griddyInterface
 *   add/remove new grids to document elements
 *   update settings for existing elements 
 *   list grids and be able to toggle individually
 *   get info on grid size - an info box with grid dim in px
 *   blank out text -keeping size prep a screen shot for photoshop
 *   (define sets of grids -  maybe)
 *   test in conjunction with 960, blueprint+fluid, OOCSS, YUI (seems very versitile as is to me it works fine with liquid layouts - sometime height is not enfource as I would like) 
 * 
 * @Ideas
 *   Sets of grids - a set would be toggled on or off as a whole
 *   Bookmarklet - yes powerful useful thereby beautiful (anything truly beatiful has power & use)
 *   test when used in conjuction with polypage other js interface widget helpers devtools find the harmony asu too
	 any other  tools that can be found really :)
 * 
 */

(function($){
    $.griddy = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

		// grid interface div
        base.$iface = false;
		// list of grids
        base.gList = [];
        
        // Add a reverse reference to the DOM object
        base.$el.data("griddy", base);
        
        base.init = function(){
            if( typeof( rows ) === "undefined" || rows === null ) rows = 10;
            if( typeof( rowheight ) === "undefined" || rowheight === null ) rowheight = 0;
            if( typeof( rowgutter ) === "undefined" || rowgutter === null ) rowgutter = 20;
            if( typeof( columns ) === "undefined" || columns === null ) columns = 4;
            if( typeof( columnheight ) === "undefined" || columnheight === null ) columnheight = 0;
            if( typeof( columngutter ) === "undefined" || columngutter === null ) columngutter = 20;
            if( typeof( color ) === "undefined" || color === null ) color = "#ccc";
            if( typeof( fHeight ) === "undefined" || fHeight === null ) fHeight = 0;
            if( typeof( opacity ) === "undefined" || opacity === null ) opacity = 30;
            
            base.rows = rows;
            base.rowheight = rowheight;
            base.rowgutter = rowgutter;
            base.columns = columns;
            base.columnheight = columnheight;
            base.columngutter = columngutter;
            base.color = color;
            base.opacity = opacity;
            
            base.options = $.extend({},$.griddy.defaultOptions, options);
            
            // Put your initialization code here
			base.$el.css('position','relative');
			var defaults = { rows: 10, rowheight: 0, rowgutter: 20, columns: 4, columnwidth: 0, columngutter: 20, color: '#ccc', opacity: 30 };
			var opts = $.extend(defaults, base.options); var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
			var width = base.$el.width(); var height = $(document).height();

			if(o.fHeight != 0)
				height = o.fHeight == true ? base.$el.height() : o.fHeight;

			if(o.columnwidth == 0)
				o.columnwidth = Math.floor(width - ((o.columns-1)*o.columngutter))/o.columns;
			if(o.rowheight == 0)
				o.rowheight = Math.floor(height - ((o.rows-1)*o.rowgutter))/o.rows;

			base.$el.prepend("<div class='griddy' style='display:none;overflow:hidden;position:absolute;left:0;top:0;width:100%;height:"+(height-20)+"px;'><div class='griddy-r' style='position:relative;width:100%;height:100%;display:block;overflow:hidden;'><div class='griddy-columns' style='position:absolute;top:0;left:0;width:100%;height:100%;'></div></div></div>");
			if(o.columns != 0){
				for ( var i = 0; i < o.columns; i++ ) { // columns
					if(i!=0) $('.griddy-r').append("<div style='width:"+o.columngutter+"px;display:inline;float:left;height:100%;'></div>");
					$('.griddy-r',base.$el).append("<div style='width:"+o.columnwidth+"px;height:100%;display:block;float:left;text-align:center;position:relative;'><span style='background:#000;padding:5px;color:#fff;font-weight:bold;border:1px solid #fff;'>"+o.columnwidth+"px</span><div style='width:100%;height:100%;position:absolute;top:0;left:0;display:block;background:"+o.color+";opacity:"+(o.opacity/100)+";filter:alpha(opacity="+o.opacity+");'></div></div>");
				}
			}
			if(o.rows != 0){
				for ( var i = 0; i < o.rows; i++ ) { // rows
					if(i!=0) $('.griddy-columns').append("<div style='height:"+o.rowgutter+"px;display:block;float:left;width:100%;'></div>");
					$('.griddy-columns',base.$el).append("<div style='height:"+o.rowheight+"px;width:100%;float:left;display:block;line-height:"+o.rowheight+"px;position:relative;'><span style='background:#000;padding:5px;color:#fff;font-weight:bold;border:1px solid #fff;'>"+o.rowheight+"px</span><div style='width:100%;height:100%;position:absolute;top:0;left:0;display:block;background:"+o.color+";opacity:"+(o.opacity/100)+";filter:alpha(opacity="+o.opacity+");'></div></div>");
				}
			}

			base.buildInterface();

		};
        
        // add a grid - show input options for new griddy grid to be applied to element
        base.buildInterface = function(paramaters){
			$('#griddyInterface').length
			if($('#griddyInterface').length != 1)	{
				$('body').prepend("<div id='griddyInterface' style='width:180px;position:fixed;top:5px;right:5px;cursor:pointer;padding:5px;background:#000;color:#fff;font-weight:bold;font-size:18px;z-index:999;'><div class='actions'><span onclick=\"$('.griddy').toggle();return false;\">Toggle Griddy</span><div class='list'><ol><li>grid one</li><li>grid one</li><li>grid one</li><li>grid one</li><li>grid one</li><li>grid one</li><li>grid one</li></ol></div><span onclick=\"$('#griddyInterface .list').toggle();return false;\">grid list</span><span onclick=\"$('#griddyInterface .construct').toggle();return false;\">add grid</span><div class='construct'><ul><li>rows: 10</li><li>rowheight: 0</li><li>rowgutter: 20</li><li>columns: 4</li><li>columnheight: 0</li><li>columngutter: 20</li><li>color: '#ccc'</li><li>opacity: 30</li></ul><a class='$.griddy.add();'>add</a></div></div>");
				base.$iface = $('#griddyInterface');
			}
        };
        
        // add a grid - show input options for new griddy grid to be applied to element
        base.add = function(paramaters){
			alert('hello world');
        };
        
        // add a grid - show input options for new griddy grid to be applied to element
        /*base.add = function(paramaters){
			rows: 10,
			rowheight: 0,
			rowgutter: 20,
			columns: 4,
			columnheight: 0,
			columngutter: 20,
			color: '#ccc', 
			opacity: 30
        }; */
        
        // info of grid - get sizing information
        //base.info = function(paramaters){
        
        //};
        
        // blanks content from grid for making screen shot for use in photoshop
        //base.blank = function(paramaters){
        
        //};
        
        // Run initializer
        base.init();
    };
    
    $.griddy.defaultOptions = {
        rows: 10,
        rowheight: 0,
        rowgutter: 20,
        columns: 4,
        columnheight: 0,
        columngutter: 20,
        color: "#ccc",
        opacity: 30,
        fHeight: false
    };
    
    $.fn.griddy = function(rows, rowheight, rowgutter, columns, columnheight, columngutter, color, opacity, options){
        return this.each(function(){
            (new $.griddy(this, rows, rowheight, rowgutter, columns, columnheight, columngutter, color, opacity, options));
        });
    };
    
})(jQuery);
