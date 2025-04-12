import { PreciseStore } from "../../hooks/usePreciseStore";
import { FormActions } from "../form-actions";
import { FnFormOnChangeParams } from "../form-types";
declare const buildFnFormOnChangeParams: (formStore: PreciseStore, formActions: FormActions) => FnFormOnChangeParams;
export { buildFnFormOnChangeParams };
