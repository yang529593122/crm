<template>
	<div class="order-box">
		<div class="order-list">
				<el-table :data="shopData.records"  border style="width: 100%" >				  
				    <el-table-column prop="order_code" label="订单编号"  show-overflow-tooltip align="center"></el-table-column>
				    <!--<el-table-column prop="address" label="地址" align="center"></el-table-column>-->
				    <!-- <el-table-column prop="orgAddress" label="地区" align="center"></el-table-column>-->
				    <el-table-column prop="bar_code" label="条码"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="goods_name" label="商品名称"  show-overflow-tooltip align="center"></el-table-column>				    
				    <el-table-column prop="price" label="单价" align="center" ></el-table-column>
				    <el-table-column prop="count" label="数量" align="center" ></el-table-column>
				    <el-table-column prop="amount" label="小计" show-overflow-tooltip align="center"></el-table-column>
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
		<div class="order-footer">
			<div class="pagebox" v-show="showflag">
				<el-pagination background layout="prev, pager, next" :total="shopData.total" :page-size="shopData.size"  @current-change="getShopData"></el-pagination>						
			</div>
			
		</div>
	</div>

</template>

<script>
	export default {
		data(){
			return {
				shopData:{},
				showflag:true
			}
		},
		created(){
			this.getShopData(1)
		},
		methods:{
			getShopData(a){
				console.log(a)
				 const obj={
					 	"current":a,
					 	"size":16,
					 	"params":{
					 		"vipId":this.$route.params.id
					 	}
				 	}
				this.$http.post("crm/crmPlatCustomer/getOrders",obj,{
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
			 		if(res.data.data.records.length==0){
			 			this.showflag=false
			 		}
			 		this.shopData=res.data.data
			 	})
			},
			currentspage(a){
				console.log(a)
			},
		},
	}
</script>

<style scoped>
	.order-footer{
		margin-top: 10px;
		width: 100%;
	}
	.pagebox{
		width: 500px;
		margin: 0 auto;
		overflow: hidden;
	}
</style>