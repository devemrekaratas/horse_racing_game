import type { Module } from "vuex";
import type { HorseListState } from "../types";
import type { Horse } from "@/types";

export const horseList: Module<HorseListState, any> = {
  namespaced: true,
  state: () => ({
    horses: [] as Horse[],
  }),
  mutations: {
    setHorseList(state, horses: Horse[]) {
      state.horses = horses;
    },
  },
}