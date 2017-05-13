var Hero={
	self:null,
	left:0,
	top:0,
	life:3,
	imgs:['image/hero.gif','image/hero-bang.gif'],
	allHeart: document.querySelectorAll('.life img'),
	init:function(){
		var img=document.createElement('img');
		img.src=this.imgs[0];
		Engine.game.appendChild(img);
		this.self=img;
		var _this=this;
		img.onload=function(){
			_this.left=(Engine.game.offsetWidth-img.offsetWidth)/2;
			_this.top=Engine.game.offsetHeight - img.offsetHeight;
			img.style.left=_this.left+'px';
			img.style.top=_this.top+'px';
		}
	},
	move:function(){
		var _this=this;
		document.onmousemove = function(e){
			e = e || window.event;
			var l = e.clientX - Engine.game.offsetLeft - _this.self.offsetWidth/2;
			var t = e.clientY - Engine.game.offsetTop - _this.self.offsetHeight/2;
			var lmax = Engine.game.offsetWidth - _this.self.offsetWidth;
			var bmax = Engine.game.offsetHeight - _this.self.offsetHeight;
			l = l < 0 ? 0 : (l > lmax ? lmax : l);
			t = t < 0 ? 0 : (t > bmax ? bmax : t);
			_this.self.style.left = l + 'px';
			_this.self.style.top = t + 'px';
			_this.left  =l;
			_this.top = t;
		}
	},
	shoot: function(){
		var _this = this;
		this.shootTimer = setInterval(function(){
			var l = _this.left + _this.self.offsetWidth/2;
			new Bullet(l,_this.top).init();
		},350);
		
	},
	bang: function(){
		var img  = document.createElement('img');
		img.src = this.imgs[1];
		img.style.left = this.left + 'px';
		img.style.top = this.top  + 'px';
		Engine.game.appendChild(img);
		setTimeout(function(){
			img.remove();
		},500);
	},
	die: function(){
		this.life--;
		this.allHeart[0].remove();
		this.allHeart = document.querySelectorAll('.life img');
		if(this.life <= 0){
			this.destroy();
		}
	},
	destroy: function(){
		this.self.remove();
		this.bang();
		clearInterval(this.shootTimer);
		Engine.gameOver();
		
	}
}