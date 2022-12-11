<template>
    <div>
        <h1>这里是角色管理</h1>
    </div>
</template>

<script>
    import {getRoles,editRole,deleteRole} from "../../../api/admin/user/userConsole";

    export default {
        name: "roles",
        data(){
            return{

            }
        },
        methods:{

        },
        created() {
            getRoles().then(res=>{
                console.log("角色信息"+res.data);
            })
        }
    }
</script>

<style scoped>

</style>
