
var Blocks = function(obj){

	var rate = obj.runRate || 200; //Default runRate to 200 Milliseconds

	return {
		runRate: rate,
		interval: null,
		isRunning: false,


		init: function(){
			this.setupBlocks();
			this.start(this.runRate);
		},
		start: function(rate){
			if (this.isRunning)
				throw "Already running. Use change to change speed or stop to stop running";
			var _this = this;
			if (rate !== undefined) {
				this.runRate = rate;
			}
			this.interval = window.setInterval(function(){
				_this.oneMore.call(_this);
			}, rate);
			this.isRunning = true;
		},
		stop: function(){
			window.clearInterval(this.interval);
			this.isRunning = false;
		},

		randomColor: function(){
			var t;
			var r = Math.floor(Math.random()*266),
				g = Math.floor(Math.random()*266),
				b = Math.floor(Math.random()*266),
				a = (t = Math.random())>0.6?t:0.6;
			return 'rgba(' +r+ ',' +g+ ',' +b+ ',' +a+ ')';
		},
		setupBlocks: function(){
			var container = $('#container');
			var block = '';
			for (var i = 0; i < Math.floor($(container).width()/10); i++) {
				$(container).append(this.getBlock());
			}

			// $('#container').html(block);
			// attachHover();
		},
		getBlock: function(){

			var block = $('<div></div>').addClass('block').css('background-color',this.randomColor);
			this.attachHoverTo(block);
			return block;
			// return "<div class='block' style='background-color:"+this.randomColor()+"''></div class='block'>";
		},
		oneMore: function(){
			var c = $('#container');
			$('#container .block:last').remove();
			$('#container').prepend(this.getBlock());
			// c.html(getBlock() + c.html());
			
		},
		attachHoverTo: function(block){
			$(block).hover(function(){
				$(this).css('background-color','rgba(255,255,255,0');
			});
		}

	};
};

// setTimeout(setupBlocks, 200);


	