import { CommitOptions, DispatchOptions, Store } from "vuex";
import { Actions } from "./actions";
import { Getters } from "./getters";
import { Mutations } from "./mutations";
import { RootState } from "./state";

type MyMutations = {
  // 첫번째는 state 두번째는 payload
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions // 기본적으로 vuex에서 제공함
  ): ReturnType<Mutations[K]>;
};

type MyActions = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};


type MyGetters = {
  getters: {
    // 맵드 타입 참고!!
    [K in keyof Getters]: ReturnType<Getters[K]>;
  }
}

// omit 은 store의 dispatch를 제거하고 commit 도 제거한다.
export type MyStore = Omit<Store<RootState>, "commit" | "dispatch" | "getters"> & MyMutations & MyActions & MyGetters;
