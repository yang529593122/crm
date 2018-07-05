<template>
	<div class="crm-home">
		<div class="crm-home-header">
			<h2>CRM管理系统</h2>
			<ul>
				<li @click="loginOut">切换用户</li>
			</ul>
		</div>
		<el-container class="crm-home-box">
			<el-aside width="180px" class="crm-left-box">
				<div v-for="(item,index) in DataObjs" class="crm-item">
					<h6 class="crm-item-title" @click="showBox(index)">{{ item.name }}</h6>
					<div class="crm-item-mess" v-show="item.checked">
						<router-link :to="it.url" tag="div" v-for="(it,ind) in item.menus">{{ it.name }}</router-link>
					</div>
				</div>		  			
			  </el-aside>
			  <el-main class="crm-right-box">
			  	 <router-view/>
			  </el-main>
		</el-container>				
	</div>
</template>

<script>
	export default {
		data(){
			return {
				DataObjs:[]
			}
		},
		created(){
			let str=localStorage.getItem("str")
				let dataMeuns=JSON.parse(str)	
				this.DataObjs=dataMeuns
		},
		computed:{		
			/*DataObj(){
				let str=localStorage.getItem("str")
				let dataMeuns=JSON.parse(str)	
				this.DataObjs=dataMeuns
				return this.DataObjs
			}*/
			DataObj:{
				get(){
					let str=localStorage.getItem("str")
					let dataMeuns=JSON.parse(str)	
					return dataMeuns
				},
				set(newValue){
					this.DataObjs=newValue
				}
			}
		},
		methods:{
				//切换账号
				loginOut(){
					localStorage.clear();
					this.$router.push({path:"/"})
				},
				//导航手风琴效果
				showBox(a){
		       	    var temp = this.DataObj		       	 
			        temp[a].checked = ! temp[a].checked
			        for(let i=0;i<temp.length;i++){
			        	if(i!=a){
			        		temp[i].checked=false
			        	}
			        }
			        this.DataObj = temp
		        }
			
		}
	}
</script>

<style scoped>
	.crm-home{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.crm-home-header{
		padding: 0 10px;
		height: 44px;
		
		display: flex;
		line-height: 44px;
		background: #44A1D7;
	}
	.crm-home-header h2{
		color: white;
		font-size: 20px;
	}
	.crm-home-header ul li{
		color: white;
		padding-left: 10px;
	}
	.crm-home-box{
		flex: 1;
		display: flex;
	}
	.crm-left-box{
		width: 200px;
		border-right: 1px #ccc solid;
	}
	.crm-right-box{
		flex: 1;
	}
	.crm-item{				
		border-bottom: 1px #ccc solid;
		padding: 5px 0 5px 5px;
	}
	.crm-item-title{
		height: 30px;
		line-height: 30px;
	}
	.crm-item-mess div{
		padding-left: 40px;
		font-size: 12px;
		line-height: 20px;
	}
</style>