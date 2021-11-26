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
                @drawLine="drawLine"
                @startLine="startLine"
                @forceRecomputeCounter="forceRecomputeCounter++"
            />
            <svg
                class="line"
                width="800"
                height="500"
                v-for="(line, k) in lineSvgs"
                :key="k"
            >
                <line
                    :x1="line.x1"
                    :y1="line.y1"
                    :x2="line.x2"
                    :y2="line.y2"
                    stroke="red"
                />
            </svg>
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
        return {
            lineStartElementId: null,
            lineStartOutputN: null,
            lines: [],
            forceRecomputeCounter: 0,
        };
    },
    methods: {
        setActive(e) {
            this.$emit("setActive", e);
            this.lineStartElementId = null;
            this.forceRecomputeCounter++;
        },
        startLine(id, n) {
            this.lineStartElementId = id;
            this.lineStartOutputN = n;
        },
        drawLine(id) {
            if (this.lineStartElementId && this.lineStartElementId !== id) {
                this.lines.forEach((line) => {
                    if (
                        line.output.elementId == this.lineStartElementId &&
                        line.input.elementId == id
                    ) {
                        return;
                    }
                });
                console.log("create line");
                this.lines.push({
                    output: {
                        elementId: this.lineStartElementId,
                        dot: this.lineStartOutputN,
                    },
                    input: {
                        elementId: id,
                    },
                });
                this.lineStartElementId = null;
            }
        },
    },
    computed: {
        lineSvgs() {
            this.forceRecomputeCounter;
            const lineSvgs = [];
            if (this.lines.length > 0) {
                const canvas = document
                    .querySelector("#canvas")
                    .getBoundingClientRect();
                this.lines.forEach((line) => {
                    const startDot = document
                        .querySelector(
                            "#canvas #element-wrap-" +
                                line.output.elementId +
                                " .outputs .output-dot:nth-child(" +
                                line.output.dot +
                                ")"
                        )
                        .getBoundingClientRect();
                    const endDot = document
                        .querySelector(
                            "#canvas #element-wrap-" +
                                line.input.elementId +
                                " .inputs .input-dot"
                        )
                        .getBoundingClientRect();
                    lineSvgs.push({
                        x1: startDot.left - canvas.left + 3,
                        y1: startDot.top - canvas.top + 3,
                        x2: endDot.left - canvas.left + 3,
                        y2: endDot.top - canvas.top + 3,
                    });
                });
            }
            return lineSvgs;
        },
    },
};
</script>

<style></style>
