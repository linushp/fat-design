import {PreciseStore} from "../../hooks/usePreciseStore";

const COMPOSITE_NAME_REG = /^\[([^\]]+)\]$/;

export interface ParsedCompositeName {
    isComposite: boolean;
    name: string;
    fields: string[];
}

export function parseCompositeName(name?: string | null): ParsedCompositeName {
    if (name == null || name === '') {
        return {isComposite: false, name: name as string, fields: []};
    }

    const match = name.match(COMPOSITE_NAME_REG);
    if (!match) {
        return {isComposite: false, name, fields: [name]};
    }

    const fields = match[1].split(',').map((s) => s.trim()).filter(Boolean);
    if (fields.length < 2) {
        return {isComposite: false, name, fields: [name]};
    }

    return {isComposite: true, name, fields};
}

export function isCompositeName(name?: string | null): boolean {
    return parseCompositeName(name).isComposite;
}

export function getCompositeValue(formStore: PreciseStore, parsed: ParsedCompositeName): any {
    if (parsed.fields.length === 0) {
        return undefined;
    }
    if (!parsed.isComposite) {
        return formStore.getValue('values.' + parsed.name);
    }
    return parsed.fields.map((field) => formStore.getValue('values.' + field));
}

export function setCompositeValue(formStore: PreciseStore, parsed: ParsedCompositeName, nextValue: any): void {
    if (parsed.fields.length === 0) {
        return;
    }
    if (!parsed.isComposite) {
        formStore.setValue('values.' + parsed.name, nextValue);
        return;
    }

    const arr = Array.isArray(nextValue) ? nextValue : [];
    parsed.fields.forEach((field, index) => {
        formStore.setValue('values.' + field, arr[index] ?? null);
    });
}
