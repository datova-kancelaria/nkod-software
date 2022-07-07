{
  "users" : {
    "admin" : {
      "username" : "admin",
      "password" : "{bcrypt}{ADMIN_PASSWORD_BCRYPT}",
      "grantedAuthorities" : [ "ROLE_ADMIN" ],
      "appSettings" : {
        "DEFAULT_INFERENCE" : true,
        "DEFAULT_VIS_GRAPH_SCHEMA" : true,
        "DEFAULT_SAMEAS" : true,
        "IGNORE_SHARED_QUERIES" : false,
        "EXECUTE_COUNT" : true
      },
      "dateCreated" : 1652335416018
    },
    "{USERNAME}" : {
      "username" : "{USERNAME}",
      "password" : "{bcrypt}{PASSWORD_BCRYPT}",
      "grantedAuthorities" : [ "ROLE_USER",  "READ_REPO_nodc", "WRITE_REPO_nodc" ],
      "appSettings" : {
        "DEFAULT_INFERENCE" : false,
        "DEFAULT_VIS_GRAPH_SCHEMA" : false,
        "DEFAULT_SAMEAS" : false,
        "IGNORE_SHARED_QUERIES" : false,
        "EXECUTE_COUNT" : false
      },
      "dateCreated" : 1652335416018
    }
  },
  "import.server" : { },
  "import.local" : { },
  "properties" : {
    "current.location" : "",
    "security.enabled" : "true"
  },
  "user_queries" : {
    "admin" : { },
    "{USERNAME}" : { }
  },
  "locations" : {
    "" : {
      "location" : "",
      "authType" : "none",
      "password" : null,
      "username" : null,
      "defaultRepository" : null
    }
  }
}
