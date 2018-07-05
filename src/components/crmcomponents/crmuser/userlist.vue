<template>
	<div class="crmuserlist">		
		<div class="userlist-search">
			<ul>
				<li><el-input v-model="name" placeholder="请输入姓名"></el-input></li>
				<li><el-input v-model="phone" placeholder="请输入电话"></el-input></li>
				<li><el-input v-model="shop" placeholder="请输入门店"></el-input></li>
				<li><el-input v-model="filiale" placeholder="请输入分公司"></el-input></li>
				<li><el-button type="primary" @click.native="search">查 询</el-button></el-input></li>
				<li><el-button type="primary" @click.native="exellist">导 出</el-button></el-input></li>
			</ul>
		</div>
		<div class="user-table">
				<el-table :data="tableData.entity"  border style="width: 100%" >
				    <el-table-column prop="name" label="姓名"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="phone" label="电话"  show-overflow-tooltip align="center"></el-table-column>
				    <!--<el-table-column prop="address" label="地址" align="center"></el-table-column>-->
				    <!-- <el-table-column prop="orgAddress" label="地区" align="center"></el-table-column>-->
				    <el-table-column prop="orgName" label="门店"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="comName" label="分公司" show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="visitCount" label="回访记录" align="center" ></el-table-column>
				    <el-table-column  label="操作"  align="center" show-overflow-tooltip>
			        <template slot-scope="scope">
				        <el-button size="mini" @click="orderlist(scope.$index, scope.row)" type="danger">购物详情</el-button>	
				        <el-button size="mini" @click="callPhone(scope.$index, scope.row)" type="danger">回访详情</el-button>
			      	</template>
		         </el-table-column>
  				</el-table>
		</div>
		<div class="user-footer">
			<div class="pagebox">
				<el-pagination background layout="prev, pager, next" :total="tableData.count" :page-size="14"  @current-change="currentspage"></el-pagination>						
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				name:"",   
				phone:"",
				shop:"",
				filiale:"",
				tableData: []
			}
		},
		beforeCreate(){
			    const jiaose={
				    	"pageNo":1, //当前要查询第几页
				    	"pageSize":14, //每页条数
				    	"phone":"", //手机号模糊查询
				    	"name":"", //名字
				    	"comName":"", //分公司名字
				    	"orgName":"" //门店名字
			    	  }
       			this.$http.post("crm/crmPlatCustomer/getPageCustomer",jiaose,{
			  		headers:{
			  			"Content-Type":"application/json",				  						  			
			  		},
			  		transformRequest: [(data, headers)=> {let keys = Object.keys(headers);let normalizedName = 'Content-Type';
					    keys.forEach(name => {
					      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
					        headers[normalizedName] = headers[name];
					        delete headers[name];
					      }
					    });						    
					    return JSON.stringify(jiaose);
					}]
			  	})
			 	.then((res)=>{	
			 		this.tableData=res.data.data
			 	})
		},
		methods:{
			//获取数据源
			getUserData(obj){
				this.$http.post("crm/crmPlatCustomer/getPageCustomer",obj,{
			  		headers:{
			  			"Content-Type":"application/json",				  						  			
			  		},
			  		transformRequest: [(data, headers)=> {let keys = Object.keys(headers);let normalizedName = 'Content-Type';
					    keys.forEach(name => {
					      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
					        headers[normalizedName] = headers[name];
					        delete headers[name];
					      }
					    });						    
					    return JSON.stringify(obj);
					}]
			  	})
			 	.then((res)=>{	
			 		this.tableData=res.data.data			 		
			 	})
			},
			//分页
			currentspage(a){
				const pageData={
						"pageNo":a, //当前要查询第几页
				    	"pageSize":14, //每页条数
				    	"phone":this.phone, //手机号模糊查询
				    	"name":this.name, //名字
				    	"comName":this.filiale, //分公司名字
				    	"orgName":this.shop //门店名字
				}
				this.getUserData(pageData)
				
			},
			//点击查询
			search(){
				const pageData={
						"pageNo":1, //当前要查询第几页
				    	"pageSize":14, //每页条数
				    	"phone":this.phone, //手机号模糊查询
				    	"name":this.name, //名字
				    	"comName":this.filiale, //分公司名字
				    	"orgName":this.shop, //门店名字
				    	
				}
				this.getUserData(pageData)
			},
			//导出
			exellist(){
				var params = {// 参数
						pageNo:1, //当前要查询第几页
				    	pageSize:14, //每页条数
				    	phone:"", //手机号模糊查询
				    	name:"5", //名字
				    	comName:"", //分公司名字
				    	orgName:"", //门店名字
				    	_token:localStorage.getItem("token")
					};
					console.log(params)
					var form=document.createElement('form');
					form.id ='form'
					form.name ='form'
					document.body.appendChild(form);
					for(var obj in params) {
						
						if(params.hasOwnProperty(obj)) {							
							var input =document.createElement('input');						
								input.tpye='hidden';						
								input.name =obj;							
								input.value =params[obj];						
								form.appendChild(input)							
						}						
					}
					form.method ="post";//请求方式

					form.action ="http://47.104.128.231:8080/crm/crm/crmPlatCustomer/exportByMap";
					form.submit();
					document.body.removeChild(form);
				
			},
			//购物详情
			orderlist(index,row){
				this.$router.push({path:"/home/orderlist/"+row.id})
			},
			//回访详情
			callPhone(index,row){
				console.log(row)
				this.$router.push({path:"/home/callphone/"+row.id})
			},
		}
	}
</script>

<style scoped>
	.crmuserlist{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.userlist-search{
		margin-bottom: 20px;
	}
	.userlist-search ul{
		display: flex;
		
	}
	.userlist-search ul li{
		margin-right: 10px;
	}
	
	.user-footer{
		margin-top: 10px;
		width: 100%;
	}
	.pagebox{
		width: 500px;
		margin: 0 auto;
		overflow: hidden;
	}
</style>