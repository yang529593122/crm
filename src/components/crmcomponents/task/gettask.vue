<template>
	<div class="gettask">
		<div class="gettask-header">
			<el-select v-model="taskId" clearable placeholder="请选择话务员">
			    <el-option v-for="item in options" :key="item.id" :label="item.name"  :value="item.id"></el-option>
			</el-select>
			<el-button type="primary" @click="getData">分配</el-button>
		</div>
		<div class="gettask-conter">
			<el-table ref="multipleTable" :data="tableData.entity"  style="width: 100%" @selection-change="handleSelectionChange" border>
			    <el-table-column type="selection" width="55" align="center"></el-table-column>
			    <el-table-column label="姓名" prop="name" width="120" align="center"></el-table-column>
			    <el-table-column prop="phone" label="电话"  width="120" align="center"></el-table-column>
			    <el-table-column prop="comName" label="分公司" show-overflow-tooltip  align="center"></el-table-column>
			    <el-table-column prop="orgName" label="门店" show-overflow-tooltip  align="center"></el-table-column>
			    <!--<el-table-column prop="address" label="地址" show-overflow-tooltip  align="center"></el-table-column>-->
			    <el-table-column prop="visitCount" label="回访次数" show-overflow-tooltip  align="center"></el-table-column>
			    <!--lastVisitTime 回访时间-->
			    <el-table-column label="回访时间" prop="orgName"   show-overflow-tooltip align="center"></el-table-column>
			</el-table>
		</div>
		<div class="gettask-footer">
			<div class="pagebox">
				<el-pagination background layout="prev, pager, next" :total="tableData.count" :page-size="tableData.pageSize"  @current-change="currentspage"></el-pagination>						
			</div>			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
	      return {
	      		options: [],
		        taskId: '',
		        tableData:{},
		        multipleSelection: [], //选中时的数据集合
        	}
        },
       created(){
			    this.currentspage(1)
			 	const obj={}
			 	this.$http.post("user/selectByRole",obj,{
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
			 		console.log(res.data.data)
			 		this.options=res.data.data			 	
			 	})
			 	
		},
        methods:{
        	//获取数据源
        	getUserData(obj){
				this.$http.post("crm/crmPlatCustomer/getPageCustomer2",obj,{
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
        	//点击选中没选中时触发的事件
        	handleSelectionChange(val) {
		        this.multipleSelection = val;		      
		    },
		    //分页
		    currentspage(a){
		      	const pageData={
						"pageNo":a, //当前要查询第几页
				    	"pageSize":15, //每页条数
				    	"phone":"", //手机号模糊查询
				    	"name":"", //名字
				    	"comName":"", //分公司名字
				    	"orgName":"" //门店名字
				}
				this.getUserData(pageData)
		    },
        	//点击分配
        	getData(){   
        		
        		if(this.taskId=="" || this.multipleSelection.length==0){
        			alert("不能为空")
        		}else{
        			
        			let selected=[];        			
        			for(let i=0;i<this.multipleSelection.length;i++){
        				let selectedItem={};
        				selectedItem.vipId=this.multipleSelection[i].id	
        				selected.push(selectedItem)
        			}
        		
        			const obj={
        				name:"",//任务名称
						executeUser:this.taskId,//执行人ID
						dtls: selected
        			}
        			this.$http.post("task/add",obj,{
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
					 		
					 		if(res.data.flag==1){
					 			this.$router.push({path:"/home/tasklist"})
					 		}else{
					 			alert(res.data.message)
					 		}
					 	})
        		}
        	}
        }
	}
</script>

<style scoped>
	.gettask-header{
		margin-bottom: 20px;
	}
	.gettask-conter{
		margin-bottom: 10px;
	}
	.pagebox{
		width: 500px;
		margin: 0 auto;
		overflow: hidden;
	}
</style>