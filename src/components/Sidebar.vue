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
        <h1>Modüller</h1>
        <div class="elements-list">
            <div
                v-for="(element, key) in modules"
                :key="key"
                @click="addModule(element.id)"
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
    props: ["modules"],
    name: "sidebar",
    data() {
        return {
            elements: [],
        };
    },
    mounted() {
        Object.keys(elements).forEach((type) => {
            if (type != "module") {
                this.elements.push({
                    id: null,
                    text: type,
                    type: type,
                });
            }
        });
    },
    methods: {
        addElement(type) {
            this.$emit("addElement", type);
        },
        addModule(id) {
            this.$emit("addModule", id);
        },
    },
};
</script>

<style></style>
