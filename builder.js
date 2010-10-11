// Title : buildGrids
// Author : Sam Sherlock
// URL : 
//
// Description : griddy helper widget script
//
// Created : 10/10/2010 10:53:55
// Modified : 10/10/2010 10:53:58

;(function($) {

	var defaults = { 
		gColor:      '#', 
		gGutter:     20, 
		gCols:  'auto', 
		gClass:     'grid', 
	}; 

	var grid = {
		names: [],
		groups: []
	},
	options = false,
	gridClass = 'grid',
	gridDefaults = {columngutter:20,opacity:30},
	g = false,
	i = 0; 


	/**
	 *	Create a Grid with a Name based on original elements id/tagname or iteration grid6
	 **/
	function create(gridName, gridGroup) {
		grid.names.push(gridName);
		if(gridGroup)	{
			grid.groups[gridGroup].push(gridName);
		}
	}

	/**
	 *	Put a grid in a group
	 **/
	function group() {
	}

	/**
	 *	merge props
	 **/
	function props(attrStr) {
			//log('  attStr in');
			//log(attrStr);
		var t = i = 0, attribs = !attrStr ? false : true, attrObj = {}, r = false;
		if(attribs) {
			attribs = attrStr.split(',');
			i = attribs.length;
			for(t; t < i; t++)	{
				xatr = attribs[t].split(':');
				r = xatr[1].match(/^([0-9]*)$/);
				attrObj[xatr[0]] = (r != null && r.length) ? parseInt(xatr[1]) : xatr[1];
				//log("attrObj " + attrObj[xatr[0]]);
				//log("r " + (r != null ? r : 'is is null'));
				if(xatr[0] == 'color') {
					//log(xatr[1]);
					//log(typeof xatr[1]);
				}
			}
		}
		return attribs ? $.extend(gridDefaults, attrObj): gridDefaults;
	}

	/**
	 *	set a grid to an element
	 **/
	function set(elem) {
	}

	$(function() {
		// Look for elements to setGrid to 
		//log('hello');
	});

	$.fn.buildGrids = function(options) {
	
		options = $.extend({}, defaults, options);
		g = $(this).find('.'+gridClass);
		i = g.length;

		// check for grids identified by .grid class = these have optional data-grid attributes
		if (i > 0) {
			$(g).each(function() {
				var $el = $(this), elID = $el.attr('id'), atr = $el.attr('data-grid');

				if(elID == undefined || elID == '')    {
					create('grid'+i, false);
				} else {
					create($el.id, false);
				}
				$el.griddy(props(atr));
			});
			// display the toggle button top left
		}

		return this;
	};

})(jQuery);