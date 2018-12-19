<template>
  <div class="tasks">
  	<div class="backbox">
  		<span class="back" @click="goBack()"></span>
  		<div class="column-tit">任务列表</div>
  	</div>
  	<div class="scrollbox">
	  	<transition-group name="list" appear tag="div">
		  	<div class="item" v-for="(task,index) in tasks" v-if="index !== 0" :key="task.id" @click="goDetail(task.id)">
		  		<img class="logo" v-if="task.state==0" src="http://act.cqnews.net/lfq/static/img/task1.png"/>
		  		<img class="logo" v-else src="http://act.cqnews.net/lfq/static/img/task2.png"/>
		  		<div class="tit">{{task.title}}</div>
		  		<div class="laber" v-if="task.state=='0'">未接单</div>
		  		<div class="laber f1" v-else-if="task.state==1">已接单</div>
		  		<div class="laber f2" v-else>已完成</div>
		  	</div>
	  	</transition-group>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'tasks',
  data() {
  	return {
  		tasks:[]
  	}
  },
  created() {
  	this.initData()
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
  			url:"http://219.153.58.234/finterface/taskinfo.ashx?type=1",
  			data:{did:'de6e2ac9-bfcc-4d99-856d-125dc61a9c61'},
  			async:true,
  			success:function(res){
  				let tasks = JSON.parse(res);
  				that.tasks = tasks;
  			}
  		});
  	},
  	goDetail(id){
			this.$router.push({
				name:'taskdetail',
				query:{
					id
				}
			})
		}
  }
}
</script>

<style scoped>
	
.list-enter,.list-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.list-enter-active,
.list-leave-active {
    transition: all 0.6s ease;
}
.scrollbox {
	position: absolute;
	left: 0;
	top: .91rem;
	right: 0;
	bottom: 0;
	margin: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
.item {
	padding: 0.36rem 0;
	margin: 0 0.42rem;
	position: relative;
	display: flex;
	align-items: center;
	justify-content:space-between;
}
.item+.item {
	border-top: 1px solid #e6e6e6;
}
.item .logo {
	width: 0.91rem;
	height: 0.91rem;
}
.item .tit{
	width: 4.1rem;
	font-size: 0.3rem;
	line-height: 0.45rem;
	font-weight: bold;
	color: #757575;
}
.item .laber {
	display: block;
	width: 1rem;
	height: 0.52rem;
	background: #d2d2d2;
	line-height: 0.54rem;
	border-radius: 0.26rem;
	text-align: center;
	font-size: 0.22rem;
	font-weight: bold;
	color: #717171;
}
.item .laber.f1{
	background: #ffd200;
	color: #fff;
}
.item .laber.f2{
	background: #31cce5;
	color: #fff;
}
.backbox {
	width: 100%;
	height: 0.9rem;
	border-bottom: 1px solid #e6e6e6;
	background: linear-gradient(left,#3edbe7,#1db7e2);
	background: -webkit-gradient(linear,left top, right top,from(#34beef),to(#3b9bff));
}
.back {
	display: block;
	width: 0.5rem;
	height: 0.5rem;
	position: absolute;
	left: 0.2rem;
	top: 0.2rem;
	background: url(http://act.cqnews.net/lfq/static/img/back2.png) no-repeat center center;
	background-size: 0.16rem 0.28rem;
}
.column-tit {
	display: block;
	width: 100%;
	height: 0.9rem;
	line-height: 0.95rem;
	font-size: 0.38rem;
	font-weight: bold;
	color: #fff;
	text-align: center;
}
.columnbox {
	display: block;
	width: 100%;
	height: 0.9rem;
	border-top: 1px solid #e8e8e8;
	border-bottom: 1px solid #e8e8e8;
	line-height: 0.9rem;
	overflow-x: auto;
	overflow-y: hidden;
}
.columnbox ul {
	white-space: nowrap;
	font-size: 0;
}
.columnbox ul:after{
	content: " ";
	display: block;
	clear: both;
}
.columnbox ul li {
	display: inline-block;
	padding: 0 0.26rem;
	font-size: 0.28rem;
}
.columnbox ul li span {
	padding: 0 0.18rem;
	display: block;
	height: 100%;
	position: relative;
	font-weight: bold;
	color: #a3a3a3;
}
.columnbox ul li.on span {
	color: #323232;
}
.columnbox ul li.on span:after {
	content: " ";
	display: block;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 3px;
	background: #31cce5;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}

</style>