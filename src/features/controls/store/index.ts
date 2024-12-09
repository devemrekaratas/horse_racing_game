import type { Module } from "vuex";
import { faker } from '@faker-js/faker';
import type { Horse } from "@/types";

export const controls: Module<any, any> = {
  namespaced: true,
  actions: {
    generateRandomHorses({ commit }) {
      const horses: Horse[] = Array.from({ length: 20 }, () => ({
        id: faker.string.uuid(),
        name: faker.word.adjective(),
        condition: faker.number.int({ min: 1, max: 100 }),
        color: faker.color.rgb(),
        progress: 0
      }))
      commit("horseList/setHorseList", horses, { root: true });
    },
    toggleRace({ commit }) {
      commit("horseRace/toggleRace", null, { root: true });
    }
  },
}