<template>
  <div class="home">
    <img class="tit" src="http://act.cqnews.net/lfq/static/img/home_tit.png"/>
    <div class="anibox">
    	<img src="http://act.cqnews.net/lfq/static/img/index2.png" class="a1" />
    	<img src="http://act.cqnews.net/lfq/static/img/index3.png" class="a2" />
    	<img src="http://act.cqnews.net/lfq/static/img/index4.png" class="a3" />
    	<img src="http://act.cqnews.net/lfq/static/img/index5.png" class="a4" />
    </div>
    <div class="btnbox">
      <router-link to="/persons">
      	<div class="btn">
      		<img src="http://act.cqnews.net/lfq/static/img/home_btn1.png"/>
      		<span>按员工查询</span>
      	</div>
      </router-link> 
      <router-link to="/tasks">
      	<div class="btn">
      		<img src="http://act.cqnews.net/lfq/static/img/home_btn2.png"/>
      		<span>按任务查询</span>
      	</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
@keyframes ani1{
	from{
		transform: translate(-0.87rem,-0.49rem);
	}
	to{
		transform: translate(1.22rem,0.68rem);
	}
}
@keyframes ani2{
	from{
		transform: translate(-0.63rem,-0.41rem);
	}
	to{
		transform: translate(1.73rem,1.01rem);
	}
}
@keyframes ani3{
	from{
		transform: translate(0.19rem,0.12rem);
	}
	to{
		transform: translate(-1.95rem,-1.12rem);
	}
}
@keyframes ani4{
	from{
		transform: translateY(0.1rem);
	}
	to{
		transform: translateY(0.74rem);
	}
}
.home {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(http://act.cqnews.net/lfq/static/img/home_bg.jpg) no-repeat;
  background-size: 100% 100%;
}
.tit {
  display: block;
  position: relative;
  width: 100%;
  margin-top: 1.34rem;
  z-index: 10;
}
.anibox {
  width: 100%;
  height: 7.33rem;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  background: url(http://act.cqnews.net/lfq/static/img/index1.png) no-repeat;
  background-size: 100% 100%;
}
.anibox img {
	display: block;
	position: absolute;
}
.a1 {
	width: 1.9rem;
	height: 2.71rem;
	left: 3.64rem;
	top: 1.67rem;
	animation: ani1 5.5s .1s infinite alternate;
}
.a2 {
	width: 1.71rem;
	height: 2.35rem;
	left: 2.56rem;
	top: 2.28rem;
	animation: ani2 6s .5s infinite alternate;
}
.a3 {
	width: 1.45rem;
	height: 2.33rem;
	left: 3.98rem;
	top: 3.58rem;
	animation: ani3 6s .2s infinite alternate;
}
.a4 {
	width: 1.79rem;
	height: 1.65rem;
	left: 2.37rem;
	top: 0;
	animation: ani4 4.5s .2s infinite alternate;
}
.btnbox {
  position: absolute;
  left: 0;
  bottom: 0.5rem;
  width: 100%;	
}
.btn {
  display: block;
  position: relative;
  width: 5.76rem;
  margin: 0 auto;
  margin-top: 0.12rem;
  cursor: pointer;
  z-index: 10;
  font-size: 0.4rem;
  color: #fff;
  font-weight: bold;
}
.btn img {
	display: block;
	width: 100%;
}
.btn span {
	position: absolute;
	top: 0;
	line-height: 1.2rem;
	width: 100%;
	text-align: center;
}
</style>