<template>


    <div>


        <template>
            <a-steps :current="current" size="small">
                <a-step title="输入设备序列号" />
                <a-step title="查看设备状态信息" />
                <a-step title="绑定与完成" />
            </a-steps>
        </template>

<!--        <div class="line"/>-->

        <a-divider />

        <div class="step1">


                <a-input-search v-if="current == 0" placeholder="输入设备的序列号"  @search="onSearch($event)" enterButton />


                <div v-if="current == 1">

                    <template>
                        <div>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-statistic title="设备名字" :value="device.name" style="margin-right: 50px" />
                                </a-col>
                            </a-row>



                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-statistic title="设备唯一码" :value="device.uuid" style="margin-right: 50px" />
                                </a-col>

                            </a-row>

                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-statistic title="创建者" :precision="2" :value="device.username" />
                                </a-col>

                                <a-col :span="12">
                                    <a-statistic title="创建时间" :precision="2" :value="device.register_time" />
                                </a-col>

                            </a-row>

                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-statistic title="设备描述" :precision="2" :value="device.info" />
                                </a-col>
                            </a-row>

                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-statistic title="设备类型" :precision="2" :value="device.type" />
                                </a-col>
                            </a-row>


                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-statistic title="设备token" :precision="2" :value="device.token" />
                                </a-col>
                            </a-row>





                        </div>
                    </template>




                    <a-button type="primary" :loading="binding" @click="requestBinding()" style="width: 100px; height: 40px">
                        <a v-if="binding"> 绑定中</a>
                        <a v-else>绑定</a>
                    </a-button>


                </div>


            <div v-if="current==2">
                <template>
<!--                    <a-result-->
<!--                            status="success"-->
<!--                            title="成功绑定"-->
<!--                            subTitle="现在您可以进行该设备监控了"-->
<!--                    >-->
<!--                        <template v-slot:extra>-->
<!--                            <a-button type="primary" key="console" @click="newBinding()">绑定新设备</a-button>-->
<!--&lt;!&ndash;                            <a-button key="buy">Buy Again</a-button>&ndash;&gt;-->
<!--                        </template>-->
<!--                    </a-result>-->


                    <a-icon type="check-circle"  v-if="success">绑定成功</a-icon>

                    <a-icon type="close-circle"  v-else>绑定失败</a-icon>
                    <p v-if="success">绑定成功</p>
                    <p v-else>绑定失败</p>

                    <a-button type="primary" key="console" @click="newBinding()">绑定新设备</a-button>
                </template>

            </div>

        </div>





    </div>

</template>

<script>



    export default {
        name: "DeviceBinding.vue",
        data(){
          return {
              current: 0,
              size: 'default',
              device: {
                  name: '',
                  username: '',
                  uuid: '',
                  register_time: '',
                  info: '',
                  type: '',
                  token: '',
              },
              binding: false,
              success: false,
          }
        },
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
                            this.current = 1;

                            this.device = res.data.data
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

            },
            requestBinding(){
                this.binding = true;
                this.$message.destroy();
                this.$message.info('正在绑定...')

                this.$axios.get('http://localhost:18887/deviceBinding/binding?uuid='+this.device.uuid.toString(), "")
                .then(res =>{
                    console.log(res);
                    if (res.data.code == 20000){
                        this.$message.destroy();
                        this.$message.success('成功绑定')

                        this.current = 2;
                        this.binding = false
                        this.success = true;
                    }else{

                        this.$message.destroy();
                        this.$message.error('绑定失败:'+res.data.data)
                        this.current = 2;
                        this.binding = false
                        this.success = false;
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.destroy();
                    this.$message.error('绑定失败:'+error)

                    this.current = 2;
                    this.binding = false
                    this.success = false;
                })

            },
            newBinding(){
                this.current = 0;
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