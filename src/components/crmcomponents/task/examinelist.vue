<template>
	<div class="list">
			<el-table :data="tableData.records"  border style="width: 100%" >
				    <el-table-column prop="executeUserName" label="执行人"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="status" label="任务状态"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="executeDate" label="启动时间"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="finishDate" label="完成时间"  show-overflow-tooltip align="center"></el-table-column				    
				    <el-table-column prop="createDate" label="创建时间"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="vipCount" label="任务量"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="dailCount" label="回访次数"  show-overflow-tooltip align="center"></el-table-column>				     
				    <el-table-column  label="操作"  align="center" >
				        <template slot-scope="scope" >				        	
					        <el-button size="mini" @click="examine(scope.$index, scope.row,tableData.records)" type="primary">查看</el-button>						        
				      	</template>
		            </el-table-column>
  			</el-table>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				status:0,
				tableData:{}
			}
		},
		created(){
			this.currentspage(1)
			
		},
		methods:{
			//查看任务详情
			examine(index,row){
				this.$store.state.examineData=row
	    		this.$router.push({path:"/home/startexaminelist/"+row.id})
			},
			//
			currentspage(a){
				const obj={
					size:14,
					current: a,					
					params: {
						//"flag": this.status,// 0.全部 1.已回访 2.未回访
						"userId":localStorage.getItem("roleId")
					}
				}
				this.$http.post("task/page",obj,{
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
		}
	}
</script>

<style scoped>
</style>