<template>
    <div>

        <template>
            <a-steps :current="0" size="small">
                <a-step title="输入设备序列号" />
                <a-step title="查看设备状态信息" />
                <a-step title="绑定与完成" />
            </a-steps>
        </template>

<!--        <div class="line"/>-->

        <a-divider />

        <div class="step1">


            <a-input-search placeholder="输入设备的序列号"  @search="onSearch($event)" enterButton />

        </div>





    </div>

</template>

<script>
    export default {
        name: "DeviceBinding.vue",
        methods:{
            onSearch(value){
                console.log('onSearch()')
                console.log(value)

                let regExp = new RegExp('\\w{8}(-\\w{4}){3}-\\w{12}');
                console.log(regExp.test(value));

                if (regExp.test(value) == true){
                    let config = {
                        headers : {
                            'Content-Type':'application/json;charset=UTF-8'
                        },
                    };

                    this.$axios.get("http://localhost:18887/device/getDeviceInfoByUuid?uuid="+value.toString(),"")
                    .then(res => {
                        if (res.data.code == 20000){
                            this.$message.destroy();
                            this.$message.success('查询成功');
                            console.log(res);
                        }else{
                            this.$message.destroy();
                            this.$message.error("查询失败："+res.data.data);
                        }
                    }).catch(err => {

                    })
                }else{
                    this.$message.destroy();
                    this.$message.error('无效的序列号，格式错误！')
                }

            }
        }
    }
</script>

<style scoped>


    .step1 {
        padding-top: 40px;
        /*padding-bottom: 40px;*/
        width: 360px;
        margin: 0 auto;
    }


</style>