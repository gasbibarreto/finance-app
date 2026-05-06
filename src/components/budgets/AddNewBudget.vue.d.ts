declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    budgetCategory: {
        type: StringConstructor;
    };
    budgetMaximum: {
        type: NumberConstructor;
    };
    budgetTheme: {
        type: StringConstructor;
    };
    openModalEditBudget: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    closeNewBudget: () => any;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    budgetCategory: {
        type: StringConstructor;
    };
    budgetMaximum: {
        type: NumberConstructor;
    };
    budgetTheme: {
        type: StringConstructor;
    };
    openModalEditBudget: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onCloseNewBudget?: (() => any) | undefined;
}>, {
    openModalEditBudget: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
