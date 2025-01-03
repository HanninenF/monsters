//////////////////////////////////configuration and state///////////////////////////////////
//////////////////////////////////||||||||||||||||||||||||///////////////////////////////////

import { formTypeDropdown, formColorDropdown } from "./domElements.js";
import { createMonster } from "./monsterUI.js";

// Konfigurationsobjekt för att lagra monster-relaterade inställningar
// Innehåller typalternativ, färgalternativ, utseendeattribut och fält
// Dessa inställningar används för att bygga och rendera monsterkort i applikationen
export const config = {
  typeOptions: ["Maritime Monster", "Terrestrial Beast", "Winged Horror"],

  colorOptions: ["Blue", "Green", "Yellow", "Pink", "Red"],

  // ändra denna för att kunna ändra på utseendealternativen
  looks: ["size", "strength", "viciousness", "Charisma"],

  fields: ["type", "name", "color"],
};
config.fields.push(...config.looks);

// state- Skapa array med objekt(monster)
export const state = {
  monsters: [
    createMonster([
      config.typeOptions[0],
      "Kraken",
      config.colorOptions[0],
      50,
      100,
      50,
      4,
    ]),
    createMonster([
      config.typeOptions[1],
      "Mudfang",
      config.colorOptions[4],
      30,
      5,
      51,
      67,
    ]),
    createMonster([
      config.typeOptions[2],
      "Grimflap",
      config.colorOptions[3],
      3,
      5,
      100,
      1,
    ]),
  ],

  //add Monster
  addMonster: function (...lookValues) {
    const newMonster = createMonster(lookValues);
    this.monsters.push(newMonster);
  },

  //delete Monster
  deleteMonster: function (index) {
    if (confirm("Are you sure you want to delete this monster?")) {
      this.monsters.splice(index, 1);
    }
  },
};

export const formHandler = {
  //funktion för att rensa inputfälten i formen
  resetForm: () => {
    config.fields.forEach((field) => {
      document.querySelector(`.${field}`).value = "";
    });
    formTypeDropdown.value = config.typeOptions[0];
    formColorDropdown.value = config.colorOptions[0];
  },

  //funktion för att hämta data från inputfälten
  getFormData: () => {
    const formData = [];
    config.fields.forEach((field) => {
      const value = document.querySelector(`.${field}`).value.trim();
      formData.push(value);
    });
    return formData;
  },

  //funktion för att fylla i inputfälten med data
  populateForm: (monster) => {
    config.fields.forEach((field) => {
      document.querySelector(`.${field}`).value = monster[field];
    });
  },

  // Validera att alla fält är ifyllda och har korrekta tecken
  validateForm: () => {
    const fieldsFilled = config.fields.every((field) => {
      const value = document.querySelector(`.${field}`).value.trim();
      return value !== "";
    });

    const fieldsValid = config.fields.every((field) => {
      const value = document.querySelector(`.${field}`).value.trim();
      return /[a-zA-Z0-9 ]/.test(value);
    });

    if (fieldsFilled && fieldsValid) {
      return true;
    } else {
      alert("Complete all fields and use only letters, numbers, and spaces.");
    }
  },
};
