export default {
    startEnd: {
        style: {
            minWidth: "200px",
            minHeight: "50px",
            borderRadius: "9999px",
            background: "#000",
            color: "#fff",
        },
        input: 0,
        output: 3,
    },
    process: {
        style: {
            minWidth: "200px",
            minHeight: "50px",
            background: "#000",
            color: "#fff",
        },
        input: 1,
        output: 3,
    },
    decision: {
        style: {
            minWidth: "100px",
            minHeight: "100px",
            color: "#fff",
            background:
                "no-repeat url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M2,50 50,2 98,50 50,98z'/><path d='M8,50 50,8 92,50 50,92z'/></svg>\")",
        },
        extraResizableOption: {
            aspectRatio: 1,
        },
        input: 2,
        output: 2,
    },
    delay: {
        style: {
            minWidth: "200px",
            minHeight: "50px",
            borderRadius: "0 9999px 9999px 0",
            background: "#000",
            color: "#fff",
        },
        input: 2,
        output: 1,
    },
    data: {
        style: {
            minWidth: "220px",
            minHeight: "50px",
            color: "#fff",
            background:
                "no-repeat url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 500'><rect x='190' y='0' width='90%' height='100%'  transform='skewX(-20)' /></svg>\")",
        },
        extraResizableOption: {
            aspectRatio: 20 / 5,
        },
        input: 1,
        output: 1,
    },
    module: {
        style: {
            minWidth: "200px",
            minHeight: "50px",
            borderRadius: "50px 0 50px",
            background: "#000",
            color: "#fff",
        },
    },
};
