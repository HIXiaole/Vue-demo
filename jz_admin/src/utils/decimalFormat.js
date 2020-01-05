export function decimalFormat(str){
    if(typeof str == "number") { str = str.toString()}
    str = str.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符   
    str = str.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    // this.num = this.num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    str = str.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数   
    if (str.indexOf(".") < 0 && str != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        str = parseFloat(str);
    }
    return str;
}