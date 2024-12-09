import { createStore } from "vuex";
import { horseList } from "@/features/horseList/store";
import { controls } from "@/features/controls/store";
import { program } from "@/features/program/store";
import { horseRace } from "@/features/horseTrack/store";
import { resultList } from "@/features/result/store";
import type { RootState } from "@/types";

const store = createStore<RootState>({
  modules: {
    horseList,
    controls,
    program,
    horseRace,
    resultList
  } 
})

export default store;