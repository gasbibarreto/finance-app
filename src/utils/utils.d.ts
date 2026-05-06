export declare function getImagePath(path: string): string;
export declare function formatCurrency(amount: number): string;
export declare function formatPercentage(amount: number): string;
export declare function formatDate(dateString: string): string;
export declare function formatDateOrdinal(dateString: string): string;
export declare const dataSortFunction: {
    readonly Latest: (a: any, b: any) => number;
    readonly Oldest: (a: any, b: any) => number;
    readonly 'A to Z': (a: any, b: any) => any;
    readonly 'Z to A': (a: any, b: any) => any;
    readonly Highest: (a: any, b: any) => number;
    readonly Lowest: (a: any, b: any) => number;
};
