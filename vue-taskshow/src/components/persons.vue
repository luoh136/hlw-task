<template>
  <div class="persons">
  	<div class="backbox">
  		<span class="back" @click="goBack()"></span>
  		<div class="column-tit">员工列表</div>
  	</div>
  	<div class="columnbox">
  		<ul>
  			<li v-for="(group,index) in groups" :class="{on: index === currentTab}" :key="group.id" @click="changeTabs(index,group.id)">
  				<span>{{group.gname}}</span>
  			</li>
  		</ul>
  	</div>
  	<div class="scrollbox">
  		<transition-group name="list" appear tag="div">
		  	<div class="item" v-for="user in userList" :key="user.id" @click="goDetail(user.id)">
		  		<div class="left">
		  			<img v-if="user.photopath !== ''" :src="user.photopath"/>
		  			<img v-else src="http://act.cqnews.net/lfq/static/img/thumnb.png"/>
		  			<h4>{{user.username}}</h4>
		  			<div class="tel">{{user.telnum}}</div>
		  		</div>
		  		<div class="right">
		  			<h3>当前进行项目</h3>
		  			<p class="tips">(按照工单接收时间排列)</p>
		  			<ul class="task">
		  				<li v-for="task in user.tasklist" :key="task.id">• {{task.title}}</li>
		  			</ul>
		  		</div>
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
  		currentTab:0,
  		groups:[],
  		userList:[]  		
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
  	initData(){
  		let that = this;
  		$.ajax({
  			type:"post",
  			url:"http://219.153.58.234/finterface/depinfo.ashx?type=2",
  			data:{did:'de6e2ac9-bfcc-4d99-856d-125dc61a9c61'},
  			async:true,
  			success:function(res){
  				let groups = JSON.parse(res);
  				that.groups = groups;
	     		that.getUsers(groups[0].id);
  			}
  		});
  	},
  	getUsers(id){
  		let that = this;
  		$.ajax({
  			type:"post",
  			url:"http://219.153.58.234/finterface/userinfo.ashx?type=1",
  			data:{did:'de6e2ac9-bfcc-4d99-856d-125dc61a9c61',pid:id},
  			async:true,
  			success:function(res){
  				let userlist = JSON.parse(res);
  				that.userList = userlist[0].userlist;
  			}
  		});
    },
  	changeTabs(e,id) {
  		this.currentTab = e;
  		this.getUsers(id);
  	},
  	goDetail(id){
			this.$router.push({
				name:'persdetail',
				query:{
					id
				}
			})
		}
  }
}
</script>

<style scoped>
.list-enter{
  opacity: 0;
  transform: translateY(80px);
}
.list-enter-active {
    transition: all 0.6s ease;
}
.scrollbox {
	position: absolute;
	left: 0;
	top: 1.81rem;
	right: 0;
	bottom: 0;
	margin: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
.backbox {
	width: 100%;
	height: 0.9rem;
	background: linear-gradient(left,#34beef,#3b9bff);
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
	background: #f7f7f7;
}
.columnbox ul {
	white-space: nowrap;
	font-size: 0;
	height: 100%;
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
	height: 100%;
}
.columnbox ul li span {
	padding: 0 0.18rem;
	display: block;
	height: 0.9rem;
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
	bottom: -1px;
	width: 100%;
	height: 5px;
	background: #3294ed;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}
.item {
	display: flex;
	align-items: center;
	margin: 0 0.42rem;
	padding: 0.12rem 0;
	border-bottom: 1px solid #e6e6e6;
	overflow: hidden;
}
.item .left {
	width: 54%;
	padding-top: 0.38rem;
	padding-bottom: 0.28rem;
}
.item .left img {
	float: left;
	width: 0.84rem;
	height: 0.84rem;
	margin-right: 0.25rem;
	border-radius: 50%;
}
.item .left h4 {
	font-size: 0.3rem;
	line-height: 1;
	font-weight: bold;
	padding-bottom: .12rem;
  padding-top: 0.1rem;
	color: #000;
}
.item .left .tel{
	float: left;
  font-size: 0.24rem;
  padding-left: 0.35rem;
  height: 0.32rem;
  line-height: 0.36rem;
  background: url(http://act.cqnews.net/lfq/static/img/call.png) no-repeat left top;
  background-size: 0.32rem 0.32rem; 
  color: #464646;
}
.item .right {
	width: 46%;
	box-sizing: border-box;
	border-left: 1px solid #3294ed;
	padding-left: 0.2rem;
	min-height: 1.5rem;
}
.item .right h3 {
	font-size: 0.28rem;
	font-weight: bold;
	color: #3294ed;
	line-height: 1.2;
	padding-top: 0.08rem;
}
.item .right .tips {
	font-size: 0.18rem;
	color: #3294ed;
	padding-bottom: 0.2rem;
}
.task {
	font-size: 0.26rem;
	color: #5c5c5c;
	line-height: 0.44rem;
}
</style>