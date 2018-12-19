<template>
  <div class="persdetail">
  	<div class="header">
	  	<div class="backbox">
	  		<span class="back" @click="goBack()"></span>
	  	</div>
	  	<div class="details">
	  		<img v-if="photopath !== ''" class="thumnb" :src="photopath"/>
	  		<img v-else class="thumnb" src="http://act.cqnews.net/lfq/static/img/thumnb.png"/>
	  		<div class="name">
	  			<h3>{{username}}</h3>
	  			<p>{{gname}}/<b>{{duties}}</b></p>
	  		</div>
	  		<a class="phone" :href="'tel:'+telnum"><img src="http://act.cqnews.net/lfq/static/img/detail2.png"/></a>
	  		<a v-if="isIos" class="qq" :href="'mqq://im/chat?chat_type=wpa&uin='+qqnum+'&version=1&src_type=web'"><img src="http://act.cqnews.net/lfq/static/img/detail3.png"/></a>
	  		<a v-else class="qq" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+qqnum"><img src="http://act.cqnews.net/lfq/static/img/detail3.png"/></a>
	  	</div>
  	</div>
  	<div class="scrollbox">
	  	<transition-group name="list" appear tag="div">
		  	<div class="item" v-for="(task,index) in tasklist" :key="task.id">
		  		<div class="tit" :class="{on:index === currentList}" @click="changeTabs(index)">
		  			<div class="radius"></div>
		  			<div class="f">
			  			<span class="time">{{task.Ptime | sub}} -</span>
			  			<div class="n">{{task.title}}</div>
		  			</div>
		  			<div class="switch"></div>
		  		</div>
		  		<transition name="slide">
			  		<div class="box" v-show="index === currentList">
				  		<ul class="content">
				  			<transition name="list1" appear>
					  			<li>
					  				<h4>项目概述：</h4>
					  				<p>{{task.introduce | b64DecodeUnicode}}</p>
					  			</li>
				  			</transition>
				  			<transition name="list2" appear>
					  			<li>
					  				<h4>任务紧急程度：</h4>
					  				<span class="laber" v-if="task.IMdegree <=3">普件</span>
					  				<span class="laber laber-red" v-else="task.IMdegree >= 4">急件</span>
					  			</li>
				  			</transition>
				  			<transition name="list3" appear>
					  			<li>
					  				<h4>对接部门：</h4>
					  				<p>{{task.Pname}}</p>
					  			</li>
				  			</transition>
				  			<transition name="list4" appear>
					  			<li>
					  				<h4>预估完成时间：</h4>
					  				<p>{{task.ECtime}}</p>
					  			</li>
				  			</transition>
				  		</ul>
			  		</div>
		  		</transition>
		  	</div>
	  	</transition-group>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'persdetail',
  data() {
  	return {
  		isIos:true,
  		flag:0,
  		currentList:0,
  		username:'',
  		gname:'',
  		duties:'',
  		telnum:'',
  		qqnum:'',
  		photopath:'',
  		tasklist:[]
  	}
  },
  filters: {
  	b64DecodeUnicode:function(str) {
		  return decodeURIComponent(atob(str).split('').map(function(c) {
		    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		  }).join(''));
		},
		sub:function (str) {
			return str.substring(5, 10);
		}		
  },
  created() {
  	this.initData();
  	this.iosOrAdr();
  },
  methods: {
  	goBack(){
  		 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
  	},
  	initData() {
  		let that = this;
  		$.ajax({
  			type:"post",
  			url:"http://219.153.58.234/finterface/userinfo.ashx?type=2",
  			data:{id:that.$route.query.id},
  			async:true,
  			success:function(res){
  				let user = JSON.parse(res);
  				that.username = user[0].username;
	  			that.gname = user[0].gname;
	  			that.duties = user[0].duties;
	  			that.telnum = user[0].telnum;
	  			that.qqnum = user[0].qqnum;
	  			that.photopath = user[0].photopath;
	  			that.tasklist = user[0].tasklist;
  			}
  		});
  	},
  	changeTabs(e) {
  		if(this.flag === e){
  			this.currentList = false;
  			this.flag = false;
  		}else{
  			this.currentList = e;
  			this.flag = e;
  		}
  	},
  	iosOrAdr() {
  		if (/(Android)/i.test(navigator.userAgent)){
  			this.isIos = false;
  		}else{
  			this.isIos = true;
  		}

  	}
  }
}
</script>

