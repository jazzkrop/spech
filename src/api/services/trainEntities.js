const fs = require("fs");

const actionsExtendedContent = fs.readFileSync(
  "./src/api/entities/actionsExtended.json"
);
const elementsExtendedContent = fs.readFileSync(
  "./src/api/entities/elementsExtended.json"
);

const actions = JSON.parse(actionsExtendedContent);
const elements = JSON.parse(elementsExtendedContent);

const entities = {};

// TODO refactor this code
actions.forEach((action) => {
  entities[action.origin] = "action";
  action.synonyms &&
    action.synonyms.forEach((synonym) => {
      entities[synonym] = "action";
    });
});

elements.forEach((element) => {
  entities[element.origin] = "element";
  element.synonyms &&
    element.synonyms.forEach((synonym) => {
      entities[synonym] = "element";
    });
});

fs.writeFileSync(
  "./src/api/trainedModels/entities.nlp",
  JSON.stringify(entities)
);
