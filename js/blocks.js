
var Blocks = function(obj){

	var HORIZONTAL = 'horizontal',
		VERTICAL = 'vertical',
		BLOCK_CLASS_HORIZONTAL = 'block-x',
		BLOCK_CLASS_VERTICAL = 'block-y';

	var rate = obj.runRate || 200,					// Default runRate to 200 Milliseconds
		container = obj.container,					// Id of Container where the blocks will run
		orientation = obj.orientation,				// Want it running [horizontal|vertical]
		isRunning = false,
		runRate = rate,
		interval = null,
		isReversed = false,
		isHorizontal = (orientation == HORIZONTAL),
		isGreyscale = obj.greyscale || false,
		isHoverable = obj.hoverable || true,

		randomColor = function(){
			var r,g,b,t;
			if (isGreyscale) {
				r = g = b = Math.floor(Math.random()*266);
			}
			else {
				r = Math.floor(Math.random()*266);
				g = Math.floor(Math.random()*266);
				b = Math.floor(Math.random()*266);
				
			}
			a = (t = Math.random())>0.6?t:0.6;
			return 'rgba(' +r+ ',' +g+ ',' +b+ ',' +a+ ')';
		},
		setupBlocks = function(){
			var _container = $('#' + container);
			var block = '';
			// console.log(Math.floor($(_container).width()/10));
			for (var i = 0; i < Math.floor($(_container).width()/10); i++) {
				$(_container).append(getBlock());
			}
			attachHover();
		},
		getBlock = function(){
			var className = isHorizontal? BLOCK_CLASS_HORIZONTAL:BLOCK_CLASS_VERTICAL;
			var block = $('<div></div>').addClass('block') .addClass(className).css('background-color',randomColor);
			return block;
		},
		oneMore = function(){
			if (isReversed) {
				$('#' +container+ ' .block:first').remove();
				$('#' +container).append(getBlock());
			}
			else {
				$('#' +container+ ' .block:last').remove();
				$('#' +container).prepend(getBlock());
			}
		},
		attachHover = function(ev){
			$('#' +container).mouseover(function(ev){
				var className = ev.target.className.split(' ')[0];
				if (className !== "block")
					return;
				var b = $(ev.target);
				$(b).css('background-color','rgba(255,255,255,0');
			});
		},
		removeHover = function(){
			$('#' +container).unbind('mouseover');
		},
		clear = function(){
			$('#' +container).html('');
		};


	return {
		init: function(){
			setupBlocks();
			this.start(runRate);
		},
		start: function(rate){
			if (isRunning)
				throw "Already running. Use change to change speed or stop to stop running";
			var _this = this;
			if (rate !== undefined) {
				runRate = rate;
			}
			interval = window.setInterval(oneMore, runRate);
			isRunning = true;
		},
		stop: function(){
			window.clearInterval(interval);
			isRunning = false;
		},
		changeRate: function(newRate){
			if (newRate == runRate)
				return;
			runRate = newRate;
			this.stop();
			this.start();
		},
		reverse: function(){
			isReversed = !isReversed;
			
		},
		switchOrientation: function(){
			isHorizontal = !isHorizontal;
			this.reset();
		},
		reset: function(opt){
			var rate,orient;
			if (opt) {
				runRate = opt.runRate || runRate;
				orientation = opt.orientation || orientation;
			}
			// debugger;
			this.stop();
			clear();
			this.init();
		},
		isRunning: function(){
			return isRunning;
		},
		toggleGreyscale: function(){
			isGreyscale = !isGreyscale;
		},
		toggleMousehover: function(){
			if (isHoverable)
				removeHover();
			else
				attachHover();
			isHoverable = !isHoverable;
		}

	};
};


	