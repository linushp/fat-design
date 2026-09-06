import { PreciseStore } from "../../hooks/usePreciseStore";
export interface ParsedCompositeName {
    isComposite: boolean;
    name: string;
    fields: string[];
}
export declare function parseCompositeName(name?: string | null): ParsedCompositeName;
export declare function isCompositeName(name?: string | null): boolean;
export declare function getCompositeValue(formStore: PreciseStore, parsed: ParsedCompositeName): any;
export declare function setCompositeValue(formStore: PreciseStore, parsed: ParsedCompositeName, nextValue: any): void;
