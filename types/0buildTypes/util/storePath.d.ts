/** PreciseStore 路径：字符串 dot-path 或数组字面量 path（key 含 [ ] . 时用后者） */
export type StorePath = string | (string | number)[];
/**
 * 构建 store 路径。fieldName 含 `[` `]` `.` 时整段作为字面量 key，避免 lodash 路径解析。
 */
export declare function toStorePath(root: string, key: string): StorePath;
/** 将 StorePath 序列化为 watcher / updatedBuffer 用的唯一字符串 */
export declare function serializeStorePath(path: StorePath): string;
