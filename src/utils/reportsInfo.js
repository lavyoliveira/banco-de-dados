export const tables = [
    {
      "id": 1,
      "name": "Buddies",
      "route": "buddies",
      "connectionAvailable": [2],
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "id_bundle",
          "type": "string"
        },
        {
          "name": "theme",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        }
      ]
    },
    {
      "id": 2,
      "name": "Bundles",
      "route": "bundles",
      "connectionAvailable": [1, 3, 4, 5, 7],
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        }
      ]
    },
    {
      "id": 3,
      "name": "Player Cards",
      "route": "cards",
      "connectionAvailable": [2],
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "id_bundle",
          "type": "string"
        },
        {
          "name": "theme",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        }
      ]
    },
    {
      "id": 4,
      "name": "Sprays",
      "route": "sprays",
      "connectionAvailable": [2],
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "id_bundle",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "theme",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        },
        {
          "name": "animation",
          "type": "string"
        },
      ]
    },
    {
      "id": 5,
      "name": "Player Titles",
      "route": "titles",
      "connectionAvailable": [2],
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "id_bundle",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "txt",
          "type": "string"
        }
      ]
    },
    {
      "id": 6,
      "name": "Weapons",
      "route": "weapons",
      "connectionAvailable": [7, 8],
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        }
      ]
    },
    {
      "id": 7,
      "name": "Skins",
      "route": "skins",
      "connectionAvailable": [2, 6, 9, 10],
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "id_bundle",
          "type": "string"
        },
        {
          "name": "id_weapon",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "tier",
          "type": "string"
        },
        {
          "name": "theme",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        },
        {
          "name": "price",
          "type": "int"
        },
      ]
    },
    {
      "id": 8,
      "name": "Weapons Info",
      "route": "weaponsinfo",
      "connectionAvailable": [6],
      "fields": [
        {
          "name": "id_weapon",
          "type": "string"
        },
        {
          "name": "info",
          "type": "string"
        }
      ]
    },
    {
      "id": 9,
      "name": "Chromas",
      "route": "chromas",
      "connectionAvailable": [7],
      "fields": [
        {
          "name": "id_skin",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        }
      ]
    },
    {
      "id": 10,
      "name": "Levels",
      "route": "levels",
      "connectionAvailable": [7],
      "fields": [
        {
          "name": "id_skin",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "icon",
          "type": "string"
        }
      ]
    }
  ]