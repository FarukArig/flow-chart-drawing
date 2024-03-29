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
            <svg class="line" width="800" height="500">
                <path
                    v-for="(line, k) in lineSvgs"
                    :key="k"
                    :d="line.d"
                    :stroke="line.stroke"
                    stroke-width="2"
                    stroke-linecap="round"
                    fill="transparent"
                    :stroke-dasharray="line.dasharray"
                ></path>
            </svg>
        </div>
    </div>
</template>

<script>
import ElementModule from "./ElementModule.vue";
import elements from "../data/elements";
import axios from "axios";

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
        setForceRecomputeCounter() {
            this.forceRecomputeCounter++;
        },
        setActive(e) {
            this.$emit("setActive", e);
            this.forceRecomputeCounter++;
        },
        getTypeList(id, list) {
            list.push(this.elements.find((y) => y.id == id).type);
            if (this.lines.find((x) => x.input.elementId == id)) {
                list.concat(
                    this.getTypeList(
                        this.lines.find((x) => x.input.elementId == id).output
                            .elementId,
                        list
                    )
                );
            }
            return list;
        },
        startLine(id, n) {
            var stepList = this.getTypeList(id, []).reverse();
            axios
                .post("/GetRecommend", {
                    stepList,
                })
                .then((res) => {
                    this.$message.info(
                        res.data + " tipi ile bağlantı kurulabilir"
                    );
                });

            this.lineStartElementId = id;
            this.lineStartOutputN = n;
            this.lines = this.lines.filter((x) => {
                if (x.output.elementId == id && x.output.dot == n) {
                    this.elements.find((y) => y.id == x.input.elementId)
                        .input--;
                    this.elements.find((y) => y.id == x.output.elementId)
                        .output--;
                    return false;
                }
                return true;
            });
        },
        drawLine(id, isReal) {
            if (this.lineStartElementId && this.lineStartElementId !== id) {
                this.lines = this.lines.filter((x) => x.isReal);
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
                    if (line.input.elementId == id) {
                        inputCount++;
                    }
                });
                var inputLimit = 0;
                this.elements.forEach((el) => {
                    if (el.id == id) {
                        inputLimit = elements[el.type].input;
                    }
                });
                if (inputCount >= inputLimit) {
                    flag = true;
                }
                if (flag) return;

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
                if (isReal) {
                    this.elements.forEach((el) => {
                        if (el.id === id) {
                            el.input++;
                        }

                        if (el.id === this.lineStartElementId) {
                            el.output++;
                        }
                    });
                    this.lineStartElementId = null;
                }
            }
        },
    },
    mounted() {
        document.addEventListener("click", (e) => {
            if (
                e.target == document.querySelector("#canvas") ||
                e.target == document.querySelector("svg.line")
            ) {
                this.$emit("setPassive");
                this.lineStartElementId = null;
            }
        });
    },
    computed: {
        lineSvgs() {
            this.forceRecomputeCounter;
            const lineSvgs = [];
            if (this.lines.length > 0) {
                const canvas = document
                    .querySelector("#canvas")
                    .getBoundingClientRect();
                this.lines.forEach((line, k) => {
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
                        if (tempLine.input.elementId == line.input.elementId) {
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

                    var x1 = startDot.left - canvas.left + 3;
                    var y1 = startDot.top - canvas.top + 3;
                    var x2 = endDot.left - canvas.left + 3;
                    var y2 = endDot.top - canvas.top + 3;
                    var d = Math.max(x1 - x2, 50);
                    var curve = `M${x1},${y1} C ${x1 + d},${y1} ${
                        x2 - d
                    },${y2} ${x2},${y2}`;
                    lineSvgs.push({
                        d: curve,
                        stroke: line.isReal ? "black" : "red",
                        dasharray: line.isReal ? "0" : "5,5",
                    });
                });
            }
            return lineSvgs;
        },
    },
};
</script>

<style></style>
