
import ActionSheetComponent from "./index.vue"


let $vm;

export const ActionSheet = {
    install(Vue, options){
        if (!$vm) {
            const ActionProfile = Vue.extend(ActionSheetComponent);

            $vm = new ActionProfile({
                el: document.createElement('div')
            });

            document.body.appendChild($vm.$el);
        }

        Vue.prototype.$actionSheet = {
            show(actions, handle){
                $vm.showActions(actions, handle);
            }
        }

        
    }
}