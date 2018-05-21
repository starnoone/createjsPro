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
		{id:"01_hand",src:"../images/handtip_2a217ef.png"},

		//场景切换按钮
		{id:'screen_optipbtn', src:'../images/optipbtn_61a674a.png'},
		{id:'screen_optipcircle', src:'../images/optipcircle_59cf14b.png'},

		//场景2资源列表
		{id:'02_text01', src:'../images/p1w1_0b28dab.png'},
		{id:'02_text02', src:'../images/p1w2_5971c24.png'},
		{id:'02_moon', src:'../images/moon_d4c77ad.png'},
		{id:'02_block01', src:'../images/blockbig_ea93d8e.png'},
		{id:'02_block02', src:'../images/block2_6cb88e9.png'},
		{id:'02_block03', src:'../images/block1_7696ddd.png'},
		{id:'02_block04', src:'../images/stair_edf570b.png'},
		{id:'02_girl', src:'../images/girl_63090bc.png'},
		{id:'02_cloud01', src:'../images/cloud1_d65b6e1.png'},
		{id:'02_cloud02', src:'../images/cloud2_71bf032.png'},
		{id:'02_cloud03', src:'../images/cloud3_bc745db.png'},
		{id:'02_cloud04', src:'../images/cloud4_2c8990f.png'},

		//场景3资源列表
		{id:'03_text01', src:'../images/p2w1_5c2c750.png'},
		{id:'03_text02', src:'../images/p2w2_95a96b0.png'},
		{id:'04_light', src:'../images/light_4f354be.png'},
		{id:'04_branch', src:'../images/bigtree_1f02526.png'},

		//场景4的资源列表
		{id:'05_ground', src:'../images/ground_cc8e201.png'},
		{id:'05_ground_bg', src:'../images/treePage_3a1da40.jpg'},
		{id:'05_text01', src:'../images/p3w1_8d3187d.png'},
		{id:'05_text02', src:'../images/p3w2_d1668d1.png'},

		//场景五的资源
		{id:'06_bg', src:'../images/flowerPage_a402a6d.jpg'},
		{id:'06_girllights', src:'../images/girllights_2968f54.png'},
		{id:'06_meteor', src:'../images/meteor_e9fdfcf.png'},
		{id:'06_text01', src:'../images/p4w2_f821859.png'},
		{id:'06_text02', src:'../images/p4w1_d9fb938.png'}
		
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
		//隐藏加载进度
		loadNode.style.display = 'none';
		//播放音乐
		createjs.Sound.play('music_bg');
		//生成控制播放按钮
		let ctrl = document.createElement('div');
		ctrl.style.position = 'fixed';
		ctrl.style.right = '20px';
		ctrl.style.top = '20px';
		ctrl.style.zIndex = 1000;
		ctrl.className = 'audio';
		ctrl.setAttribute('playState', 'true');

		let ctrlBtn = document.createElement('span');
		ctrlBtn.style.display = 'block';
		ctrlBtn.style.width = '30px';
		ctrlBtn.style.height = '30px';
		ctrlBtn.style.background = 'url(../images/music-on_d8d8e5f.png) no-repeat';
		ctrlBtn.style.backgroundSize = '100% 100%';
		ctrlBtn.style.backgroundPosition = 'center center';
		ctrl.appendChild(ctrlBtn);

		ctrl.addEventListener('click',()=>{
			let state = ctrl.getAttribute('playState');
			if(state == 'true'){
				createjs.Sound.stop();
				ctrl.setAttribute('playState', 'false');
				ctrlBtn.style.background = 'url(../images/music-off_8ae1c44.png) no-repeat';
				ctrlBtn.style.backgroundSize = '100% 100%';
				ctrlBtn.style.backgroundPosition = 'center center';
			}else{
				createjs.Sound.play('music_bg');
				ctrl.setAttribute('playState', 'true');
				ctrlBtn.style.background = 'url(../images/music-on_d8d8e5f.png) no-repeat';
				ctrlBtn.style.backgroundSize = '100% 100%';
				ctrlBtn.style.backgroundPosition = 'center center';
			}
		})
		document.body.appendChild(ctrl);
		
	}
}