<template>

    <div class="login-form-wrapper">
        <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入你的用户名!' }] },
        ]"
                        placeholder="用户名"
                >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入你的密码!' }] },
        ]"
                        type="password"
                        placeholder="密码"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-checkbox
                        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
                >
                    记住我
                </a-checkbox>
                <a class="login-form-forgot" href="">
                    <router-link to="forget">忘记密码</router-link>
                </a>
                <a-button type="primary" html-type="submit" class="login-form-button">
                    登陆
                </a-button>
                或者
                <a href="">
                    <router-link to="/register">
                        注册
                    </router-link>
                </a>
            </a-form-item>
        </a-form>

    </div>

</template>

<script>
    export default {
        name: "Login.vue",
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);

                        console.log(values.userName)

                        let formData = new FormData();
                        formData.append("username", values.userName);
                        formData.append("password", values.password);

                        this.$message.destroy();
                        const logining_ = this.$message.loading('正在登陆...');

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }

                        // logining_;
                        //发起http 请求
                        this.$axios.post('http://localhost:18884/user/login', formData)
                        .then( response => {
                            console.log(response);
                            this.$message.destroy();//销毁之前的
                            if (response.data.code === 20000){
                                this.$message.success('成功');

                                this.$router.push('/'); //登陆成功后跳转到首页

                                if (values.remember == false) {
                                    this.$store.commit('setToken', response.data.data.accessToken)
                                }else{
                                    this.$store.commit('setTokenRemember', response.data.data.accessToken)
                                }


                                console.log(this.$store.state.user.token)


                                //获取用户的权限
                                this.$axios.post('http://localhost:18883/getRole')
                                .then(res => {
                                    console.log(res);

                                    if (res.data.code == 20000){
                                        //成功

                                        if (values.remember == false) {
                                            this.$store.commit("setRole", res.data.data);
                                        }else{
                                            this.$store.commit("setRoleRemember", res.data.data);
                                        }
                                    }
                                }).catch(err => {
                                    console.log(err);
                                })



                            }else{
                                this.$message.error('失败:'+response.data.data);
                            }

                        }).catch(error => {
                            console.log(error);
                            this.$message.destroy();//销毁之前的
                            this.$message.error('失败:'+error);
                        })


                    }
                });
            },
        },
    }
</script>

<style scoped>

    .login-form-wrapper {
        width: 300px;
        height: 400px;
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

    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }

    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }

    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>