<template>
    <div class="account-set">
        <mt-field label="建行" type="tel" placeholder="0.00" v-model="accountInfo.jh.number" v-on:input.native="onInput('jh')"></mt-field>
        <mt-field label="微信" type="tel" placeholder="0.00" v-model="accountInfo.wx.number" v-on:input.native="onInput('wx')"></mt-field>
        <mt-field label="支付宝" type="tel" placeholder="0.00" v-model="accountInfo.zfb.number" v-on:input.native="onInput('zfb')"></mt-field>
        <mt-field label="花呗" type="tel" placeholder="0.00" v-model="accountInfo.hb.number" v-on:input.native="onInput('hb')"></mt-field>
        <mt-field label="现金" type="tel" placeholder="0.00" v-model="accountInfo.xj.number" v-on:input.native="onInput('xj')"></mt-field>

        <mt-button type="primary" size="large" v-on:click="onSubmit">确定</mt-button>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { Toast } from "mint-ui";
import { decimalFormat } from "../utils/decimalFormat"
// import { Request } from '../utils/request';
import { MyData } from "../common/data"
export default {
    data(){
        return {
            accountInfo:{
                wx:{
                    number:""
                },
                jh:{
                    number:""
                },
                zfb:{
                    number:""
                },
                hb:{
                    number:""
                },
                xj:{
                    number:""
                },
            },
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
        async onSubmit(){
            let data = await this.$http.post("/account-set", { userId:MyData.userInfo, accountInfo:this.accountInfo});
            Toast("OK")
        },
        onInput(accountType){
            let num = decimalFormat(this.accountInfo[accountType].number)
            this.accountInfo[accountType].number = num;
        }
    }
}
</script>