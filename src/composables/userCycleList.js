import { computed, ref } from "vue";
export const userCycleList = (list) => {
    //duas variaveis, a primeira vai ser o index e a segunda vai ser o elemento referente ao index.
    const indexCycleList = 0;
    const state = computed(() => { return list[indexCycleList]; });
    function go(index) {
        return list[index];
    }
    return {
        state,
        prev: () => {
        },
        next: () => {
        },
        go
    };
};
