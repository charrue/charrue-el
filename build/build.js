const cp = require("child_process");

const compPath = process.argv[2];

const buildComp = (name) => {
  ["./build/build.component.js", "./build/build.style.js"]
    .map((path) => {
      return cp.spawn("node", [path, name]);
    })
    .forEach((c1) => {
      c1.stdout.on("data", function (data) {
        console.log(data.toString());
      });

      c1.stderr.on("data", function (data) {
        console.error(data.toString());
      });
    });
};

buildComp(compPath);
