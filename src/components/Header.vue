<template>
    <div id="header">
        <Popup ref="saveModulePopup" title="Yeni Module Oluştur">
            <div style="display: flex">
                <el-input
                    size="small"
                    @keypress.enter="createModule"
                    type="text"
                    style="margin-right: 25px"
                    v-model="name"
                />
                <el-button size="small" type="primary" @click="createModule"
                    >Kaydet</el-button
                >
            </div>
        </Popup>
        <el-button size="small" type="secondary" @click="saveModule">
            Modül olarak kaydet
        </el-button>
        <el-button size="small" type="primary" @click="save">
            Kaydet
        </el-button>
    </div>
</template>

<script>
import Popup from "./Popup.vue";
export default {
    components: { Popup },
    name: "HeaderComponent",
    data() {
        return {
            name: "",
        };
    },
    methods: {
        closePopup() {
            this.$refs.saveModulePopup.setPassive();
        },
        save() {
            this.$prompt("", "Name", {
                confirmButtonText: "Save",
                cancelButtonText: "Cancel",
                inputPattern: /[^ ]{3,}/,
                inputErrorMessage: "Name must be at least 3 characters",
            }).then(({ value }) => {
                this.$emit("save", value);
            });
        },
        saveModule() {
            this.$refs.saveModulePopup.setActive();
        },
        createModule() {
            this.$emit("createModule", this.name);
        },
    },
};
</script>

<style></style>
