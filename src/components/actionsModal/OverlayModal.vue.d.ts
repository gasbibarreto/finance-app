import type { BudgetCategories, SortItens } from '@/types';
import { type PropType } from 'vue';
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    sortItens: {
        type: PropType<SortItens[] | BudgetCategories[]>;
        required: true;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    selectSortOption: (value: "Latest" | "Oldest" | "A to Z" | "Z to A" | "Highest" | "Lowest" | "Food & Drink" | "Housing" | "Transportation" | "Utilities" | "Health & Fitness" | "Entertainment" | "Other" | "All Transactions") => any;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    sortItens: {
        type: PropType<SortItens[] | BudgetCategories[]>;
        required: true;
    };
}>> & Readonly<{
    onSelectSortOption?: ((value: "Latest" | "Oldest" | "A to Z" | "Z to A" | "Highest" | "Lowest" | "Food & Drink" | "Housing" | "Transportation" | "Utilities" | "Health & Fitness" | "Entertainment" | "Other" | "All Transactions") => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
