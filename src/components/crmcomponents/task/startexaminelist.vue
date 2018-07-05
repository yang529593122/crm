<template>
	<div clas="examine">
			<div class="examine-header">				
				<!-- <ul>				 	
				 	<li>全部</li>
				 	<li>未完成</li>
				 	<li>已完成</li>
				 </ul>-->
			</div>
			<div class="examine-list">
				<el-table :data="tableData.records"  style="width: 100%" border>
			        <el-table-column label="姓名" prop="vip_name" width="120" align="center"></el-table-column>
			        <el-table-column prop="vip_phone" label="电话"  width="120" align="center"></el-table-column>
			        <el-table-column prop="com_name" label="分公司" show-overflow-tooltip  align="center"></el-table-column>
			        <el-table-column prop="org_name" label="门店" show-overflow-tooltip  align="center"></el-table-column>
			        <!--<el-table-column prop="address" label="地址" show-overflow-tooltip  align="center"></el-table-column>-->
			        <el-table-column prop="dail_count" label="回访次数" show-overflow-tooltip  align="center"></el-table-column>
			        <!--lastVisitTime 回访时间-->
			        <el-table-column label="回访时间"  show-overflow-tooltip align="center">
			          <el-table-column label="首次回访" prop="first_dail_time" show-overflow-tooltip  align="center"></el-table-column>
			          <el-table-column label="最近回访" prop="last_dail_time" show-overflow-tooltip  align="center"></el-table-column>
			        </el-table-column>
			        <el-table-column label="最近回访备注" prop="remark" show-overflow-tooltip  align="center"></el-table-column>
			        <el-table-column label="操作" prop="operation"  align="center" >
			          <template slot-scope="scope"   >
			            <el-button type="primary" size="mini" @click="editRemark(scope.$index, scope.row)"  >编辑</el-button>
			           
			          </template>
			        </el-table-column>
			      </el-table>
			</div>
			<div class="examine-footer">
			<div class="pagebox">
				<el-pagination background layout="prev, pager, next" :total="tableData.total" :page-size="tableData.size"  @current-change="currentspage"></el-pagination>						
			</div>
			<!--编辑备注-->
		<el-dialog title="备注信息" :visible.sync="change" width="30%" >
		  <el-input type="textarea"  autosize  placeholder="请输入备注内容"  v-model="value"></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="change = false">取 消</el-button>
		    <el-button type="primary" @click="changeBji">确 定</el-button>
		  </span>
		</el-dialog>
 

		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:{},
				status:0,
				change:false,
				row:null,
				value:""
			}
		},
		
			
		
		created(){			
			this.currentspage(1)
		},
		methods:{
			//获取数据
			currentspage(a){
				const obj={
					size:14,
					current: a,					
					params: {
						"flag": this.status,// 0.全部 1.已回访 2.未回访
						"taskId":this.$store.state.examineData.id
					}
				}
				this.$http.post("task/page/dtl",obj,{
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
			//编辑
			editRemark(index,row){
				this.change=true
				this.row=row
				console.log(this.$store.state.examineData)
				
			},
			//确认编辑
			changeBji(){
				
				const obj={
					remark: this.value,//回访备注
					taskDtlId: this.row.id //任务明细ID
				}
				this.$http.post("task/dail/record/add",obj,{
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
			 			this.change=false
			 			this.currentspage(1)
			 		}else{
			 			alert(res.data.message)
			 		}			 		
			 	})
			},
			
		}
	}
</script>

<style scoped>
	.examine-header ul{
		display: flex;
	}
	.examine-header ul li {
		padding: 0 10px;
	}
	.examine-footer{
		margin-top: 10px;
	}
	.pagebox{
		width: 500px;
		margin: 0 auto;
		overflow: hidden;
	}
</style>