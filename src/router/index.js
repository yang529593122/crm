import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'

//crm 
import Home from '@/components/crmcomponents/home/home'
import DefaultPage from '@/components/crmcomponents/defaultpage'
//会员管理模块
import CuserList from '@/components/crmcomponents/crmuser/userlist'
import CallPhone from '@/components/crmcomponents/crmuser/callphone'
import OrderList from '@/components/crmcomponents/crmuser/orderlist'
//任务管理模块
import TaskList from '@/components/crmcomponents/task/tasklist'
import GetTask from '@/components/crmcomponents/task/gettask'
import Examine from '@/components/crmcomponents/task/examine'
import ExamineList from '@/components/crmcomponents/task/examinelist'
import StartExamineList from '@/components/crmcomponents/task/startexaminelist'
//权限模块
import Management from '@/components/crmcomponents/management/management'
import CompileManagement from '@/components/crmcomponents/management/compilemanagement'

import User from '@/components/crmcomponents/management/user'
import UpdateUser from '@/components/crmcomponents/management/userComponent/updateuser'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home, 
      children:[
      		{
      			path:"defaultpage",
      			component: DefaultPage
      			
      		},
	        { //会员列表
			      path: 'userlist',
			      name: 'userlist',
			      component: CuserList
			      
			    },
			    { //任务列表
			      path: 'tasklist',
			      name: 'tasklist',
			      component: TaskList,
			      
			    },
			    { //任务列表
			      path: 'startexaminelist/:id',			     
			      component: StartExamineList,
			      
			    },
			    
			    { //话务员列表
			      path: 'examinelist',
			      name: 'examinelist',
			      component: ExamineList,
			      
			    },
			    { //任务分配
			      path: 'gettask',
			      name: 'gettask',
			      component: GetTask
			    },
			    { //权限管理
			      path: 'management',
			      name: 'management',
			      component: Management
			    },
			    { //权限管理
			      path: 'user',
			      name: 'user',
			      component: User,
			      
			    },
			    { //编辑用户
			      path: 'updateuser/:id',						     
			      component: UpdateUser
			    },
			    { //任务闲情
			      path: 'examine/:id',						     
			      component: Examine
			    },
			    { //回访详情
			      path: 'callphone/:id',						     
			      component: CallPhone
			    },
			    { //回访详情
			      path: 'orderlist/:id',						     
			      component: OrderList
			    },
			    { //编辑角色
			      path: 'compilemanagement/:id',						     
			      component: CompileManagement
			    },
			    
      ]
    }
  ]
})
