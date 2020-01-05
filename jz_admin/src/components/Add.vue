<template>
    
    <div>
        <!-- 顶部账户信息 -->
        <div class="account-info">
            <div>
                <p>微信</p>
                <p v-text="accountInfo.wx.number"></p>
            </div>
            <div>
                <p>支付宝</p>
                <p v-text="accountInfo.zfb.number"></p>
            </div>
            <div>
                <p>花呗</p>
                <p v-text="accountInfo.hb.number"></p>
            </div>
            <div>
                <p>建行</p>
                <p v-text="accountInfo.jh.number"></p>
            </div>
            <div>
                <p>现金</p>
                <p v-text="accountInfo.xj.number"></p>
            </div>
        </div>

        <!-- 添加记录 节点批量渲染 -->
        <div class="add-items">
            <div class="add-item" v-for="(item,index) in records"  v-bind:key="index" >
                <div class="left">
                    <span class="select-button" v-on:click="onShowActions('btn1', index)">{{ AccountTypes[item.AccountType] }}</span>
                    <span class="select-button" v-on:click="onShowActions('btn2', index)">{{ item.isIncome == 1 ? "收入" : "支出" }}</span>
                </div>
                <div class="right">
                    <input class="describe" type="text" placeholder="描述" v-model="item.describe">
                    <input class="num" type="tel" placeholder="0.00" v-on:input="onInput(index)" v-model="item.num">
                </div>
            </div>   
        </div>

        <div class="add-buttons">
            
            <mt-button class="add-line-btn" type="default" size="large" v-on:click="onAddLine">添加一行</mt-button>

            <mt-button type="primary" size="large" v-on:click="onSubmit" style="margin-top:10px;">

                <span style="font-size:14px;margin-right:20px;">合计：<strong style="color:red">￥<span v-text="sum"></span></strong></span>
                提交
            </mt-button> 
        </div>

    </div>


</template>


<script>
import { Indicator } from 'mint-ui';
// import { Request } from "../utils/request";
import { Toast } from "mint-ui";
import { AccountTypes,AccountTypeArr } from '../config/accountTypes';
import { decimalFormat } from "../utils/decimalFormat";

import {MyData} from "../common/data"


export default {

    data(){
        return {

            AccountTypes,

            /* 账户信息 */
            accountInfo: {
                wx:{
                    number:0.00
                },
                jh:{
                    number:0.00
                },
                zfb:{
                    number:0.00
                },
                hb:{
                    number:0.00
                },
                xj:{
                    number:0.00
                }
            },

            /* 记录数据 */
            records: [{
                AccountType:"jh",
                isCompany:0,
                isIncome:0,
                describe:'',
                num:""
            }],
            // {
            //     AccountType:"jh",
            //     isCompany:0,
            //     isIncome:0,
            //     describe:'',
            //     num:""
            // },
            // {
            //     AccountType:"jh",
            //     isCompany:0,
            //     isIncome:0,
            //     describe:'',
            //     num:""
            // }],

            /* sum */
            sum:0

        }
    },

    async created(){
        Indicator.open();
        let {data} = await this.$http.get("/account-info", {params:{userId:MyData.userInfo}});
        Indicator.close();
        if(data.code == 200){
            data.result.forEach((item,index) => {
                this.accountInfo[item.AccountType].number = item.num;
            })
        }
    },


    methods:{
        onShowActions(type, index){
            
            if(type == "btn1"){

                this.$actionSheet.show(AccountTypeArr, (val,actionIndex) => {
                    this.records[index].AccountType = AccountTypes[actionIndex];
                })
                
            } else {

                this.$actionSheet.show(["支出", "收入"], (val,actionIndex) => {
                    this.records[index].isIncome = actionIndex;
                })
                
            }
    
        },

        onInput(index){

            let num = decimalFormat(this.records[index].num);
            this.records[index].num = num.toString();    
            let sum = 0;
            this.records.forEach((item, index) => {

                sum += !parseFloat(item.num) ? 0 : parseFloat(item.num);

                // if(item.isIncome == 0){

                //     sum += !parseFloat(item.num) ? 0 : parseFloat(item.num);
                // }
            })
            this.sum = sum.toFixed(2);

        },

        onAddLine(){
            this.records.push({
                AccountType:"jh",
                isCompany:0,
                isIncome:0,
                describe:'',
                num:""
            });
        },

        async onSubmit(){

            let can = false;
            for(let i=0; i<this.records.length; i++){
                if(!this.records[i].num == false){
                    can = true;
                    break; 
                }
            }

            if(!can) {
                return Toast("不完整表单");
            }

            for(let i=0; i<this.records.length; i++){
                if(!this.records[i].num){
                    this.records.splice(i, 1)
                    i--;
                }
            }

            let { data } = await this.$http.post("/add-record", {records:this.records, userId:MyData.userInfo});
    
            if(data.code == 200){
                Toast("ok");
                setTimeout(() => {
                    this.$router.push("/index")
                }, 200)
            }else{
                Toast("error");
            }
    
        }
    },

}
</script>


<style>
.add-buttons {
    position: fixed;
    bottom: 10px;
    left: 1%;
    width: 98%;
}
.add-items{
    padding-bottom: 100px;
    padding-top: 10px;
}
.account-info{
    background-color: rgb(223, 221, 221);
    overflow: hidden;
}
.account-info>div{
    float: left;
    width: 20%;
    text-align: center;
}
.account-info>div p{
    margin: 5px 0 5px 0;
}


/* addItems */

.add-item{
    height: 35px;
    margin-bottom: 5px;
}

.add-item>div{
    float: left;
}

.add-item .left{
    margin-top: 8px;
    width: 130px;
}

.add-item .right{
    width: calc(100% - 130px);
}

.add-item .left .select-button {
    border-radius: 5px;
    background-color: #555;
    padding: 3px 6px 3px 6px;
    color: #fff;
    margin-right: 10px;
}

.add-item .num{
    width: 100px;
    text-align: right;
}

.add-item .describe{
    width: calc(100% - 100px);
}

.add-item input{
    height: 35px;
    line-height: 35px;
    border: none;
    outline: none;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
}
</style>>