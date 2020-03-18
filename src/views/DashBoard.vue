<template>
    <div>
        <a-layout id="components-layout-demo-responsive">
            <a-layout-sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    @collapse="onCollapse"
                    @breakpoint="onBreakpoint"
            >
                <div class="logo" />
                <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['4']" :selectedKeys="selectedKeys" >


                    <a-menu-item key="1" @click="select(1)">
                        <a-icon type="user" />
                        <span class="nav-text">用户信息</span>
                    </a-menu-item>
                    <a-menu-item key="2" @click="select(2)">
                        <a-icon type="video-camera" />
                        <span class="nav-text">设备绑定</span>
                    </a-menu-item>
                    <a-menu-item key="3" @click="select(3)">
                        <a-icon type="upload" />
                        <span class="nav-text">设备列表</span>
                    </a-menu-item>
                    <a-menu-item key="4" @click="select(4)">
                        <a-icon type="user" />
                        <span class="nav-text">设备监控</span>
                    </a-menu-item>
                    <a-menu-item v-if="this.$store.state.user.role.indexOf('admin') != -1 " key="5" @click="select(5)">
                        <a-icon type="plus-circle" />
                        <span class="nav-text">创建设备</span>
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header :style="{ background: '#fff', padding: 0 }" />
                <a-layout-content :style="{ margin: '24px 16px 0' }">
                    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                        <User v-if="curKey == 1"></User>
                        <DeviceBinding v-if="curKey == 2"></DeviceBinding>
                        <DeviceList v-if="curKey == 3"></DeviceList>
                        <DeviceDashBoard v-if="curKey == 4"></DeviceDashBoard>
                        <DeviceAdd v-if="curKey == 5"></DeviceAdd>
                    </div>
                </a-layout-content>
                <a-layout-footer style="textAlign: center">
                    lsx-web-device @ 2020
                </a-layout-footer>
            </a-layout>
        </a-layout>

    </div>

</template>

<script>

    import User from '@/views/User.vue';
    import DeviceBinding from "@/views/DeviceBinding";
    import DeviceList from "@/views/DeviceList";
    import DeviceDashBoard from "@/views/DeviceDashBoard";
    import DeviceAdd from "@/views/DeviceAdd";

    export default {
        // components:{
        //     UserXX,
        //     DeviceBinding,
        //     DeviceList,
        //     DeviceDashBoard
        // },
        name: "DashBoard.vue",
        components: {DeviceDashBoard, DeviceList, DeviceBinding, User, DeviceAdd},
        data() {
            return {
                selectedKeys: ['1'],
                curKey: 1,
            };
        },
        methods: {
            onCollapse(collapsed, type) {
                console.log(collapsed, type);
            },
            onBreakpoint(broken) {
                console.log(broken);
            },
            select(key){
                console.log(key)
                this.curKey = key;
                this.selectedKeys = [key.toString()];
                // switch (key) {
                //     case 1:
                //         this.selectedKeys = ['1'];
                //         break;
                //     case 2:
                //         selectedKeys = ['2'];
                //         break;
                //     case 3:
                //         selectedKeys = ['3'];
                //         break;
                //     case 4:
                //         selectedKeys = ['4'];
                //         break;
                // }
            }
        },
        created() {
            console.log('created')
            console.log(this.$store.state.user.token)
        },
    }
</script>

<style scoped>
    #components-layout-demo-responsive .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
</style>