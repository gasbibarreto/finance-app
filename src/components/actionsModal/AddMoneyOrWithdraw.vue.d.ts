declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    addMoneyWithdrawTitle: {
        type: StringConstructor;
        required: true;
    };
    money: {
        type: BooleanConstructor;
    };
    potsTargetValue: {
        type: NumberConstructor;
        required: true;
    };
    withdraw: {
        type: BooleanConstructor;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    closeAddMoneyWithdraw: () => any;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    addMoneyWithdrawTitle: {
        type: StringConstructor;
        required: true;
    };
    money: {
        type: BooleanConstructor;
    };
    potsTargetValue: {
        type: NumberConstructor;
        required: true;
    };
    withdraw: {
        type: BooleanConstructor;
    };
}>> & Readonly<{
    onCloseAddMoneyWithdraw?: (() => any) | undefined;
}>, {
    money: boolean;
    withdraw: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
