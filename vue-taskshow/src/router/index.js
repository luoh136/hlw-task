import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import persons from '@/components/persons';
import persdetail from '@/components/persdetail';
import tasks from '@/components/tasks';
import taskdetail from '@/components/taskdetail';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
    	path: '/persons',
    	name: 'persons',
    	component: persons
    },{
    	path: '/persdetail',
    	name: 'persdetail',
    	component: persdetail
    },{
    	path: '/tasks',
    	name: 'tasks',
    	component: tasks
    },{
    	path: '/taskdetail',
    	name: 'taskdetail',
    	component: taskdetail
    }
  ]
})
