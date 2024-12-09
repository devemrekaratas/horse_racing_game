import type { Module } from "vuex";
import type { RaceProgram } from "@/types";
import type { ProgramState } from "../types";

export const program: Module<ProgramState, any> = {
  namespaced: true,
  state: () => ({
    racePrograms: [] as RaceProgram[],
    raceDistances: [1200, 1400, 1600, 1800, 2000, 2200],
  }),
  mutations: {
    setRacePrograms(state, programs: RaceProgram[]) {
      state.racePrograms = programs;
    },
  },
  actions: {
    generateRacePrograms({ commit, rootState, state }) {
      const horses = rootState.horseList.horses;
      const racePrograms = []
      if (horses.length >= 10) {
        for (let i = 0; i < state.raceDistances.length; i++) {
          const shuffled = [...horses].sort(() => Math.random() - 0.5)
          const selectedHorses = shuffled.slice(0, 10)
          racePrograms.push({
            distance: state.raceDistances[i],
            horses: selectedHorses,
          })
        }
      }
      commit("setRacePrograms", racePrograms);
      commit("horseRace/setRacePrograms", racePrograms, { root: true })
    },
  },
  getters: {
    getRaceDistances: (state) => state.raceDistances,
    getRacePrograms: (state) => state.racePrograms,
  },
}