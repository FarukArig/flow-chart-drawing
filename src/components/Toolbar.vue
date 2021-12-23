<template>
    <div id="toolbar">
        <h1>Toolbar</h1>
        <div class="label">
            <span class="text">Text</span>
            <el-input size="small" v-model="text" type="text" />
        </div>
        <div v-if="getElementType">
            <div
                class="label"
                v-for="(attribute, k) in getElementType.attributes"
                :key="k"
            >
                <span class="text">{{ attribute.labelName }}</span>
                <el-select size="small" v-model="attributes[attribute.key]">
                    <el-option
                        v-for="(option, k) in attribute.options"
                        :key="k"
                        :value="option.value"
                        >{{ option.text }}</el-option
                    >
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
import elements from "../data/elements";
export default {
    name: "toolbar",
    props: ["elements", "activeItemId"],
    data() {
        return {
            text: null,
            attributes: {},
            attributesDebounce: false,
        };
    },
    watch: {
        text: function (n) {
            this.elements.forEach((el) => {
                if (el.id == this.activeItemId) {
                    el.text = n;
                }
            });
        },
        activeItemId: function () {
            if (this.activeItemId === null) return;
            this.text = this.getElement.text;
            this.attributes = {};
            this.attributesDebounce = true;
            this.getElementType.attributes.forEach((attribute) => {
                this.attributes[attribute.key] = "";
            });
        },
        attributes: {
            handler(newVal) {
                console.log(newVal);
            },
            deep: true,
        },
    },
    computed: {
        getElement() {
            if (this.activeItemId !== null) {
                return this.elements.find((el) => el.id == this.activeItemId);
            }
            return null;
        },
        getElementType() {
            if (this.getElement) {
                return elements[this.getElement.type];
            }
            return null;
        },
    },
};
</script>

<style></style>
