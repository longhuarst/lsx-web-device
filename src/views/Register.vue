<template>

    <div class="register-form">
        <a-form :form="form" @submit="handleSubmit">



            <a-form-item v-bind="formItemLayout" label="用户名">
                <a-input
                        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入你的用户名!' }] },
          ,
              {
                validator: validUsername,
              },
        ]"
                        placeholder="用户名"
                >
                </a-input>
            </a-form-item>





            <a-form-item v-bind="formItemLayout" label="E-mail">
                <a-input ref="email" v-model="emailInputValue"
                        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '请输入正确的邮箱!',
              },
              {
                required: true,
                message: '邮箱不能为空!',
              },
            ],
          },
        ]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="密码">
                <a-input
                        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
                        type="password"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="确认密码">
                <a-input
                        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请输入确认密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
                        type="password"
                        @blur="handleConfirmBlur"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
      <span slot="label">
        姓名&nbsp;
        <a-tooltip title="真实姓名，我们会保密，尽量真实以便管理和更好的服务?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
                <a-input
                        v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
          },
        ]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="地址">
                <a-input
                        v-decorator="[
          'address',
          {
            rules: [
              {required: true, message: '请输入地址' },
            ],
          },
        ]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="手机号">
                <a-input
                        v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入手机号!' }],
          },
        ]"
                        style="width: 100%"
                >
                    <a-select
                            slot="addonBefore"
                            v-decorator="['prefix', { initialValue: '86' }]"
                            style="width: 70px"
                    >
                        <a-select-option value="86">
                            +86
                        </a-select-option>
                        <a-select-option value="87">
                            +87
                        </a-select-option>
                    </a-select>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="QQ">
                <a-input
                        v-decorator="[
          'qq',
          {
            rules: [
              {required: true, message: '请输入qq' },
            ],
          },
        ]"
                />
            </a-form-item>

            <a-form-item v-bind="formItemLayout" label="微信">
                <a-input
                        v-decorator="[
          'wx',
          {
            rules: [
              {required: true, message: '请输入微信' },
            ],
          },
        ]"
                />
            </a-form-item>

            <a-form-item
                    v-bind="formItemLayout"
                    label="邮箱验证"
                    extra="必须完成邮箱验证才能注册！"
            >
                <a-row :gutter="8">
                    <a-col :span="12">
                        <a-input
                                v-decorator="[
              'code',
              { rules: [{ required: true, message: '请输入邮箱验证码!' }] },
            ]"
                        />
                    </a-col>
                    <a-col :span="12">
                        <a-button @click="validCode()" :disabled="validDisable">
                            <div v-if="this.countDown > 59">获取验证码</div>
                            <div v-else>{{this.countDown}}s</div>
                        </a-button>
                    </a-col>
                </a-row>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
                <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
                    我同意
                    <a href="">
                        条款
                    </a>
                </a-checkbox>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
                <a-button type="primary" html-type="submit">
                    注册
                </a-button>
            </a-form-item>
        </a-form>



    </div>
</template>

<script>


    export default {
        name: "Register.vue",
        data() {
            return {
                confirmDirty: false,
                autoCompleteResult: [],
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 8 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                    },
                },
                tailFormItemLayout: {
                    wrapperCol: {
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    },
                },
                countDown: 60,//发送验证码 倒计时
                validDisable: false,//不允许发送验证码
                emailInputValue: '',
                validCodeServer: '88888888',//验证码

            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'register' });
        },
        methods: {
            handleSubmit(e) {

                // if (validCodeServer != validCodeInput){
                //
                //     this.$message.error('邮箱验证码不正确');
                //     console.log('邮箱验证码不正确')
                //     return;
                // }

                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        console.log(this.validCodeServer)
                        // console.log(this.validCodeInput)

                        if (this.validCodeServer != values.code){
                            this.$message.error('邮箱验证码不正确');
                            console.log('邮箱验证码不正确')
                        }else{

                            let data_ = new FormData();

                            data_.append("username", values.userName);
                            data_.append("password", values.password);
                            data_.append("email", values.email);
                            data_.append("validCode", values.code);
                            data_.append("address", values.address);

                            data_.append("nickName", values.nickname);
                            data_.append("phone", values.phone);
                            data_.append("qq", values.qq);
                            data_.append("wx", values.wx);




                            this.$axios.post('http://localhost:18883/openapi/register', data_)
                            .then(res => {
                                console.log(res);
                                this.$message.destroy();
                                if(res.data.code == 20000){
                                    this.$message.success('注册成功');
                                    this.$router.push('/login');
                                }else{
                                    this.$message.error('失败：'+res.data.data);
                                }
                            }).catch(err => {
                                console.log(err);
                            })


                        }

                    }
                });



            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            compareToFirstPassword(rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue('password')) {
                    callback('Two passwords that you enter is inconsistent!');
                } else {
                    callback();
                }
            },
            validateToNextPassword(rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(['confirm'], {force: true});
                }
                callback();
            },
            validCode(){
                console.log('发送验证码')

                // this.form.

                this.countDown = 60;

                setTimeout(this.countDownFun, 1000);

                this.validDisable = true;

                console.log('邮箱：'+this.emailInputValue);



                this.$axios.post("http://localhost:18883/openapi/validCode/getByEmail?email="+this.emailInputValue)
                .then(res => {
                    console.log(res);

                    if (res.data.code == 20000){
                        this.$message.success('验证码已经发送至您邮箱，注意查收！')
                        this.validCodeServer = res.data.data;
                        console.log(this.validCodeServer);
                    }else{
                        this.$message.error('出错啦：'+res.data.data);
                    }
                }).catch(err => {
                    console.log(err);
                })



            },
            countDownFun(){
                console.log('计数器')
                this.countDown --;
                if (this.countDown == 0){
                    this.countDown = 60;
                    this.validDisable = false;
                }else{
                    setTimeout(this.countDownFun, 1000);
                }
            },
            validUsername(rule, value, callback){
                //验证用户名
                console.log('validUsername()');

            }

        },
        hello: 1,
    }
</script>


<style scoped>

    .register-form {
        width: 400px;

        /*水平居中*/
        margin: auto;
        padding-top: 30px;
        padding-bottom: 30px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>