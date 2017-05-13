
var page={
	content:$('.content'),
	stat0:"",
	sort_key:16,
	pn:0,
	
	into:function(){
		this.getData();
		this.typeClick();
		this.keyClick();
		this.pageClick();
	},
	typeClick:function(){
		var _this=this;
		$('.sort-type .tag').click(function(){
			$(this).addClass('selector').siblings().removeClass('selector');
			$('.page .page-item').eq(0).addClass('selector').siblings().removeClass('selector');
			var tag=$(this).html();
			_this.stat0=(tag=="全部"?"":tag);
			_this.pn=0;
			_this.getData();

		})
	},
	keyClick:function(){
		var _this=this;
		$('.sort-key .sort-item').click(function(){
			$(this).addClass('selector').siblings().removeClass('selector');
			$('.page .page-item').eq(0).addClass('selector').siblings().removeClass('selector');
			_this.sort_key=$(this).attr('sort-key');
			_this.pn=0;
			_this.getData();

		})
	},
	getData:function(){
		var _this=this;
		layer.load();
		$.ajax({
			type:'get',
			url:'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=28286&query=电影&sort_type=1&rn=8',
			data:{
				stat0:_this.stat0,
				sort_key:_this.sort_key,
				pn:_this.pn
			},
			dataType:'jsonp',
			jsonp:"cb",
			success:function(data){
				layer.closeAll();
				_this.renderDate(data);
			}
		})
	},
	renderDate:function(rt){
		var con="";
		var r=rt.data[0].result;
		for(var i=0,len=r.length;i<len;i++){
			con+='<div class="content-item">'
				+'<img src="'+r[i].kg_pic_url+'">'
				+'<p>'+r[i].ename+'</p>'
				+'<p>'+r[i].additional+'</p>'
				+'</div>'
		}
		this.content.html(con);
	},
	pageClick:function(){
		var _this=this;
		$('.page .page-item').click(function(){
			$(this).addClass('selector').siblings().removeClass('selector');
			
			_this.pn=($(this).html()-1)*8;
			
			_this.getData();

		})
	}
}
page.into();