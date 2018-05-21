import G from './gloable.js';
export default function Screen01(queue,stage){
	this.queue = queue;
	this.stage = stage;
	this.flowers = [];
	this.paths = [];
	this.curI = 0;
	this.container = new createjs.Container();
	this._init();
	this.stage.addChild(this.container);
}

Screen01.prototype._init = function(){
	G.screenLocked = 1;
	//添加背景
	G.bgContainer = new createjs.Container();
	G.bg = new createjs.Bitmap(this.queue.getResult('home_bg'));
	//第四幕背景
	G.ground_bg = new createjs.Bitmap(this.queue.getResult('05_ground_bg'));
	G.ground_bg.y = 1810;
	G.ground_bg.alpha = 0;
	G.ground = new createjs.Bitmap(this.queue.getResult('05_ground'));
	G.ground.y = 1810;
	G.ground.alpha = 0;
	G.bgContainer.addChild(G.ground_bg,G.ground);
	G.bgContainer.addChild(G.bg);
	this.stage.addChild(G.bgContainer);
	//花朵 flower
	this._flower();
	//文 字
	this._showText();
	//手势
	this._showHand();
}

Screen01.prototype._flower = function(){
	//位置花朵
	var flowerPath = [
		[307,403],
		[421,316],
		[571,266],
		[741,261],
		[866,356],
		[1041,331],
		[1051,171]
	];
	//添加花朵
	for(let i=0;i<7;i++){
		let flower = new createjs.Bitmap(this.queue.getResult('01_flower'));
		flower.regX = flower.regY = 31;
		flower.x = flowerPath[i][0];
		flower.y = flowerPath[i][1];
		this.container.addChild(flower);
		this.flowers.push(flower);
	}

	//解锁路径 x,y,deg
	var path = [
		[332,375,-40],
		[466,288,-18],
		[625,244,0],
		[783,281,30],
		[930,350,-15],
		[1040,270,-90]
	];
	//添加路径
	for(let k=0;k<6;k++){
		let pathObj = new createjs.Bitmap(this.queue.getResult('01_path'));
		pathObj.setTransform(path[k][0], path[k][1], .6, .6, path[k][2]);
		pathObj.alpha = 0.3;
		this.container.addChild(pathObj);
		this.paths.push(pathObj);
	}
	

	//鼠标触屏事件
	this.stage.addEventListener('stagemousemove',(evt)=>{
		//当前鼠标经过位置
		let x = evt.stageX;
		let y = evt.stageY;
		let len = flowerPath.length;
		for(let i=0;i<len;i++){
			let posX = flowerPath[i][0];
			let posY = flowerPath[i][1];
			//鼠标经过花朵
			if(x>=posX && x<=posX+62 && y>=posY && y<=posY+62){
				//经过当前索引值花朵
				if(this.curI === i){
					if(this.curI === 0){
						//移除手势
						this.container.removeChild(this.handAni);
						createjs.Ticker.setFPS(100);
					}
					//添加花瓣旋转动画
					createjs.Tween.get(this.flowers[i],{loop:true},true)
					.to({
						rotation:360
					},1500);
					
					//路径变亮
					try{
						createjs.Tween.get(this.paths[i-1])
						.to({
							alpha:1
						},1000)
					}catch(e){
						console.log(e)
					}

					//this.curI ++
					this.curI = this.curI+1;
					//花瓣全部点亮
					if(this.curI>=len){
						//隐藏并移除 第一幕场景
						createjs.Tween.get(this.container)
						.to({
							alpha:0
						},1000)
						.call(()=>{
							this.stage.removeChild(this.container);
						});
						//场景切换到2
						G.screen = 2;
						return;
					}
				}
			}
		}

	})
}

//添加文字
Screen01.prototype._showText = function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('01_text'));
	this.text01.x = 540;
	this.text01.y = 520;
	this.container.addChild(this.text01);
}

//添加手势
Screen01.prototype._showHand = function(){
	//创建精灵图  配置
	this.handSprite = new createjs.SpriteSheet({
		images:[this.queue.getResult('01_hand')],
		frames:{
			width:218,
			height:200,
			count:5
		},
		animations:{
			handtip:[0,1,2,3,4,4,0]
		}
	});

	//调用精灵图
	this.handAni = new createjs.Sprite(this.handSprite,'handtip');
	//
	this.handAni.setTransform(300, 430, 1, 1, -35);
	createjs.Ticker.setFPS(3);
	this.container.addChild(this.handAni);
}
