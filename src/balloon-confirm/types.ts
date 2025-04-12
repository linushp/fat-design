// import { InterceptorProps } from '../river-component-interceptor'

export interface BalloonConfirmProps {
  prefix?: string
  locale?: any
  className?: string
  /**
   * 在点击确定按钮时触发的回调函数
   * @param {Object} event 点击事件对象
   */
  onOk?: () => any
  /**
   * 在点击取消按钮时触发的回调函数
   * @param {Object} event 点击事件对象
   */
  onCancel?: () => void
  /**
   * 应用于确定按钮的属性对象
   */
  okProps?: object
  /**
   * 应用于取消按钮的属性对象
   */
  cancelProps?: object
  /**
   * 底部内容，设置为 false，则不进行显示
   * @default [<Button type="primary">确定</Button>, <Button>取消</Button>]
   */
  footer?: React.ReactNode
  /**
   * 底部按钮的对齐方式
   */
  footerAlign?: 'left' | 'center' | 'right'
  /**
   * 指定确定按钮和取消按钮是否存在以及如何排列,<br><br>**可选值**：
   * ['ok', 'cancel']（确认取消按钮同时存在，确认按钮在左）
   * ['cancel', 'ok']（确认取消按钮同时存在，确认按钮在右）
   * ['ok']（只存在确认按钮）
   * ['cancel']（只存在取消按钮）
   */
  footerActions?: Array<any>

  /**
   * 触发元素
   */
  trigger?: React.ReactNode
  /**
   * 触发行为
   * 鼠标悬浮, 鼠标点击('hover','click')或者它们组成的数组，如 ['hover', 'click'], 强烈不建议使用'focus'，若弹窗内容有复杂交互请使用click
   */
  triggerType?: string | Array<any>

  /**
   * 弹层在显示和隐藏触发的事件
   * @param {Boolean} visible 弹层是否隐藏和显示
   * @param {String} type 触发弹层显示或隐藏的来源， closeClick 表示由自带的关闭按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发
   */
  onVisibleChange?: (str: any) => void
  children?: React.ReactNode
  messageProps?: any
}
