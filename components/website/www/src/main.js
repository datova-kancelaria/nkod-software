import { initAll } from '@id-sk/frontend/idsk/all';

import storedQueries from "./sparql-queries.yaml"

let yasgui = null;

// This language is served from root.
const defaultLanguage = "sk";

const defaultSparqlQuery = `PREFIX dcat: <http://www.w3.org/ns/dcat#>
SELECT (COUNT (*) AS ?count)
WHERE {
  ?dataset a dcat:Dataset
}
`;

(function initialize() {
  const language = activeLanguage();
  console.log("initialize:", {language, "api": getApiUrl()});
  createYasgui(language);
  buildQueryList(language);
  initializeLanguageMenu(language);
  initializeIdSk();
})();

function getApiUrl() {
  return process.env.API_URL;
}

function activeLanguage() {
  return document.documentElement.lang;
}

function createYasgui(language) {
  // https://triply.cc/docs/yasgui-api
  yasgui = new Yasgui(document.getElementById("yasgui"), {
    "requestConfig": {
      "endpoint": () => resolveRelativeUrl("api/sparql"),
      "method": "GET"
    },
    "yasqe": {
      "value": defaultSparqlQuery,
    },
    "copyEndpointOnNewTab": false,
  });
  console.log(yasgui);
}

function resolveRelativeUrl(relativeUrl) {
  const apiUrl = getApiUrl();
  if (apiUrl !== undefined) {
    return apiUrl + relativeUrl;
  }
  if (defaultLanguage === activeLanguage()) {
    // The default language is located in the root.
    return "./" + relativeUrl;
  } else {
    // We are in language directory (eg. /en/) so we need to navigate
    // up one folder.
    return "../" + relativeUrl;
  }
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

function initializeLanguageMenu(language) {
  const elements = document.getElementsByClassName(
    "idsk-header-web__brand-language-list-item-link");
  for (const element of elements) {
    const elementLanguage = element.dataset.lang;
    if (elementLanguage === language) {
      // Active language just add a class.
      element.classList.add(
        "idsk-header-web__brand-language-list-item-link--selected");
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

function initializeIdSk() {
  initAll();
}
