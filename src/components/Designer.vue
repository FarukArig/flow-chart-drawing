<template>
    <div id="designer">
        <div id="canvas">
            <element-module
                v-for="(element, key) in elements"
                :key="key"
                :element="element"
                :isDraggable="true"
                :activeItemId="activeItemId"
                @setActive="setActive"
            />
        </div>
    </div>
</template>

<script>
import ElementModule from "./ElementModule.vue";

export default {
    name: "designer",
    props: ["elements", "activeItemId"],
    components: {
        ElementModule,
    },
    data() {
        return {};
    },
    methods: {
        setActive(e) {
            this.$emit("setActive", e);
        },
    },
};
</script>

<style></style>
