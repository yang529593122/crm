<template>
	<div class="callphone">
		<div class="callphone-box">
			<el-table :data="callData.records"  border style="width: 100%" >				  
				    <el-table-column prop="create_user_name" label="回访人"  show-overflow-tooltip align="center"></el-table-column>
				    <!--<el-table-column prop="address" label="地址" align="center"></el-table-column>-->
				    <!-- <el-table-column prop="orgAddress" label="地区" align="center"></el-table-column>-->
				    <el-table-column prop="create_date" label="回访时间"  show-overflow-tooltip align="center"></el-table-column>
				    
				    <el-table-column prop="remark" label="备注" show-overflow-tooltip align="center"></el-table-column>
				    <!--
				    	<el-table-column  label="操作"  align="center" show-overflow-tooltip>
					        <template slot-scope="scope">
						        <el-button size="mini" @click="orderlist(scope.$index, scope.row)" type="danger">购物详情</el-button>	
						        <el-button size="mini" @click="callPhone(scope.$index, scope.row)" type="danger">回访详情</el-button>
					      	</template>
			         	</el-table-column>
			         -->
  				</el-table>
		</div>
		<div class="callphone-footer">
			<div class="pagebox" v-show="showflag">
				<el-pagination background layout="prev, pager, next" :total="callData.total" :page-size="callData.size"  @current-change="getCallData"></el-pagination>						
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				callData:{},
				showflag:true
			}
		},
		
		created(){
			
			this.getCallData(1)
		},
		methods:{
			getCallData(a){
				const obj={
					size:14,
					current: a,					
					params: {
						vipId :this.$route.params.id
					}
				}
				this.$http.post("task/dtl/vip",obj,{
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
			 		if(res.data.data.records.length==0){
			 			this.showflag=false
			 		}
			 		this.callData=res.data.data
			 	})
			},
		},
	}
</script>

<style scoped>
	.callphone-footer{
		margin-top: 10px;
		width: 100%;
	}
	.pagebox{
		width: 500px;
		margin: 0 auto;
		overflow: hidden;
	}
</style>