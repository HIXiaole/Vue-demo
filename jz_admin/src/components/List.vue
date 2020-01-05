<template>
        <div class="list">
           <div>
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                prop="WechatAccount"
                label="微信号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="AlipayAccount"
                label="支付宝号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="Phone"
                label="手机号">
                </el-table-column>
            </el-table>
            <el-pagination
            small
            layout="prev, pager, next"
            :total="50">
            </el-pagination>
           </div>
        <mt-button class="add-button"  v-on:click="addClicked" type="primary">添加</mt-button>
    </div>
</template>


<script>

// import { Request } from "../utils/request"


export default {
    data(){
        return {
          tableData: []
        }
    },
    methods:{
        addClicked:function(){
            // console.log("1111")
            this.$router.push("/add");
        },
        async getData(){
            let { data } = await this.$http.get("/list");
            console.log(data);
            if(data.code == 200){
                this.tableData = data.result;
            }
        }
    },
    created(){
        this.getData();
    }
}
</script>

<style>
    .add-button{
        position: fixed;
        right: 35px;
        bottom: 35px;
        background-color :#26a2ff;
        border-radius: 50%;
        height: 60px;
        width: 60px;
        color: #fff;
        text-align: center;
        line-height: 60px;
    }
</style>



