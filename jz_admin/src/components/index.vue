<style>

.select-buttons{
    padding-top: 10px;
    padding-bottom:15px;
}
.select-buttons button{
    margin-right: 10px;
}

.record-container {
    /* padding-top: 20px; */
    height: 100%;
    min-height: 900px;
}

.record-group-header{
    display: flex;
    background-color: #ececec;
    min-height: 50px;
    line-height: 50px;
    padding: 0 10px 0 10px;
    font-size: 14px;
}

.record-group-header span,.record-group-day span{
    flex:1;
}
.record-group-header span:nth-child(2){
    text-align: right;
    color: #6f6f6f;
    flex:2;
}
.record-group-day{
    display: flex;
     font-size: 14px;
    color: #6f6f6f;
    padding: 10px 10px 0px 10px;
}
.record-group-day span:nth-child(2){
    text-align: right;
    flex:2;
}
.record-item {
    padding: 10px 0 10px 0;
    display: flex;
    border-bottom: .001em solid #6f6f6f;
}

.record-item .tags{
    display: flex;
    flex: 0.5;
    margin-left: 5px;
    align-items: center;
    min-width: 58px;
}

.record-item .des{
    display: inline-block;
    min-width:0;
    flex: 2;
    text-align: left;
    font-size: 12px;
    color: #6f6f6f;
    align-items: center;
    margin-right: 30px;
    padding-top: 12px;
}

.record-item .num{
    flex: 0.5;
    font-size: 28px;
    font-weight: 700;
    text-align: right;
    padding-right: 15px;
    max-width: 150px;
}
.record-item .num.jia{
    color: rgb(245, 208, 86);
}
.record-item .num.jian{
    color: rgb(101, 165, 238);
}


</style>

