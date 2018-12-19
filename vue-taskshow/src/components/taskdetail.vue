<template>
  <div class="taskdetail">
  	<div class="header">
	  	<div class="backbox">
	  		<span class="back" @click="goBack()"></span>
	  	</div>
	  	<div class="details">
	  		<div class="name">
	  			<h3>{{task.title}}</h3>
	  			<p>{{task.introduce | b64DecodeUnicode}}</p>
	  		</div>
	  	</div>
	  	<img class="icon" src="http://act.cqnews.net/lfq/static/img/detail11.png"/>
  	</div>
  	<div class="scrollbox">	
	  	<div class="item">
	  		<transition name="list" appear>
		  		<ul class="content">
		  			<transition name="list1" appear>
		  				<li>
			  				<h4>预估完成时间：<img src="http://act.cqnews.net/lfq/static/img/detail12.png" class="after" /></h4>
			  				<p>{{task.ECtime}}</p>
		  				</li>
		  			</transition>
		  			<transition name="list2" appear>
		  				<li>
			  				<h4>状态：<img src="http://act.cqnews.net/lfq/static/img/detail13.png" class="after" /></h4>
			  				<p>{{task.statename}}</p>
		  				</li>
		  			</transition>
		  			<transition name="list3" appear>
		  				<li>
			  				<h4>对接部门：<img src="http://act.cqnews.net/lfq/static/img/detail14.png" class="after" /></h4>
			  				<p>{{task.Pname}}</p>
		  				</li>
		  			</transition>
		  			<transition name="list4" appear>
		  				<li>
			  				<h4>项目接单人：<img src="http://act.cqnews.net/lfq/static/img/detail15.png" class="after" /></h4>
			  				<span class="laber" v-for="(user,index) in username" :key="index" @click="goDetail(user)">{{user | spBefore}}</span>
		  				</li>
		  			</transition>
		  		</ul>
	  		</transition>
	  	</div>
  	</div> 
  </div>
</template>

<script>
export default {
  name: 'taskdetail',
  data() {
  	return {
  		task:{},
  		username:[]
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
		},
		spBefore:function(str) {
			return str.split('|')[0];
		}
  },
  created() {
  	this.initData();
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
  			url:"http://219.153.58.234//finterface/taskinfo.ashx?type=2",
  			data:{id:that.$route.query.id},
  			async:true,
  			success:function(res){
  				let task = JSON.parse(res);
  				that.task = task[0];
  				that.username = that.sp(task[0].username)
  			}
  		});
  	},
  	goDetail(i){
  		if(i.indexOf('|') >= 0){
  			let id = this.spAfter(i);
				this.$router.push({
					name:'persdetail',
					query:{
						id
					}
				})
  		} 		
		},
		sp(name){
			return name.split('，');
		},
		spAfter(str) {
			return str.split('|')[1];
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
.list1-enter,.list2-enter,.list3-enter,.list4-enter{
  opacity: 0;
  transform: translateX(40px);
}
.list1-enter-active {
  transition: all 0.6s 0s ease;
}
.list2-enter-active {
  transition: all 0.6s .3s ease;
}
.list3-enter-active {
  transition: all 0.6s .6s ease;
}
.list4-enter-active {
  transition: all 0.6s .9s ease;
}
.icon {
	display: block;
	width: 0.94rem;
	height: 0.94rem;
	position: absolute;
	left: 0.45rem;
	bottom: -0.41rem;
}
.content {
	border-left: 1px solid #bfbfbf;
	padding-top: 0.3rem;
	margin: 0.1rem 0;
	margin-left: 0.32rem;
}
.content li {
	position: relative;
	padding-left: 0.62rem;
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
.content li h4 .after {
	display: block;
	position: absolute;
	left: -0.91rem;
	top: 0.05rem;
	width: 0.55rem;
	height: 0.55rem;
	border-radius: 50%;
	box-shadow: #fff 0 0 0 0.18rem;
	background: #fff;
}
.content li p {
	position: relative;
	color: #8e8e8e;
	padding-top: 0.06rem;
	padding-left: 0.2rem;
}
.content li p:after {
	content: " ";
	display: block;
	position: absolute;
	left: 0;
	top: 0.08rem;
	width: 0.06rem;
	height: 0.28rem;
	background: #2ed5e2;
	border-radius: 0.03rem;
}
.content li .laber {
	display: inline-block;
	padding: 0 0.28rem;
	height: 0.56rem;
	line-height: 0.58rem;
	color: #fff;
	background: #2ed5e2;
	margin-top: 0.2rem;
	margin-right: 0.2rem;
	border-radius: 0.28rem;
	font-weight: bold;
}
.content li .laber-gray{
	background: #d2d2d2;
	color: #717171;
}
.scrollbox {
	position: absolute;
	left: 0;
	top: 4.67rem;
	right: 0;
	bottom: 0;
	margin: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
.item {
	position: relative;
	margin: 0 0.52rem;
	padding-top: 0.5rem;
}
.details {
	position: absolute;
	left: 0;
	top: 0.9rem;
	bottom: 0.2rem;
	right: 0;
	margin: auto;
	display: flex;
	align-items: center;
}
.name {	
	color: #fff;
	margin: 0 0.48rem;
}
.name h3 {
	font-size: 0.38rem;
	font-weight: bold;
	line-height: 1.2;
}
.name p {
	font-size: 0.2rem;
	line-height: 1.5;
	padding-top: 0.2rem;
	word-break: break-all;
}

.header {
	position: relative;
	height: 4.67rem;
	background: url(http://act.cqnews.net/lfq/static/img/detail10.jpg) no-repeat;
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