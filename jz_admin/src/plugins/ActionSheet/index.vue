<template>
     <!-- 弹出选项框 -->
    <mt-actionsheet
    v-bind:actions="actions"
    v-model="sheetVisible">
    </mt-actionsheet>
</template>

<script>
export default {
    
    data(){
        return {
            actions:[],
            sheetVisible:false,
            callback:null,
        }
    },

    methods:{
        /* ["name", "name"] */
        showActions(actions,callback){
            let act = [];
            actions.forEach((item,index) => {
                act.push({
                    name:item,
                    method:this.onActionClicked.bind(this,item,index)
                })
            })
            this.callback = callback;
            this.actions = act;
            this.sheetVisible = true;
        },
        hideActions(){
            this.sheetVisible = false;
        },
        onActionClicked(val, index){
            this.callback(val,index);
        }
    }
}
</script>