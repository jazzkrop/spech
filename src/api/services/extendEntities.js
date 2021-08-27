const synonyms = require("synonyms");
const fs = require("fs");

// TODO refactor this code and divide entities and extended entities (use different folders)
const actionsContent = fs.readFileSync("./src/api/entities/actions.json");
const elementsContent = fs.readFileSync("./src/api/entities/elements.json");

const actions = Object.keys(JSON.parse(actionsContent));
const elements = Object.keys(JSON.parse(elementsContent));

const actionsExtended = [];
const elementsExtended = [];

// Extending entities (or atoms, smallest building blocks) with synonyms
// TODO try to find better lib for synonyms
actions.forEach((action) => {
  const synonymsArr = synonyms(action, "v");
  actionsExtended.push({
    origin: action,
    synonyms: synonymsArr,
  });
});

elements.forEach((element) => {
  const synonymsArr = synonyms(element, "n");
  elementsExtended.push({
    origin: element,
    synonyms: synonymsArr,
  });
});

fs.writeFileSync(
  "./src/api/entities/actionsExtended.json",
  JSON.stringify(actionsExtended)
);
fs.writeFileSync(
  "./src/api/entities/elementsExtended.json",
  JSON.stringify(elementsExtended)
);
