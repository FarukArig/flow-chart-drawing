<template>
    <div id="popup" v-if="active">
        <div class="popup-container">
            <div class="head">
                {{ title }}
                <span class="close" @click="active = false">x</span>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "popup",
    props: ["title"],
    data() {
        return {
            active: false,
        };
    },
    methods: {
        setActive() {
            this.active = true;
        },
        setPassive() {
            this.active = false;
        },
    },
};
</script>

<style></style>
