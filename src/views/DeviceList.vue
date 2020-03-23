<template>

    <div>
        <p>设备列表</p>

        <a-table :columns="columns" :dataSource="listData">
            <a slot="name" slot-scope="text">{{text}}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
            <span slot="tags" slot-scope="tags">
      <a-tag
              v-for="tag in tags"
              :color="tag==='loser' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')"
              :key="tag"
      >
        {{tag.toUpperCase()}}
      </a-tag>
    </span>
            <span slot="action" slot-scope="text, record">
      <a @click="moreAction(record)">更多操作</a>
      <a-divider type="vertical" />
        <a-popconfirm
                title="确定要解除绑定吗?"
                @confirm="yes(record)"
                @cancel="no(record)"
                okText="确定"
                cancelText="取消"
                v-show="!isAdmin"
        >

            <a @click="unBinding(record)">解除绑定</a>
        </a-popconfirm>

                  <a-popconfirm
                          title="确定要删除该设备吗? [数据不会被清空]"
                          @confirm="yes(record)"
                          @cancel="no(record)"
                          okText="确定"
                          cancelText="取消"
                          v-show="isAdmin"
                  >


            <a  @click="deleteDevice(record)">删除设备</a>
        </a-popconfirm>


    </span>
        </a-table>






        <a-drawer
                class="deviceDrawer"
                title="设备详情"
                :placement="placement"
                :closable="false"
                @close="onClose"
                :visible="visible"
                :width="720"
        >


            <template>
                <a-table :columns="deviceColumns" :dataSource="deviceMessage">
                    <a slot="name" slot-scope="text">{{text}}</a>
                </a-table>
            </template>



            <template>
                <a-form :form="form">
                    <a-form-item
                            label="话题"
                    >
                        <a-input
                                v-decorator="[
          'topic',
          { rules: [{ required: true, message: '请输入话题' }] },
        ]"
                                placeholder="请输入话题"
                        />
                    </a-form-item>
                    <a-form-item
                            label="消息"
                    >
                        <a-input
                                v-decorator="[
          'msg',
        ]"
                                placeholder="请输入消息"
                        />
                    </a-form-item>

                    <a-form-item >
                        <a-button type="primary" @click="check">
                            提交
                        </a-button>
                    </a-form-item>
                </a-form>
            </template>



        </a-drawer>


    </div>


</template>

<script>

    const columns = [
        {
            dataIndex: 'name',
            // title: '名字',
            key: 'name',
            slots: { title: 'customTitle' },
            scopedSlots: { customRender: 'name' },
        },
        {
            title: '类型',
            key: 'type',
            dataIndex: 'type',
            scopedSlots: { customRender: 'type' },
        },
        {
            title: '唯一识别码',
            key: 'uuid',
            dataIndex: 'uuid',
            scopedSlots: { customRender: 'uuid' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },
    ];

    let listData = [

    ];



    const deviceColumns = [
        {
            dataIndex: 'topic',
             title: '话题',
            key: 'topic',
            slots: { title: 'customTitle' },
            scopedSlots: { customRender: 'topic' },
        },
        {
            title: '消息',
            key: 'msg',
            dataIndex: 'msg',
            scopedSlots: { customRender: 'msg' },
        },
        {
            title: '时间',
            key: 'date',
            dataIndex: 'date',
            scopedSlots: { customRender: 'date' },
        },
    ];


    let deviceMessage = [

    ];




    export default {
        name: "DeviceList.vue",
        created() {
            // this.$axios.post("http://localhost:18887/user/loadAllBindingDevice")
            //     .then(res => {
            //         console.log(res);
            //         this.listData = res.data.data
            //     }).catch(err =>{
            //     console.log(err);
            // })
            this.load();
        },
        data(){
            return{
                columns,
                listData,
                deviceColumns,
                deviceMessage,
                visible: false,
                placement: 'right',
                isAdmin: false,
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
                more:{
                    uuid: null,
                    testTopic: null,
                    testMsg: null,
                }

            }
        },
        methods:{
            moreAction(record){
                console.log('更多操作')
                console.log(record);

                this.deviceMessage = []

                this.more.uuid = record.uuid;


                this.loadDeviceMessage(record.uuid)



                this.showDrawer(); //显示更多操作



            },
            unBinding(record){
                console.log('解除绑定')
                console.log(record);
            },
            yes(record){
                //删除
                //根据 用户类型 不同的

                if (this.isAdmin){
                    //删除
                    this.$axios.post("http://localhost:18887/device/deleteDeviceByUuid?uuid="+record.uuid.toString())
                        .then(res => {
                            console.log(res);
                            this.$message.destroy();
                            console.log(res.data.code)
                            if (res.data.code == 20000){
                                this.$message.success('删除成功')
                                console.log('成功')

                                this.load();
                                //重新加载数据
                                // created();
                            }else{
                                this.$message.error('删除失败')
                                console.log('失败')
                            }
                        }).catch(err => {
                        console.log(err)
                        this.$message.destroy();
                        this.$message.error('删除失败')
                        console.log('失败')
                    })
                }else{
                    //解除绑定
                    this.$axios.post("http://localhost:18887/deviceBinding/unbinding?uuid="+record.uuid.toString())
                        .then(res => {
                            console.log(res);
                            this.$message.destroy();
                            console.log(res.data.code)
                            if (res.data.code == 20000){
                                this.$message.success('解除成功')
                                console.log('成功')

                                this.load();
                                //重新加载数据
                                // created();
                            }else{
                                this.$message.error('解除失败')
                                console.log('失败')
                            }
                        }).catch(err => {
                        console.log(err)
                        this.$message.destroy();
                        this.$message.error('解除失败')
                        console.log('失败')
                    })
                }

            },
            no(record){

            },
            load(){
                let url = "";
                if(this.$store.state.user.role.indexOf('admin') != -1){
                    //管理员
                    this.isAdmin = true
                    url ="http://localhost:18887/user/loadAllAdminDevice";
                }else{
                    this.isAdmin = false
                    url = "http://localhost:18887/user/loadAllBindingDevice";
                }
                this.$axios.post(url)
                    .then(res => {
                        console.log(res);
                        this.listData = res.data.data
                    }).catch(err =>{
                    console.log(err);
                })
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            deleteDevice(record){
              //删除设备
            },
            check() {
                this.form.validateFields((err,values) => {
                    if (!err) {
                        console.info('success');
                        console.log(values)
                        this.$axios.post('http://localhost:18887/device/userTestUpload?uuid='+this.more.uuid+"&topic="+values.topic+"&msg="+values.msg)
                        .then(res =>{
                            console.log(res);

                            this.loadDeviceMessage(this.more.uuid)


                        }).catch(err =>{
                            console.log(err);
                        })
                    }
                });
            },
            loadDeviceMessage(uuid){
                this.$axios.post("http://localhost:18887/device/getDeviceMessage?uuid="+uuid.toString())
                    .then(res => {
                        console.log(res);

                        if (res.data.code == 20000){


                            console.log('设备数据：')

                            this.deviceMessage = res.data.data;
                            console.log(this.deviceMessage)

                        }else{
                            this.$message.error('读取设备数据出错：'+res.data.data);
                        }

                    }).catch(err =>{
                    console.log(err);
                })
            }


        }

    }
</script>

<style scoped>



    .deviceDrawer{
        width: 800px;
    }

</style>