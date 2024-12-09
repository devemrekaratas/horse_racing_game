import type { Module } from "vuex";
import type { RaceResult, RaceState } from "../types";
import type { Horse, RaceProgram } from "@/types";

export const horseRace: Module<RaceState, any> = {
  namespaced: true,
  state: (): RaceState => ({
    isRunning: false,
    racePrograms: [] as RaceProgram[],
    currentRound: 0,
    raceResults: [] as RaceResult[],
  }),
  mutations: {
    toggleRace(state: RaceState) {
      state.isRunning = !state.isRunning
    },
    setCurrentRound(state: RaceState, round: number) {
      state.currentRound = round
    },
    setRacePrograms(state: RaceState, racePrograms: RaceProgram[]) {
      state.racePrograms = racePrograms
    },
    setRaceResults(state: RaceState, results: Horse[]) {
      state.raceResults.push({ horse: results })
    },
    setIsRunning(state: RaceState, value: boolean) {
      state.isRunning = value
    },
    resetProgress(state: RaceState) {
      const currentRace = state.racePrograms[state.currentRound]
      currentRace.horses.forEach((horse) => {
        horse.progress = 0
      })
    },
    resetAll(state: RaceState) {
      state.isRunning = false;
      state.currentRound = 0;
      state.raceResults = []
      state.racePrograms.forEach((program) => {
        program.horses.forEach((horse) => {
          horse.progress = 0
        })
      })
    },
  },
  actions: {
    async startRace({ state, commit, dispatch }) {
      if (!state.racePrograms.length) return

      const currentRace = state.racePrograms[state.currentRound]
      const completedHorsesSet = new Set<string>()
      const progressMap: { [key: string]: number } = {}
      const speedMap: { [key: string]: number } = {}

      commit("setIsRunning", true)
      currentRace.horses.forEach((horse: Horse) => {
        progressMap[horse.id] = horse.progress || 0
        speedMap[horse.id] = (horse.condition * 30) / currentRace.distance
      })

      const interval = setInterval(() => {
        if (!state.isRunning) {
          clearInterval(interval)
          return
        }

        currentRace.horses.forEach((horse) => {
          if (horse.progress < 100) {
            const speed =
              horse.progress < 50
                ? 1
                : 1 + (horse.condition - 50) / 100
            progressMap[horse.id] += speed
            horse.progress = Math.min(progressMap[horse.id], 100)

            if (horse.progress >= 100 && !completedHorsesSet.has(horse.id)) {
              completedHorsesSet.add(horse.id)
              commit(
                "resultList/updateRoundResult",
                {
                  round: state.currentRound + 1,
                  distance: currentRace.distance,
                  horse,
                },
                { root: true }
              )
            }
          }
        })

        if (currentRace.horses.every((horse) => horse.progress >= 100)) {
          clearInterval(interval)
          commit("resetProgress")
          commit("setIsRunning", false)

          if (state.currentRound + 1 < state.racePrograms.length) {
            commit("setCurrentRound", state.currentRound + 1)
            dispatch("startRace")
          } else {
            console.log("race completed")
          }
        }
      }, 200)
    },
    resetAll({ commit, dispatch }, newPrograms: RaceProgram[]) {
      commit("resetAll")
      commit("setRacePrograms", newPrograms)
      dispatch("resultList/resetResults", null, { root: true })
    },
  },
  getters: {
    getRacePrograms: (state: RaceState) => state.racePrograms,
    getCurrentRound: (state: RaceState) => state.currentRound,
    getRaceResults: (state: RaceState) => state.raceResults,
  },
}