<style scoped>
.list-enter{
	height: 0;
  opacity: 0;
  transform: translateY(80px);
}
.list-enter-active {
    transition: all 1s ease;
}
.list1-enter,.list2-enter,.list3-enter,.list4-enter{
	opacity: 0;
  transform: translateY(40px);
}
.list1-enter-active {
  transition: all 0.6s 0s ease;
}
.list2-enter-active {
  transition: all 0.6s .2s ease;
}
.list3-enter-active {
  transition: all 0.6s .4s ease;
}
.list4-enter-active {
  transition: all 0.6s .6s ease;
}

.slide-enter-active{
  transition: opacity .5s linear;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.scrollbox {
	position: absolute;
	left: 0;
	top: 3.01rem;
	right: 0;
	bottom: 0;
	margin: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
.content {
	border-left: 1px solid #bfbfbf;
	margin: 0.1rem 0;
	margin-left: 0.15rem;
}
.content li {
	position: relative;
	padding-left: 0.34rem;
	font-size: 0.28rem;
	line-height: 0.38rem;
}
.content li+li {
	margin-top: 0.5rem;
}
.content li h4 {
	color: #323232;
	position: relative;
}
.content li h4:after {
	content: " ";
	display: block;
	position: absolute;
	left: -0.42rem;
	top: 0.1rem;
	width: 3px;
	height: 3px;
	border: 2px solid #afafaf;
	border-radius: 50%;
	box-shadow: #fff 0 0 0 5px;
	background: #fff;
}
.content li p {
	color: #8e8e8e;
	padding-top: 0.1rem;
}
.content li .laber {
	display: inline-block;
	padding: 0 0.28rem;
	height: 0.45rem;
	line-height: 0.5rem;
	color: #6c5900;
	background: #ffd200;
	margin-top: 0.12rem;
	border-radius: 0.23rem;
	font-weight: bold;
}
.content li .laber-red{
	background: #ff8a00;
	color: #804500;
}
.tit {
	position: relative;
	font-size: 0.32rem;
	color: #4d4d4d;
	line-height: 0.46rem;
	padding: 0 0.46rem 0 0.48rem;
	word-break: break-all;
	overflow: hidden;
	cursor: pointer;
}
.f {
	display: flex;
}
.f .n {
	font-size: 0.32rem;
	color: #515151;
}
.tit .time {
	white-space: nowrap;
	font-size: 0.28rem;
	line-height: 0.48rem;
	color: #949494;
	padding-right: 4px;
}
.tit .switch {
	position: absolute;
	right: 0;
	top: 0.05rem;
	width: 0.38rem;
	height: 0.38rem;
	background: url(http://act.cqnews.net/lfq/static/img/detail4.png) no-repeat center center;
	background-size: 0.22rem auto;
}
.tit.on .switch {
	background-image: url(http://act.cqnews.net/lfq/static/img/detail5.png);
}
.radius{
	position: absolute;
	width: 0.36rem;
	height: 0.36rem;
	border-radius: 50%;
	background: #34b8f2;
	box-shadow: #8dd8f9 0 2px 6px;
	top: 0.01rem;
	left: 0;
}
.item {
	position: relative;
	margin: 0 0.52rem;
	padding: 0.2rem 0;
}
.item+.item {
	border-top:1px solid #dcdcdc
}
.details {
	position: relative;
	margin-top:0.24rem;
}
.details:after {
	content: " ";
	display: block;
	height: 0.34rem;
	border-left: 1px solid #b1efff;
	position: absolute;
	top: 0.37rem;
	right: 1.48rem;
}
.thumnb {
	display: block;
	width: 1.14rem;
	height: 1.14rem;
	float: left;
	margin-left: 0.56rem;
	margin-right: 0.26rem;
	border-radius: 50%;
}
.name {
	padding-top: 0.12rem;
	color: #fff;
}
.name h3 {
	font-size: 0.38rem;
	font-weight: bold;
	line-height: 1.2;
}
.name p {
	font-size: 0.3rem;
	line-height: 1.2;
	padding-top: 0.1rem;
	margin-right: 2.6rem;
}
.phone,.qq {
	display: block;
	position: absolute;
	top: 0.14rem;
	width: 0.8rem;
	height: 0.8rem;
}
.phone {
	right: 1.7rem;
}
.qq {
	right: 0.46rem;
}
.phone img,.qq img{
	display: block;
	width: 100%;
	height: 100%;
}
.header {
	position: relative;
	height: 3.01rem;
	background: url(http://act.cqnews.net/lfq/static/img/detail1.jpg) no-repeat;
	background-size: 100% 100%;
}
.backbox {
	width: 100%;
	height: 0.9rem;
}
.back {
	display: block;
	width: 0.5rem;
	height: 0.5rem;
	float: left;
	margin-left: 0.2rem;
	margin-top: 0.2rem;
	background: url(http://act.cqnews.net/lfq/static/img/back2.png) no-repeat center center;
	background-size: 0.16rem 0.28rem;
}

</style>