import { initAll } from '@id-sk/frontend/idsk/all';

import storedQueries from "./sparql-queries.yaml"

let yasgui;

(function initialize() {
  const language = activeLanguage();
  createYasgui();
  buildQueryList(language);
  initLanguageMenu(language);
  initIdSk();
})();

function activeLanguage() {
  return document.documentElement.lang;
}

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

function initLanguageMenu(language) {
  const elements = document.getElementsByClassName(
    "idsk-header-web__brand-language-list-item-link");
  // This language is served from root.
  const defaultLanguage = "sk";
  for (const element of elements) {
    const elementLanguage = element.dataset.lang;
    console.log(elementLanguage, language);
    if (elementLanguage === language) {
      // Active language just add a class.
      element.classList.add("idsk-header-web__brand-language-list-item-link--selected");
      element.setAttribute("href", "");
    } else {
      if (elementLanguage === defaultLanguage) {
        // Default language is in the root.
        element.setAttribute("href", "../");
      } else {
        let prefix = "";
        if (language == defaultLanguage) {
          // We are in the root, so no prefix is needed.
          // Ie. we navigate to en/
        } else {
          // We need to navigate to ../en/ as we are in the /de/ or similar.
          prefix = "../";
        }
        element.setAttribute("href", prefix + elementLanguage + "/");
      }
    }
  }
}

function initIdSk() {
  initAll();
}
