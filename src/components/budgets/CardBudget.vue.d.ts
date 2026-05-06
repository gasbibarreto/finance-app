import { type PropType } from 'vue';
import type { Budget, Transaction } from '@/types/interfaces';
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    budget: {
        type: PropType<Budget>;
        required: true;
    };
    transactions: {
        type: PropType<Transaction[]>;
        required: true;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    budget: {
        type: PropType<Budget>;
        required: true;
    };
    transactions: {
        type: PropType<Transaction[]>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
