/*!
 * Title : Griddy h5
 * Author : Sam Sherlock (modifcation)
 * URL : http://github.com/sams/griddy/tree/redux
 * 
 * Description : griddy (another attempt at a) redux 
 *				 simplify initialization and setup of grids 
 *				 be able to toogle sets of grids / sets of grids
 *				 be able to create grids
 *				 use html5 data to achieve some of this 
 * 
 * Created : 10/10/2010 10:14:12
 * Modified : 10/10/2010 10:14:15
 *
 *  Griddy - Simple Gridy Overlay
 *  Copyright 2010 Monjurul Dolon, http://mdolon.com/
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://devgrow.com/griddy-overlay
 */
;(function($) {

	var grids = [];

	$(function() {
		// Look for elements to setGrid to 
		console.info('hello from griddy');
	});

	$.fn.griddy = function(options) {
		this.css('position','relative');
		var defaults = { rows: 10, rowheight: 0, rowgutter: 20, columns: 4, columnwidth: 0, columngutter: 20, color: '#ccc', opacity: 30 };
		var opts = $.extend(defaults, options); var o = $.meta ? $.extend({}, opts, $$.data()) : opts, $griddyToggle = $('#griddyToggle');
		var width = this.width(); var height = $(document).height();
		if(o.columnwidth == 0)
			o.columnwidth = Math.floor(width - ((o.columns-1)*o.columngutter))/o.columns;
		if(o.rowheight == 0)
			o.rowheight = Math.floor(height - ((o.rows-1)*o.rowgutter))/o.rows;
		this.prepend("<div class='griddy' style='display:none;overflow:hidden;position:absolute;left:0;top:0;width:100%;height:"+(height-20)+"px;'><div class='griddy-r' style='position:relative;width:100%;height:100%;display:block;overflow:hidden;'><div class='griddy-columns' style='position:absolute;top:0;left:0;width:100%;height:100%;'></div></div></div>");
		if(o.columns != 0){
			for ( var i = 0; i < o.columns; i++ ) { // columns
				if(i!=0) $('.griddy-r').append("<div style='width:"+o.columngutter+"px;display:inline;float:left;height:100%;'></div>");
				$('.griddy-r',this).append("<div style='width:"+o.columnwidth+"px;height:100%;display:block;float:left;text-align:center;position:relative;'><span style='background:#000;padding:5px;color:#fff;font-weight:bold;border:1px solid #fff;'>"+o.columnwidth+"px</span><div style='width:100%;height:100%;position:absolute;top:0;left:0;display:block;background:"+o.color+";opacity:"+(o.opacity/100)+";filter:alpha(opacity="+o.opacity+");'></div></div>");
			}
		}
		if(o.rows != 0){
			for ( var i = 0; i < o.rows; i++ ) { // rows
				if(i!=0) $('.griddy-columns').append("<div style='height:"+o.rowgutter+"px;display:block;float:left;width:100%;'></div>");
				$('.griddy-columns',this).append("<div style='height:"+o.rowheight+"px;width:100%;float:left;display:block;line-height:"+o.rowheight+"px;position:relative;'><span style='background:#000;padding:5px;color:#fff;font-weight:bold;border:1px solid #fff;'>"+o.rowheight+"px</span><div style='width:100%;height:100%;position:absolute;top:0;left:0;display:block;background:"+o.color+";opacity:"+(o.opacity/100)+";filter:alpha(opacity="+o.opacity+");'></div></div>");
			}
		}
		if($griddyToggle.length < 1)	{
			$('body').prepend("<span id=\"griddyToggle\" onclick=\"$('.griddy').toggle();return false;\" style='position:fixed;top:5px;right:5px;cursor:pointer;padding:5px;background:#000;color:#fff;font-weight:bold;font-size:18px;z-index:999;'>Toggle Griddy</span>");
		}
	};
})(jQuery);



// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};

/*!
* HTML5 custom data attributes plugin for jQuery v1.0
* @link http://github.com/mathiasbynens/HTML5-custom-data-attributes-plugin-for-jQuery
* @description An easy setter/getter for HTML5 data-* attributes
* @author Mathias Bynens <http://mathiasbynens.be/>
*/
jQuery.fn.dataAttr=function(a,v){return v?this.attr('data-'+a,v):this.attr('data-'+a)};