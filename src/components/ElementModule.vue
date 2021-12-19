<template>
    <div
        @mouseover="drawLine(false)"
        :id="'element-wrap-' + element.id"
        :style="getStyle"
    >
        <div class="inputs" :style="{ opacity: isActive ? 1 : 0 }">
            <div
                class="input-dot"
                v-for="n in element.inputLimit"
                :key="n"
            ></div>
        </div>
        <div id="element" :style="getElementType.style" @click="click">
            {{ $props.element.text }}
        </div>
        <div class="outputs" :style="{ opacity: isActive ? 1 : 0 }">
            <div
                @click="startLine(n)"
                class="output-dot"
                v-for="n in element.outputLimit"
                :key="n"
            ></div>
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
        click() {
            this.$emit("setActive", this.element.id);
            this.drawLine(true);
        },
        startLine(n) {
            this.$emit("startLine", this.element.id, n);
        },
        drawLine(isReal) {
            this.$emit("drawLine", this.element.id, isReal);
        },
    },
    mounted() {
        if (this.isDraggable) {
            $("#canvas #element-wrap-" + this.element.id).draggable({
                containment: "#canvas",
                drag: () => {
                    this.$emit("forceRecomputeCounter");
                },
                stop: (e, a) => {
                    this.element.y = a.position.top;
                    this.element.x = a.position.left;
                },
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
                top: this.element.y,
                left: this.element.x,
            };
        },
        getElementType() {
            return elements[this.element.type];
        },
        item() {
            return this.element;
        },
        isActive() {
            return this.element.id === this.activeItemId;
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
.inputs {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .input-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #06a8ff;
        cursor: pointer;
    }
}
.outputs {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .output-dot {
        width: 7px;
        height: 7px;
        background: #06a8ff;
        cursor: pointer;
    }
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
    width: 10%;
    bottom: -5px;
    right: 0;
}
.ui-resizable-e {
    cursor: e-resize;
    width: 7px;
    right: -5px;
    bottom: 0;
    height: 30%;
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
