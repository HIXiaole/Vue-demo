<template>
    
    <div class="add-item">
        <div class="left">
            <span class="select-button" v-on:click="onSelectBtn1Clicked">{{selectBtn1Name}}</span>
            <span class="select-button" v-on:click="onSelectBtn2Clicked">{{selectBtn2Name}}</span>
        </div>
        <div class="right">
            <input class="describe" type="text" placeholder="描述" v-model="describe">
            <input class="num" type="tel" placeholder="0.00" v-on:input="onInput" v-model="num">
        </div>
    </div>      
 
</template>

<script>

import { AccountTypes } from "../config/accountTypes";

import { decimalFormat } from "../utils/decimalFormat";

export default {

    data(){
        return {

            selectBtn1Name:"建行",
            selectBtn2Name:"支出",

            AccountType: this.p_AccountType,
            isCompany: this.p_isCompany,
            isIncome: this.p_isIncome,
            describe: this.p_describe,
            num: this.p_num,
        }
    },

    props:{
        p_AccountType:{
            type:String,
            default:"jh"
        }, // 账户类型
        p_isCompany:{
            type:Number,
            default:0
        }, // 是否公司记录
        p_isIncome:{
            type:Number,
            default:0
        }, // 是否为收入记录
        p_describe:{
            type:String,
            default:""
        },
        p_num:{
            type:String,
            default:""
        },
    },

    created(){
        this.selectBtn1Name = AccountTypes[this.AccountType];
        this.selectBtn2Name = this.isIncome == 1 ? "收入" : "支出";
    },
   
    methods:{
        onSelectBtn1Clicked(){
            let actions  = [];
            for(let key in AccountTypes){
                actions.push({
                    name:AccountTypes[key],
                    method:() => {
                        this.selectBtn1Name = AccountTypes[key];
                        this.AccountType = key;
                    }
                })
            }
            this.$emit("showActions", actions)
        },

        onSelectBtn2Clicked(){
            this.$emit("showActions", [{
                name:"收入",
                method:() => {
                    this.isIncome = 1;
                    this.selectBtn2Name = "收入";
                }
            },{
                name:'支出',
                method:() => {
                    this.selectBtn2Name = "支出";
                    this.isIncome = 0;
                }
            }
            ])
        },

        onInput(){

            let num = decimalFormat(this.num);

            this.$parent.sum += num;
            this.num = num.toString();    

        }
    }
}
</script>

<style>

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
</style>