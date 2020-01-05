<template>
    <div class="me">

        <mt-cell title="账户设置" is-link v-on:click.native="$router.push('/account-set')"></mt-cell>
        <mt-button type="danger" size="large" style="margin-top:10px;" v-on:click.native="exit">退出</mt-button>
    </div>
</template>


<script>
import { MyData } from "../common/data"
export default {
    methods:{
        exit(){
            localStorage.removeItem("token")
            localStorage.removeItem("userInfo")
            MyData.userInfo = null;
            this.$router.push("/login");
        }
    }
}
</script>