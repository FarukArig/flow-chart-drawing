<template>
    <div id="toolbar">
        <h1>Toolbar</h1>
        <div class="label">
            <span class="text">Text</span>
            <el-input size="small" v-model="text" type="text" />
        </div>
        <div v-if="getElementType">
            <div class="label" v-for="(attribute, k) in attributes" :key="k">
                <span class="text">{{ attribute.labelName }}</span>
                <el-select
                    v-if="attribute.type == 'selectbox'"
                    size="small"
                    v-model="attribute.value"
                >
                    <el-option
                        v-for="(option, k) in attribute.options"
                        :key="k"
                        :value="option.value"
                        :label="option.text"
                    ></el-option>
                </el-select>
                <el-checkbox
                    v-if="attribute.type == 'checkbox'"
                    v-model="attribute.value"
                    >{{ attribute.text }}</el-checkbox
                >
                <el-input
                    v-if="attribute.type == 'text'"
                    :placeholder="attribute.placeholder"
                    v-model="attribute.value"
                />
                <el-radio-group
                    v-if="attribute.type == 'radio'"
                    size="small"
                    v-model="attribute.value"
                >
                    <el-radio
                        v-for="(option, k) in attribute.options"
                        :key="k"
                        :label="option.value"
                        >{{ option.text }}</el-radio
                    >
                </el-radio-group>
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
            attributes: [],
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
            this.attributes = [];
            this.attributesDebounce = true;
            this.getElementType.attributes.forEach((attr) => {
                var check = this.getElement.attributes.find(
                    (x) => x.key == attr.key
                );
                this.attributes.push({
                    ...attr,
                    value: check ? check.value : null,
                });
            });
        },
        attributes: {
            handler: function (newVal) {
                if (!this.attributesDebounce) {
                    this.elements.forEach((el) => {
                        if (el.id == this.activeItemId) {
                            el.attributes = newVal;
                        }
                    });
                } else {
                    this.attributesDebounce = false;
                }
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
