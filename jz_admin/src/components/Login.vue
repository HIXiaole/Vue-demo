<template>
    
    <div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="account"></mt-field>

        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>

        <mt-button type="primary" size="large" v-on:click="onSubmit">确定</mt-button>
    </div>

</template>


<script>

// import { Request } from "../utils/request";
import { Toast } from "mint-ui";
import { MyData } from "../common/data"

export default {
    

    data(){
        return {
            account:"",
            password:""
        }
    },

    methods:{
        onSubmit:async function () {
            if(this.account == "" || this.password == ""){
                return Toast("请补全信息")
            }
            try {
                let { data } = await this.$http.post("/login", {account:this.account, password:this.password});    
                if(data.code == 200){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userInfo", data.userId);
                    MyData.userInfo = data.userId;
                    this.$router.push("/index");
                }else{
                    this.account = "";
                    this.password = "";
                    return Toast("登录失败");
                }
            } catch (error) {
                console.log("1111111111111111111",error);
            }
        }
    }

}
</script>