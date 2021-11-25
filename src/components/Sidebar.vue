<template>
    <div id="sidebar">
        <h1>Elemanlar</h1>
        <div class="elements-list">
            <div
                v-for="(element, key) in elements"
                :key="key"
                @click="addElement(element.type)"
            >
                <element-module :element="element" :isDraggable="false" />
            </div>
        </div>
    </div>
</template>

<script>
import elements from "../data/elements";
import ElementModule from "./ElementModule.vue";
export default {
    components: { ElementModule },
    name: "sidebar",
    data() {
        return {
            elements: [],
        };
    },
    mounted() {
        Object.keys(elements).forEach((type) => {
            this.elements.push({
                id: null,
                text: type,
                type: type,
            });
        });
    },
    methods: {
        addElement(type) {
            this.$emit("addElement", type);
        },
    },
};
</script>

<style></style>
