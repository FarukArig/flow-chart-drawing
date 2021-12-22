<template>
    <div id="header">
        <Popup ref="saveModulePopup" title="Yeni Module Oluştur">
            <div style="display: flex">
                <input
                    @keypress.enter="createModule"
                    type="text"
                    style="margin-right: 25px"
                    v-model="name"
                />
                <button @click="createModule" class="btn-green">Kaydet</button>
            </div>
        </Popup>
        <button class="btn-green" @click="saveModule">
            Modül olarak kaydet
        </button>
    </div>
</template>

<script>
import Popup from "./Popup.vue";
export default {
    components: { Popup },
    name: "header",
    data() {
        return {
            name: "",
        };
    },
    methods: {
        closePopup() {
            this.$refs.saveModulePopup.setPassive();
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