<template>
    <div class="index">
       

        <div class="select-buttons">
            <button class="le-button" @click="onAccountTypeSelected">{{ accountTypes[screen.accountType] ? accountTypes[screen.accountType] : "账户类型" }}<i class="iconfont icon-xiala1"></i></button>
        </div>

        <!-- 记录容器 -->
        <div class="record-container" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <!-- 记录月份分组  -->
            <div class="record-group" v-for="(item,index) in records" :key="index">
                <!-- 月份分类 -->
                <div class="record-group-header">
                    <span @click="onDateClicked">{{item.date}}<i class="iconfont icon-xiala1"></i></span>
                    <span>收入￥{{item.totalShouru}} 支出￥{{item.totalZhichu}}</span>
                </div>
                <div v-for="(dayItem,dayIndex) in item.dayData" :key="dayIndex">
                    <!-- 按天分类 -->
                    <div class="record-group-day">
                        <span>{{dayItem.date }}</span>
                        <span>收入￥{{dayItem.shouru}} 支出￥{{dayItem.zhichu}} </span>
                    </div>
                    <!-- 列表主体 -->
                    <ul class="record-list">
                        <li class="record-item" v-for="(listItem,listIndex) in dayItem.list" :key="listIndex">
                            <div class="tags">
                                <span class="le-tag le-bg1">{{accountTypes[listItem.AccountType]}}</span>
                            </div>
                            <span class="des text-ellipsis">{{listItem.describe}}</span>
                            <span :class="['num', {'jia':listItem.isIncome > 0, 'jian':listItem.isIncome == 0}]">{{ listItem.isIncome > 0 ? "+"+listItem.num : "-"+listItem.num}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="loading-box" v-if="scrollList.loading">
          <mt-spinner type="fading-circle" class="loading-more"  color="#0188fd"></mt-spinner>
          <span>加载中...</span>                  		                  
        </div>

        <div class="no-more"  v-if="scrollList.noMore">没有更多</div> 		


        <mt-datetime-picker
            ref="timepicker"
            v-model="datePicker.startDateTime"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-bind:startDate="datePicker.startDate"
            v-bind:endDate="datePicker.endDate"
            v-on:confirm="handleConfirm"
         >
        </mt-datetime-picker>
       
    </div>
</template>

<script>

import { DatetimePicker,InfiniteScroll } from 'mint-ui';
import { AccountTypes, AccountTypeArr } from '../config/accountTypes';
// import { Request } from '../utils/request';
import { MyData } from '../common/data';
import { Indicator } from 'mint-ui';
import { Utils } from "../utils";


export default {
        
    data(){
        return {
        
            /*  后台下发数据格式
                [
                {
                    date:"2019年10月1日",
                    time:0,
                    des:"描述描述",
                    accountType:"jh"
                    num:190
                },
                {
                    date:"2019年10月1日",
                    time:0,
                    des:"描述描述",
                    accountType:"jh"
                    num:190
                },
                {
                    date:"2019年10月1日",
                    time:0,
                    des:"描述描述",
                    accountType:"jh"
                    num:190
                },
                {
                    date:"2019年11月1日",
                    time:0,
                    des:"描述描述",
                    accountType:"jh"
                },
                 {
                    date:"2019年11月1日",
                    time:0,
                    des:"描述描述",
                    accountType:"jh"
                },
            ]
            */
            results:[],

            /* 处理之后的数据格式 */
            /* 
                [
                    {
                    date:"2019年10月",
                    totalShouru:100,
                    totalZhichu:200, 
                    dayData:[
                        {
                            date:"2019年10月12日",
                            time:0,
                            shouru:20,
                            zhichu:21,
                            list:[
                                {
                                    des:"描述描述",
                                    accountType:"jh",
                                    isIncome:1,
                                    num:20
                                },
                                {
                                    des:"描述描述",
                                    accountType:"jh",
                                    isIncome:0,
                                    num:20
                                },
                                {
                                    des:"描述描述",
                                    accountType:"jh",
                                    isIncome:0,
                                    num:20
                                },
                            ]
                        },
                        {
                            date:"2019年10月13日",
                            time:0,
                            shouru:20,
                            zhichu:21,
                            list:[
                                {
                                    des:"描述描述",
                                    accountType:"jh",
                                    isIncome:1,
                                    num:20
                                },
                                {
                                    des:"描述描述",
                                    accountType:"jh",
                                    isIncome:0,
                                    num:20
                                },
                                {
                                    des:"描述描述",
                                    accountType:"jh",
                                    isIncome:0,
                                    num:20
                                },
                            ]
                        }
                    ]
                },
                ]
            */
            records:[ ],

            accountTypes:AccountTypes,

            /* 筛选 */
            screen:{
                accountType:""
            },

            /* 分页记录 */
            page:{
                pageNumber:0,
                pageTotalNumber:20,
            },

            /* 列表滚动状态 */
            scrollList:{
                noMore:false,
                loading: false,
            },

            /* 日期选择器数据 */
            datePicker:{
                startDate: new Date("2019-10-01"),
                endDate: new Date("2020-12-31"),
                startDateTime:"", //选中的日期
            },

            isLoading:false
        }
    },

    created(){
        let startData = new Date();
        this.datePicker.startDateTime = startData; 
        this.initData();
    },

    methods:{
        /* 初始数据 */
        async initData(){
            this.datePicker.startDateTime.setHours(23);
            this.datePicker.startDateTime.setMinutes(59);
            let { data } = await this.$http.get("/getRecordList", 
            { params: {
                userId:MyData.userInfo,
                pageNumber:this.page.pageNumber,
                pageListCount:20,
                AccountType:this.screen.accountType,
                startDateTime:this.datePicker.startDateTime ? this.datePicker.startDateTime.getTime()/1000 : ""
            }});
            this.isLoading = false;
            if(data.result.list.length == 0){
                this.records =  [
                    {
                        date:Utils.dataFormat(new Date(this.datePicker.startDateTime).getTime(), "Y年M月"),
                        totalShouru:0.00,
                        totalZhichu:0.00, 
                        dayData:[]
                    }
                ] //添加一条空数据
                return
            }
            this.results = this.results.concat(data.result.list);
            this.results.sort((a,b) => b-a);
            this.page.pageTotalNumber = parseInt(data.result.count / 20); //一次20条
            this.records = this.dataFormat(this.results);
            console.log(this.records);
            console.log(this.page.pageTotalNumber)
        },
        /* 加载更多 */
        loadMore(){
            if(this.isLoading) return;
            this.isLoading = true;
            this.page.pageNumber += 1 // 增加分页
            this.scrollList.noMore = false;
            this.scrollList.loading = true // 加载中
            console.log(this.page)
            if(this.page.pageNumber <= this.page.pageTotalNumber){
                //加载数据
                setTimeout(()=>{
                    this.initData()
                },1000)
            
            }else{ 
                this.scrollList.noMore = true // 显示没有更多了
                this.scrollList.loading = false // 关闭加载中
                return false
            }
        },
        dataFormat(data){

            let result = [];

            let sum = (arr) => {
                let shouru = 0;
                let zhichu = 0;

                arr.forEach((item) => {
                    if(item.isIncome){
                        shouru += parseFloat(item.num);
                    }else{
                        zhichu += parseFloat(item.num);
                    }
                })
                return {
                    shouru:shouru.toFixed(2),
                    zhichu:zhichu.toFixed(2),
                };
            }

            /* 将一个月的数据 按天分组 并包装数据 */
            let monthDataToDayGroup = (arr) => {
                let resu = [];
                let dayGroup = {};
                arr.forEach(item => {
                    let dayArr = [];
                    if(dayGroup[item.day]){
                        dayArr = dayGroup[item.day]
                    }else{
                        dayGroup[item.day] = dayArr;
                    }
                    dayArr.push(item);
                })

                for(let key in dayGroup){
                    let itemArr = dayGroup[key];
                    resu.push({
                        date:itemArr[0].date,
                        shouru:sum(itemArr).shouru,
                        zhichu:sum(itemArr).zhichu,
                        list:itemArr
                    })
                }
                
                // 字符串排序
                return resu.sort((a,b) => b.date.localeCompare(a.date));
            }
            
            /* 数据整理 */
            data.forEach((item, index) => {
                item.date = Utils.dataFormat(item.time*1000, "Y年M月D日")
                let reg_Date = /(\d+)年(\d+)月(\d+)/.exec(item.date);
                item.day = reg_Date[3];
                item.month = reg_Date[2];
                item.year = reg_Date[1];
            })

            var group = {}
            var dayArr = [];

            /* 按月分组 */
            data.forEach((item,index) => {
                let arr = [];
                let key = item.year +"-"+ item.month;
                if(group[key]){
                    arr = group[key]
                } else {
                    group[key] = arr;
                }
                arr.push(item)  
            })

            for(let key in group){
                let itemArr = group[key];
                result.push({
                    date:itemArr[0].date.replace(/(\d+)日/, ""),
                    totalShouru:sum(itemArr).shouru,
                    totalZhichu:sum(itemArr).zhichu,
                    dayData:monthDataToDayGroup(itemArr)
                })
            }

            return result;
        },
        /* 日期按钮点击弹出选择 */
        onDateClicked(){
            this.page.pageNumber = 0;
            this.results = [];
            // this.$refs.timepicker.$el.getElementsByClassName("picker-slot-center")[2].style.display = "none";
            this.$refs.timepicker.open()
        },
        /* 日期选择回调 */
        handleConfirm(){
            // console.log(this.startDateVal)
            this.initData();
        },
        onGenerateExcel(){

        },
        onAccountTypeSelected(){
            this.page.pageNumber = 0;
            this.results = [];
            this.$actionSheet.show(AccountTypeArr, (val, index) => {
                // console.log(val, index)
                this.screen.accountType = AccountTypes[index];
                this.initData()
            });
        }

    }
    
}
</script>


