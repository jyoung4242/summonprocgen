import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Assets } from "@peasy-lib/peasy-assets";
import { Input } from "@peasy-lib/peasy-input";
import { difficulties, NewLevel } from "./newlevel";

const model = {};
const template = `<div> Hello Peasy!!! </div>`;
UI.create(document.body, model, template);

//pick easy, medium, or hard

console.log("**************************************");
console.log("Easy Level");
console.log("**************************************");

console.log(NewLevel.generate({ difficulty: difficulties.easy }));

console.log("**************************************");
console.log("Medium Level");
console.log("**************************************");

console.log(NewLevel.generate({ difficulty: difficulties.medium }));

console.log("**************************************");
console.log("hard Level");
console.log("**************************************");

console.log(NewLevel.generate({ difficulty: difficulties.hard }));

console.log("**************************************");
console.log("custom Level 3x5");
console.log("**************************************");

console.log(NewLevel.generate({ difficulty: difficulties.hard, height: 3, width: 5 }));
