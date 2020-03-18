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
        >
            <a @click="unBinding(record)">解除绑定</a>
        </a-popconfirm>


    </span>
        </a-table>


        <a-drawer
                title="Basic Drawer"
                :placement="placement"
                :closable="false"
                @close="onClose"
                :visible="visible"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
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
                visible: false,
                placement: 'right',
            }
        },
        methods:{
            moreAction(record){
                console.log('更多操作')
                console.log(record);

                this.showDrawer(); //显示更多操作
            },
            unBinding(record){
                console.log('解除绑定')
                console.log(record);
            },
            yes(record){
                //删除
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
            },
            no(record){

            },
            load(){
                this.$axios.post("http://localhost:18887/user/loadAllBindingDevice")
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


        }

    }
</script>

<style scoped>

</style>