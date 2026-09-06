import { PreciseStore } from "../hooks/usePreciseStore";
import { FormItemProps, FormItemStateSaved, FormStoreExtData1, IItemState } from "./form-types";
type StringOrArray = string[] | string | null;
declare class FormActions {
    private formStore;
    private schemaValidateOptions;
    constructor(formStore: PreciseStore, locale: any);
    /**
     * 获取表单的扩展数据，包含所有已注册表单项的 props 映射
     * @returns 包含 propsMap 的表单扩展数据对象
     * @example
     * // 获取表单配置信息
     * const extData = formActions.getExtData1();
     * console.log('已注册字段:', Object.keys(extData.propsMap));
     *
     * @example
     * // 检查某个字段是否已注册
     * const extData = formActions.getExtData1();
     * const hasField = 'username' in extData.propsMap;
     */
    getExtData1(): FormStoreExtData1;
    /**
     * 验证整个表单的所有字段（validate 的别名方法）
     * @returns 验证完成后的 Promise
     */
    validate(): Promise<void>;
    /**
     * 验证整个表单的所有字段
     * 遍历所有已注册的表单项，依次执行验证逻辑
     * @returns 验证完成后的 Promise
     * @example
     * // 基础用法：提交表单前验证
     * const handleSubmit = async () => {
     *   await formActions.validateForm();
     *   const errors = formActions.getErrors();
     *   if (errors.length === 0) {
     *     // 验证通过，执行提交
     *     await submitData(formActions.getValues());
     *   }
     * };
     *
     * @example
     * // 使用 try-catch 处理验证错误
     * const saveForm = async () => {
     *   try {
     *     await formActions.validateForm();
     *     const formData = formActions.pickFormValues();
     *     console.log('表单数据:', formData);
     *   } catch (e) {
     *     console.error('验证失败:', e);
     *   }
     * };
     *
     * @example
     * // 验证后自动聚焦第一个错误字段
     * const validateAndFocus = async () => {
     *   await formActions.validateForm();
     *   const errors = formActions.getErrors();
     *   if (errors.length > 0) {
     *     const firstErrorField = errors[0].name;
     *     document.querySelector(`[name="${firstErrorField}"]`)?.focus();
     *   }
     * };
     */
    validateForm(): Promise<void>;
    /**
     * 对启用 autoValidate 的字段进行首次自动验证
     * 通常在表单初始化或特定场景下自动验证开启了自动验证的字段
     * @returns 验证完成后的 Promise
     * @example
     * // 表单初始化后自动验证必填字段
     * useEffect(() => {
     *   formActions.firstAutoValidateForm();
     * }, []);
     *
     * @example
     * // 切换 Tab 后自动验证当前 Tab 的必填字段
     * const handleTabChange = (key: string) => {
     *   setActiveTab(key);
     *   // 延迟执行以确保 DOM 更新完成
     *   setTimeout(() => {
     *     formActions.firstAutoValidateForm();
     *   }, 100);
     * };
     */
    firstAutoValidateForm(): Promise<void>;
    /**
     * 验证单个表单项
     * 根据字段名获取其值和验证规则，执行验证并将错误信息设置到对应字段状态
     * @param name - 要验证的字段名
     * @returns 验证完成后的 Promise
     * @example
     * // 单独验证某个字段
     * const handleBlur = async (fieldName: string) => {
     *   await formActions.validateFromItem(fieldName);
     * };
     *
     * @example
     * // 验证后检查是否有错误
     * const checkField = async (name: string) => {
     *   await formActions.validateFromItem(name);
     *   const errors = formActions.getErrors();
     *   const hasError = errors.some(e => e.name === name);
     *   return !hasError;
     * };
     *
     * @example
     * // 批量验证特定字段
     * const validateFields = async (fieldNames: string[]) => {
     *   for (const name of fieldNames) {
     *     await formActions.validateFromItem(name);
     *   }
     * };
     * await validateFields(['username', 'email', 'phone']);
     */
    validateFromItem(name: string): Promise<void>;
    /**
     * 强制更新表单项或整个表单
     * 通过更新 forceUpdateTick 触发组件重新渲染，解决某些情况下 UI 不同步的问题
     * @param name - 要强制更新的字段名，不传则更新整个表单
     * @example
     * // 强制更新单个字段
     * const refreshField = (fieldName: string) => {
     *   formActions.forceUpdate(fieldName);
     * };
     *
     * @example
     * // 外部数据变化后强制刷新整个表单
     * const handleExternalDataChange = () => {
     *   // 更新表单数据...
     *   formActions.setValues(newData);
     *   // 强制刷新以确保 UI 同步
     *   formActions.forceUpdate();
     * };
     *
     * @example
     * // 异步数据加载完成后刷新
     * const loadData = async () => {
     *   const data = await fetchData();
     *   formActions.setValues(data);
     *   formActions.forceUpdate();
     * };
     */
    forceUpdate(name?: any): void;
    /**
     * 设置单个表单项状态的某个属性
     * 用于精确控制表单项的某个状态属性，如 errors、forceUpdateTick 等
     * @param name - 字段名
     * @param stateKey - 状态属性名
     * @param value - 要设置的值
     * @example
     * // 手动设置字段的错误信息
     * formActions.setStateItem('username', 'errors', ['用户名已被占用']);
     *
     * @example
     * // 更新字段的加载状态（配合自定义 UI）
     * formActions.setStateItem('email', 'loading', true);
     * await checkEmailExists(email);
     * formActions.setStateItem('email', 'loading', false);
     *
     * @example
     * // 切换字段的禁用状态
     * const toggleDisabled = (fieldName: string, disabled: boolean) => {
     *   formActions.setStateItem(fieldName, 'disabled', disabled);
     * };
     */
    setStateItem(name: string, stateKey: string, value: any): void;
    /**
     * 批量设置单个表单项的多个状态属性
     * 相比 setStateItem，可以一次性更新多个状态属性
     * @param name - 字段名
     * @param updates - 要更新的状态属性对象
     * @example
     * // 同时更新多个状态属性
     * formActions.setState('username', {
     *   errors: [],
     *   loading: false,
     *   touched: true
     * });
     *
     * @example
     * // 根据外部条件动态设置字段状态
     * const setFieldStatus = (fieldName: string, isValid: boolean) => {
     *   formActions.setState(fieldName, {
     *     status: isValid ? 'success' : 'error',
     *     helpText: isValid ? '格式正确' : '格式不正确'
     *   });
     * };
     *
     * @example
     * // 初始化字段状态
     * const initFieldState = (name: string) => {
     *   formActions.setState(name, {
     *     errors: [],
     *     touched: false,
     *     validating: false
     *   });
     * };
     */
    setState(name: string, updates: Partial<FormItemStateSaved>): void;
    /**
     * 获取单个表单项的当前状态
     * @param name - 字段名
     * @returns 该字段的当前状态对象，如果不存在则返回空对象
     * @example
     * // 获取字段的错误信息
     * const state = formActions.getState('username');
     * console.log('错误信息:', state.errors);
     *
     * @example
     * // 检查字段是否被编辑过
     * const isFieldTouched = (fieldName: string) => {
     *   const state = formActions.getState(fieldName);
     *   return state.touched === true;
     * };
     *
     * @example
     * // 获取字段的验证状态
     * const getValidationStatus = (name: string) => {
     *   const state = formActions.getState(name);
     *   if (state.errors && state.errors.length > 0) {
     *     return 'error';
     *   }
     *   if (state.validating) {
     *     return 'validating';
     *   }
     *   return state.touched ? 'success' : '';
     * };
     */
    getState(name: string): any;
    /**
     * 获取所有表单项的状态映射
     * @returns 包含所有字段状态的对象，键为字段名
     * @example
     * // 获取所有字段状态
     * const allStates = formActions.getStates();
     * console.log('所有字段状态:', allStates);
     *
     * @example
     * // 统计有多少个字段有错误
     * const countErrors = () => {
     *   const states = formActions.getStates();
     *   return Object.values(states).filter(
     *     (s: any) => s.errors && s.errors.length > 0
     *   ).length;
     * };
     *
     * @example
     * // 获取所有被编辑过的字段
     * const getTouchedFields = () => {
     *   const states = formActions.getStates();
     *   return Object.entries(states)
     *     .filter(([_, state]: [string, any]) => state.touched)
     *     .map(([name]) => name);
     * };
     */
    getStates(): any;
    /**
     * 根据触发条件验证单个表单项
     * 只执行匹配指定触发条件（如 onChange、onBlur 等）的验证规则
     * @param name - 要验证的字段名
     * @param triggerName - 触发条件名称，如 'onChange'、'onBlur' 等
     * @returns 验证错误数组，如果没有匹配的规则或验证通过则返回 undefined 或空数组
     * @example
     * // 输入框失焦时验证（配合 onBlur 事件）
     * const handleBlur = async (fieldName: string) => {
     *   await formActions.validateFromItemByTrigger(fieldName, 'onBlur');
     * };
     *
     * @example
     * // 值变化时验证（配合 onChange 事件）
     * const handleChange = async (fieldName: string, value: any) => {
     *   formActions.setValue(fieldName, value);
     *   await formActions.validateFromItemByTrigger(fieldName, 'onChange');
     * };
     *
     * @example
     * // 提交时触发所有 onSubmit 规则的验证
     * const handleSubmit = async () => {
     *   const fields = ['username', 'password', 'email'];
     *   for (const field of fields) {
     *     await formActions.validateFromItemByTrigger(field, 'onSubmit');
     *   }
     *   // 检查是否有错误...
     * };
     *
     * @example
     * // 处理异步验证结果
     * const validateAsync = async (name: string, trigger: string) => {
     *   const errors = await formActions.validateFromItemByTrigger(name, trigger);
     *   if (errors && errors.length > 0) {
     *     console.log(`${name} 验证失败:`, errors.join(', '));
     *   } else {
     *     console.log(`${name} 验证通过`);
     *   }
     * };
     */
    validateFromItemByTrigger(name: string, triggerName: string): Promise<any>;
    /**
     * 获取所有包含验证错误的表单项状态
     * 只返回当前显示状态（display !== false）且存在错误（errors.length > 0）的表单项
     * @returns 包含错误的表单项状态数组，每个元素包含 name、errors 等属性
     * @example
     * // 基础用法：获取错误数量
     * const errors = formActions.getErrors();
     * if (errors.length > 0) {
     *   message.warning(`共有 ${errors.length} 个字段填写不正确`);
     * }
     *
     * @example
     * // 遍历显示所有错误信息
     * const showAllErrors = () => {
     *   const errors = formActions.getErrors();
     *   errors.forEach(item => {
     *     const fieldName = item.label || item.name;
     *     const errorMsg = item.errors?.join(', ');
     *     console.error(`${fieldName}: ${errorMsg}`);
     *   });
     * };
     *
     * @example
     * // 检查特定字段是否有错误
     * const hasError = (fieldName: string) => {
     *   const errors = formActions.getErrors();
     *   return errors.some(e => e.name === fieldName);
     * };
     * if (hasError('email')) {
     *   // 邮箱格式有误
     * }
     *
     * @example
     * // 生成错误汇总消息
     * const getErrorSummary = () => {
     *   const errors = formActions.getErrors();
     *   if (errors.length === 0) return '';
     *   const firstError = errors[0];
     *   const fieldLabel = firstError.label || firstError.name;
     *   const errorText = firstError.errors?.[0] || '填写不正确';
     *   return `${fieldLabel}: ${errorText}`;
     * };
     */
    getErrors(): IItemState[];
    /**
     * 获取经过状态修正后的表单项配置
     * 根据字段名获取其原始配置，并结合当前状态（如禁用、隐藏等）进行修正
     * @param name - 字段名
     * @returns 经过状态修正后的表单项配置
     * @example
     * // 获取字段的当前有效配置
     * const props = formActions.getFormItemPropsFixedByState('username');
     * console.log('是否禁用:', props.disabled);
     * console.log('当前标签:', props.label);
     *
     * @example
     * // 检查字段是否根据条件显示
     * const isFieldVisible = (fieldName: string) => {
     *   const props = formActions.getFormItemPropsFixedByState(fieldName);
     *   return props.display !== false;
     * };
     *
     * @example
     * // 动态获取验证规则（考虑状态影响）
     * const getEffectiveRules = (name: string) => {
     *   const props = formActions.getFormItemPropsFixedByState(name);
     *   return props.rules || [];
     * };
     */
    getFormItemPropsFixedByState(name: string): FormItemProps;
    /**
     * 获取表单项的原始配置
     * 从 propsMap 中获取字段的原始配置，不进行任何状态修正
     * @param name - 字段名
     * @returns 表单项的原始配置对象
     * @example
     * // 获取字段原始配置
     * const props = formActions.getFormItemProps('email');
     * console.log('字段类型:', props.type);
     * console.log('验证规则:', props.rules);
     *
     * @example
     * // 检查字段是否存在
     * const hasField = (fieldName: string) => {
     *   return !!formActions.getFormItemProps(fieldName);
     * };
     *
     * @example
     * // 获取所有字段的配置
     * const getAllFieldConfigs = () => {
     *   const extData = formActions.getExtData1();
     *   return Object.keys(extData.propsMap).map(name => ({
     *     name,
     *     config: formActions.getFormItemProps(name)
     *   }));
     * };
     */
    getFormItemProps(name: string): FormItemProps;
    /**
     * 获取单个字段的值
     * @param name - 字段名
     * @returns 该字段的当前值
     * @example
     * // 获取单个字段值
     * const username = formActions.getValue('username');
     * console.log('当前用户名:', username);
     *
     * @example
     * // 检查字段是否有值
     * const hasValue = (fieldName: string) => {
     *   const value = formActions.getValue(fieldName);
     *   return value !== null && value !== undefined && value !== '';
     * };
     *
     * @example
     * // 获取嵌套字段值（如果支持嵌套路径）
     * const userInfo = formActions.getValue('user');
     * console.log('用户信息:', userInfo);
     */
    getValue(name: string): any;
    /**
     * 设置单个字段的值
     * @param name - 字段名
     * @param value - 要设置的值
     * @returns 设置后的值
     * @example
     * // 设置单个字段值
     * formActions.setValue('username', 'JohnDoe');
     *
     * @example
     * // 设置值并触发动态验证
     * const handleInputChange = async (fieldName: string, value: string) => {
     *   formActions.setValue(fieldName, value);
     *   // 延迟验证以优化性能
     *   clearTimeout(window.validateTimer);
     *   window.validateTimer = setTimeout(() => {
     *     formActions.validateFromItemByTrigger(fieldName, 'onChange');
     *   }, 300);
     * };
     *
     * @example
     * // 联动赋值：根据省的选择设置市
     * const handleProvinceChange = (province: string) => {
     *   formActions.setValue('province', province);
     *   formActions.setValue('city', null); // 清空市
     *   formActions.setValue('district', null); // 清空区
     * };
     */
    setValue(name: string, value: any): any;
    /**
     * 获取所有字段的值
     * @returns 包含所有字段值的对象，键为字段名
     * @example
     * // 获取完整表单数据
     * const formData = formActions.getValues();
     * console.log('表单数据:', formData);
     * // { username: 'tom', email: 'tom@example.com', age: 25 }
     *
     * @example
     * // 提交前检查必填字段
     * const checkRequiredFields = (requiredFields: string[]) => {
     *   const values = formActions.getValues();
     *   const missing = requiredFields.filter(field => {
     *     const value = values[field];
     *     return value === null || value === undefined || value === '';
     *   });
     *   return missing;
     * };
     *
     * @example
     * // 序列化表单数据用于 API 请求
     * const serializeFormData = () => {
     *   const values = formActions.getValues();
     *   return Object.entries(values).reduce((acc, [key, value]) => {
     *     if (value !== undefined && value !== null) {
     *       acc[key] = value;
     *     }
     *     return acc;
     *   }, {} as Record<string, any>);
     * };
     */
    getValues(): any;
    /**
     * 批量设置多个字段的值
     * @param values - 包含字段名和值的对象
     * @returns 设置后的完整值对象
     * @example
     * // 批量设置表单数据
     * formActions.setValues({
     *   username: 'JohnDoe',
     *   email: 'john@example.com',
     *   age: 30
     * });
     *
     * @example
     * // 编辑时回填数据
     * const loadEditData = async (id: string) => {
     *   const data = await api.getDetail(id);
     *   formActions.setValues(data);
     *   formActions.forceUpdate();
     * };
     *
     * @example
     * // 合并部分数据（保留原有值）
     * const mergeValues = (newData: Record<string, any>) => {
     *   const currentValues = formActions.getValues();
     *   formActions.setValues({
     *     ...currentValues,
     *     ...newData
     *   });
     * };
     *
     * @example
     * // 从 URL 参数初始化表单
     * const initFromUrl = () => {
     *   const params = new URLSearchParams(window.location.search);
     *   const initialValues: Record<string, any> = {};
     *   params.forEach((value, key) => {
     *     if (formActions.getFormItemProps(key)) {
     *       initialValues[key] = value;
     *     }
     *   });
     *   formActions.setValues(initialValues);
     * };
     */
    setValues(values: any): any;
    /**
     * 获取所有字段的默认值
     * @returns 包含所有字段默认值的对象
     * @example
     * // 获取表单默认值
     * const defaults = formActions.getDefaultValues();
     * console.log('默认值:', defaults);
     *
     * @example
     * // 检查当前值是否与默认值不同
     * const isValueChanged = (fieldName: string) => {
     *   const current = formActions.getValue(fieldName);
     *   const defaults = formActions.getDefaultValues();
     *   return current !== defaults[fieldName];
     * };
     *
     * @example
     * // 获取所有被修改过的字段
     * const getModifiedFields = () => {
     *   const current = formActions.getValues();
     *   const defaults = formActions.getDefaultValues();
     *   return Object.keys(current).filter(key => {
     *     return current[key] !== defaults[key];
     *   });
     * };
     *
     * @example
     * // 恢复特定字段到默认值
     * const resetFieldToDefault = (fieldName: string) => {
     *   const defaults = formActions.getDefaultValues();
     *   formActions.setValue(fieldName, defaults[fieldName]);
     * };
     */
    getDefaultValues(): any;
    /**
     * 获取需要重置的字段名称列表
     * 先从所有字段中筛选出 includeNames 指定的字段，再排除 exclude 中的字段
     * @param includeNames - 要包含的字段，可以是 "*"（所有字段）、单个字段名、字段名数组，或 null（同 "*"）
     * @param exclude - 要从结果中排除的字段名数组
     * @returns 经过筛选和排除后的字段名称数组
     * @example
     * // 获取所有字段（用于重置全部）
     * const allFields = formActions.getResetNames('*', []);
     * // 假设表单有 username, email, phone
     * // 返回: ['username', 'email', 'phone']
     *
     * @example
     * // 传入 null 或 undefined 时返回所有字段
     * const allFields = formActions.getResetNames(null, []);
     * // 返回: ['username', 'email', 'phone']
     *
     * @example
     * // 获取单个字段（假设表单中有该字段）
     * const fields = formActions.getResetNames('username', []);
     * // 返回: ['username']
     *
     * @example
     * // 获取多个指定字段
     * const fields = formActions.getResetNames(['username', 'email'], []);
     * // 返回: ['username', 'email']
     *
     * @example
     * // 先筛选再排除：选出多个字段后再排除部分
     * // 假设表单有 username, email, phone, address
     * const fields = formActions.getResetNames(['username', 'email', 'phone'], ['phone']);
     * // 先选出 username, email, phone，再排除 phone
     * // 返回: ['username', 'email']
     *
     * @example
     * // 获取所有字段但排除特定字段（如保留 ID）
     * const fields = formActions.getResetNames('*', ['id', 'createTime']);
     * // 返回除 id 和 createTime 外的所有字段
     *
     * @example
     * // 数组中包含通配符时返回所有字段
     * const fields = formActions.getResetNames(['*', 'extraField'], ['id']);
     * // 因为包含 "*"，返回所有字段（但排除了 id）
     * // 返回: ['username', 'email', 'phone']（假设 id 被排除）
     */
    getResetNames(includeNames: StringOrArray, exclude: string[]): string[];
    /**
     * 将指定字段重置为其默认值
     * 用于将表单字段恢复到初始化时的默认值，常用于"重置"按钮功能
     * @param names0 - 要重置的字段名，默认为 "*" 表示所有字段，可传入单个字段名、字段名数组或 null（同 "*"）
     * @param exclude - 要排除的字段名数组，默认为空数组
     * @param isValidate - 重置后是否立即执行验证，默认为 true
     * @returns 返回验证结果的 Promise，如果 isValidate 为 false 则返回 null
     * @example
     * // 重置整个表单（所有字段）
     * const handleReset = async () => {
     *   await formActions.resetToDefault();
     *   message.success('表单已重置');
     * };
     *
     * @example
     * // 只重置特定字段
     * const resetPasswordFields = () => {
     *   formActions.resetToDefault(['password', 'confirmPassword']);
     * };
     *
     * @example
     * // 重置时保留某些字段（如 ID、创建时间等）
     * const resetKeepId = async () => {
     *   // 保留 id 和 createdAt 字段，其他都重置
     *   await formActions.resetToDefault('*', ['id', 'createdAt']);
     * };
     *
     * @example
     * // 重置后不验证（提高性能，适用于有批量操作的场景）
     * formActions.resetToDefault('*', [], false);
     *
     * @example
     * // 编辑页场景：打开弹窗时仅重置非 ID 字段到默认值（不影响 id）
     * const openEditModal = () => {
     *   // 将除 id 外的所有字段重置为 defaultValues
     *   formActions.resetToDefault('*', ['id']);
     * };
     */
    resetToDefault(names0?: StringOrArray, exclude?: string[], isValidate?: boolean): Promise<any>;
    /**
     * 将指定字段重置为 null（清空值）
     * 与 resetToDefault 不同，此方法是将字段值设为 null，而非恢复默认值
     * @param names0 - 要清空的字段名，默认为 "*" 表示所有字段，可传入单个字段名、字段名数组或 null（同 "*"）
     * @param exclude - 要排除的字段名数组，默认为空数组
     * @param isValidate - 清空后是否立即执行验证，默认为 true
     * @returns 返回验证结果的 Promise，如果 isValidate 为 false 则返回 null
     * @example
     * // 清空整个表单
     * const handleClear = async () => {
     *   await formActions.reset();
     *   message.success('表单已清空');
     * };
     *
     * @example
     * // 清空搜索条件但保留分页参数
     * const clearSearch = () => {
     *   formActions.reset(['keyword', 'category', 'startDate', 'endDate'], ['page', 'pageSize']);
     * };
     *
     * @example
     * // 清空后处理验证结果
     * const clearAndCheck = async () => {
     *   const result = await formActions.reset(['email']);
     *   console.log('清空后的验证结果:', result);
     * };
     *
     * @example
     * // 联动清空：切换类型时清空相关字段
     * const handleTypeChange = (type: string) => {
     *   if (type === 'personal') {
     *     // 清空企业相关字段
     *     formActions.reset(['companyName', 'businessLicense']);
     *   } else {
     *     // 清空个人相关字段
     *     formActions.reset(['idCard', 'personalPhone']);
     *   }
     * };
     *
     * @example
     * // 新增表单场景：完全清空且不需要验证
     * const handleAddNew = () => {
     *   formActions.reset('*', [], false);
     *   setModalVisible(true);
     * };
     */
    reset(names0?: StringOrArray, exclude?: string[], isValidate?: boolean): Promise<any>;
    /**
     * 清除所有表单字段的验证错误信息
     * 遍历所有已注册的表单项，将其 errors 状态重置为空数组
     * @returns 返回一个 resolved 的 Promise
     * @example
     * // 基础用法：提交成功后清除错误
     * const handleSubmit = async () => {
     *   try {
     *     await submitFormData(formActions.getValues());
     *     message.success('提交成功');
     *   } catch (error) {
     *     // 提交失败，保留错误提示
     *     console.error(error);
     *   }
     * };
     *
     * @example
     * // 在字段值变化时清除该字段错误
     * const handleFieldChange = (name: string, value: any) => {
     *   formActions.setValue(name, value);
     *   // 可以只清除当前字段的错误，这里演示清除全部
     *   formActions.clearErrors();
     * };
     *
     * @example
     * // 打开弹窗/切换 tab 时清除历史错误
     * const openModal = () => {
     *   formActions.clearErrors();
     *   setModalVisible(true);
     * };
     *
     * @example
     * // 结合验证使用：先清错再验证
     * const validateClean = async () => {
     *   await formActions.clearErrors();
     *   await formActions.validateForm();
     * };
     */
    clearErrors(): Promise<void>;
    /**
     * 只拣取表单中存在的字段，过滤掉不在表单配置中的值
     * 常用于提交数据前清理多余的字段，只保留真正需要提交的表单字段
     * @returns 只包含有效表单字段值的对象
     * @example
     * // 基础用法：获取纯净的表单数据
     * const handleSubmit = async () => {
     *   await formActions.validateForm();
     *   const errors = formActions.getErrors();
     *   if (errors.length === 0) {
     *     // 只提交表单中定义的字段，过滤掉临时变量
     *     const cleanData = formActions.pickFormValues();
     *     await api.saveData(cleanData);
     *   }
     * };
     *
     * @example
     * // 对比 getValues 和 pickFormValues
     * // 假设 formStore.values = { username: 'tom', tempId: 'xxx', extra: 'data' }
     * // form 只配置了 username（有 label）和 noLabelField（无 label）字段
     * const allValues = formActions.getValues();
     * // allValues = { username: 'tom', tempId: 'xxx', extra: 'data' }
     *
     * const formValues = formActions.pickFormValues();
     * // formValues = { username: 'tom' }  // 只包含同时有 name 和 label 的表单字段
     *
     * @example
     * // 编辑场景：合并原始数据和新填写的表单字段
     * const handleSave = async () => {
     *   const formData = formActions.pickFormValues();
     *   const submitData = {
     *     ...originalRecord,  // 保留原始记录的其他字段
     *     ...formData         // 用新填写的表单字段覆盖
     *   };
     *   await api.update(submitData);
     * };
     */
    pickFormValues(): any;
}
export { FormActions };
