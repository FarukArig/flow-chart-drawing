<template>
    <div :id="'element-wrap-' + element.id" :style="getStyle">
        <div id="element" :style="getElementStyle" @click="setActive">
            {{ $props.element.text }}
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import elements from "../data/elements";
require("jquery-ui/ui/widgets/draggable");

export default {
    name: "element-module",
    props: ["element", "isDraggable", "activeItemId"],
    components: {},
    data() {
        return {};
    },
    methods: {
        setActive() {
            this.$emit("setActive", this.element.id);
        },
    },
    mounted() {
        if (this.isDraggable) {
            $("#canvas #element-wrap-" + this.element.id).draggable({
                containment: "#canvas",
            });
        }
    },
    computed: {
        getStyle() {
            return {
                width: "fit-content",
                border:
                    this.isDraggable && this.element.id == this.activeItemId
                        ? "1px dashed #06a8ff"
                        : "1px solid transparent",
            };
        },
        getElementStyle() {
            return {
                ...elements[this.element.type].style,
            };
        },
        item() {
            return this.element;
        },
    },
};
</script>

<style lang="less">
#element {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    user-select: none;
    width: 100%;
    height: 100%;
    padding: 20px;
}
.ui-resizable {
    position: relative;
}
.ui-resizable-handle {
    position: absolute;
    font-size: 0.1px;
    display: block;
    -ms-touch-action: none;
    touch-action: none;
}
.ui-resizable-disabled .ui-resizable-handle,
.ui-resizable-autohide .ui-resizable-handle {
    display: none;
}
.ui-resizable-n {
    cursor: n-resize;
    height: 7px;
    width: 100%;
    top: -5px;
    left: 0;
}
.ui-resizable-s {
    cursor: s-resize;
    height: 7px;
    width: 100%;
    bottom: -5px;
    left: 0;
}
.ui-resizable-e {
    cursor: e-resize;
    width: 7px;
    right: -5px;
    top: 0;
    height: 100%;
}
.ui-resizable-w {
    cursor: w-resize;
    width: 7px;
    left: -5px;
    top: 0;
    height: 100%;
}
.ui-resizable-se {
    cursor: se-resize;
    width: 12px;
    height: 12px;
    right: 1px;
    bottom: 1px;
}
.ui-resizable-sw {
    cursor: sw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    bottom: -5px;
}
.ui-resizable-nw {
    cursor: nw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    top: -5px;
}
.ui-resizable-ne {
    cursor: ne-resize;
    width: 9px;
    height: 9px;
    right: -5px;
    top: -5px;
}
</style>
