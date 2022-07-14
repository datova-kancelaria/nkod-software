import storedQueries from "./sparql-queries.yaml"

let yasgui;

(function initialize() {
  createYasgui();
  buildQueryList('en');
})();

function createYasgui() {
  // https://triply.cc/docs/yasgui-api
  yasgui = new Yasgui(document.getElementById("yasgui"), {
    "requestConfig": { 
      "endpoint": "./api/sparql" 
    },
    "copyEndpointOnNewTab": false,
  });
}

function buildQueryList(language) {
  const container = document.getElementById("queries");
  for (const item of storedQueries.content) {
    const name = document.createElement("div");
    name.classList.add("name");
    name.innerText = item.name[language];
    name.addEventListener("click", () => setQueryToActiveTab(item.query));

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText = item.description[language];

    const li = document.createElement("li");
    li.appendChild(name);
    li.appendChild(description);
    container.appendChild(li);
  }
}

function setQueryToActiveTab(query) {
  const tab = yasgui.getTab();
  if (tab) {
    tab.yasqe.setValue(query);
  }
}
