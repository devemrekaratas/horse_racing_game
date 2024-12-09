import type { Module } from "vuex";
import type { ResultListState, Round, RoundResult } from "../types";

export const resultList: Module<ResultListState, any> = {
  namespaced: true,
  state: () => ({
    rounds: [] as Round[],
  }),
  mutations: {
    updateRoundResult(
      state: ResultListState,
      { round, distance, horse }: RoundResult
    ) {
      const existingRound = state.rounds.find((r) => r.round === round)

      if (existingRound) {
        existingRound.horses.push(horse)
      } else {
        state.rounds.push({
          round,
          distance,
          horses: [horse],
        })
      }
    },
    resetRounds(state: ResultListState) {
      state.rounds = []
    },
  },
  actions: {
    resetResults({ commit }) {
      commit('resetRounds')
    },
  },
  getters: {
    getAllRounds: (state) => state.rounds,
  },
}