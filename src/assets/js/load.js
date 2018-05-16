import G from './gloable.js';
export default function Load(){
	this.progress = 0;
	this._init();
}

let proNode = null;
let loadNode = null;
Load.prototype._init = function(){
	loadNode = document.querySelector('#progress');
	proNode = document.querySelector('#progress span');
	this.queue = new createjs.LoadQueue();
	//注册音频插件
	this.queue.installPlugin(createjs.Sound);
	//定义资源加载列表
	this.queue.loadManifest([
		{id:"home_bg",src:"../images/homePage_684d8f7.jpg"},
		{id:"music_bg",src:"../media/music.mp3"},

		//场景1资源列表
		{id:"01_flower",src:"../images/flower_ddf789f.png"},
		{id:"01_path",src:"../images/dot_7daf7df.png"},
		{id:"01_text",src:"../images/optipwords_cec9df4.png"},
		{id:"01_hand",src:"../images/handtip_2a217ef.png"}
	]);

	//资源加载进度
	this.queue.on('progress',handleProgress);
	function handleProgress(e){
		this.progress = e.progress;
		proNode.innerText = parseInt(this.progress * 100) + '%';
	}
	//资源加载完成
	this.queue.on('complete',handleComplete);
	function handleComplete(){
		G.screen = 1;
		createjs.Sound.play('music_bg');
		loadNode.style.display = 'none';
	}
}