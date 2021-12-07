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
                    :stroke="line.stroke"
                />
            </svg>
        </div>
    </div>
</template>

<script>
import ElementModule from "./ElementModule.vue";
import elements from "../data/elements";

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
        setForceRecomputeCounter(){
            this.forceRecomputeCounter++;
        },
        setActive(e) {
            this.$emit("setActive", e);
            this.forceRecomputeCounter++;
        },
        startLine(id, n) {
            this.lineStartElementId = id;
            this.lineStartOutputN = n;
            this.lines = this.lines.filter(x => !(x.output.elementId == id && x.output.dot == n));
        },
        drawLine(id, isReal) {
            if (this.lineStartElementId && this.lineStartElementId !== id) {
                this.lines = this.lines.filter(x => x.isReal);
                var flag = false;
                var inputCount = 0;
                this.lines.forEach((line) => {
                    if (
                        line.output.elementId == this.lineStartElementId &&
                        line.input.elementId == id
                    ) {
                        flag = true;
                        return;
                    }
                    if(line.input.elementId == id){
                        inputCount++;
                    }
                });
                var inputLimit = 0;
                this.elements.forEach(el => {
                    if(el.id == id){
                        inputLimit = elements[el.type].input;
                    }
                });
                if(inputCount >= inputLimit ){
                    flag = true;
                }
                if(flag)
                    return;

                this.lines.push({
                    isReal: isReal,
                    output: {
                        elementId: this.lineStartElementId,
                        dot: this.lineStartOutputN,
                    },
                    input: {
                        elementId: id,
                    },
                });
                if(isReal){
                    this.lineStartElementId = null;
                }
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
                this.lines.forEach((line,k) => {
                    const startDot = document
                        .querySelector(
                            "#canvas #element-wrap-" +
                                line.output.elementId +
                                " .outputs .output-dot:nth-child(" +
                                line.output.dot +
                                ")"
                        )
                        .getBoundingClientRect();
                    let n = 1;
                    for (let i = 0; i < k; i++) {
                        const tempLine = this.lines[i];
                        if(tempLine.input.elementId == line.input.elementId){
                            n++;
                        }
                    }
                    const endDot = document
                        .querySelector(
                            "#canvas #element-wrap-" +
                                line.input.elementId +
                                " .inputs .input-dot:nth-child(" +
                                n +
                                ")"
                        )
                        .getBoundingClientRect();
                    lineSvgs.push({
                        x1: startDot.left - canvas.left + 3,
                        y1: startDot.top - canvas.top + 3,
                        x2: endDot.left - canvas.left + 3,
                        y2: endDot.top - canvas.top + 3,
                        stroke: line.isReal ? "black": "red"
                    });
                });
            }
            return lineSvgs;
        },
    },
};
</script>

<style></style>
