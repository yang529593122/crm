<template>
	<div class="task-list">
		<div class="task-list-header">
			
		</div>
		<div class="task-list-table">			
			<el-table :data="taskData.records"  border style="width: 100%" >
				    <el-table-column prop="executeUserName" label="执行人"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="status" label="任务状态"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="executeDate" label="启动时间"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="finishDate" label="完成时间"  show-overflow-tooltip align="center"></el-table-column				    
				    <el-table-column prop="createDate" label="创建时间"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="vipCount" label="任务量"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="dailCount" label="回访次数"  show-overflow-tooltip align="center"></el-table-column>				     
				    <el-table-column  label="操作"  align="center" width="400">
				        <template slot-scope="scope" >				        	
					        <el-button size="mini" @click="examine(scope.$index, scope.row,taskData.records)" type="primary">查看</el-button>	
					        <el-button size="mini" @click="startTask(scope.$index, scope.row,taskData.records)" type="primary">启动</el-button>
					        <el-button size="mini" @click="finishTask(scope.$index, scope.row,taskData.records)" type="primary">完成</el-button>
					        <el-button size="mini" @click="delTask(scope.$index, scope.row,taskData.records)"  type="danger">删除</el-button>
				      	</template>
		         </el-table-column>
  			</el-table>
		</div>
		<div class="task-list-footer">
			<div class="pagebox">
				<el-pagination background layout="prev, pager, next" :total="taskData.total" :page-size="taskData.size"  @current-change="gettasklist"></el-pagination>						
			</div>			
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				taskData:{},
			}
		},
		created(){
			this.gettasklist(1)
		},
		methods:{
			gettasklist(a){
				const pageDatas={
			 		size: 14,//每页显示条数
					current: a,//第几页
					params: {
						//page_id: "userrole_page"
					}
			 	}	 
				this.$http.post("task/page",pageDatas,{
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
							    return JSON.stringify(pageDatas);
							}]
					  	})
					 	.then((res)=>{	
					 		console.log(res.data)
					      	this.taskData=res.data.data
					 	})
			},
			//查看任务详情
			examine(index,row){
				this.$store.state.examineData=row
	    		this.$router.push({path:"/home/examine/"+row.id})
			},
			//启动任务
			startTask(index,row){
				console.log(index,row)
				if(row.status==0){
					const obj={
						id:row.id
					}
					this.$http.post("task/start",obj,{
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
				 		if(res.data.data){
				 			this.gettasklist(1)
						 		}
						 	})
						}else if(row.status==1){
							this.$notify({
					          title: '警告',
					          message: '该任务正在进行',
					          type: 'warning'
					        });
						}else if(row.status==2){
							this.$notify({
					          title: '警告',
					          message: '该任务已经完成',
					          type: 'warning'
					        });
						}
			
				
				
			},
			//删除任务
			delTask(index,row){
				console.log(row)
				if(row.status==0){
					const obj={
						id:row.id
					}
					this.$http.post("task/delete",obj,{
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
				 		if(res.data.data){
				 			this.gettasklist(1)
				 		}
				 	})
					
				}else if(row.status==1){
					this.$notify({
			          title: '警告',
			          message: '该任务正在进行',
			          type: 'warning'
			        });
				}else if(row.status==2){
					this.$notify({
			          title: '警告',
			          message: '该任务已经完成',
			          type: 'warning'
			        });
				}
			},
			//完成任务
			finishTask(index,row){
				if(row.status==1){
					const obj={
						id:row.id
					}
					this.$http.post("task/finish",obj,{
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
				 		if(res.data.data){
				 			this.gettasklist(1)
				 		}
				 	})
					
				}else if(row.status==0){
					this.$notify({
			          title: '警告',
			          message: '该任务是新建任务，请启动任务',
			          type: 'warning'
			        });
				}else if(row.status==2){
					this.$notify({
			          title: '警告',
			          message: '该任务已经完成',
			          type: 'warning'
			        });
				}
			},
		}
	}
</script>

<style scoped>
	.task-list-footer{
		margin-top: 10px;
	}
	.pagebox{
		width: 500px;
		margin: 0 auto;
		overflow: hidden;
	}
</style>