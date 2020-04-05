<template>
    <div>
        注册设备

        <template>
            <a-form :form="form">
                <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="设备名"
                >
                    <a-input
                            v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入设备名' }] },
        ]"
                            placeholder="请输入设备名"
                    />
                </a-form-item>



                    <a-form-item
                            :label-col="formItemLayout.labelCol"
                            :wrapper-col="formItemLayout.wrapperCol"
                            label="设备类型"
                    >
                        <a-input
                                v-decorator="[
          'type',
          { rules: [{ required: true, message: '请输入设备类型' }] },
        ]"
                                placeholder="请输入设备类型"
                        />
                    </a-form-item>




                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="描述信息"
                >
                    <a-input
                            v-decorator="[
          'info',
          { rules: [{ required: checkNick, message: '请输入描述信息' }] },
        ]"
                            placeholder="请输入描述信息"
                    />
                </a-form-item>



                <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
                    <a-button type="primary" @click="check">
                        创建
                    </a-button>
                </a-form-item>
            </a-form>
        </template>

<!--        <template>-->
<!--            <a-alert  class="tip"-->
<!--                    message="成功"-->
<!--                    :description="result"-->
<!--                    type="success"-->
<!--                    showIcon-->
<!--            />-->
<!--        </template>-->



<!--        剪切板按钮-->
        <!-- Target -->


        <input type="text"  v-model="copyUrl" v-show="false"/>
        <button type="button" class="btn"
                ref="copy"
                v-clipboard:copy="copyUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                v-show="false">
            复制链接
        </button>


    </div>
</template>

<script>


    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
    };
    export default {
        name: "DeviceAdd",
        data() {
            return {
                checkNick: false,
                formItemLayout,
                formTailLayout,
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
                result: "123 <br/>  \n  456",
                uuid: '',
                token: '',
                copyUrl:'http://baidu.com',
            };
        },
        methods: {
            check() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.info('success');

                        console.log(values)

                        this.$axios.post('http://localhost:18887/device/createDeviceWithToken?type='+values.type+"&info="+values.info+"&name="+values.name)
                        .then(res =>{
                            console.log(res);
                            this.$message.destroy()
                            if (res.data.code == 20000){
                                this.$message.success('成功')

                                this.result = res.data.data.token + "\n" + res.data.data.uuid;
                                this.token = res.data.data.token;
                                this.uuid = res.data.data.uuid;

                                let message = "唯一识别码：\n"+res.data.data.uuid;
                                while(message.indexOf("\\n") >= 0){
                                    message = message.replace("\\n", "\n");
                                }
                                let copy = '123';

                                this.copyUrl = "uuid:\n"+this.uuid+"\n\n\ntoken:\n"+this.token;

                                this.$notification.open({
                                    message: '创建成功',
                                    description: ''+this.uuid,
                                    content: '123',
                                    icon: <a-icon type="smile" style="color: #108ee9" />,
                                    duration: 0,
                                    style: {
                                    width: '600px',
                                        marginLeft: `${335 - 600}px`,
                                },
                                btn: h => {
                                    return h(
                                        'a-button',
                                        {
                                            class: 'btn',
                                            props: {
                                                type: 'primary',
                                                size: 'small',
                                            },
                                            on: {
                                                click: () => {
                                                    this.$message.success('复制到剪切板成功')
                                                    //模拟点击
                                                    this.$refs.copy.click();
                                                    console.log(this.$refs)
                                                }
                                            },

                                        },
                                        '复制数据到剪切板',
                                    );
                                },
                            });



                            }else{
                                this.$message.error('失败')
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                });
            },
            onCopy(e) {
                console.log('复制成功！');
                console.log(this.copyUrl)
            },
            onError(e) {
                console.log('复制失败！');
            },
        },
    };
</script>

<style scoped>


    /*.tip {*/
    /*    max-width: 800px;*/
    /*}*/

</style>



