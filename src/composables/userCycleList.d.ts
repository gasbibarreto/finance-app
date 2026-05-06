export declare const userCycleList: (list: any[]) => {
    state: import("vue").ComputedRef<any>;
    prev: () => void;
    next: () => void;
    go: (index: number) => any;
};
