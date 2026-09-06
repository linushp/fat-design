import React from 'react';

// Form Demos
import { DemoForm1 } from './demo-form1';
import { DemoForm2 } from './demo-form2';
import { DemoForm3 } from './demo-form3';
import { DemoFormLayout } from './demo-form-layout';
import { DemoFormValidation } from './demo-form-validation';
import { DemoFormConditional } from './demo-form-conditional';
import { DemoFormButtons } from './demo-form-buttons';
import { DemoFormStateManipulation } from './demo-form-state-manipulation';
import { DemoQueryForm } from './demo-query-form';
import { DemoQueryFormSimple } from './demo-query-form-simple';
import { DemoFormTable } from './demo-form-table';
import { DemoBatchInput } from './demo-batchinput';

// Table Demos
import { DemoTablePro } from './demo-table-pro';
import { DemoTableCellContext } from './demo-table-cell-context';
import { DemoSortableTable } from './demo-sortable-table';

// Dialog & Feedback Demos
import { DemoDialogShow } from './demo-dialog-show';
import { DemoDialogTab } from './demo-dialog-tab';
import { DemoDrawerShow } from './demo-drawer-show';
import { DemoDrawerDetail } from './demo-drawer-detail';
import DemoMessage from './demo-message';
import { DemoLoading } from './demo-loading';
import { DemoSkeleton } from './demo-skeleton';

// Comments Demos
import { ArticleComments, SimpleComments, TicketComments } from './demo-comments/index';

// Component Demos
import { DemoButtons } from './demo-buttons';
import { DemoUpload } from './demo-upload';
import DemoSimpleUpload from './demo-simple-upload';
import { DemoMenuButton } from './demo-menu-button';
import { DemoFilter } from './demo-filter';
import { DemoTab } from './demo-tab';
import { DemoImage } from './demo-image';
import { DemoCardCollapsible } from './demo-card-collapsible';
import DemoIcons from './demo-icons';
import DemoColorPicker from './demo-colorpicker';
import BoxV2Examples from './BoxV2Examples';

// CRUD & Page Demos
import { DemoDetailPage } from './demo-detail-page';
import { CurdApiDetail } from './demo-crud-api/curd-api-detail';

// Utility Demos
import { DemoTmp } from './demo-tmp';

export interface DemoItem {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType;
}

export interface DemoCategory {
  id: string;
  title: string;
  demos: DemoItem[];
}

export const demoRegistry: DemoCategory[] = [
  {
    id: 'form',
    title: '表单组件',
    demos: [
      { id: 'form1', title: '基础表单', description: '基础表单验证与交互', component: DemoForm1 },
      { id: 'form2', title: '表单联动', description: '表单字段联动效果', component: DemoForm2 },
      { id: 'form3', title: '复杂表单', description: '复杂场景表单示例', component: DemoForm3 },
      { id: 'form-validation', title: '表单验证', description: '各种验证规则示例', component: DemoFormValidation },
      { id: 'form-conditional', title: '条件渲染', description: '条件显示/禁用/只读', component: DemoFormConditional },
      { id: 'form-buttons', title: '表单按钮', description: '按钮配置与控制', component: DemoFormButtons },
      { id: 'form-state', title: '状态联动', description: '程序化控制表单状态', component: DemoFormStateManipulation },
      { id: 'form-layout', title: '表单布局', description: '多种表单布局展示', component: DemoFormLayout },
      { id: 'query-form', title: '查询表单', description: '高级查询表单', component: DemoQueryForm },
      { id: 'query-form-simple', title: '简单查询表单', description: '简化版查询表单', component: DemoQueryFormSimple },
      { id: 'form-table', title: '表单表格', description: '表单与表格结合', component: DemoFormTable },
      { id: 'batch-input', title: '批量输入', description: '批量数据录入', component: DemoBatchInput },
    ]
  },
  {
    id: 'table',
    title: '表格组件',
    demos: [
      { id: 'table-pro', title: '专业表格', description: 'TablePro 完整功能', component: DemoTablePro },
      { id: 'table-cell-context', title: '单元格 Context', description: 'cell 第 4 个参数 context 用法', component: DemoTableCellContext },
      { id: 'sortable-table', title: '可排序表格', description: '拖拽排序表格', component: DemoSortableTable },
    ]
  },
  {
    id: 'dialog',
    title: '对话框与反馈',
    demos: [
      { id: 'dialog-show', title: '对话框展示', description: 'Dialog 各种展示方式', component: DemoDialogShow },
      { id: 'dialog-tab', title: '对话框 Tab', description: 'Dialog header 显示 Tab 的几种方案', component: DemoDialogTab },
      { id: 'drawer-show', title: '抽屉展示', description: 'Drawer 抽屉组件', component: DemoDrawerShow },
      { id: 'drawer-detail', title: '右滑详情页', description: '列表点击从右侧滑出详情页', component: DemoDrawerDetail },
      { id: 'message', title: '消息提示', description: 'Message 消息反馈', component: DemoMessage },
      { id: 'loading', title: '加载状态', description: 'Loading 加载组件', component: DemoLoading },
      { id: 'skeleton', title: '骨架屏', description: 'Skeleton 占位加载', component: DemoSkeleton },
    ]
  },
  {
    id: 'comments',
    title: '评论组件',
    demos: [
      { id: 'comments-article', title: '文章评论区', description: '技术博客/新闻文章评论场景', component: ArticleComments },
      { id: 'comments-simple', title: '简单评论区', description: '公告/新闻简单留言场景', component: SimpleComments },
      { id: 'comments-ticket', title: '工单客服系统', description: '客服工单/用户反馈场景', component: TicketComments },
    ]
  },
  {
    id: 'component',
    title: '基础组件',
    demos: [
      { id: 'buttons', title: '按钮组件', description: 'Button 各种类型', component: DemoButtons },
      { id: 'upload', title: '文件上传', description: 'Upload 上传组件', component: DemoUpload },
      { id: 'simple-upload', title: '简单上传', description: '简化版上传', component: DemoSimpleUpload },
      { id: 'menu-button', title: '菜单按钮', description: 'MenuButton 下拉菜单', component: DemoMenuButton },
      { id: 'filter', title: '筛选器', description: 'Filter 筛选组件', component: DemoFilter },
      { id: 'tab', title: '标签页', description: 'Tab 切换组件', component: DemoTab },
      { id: 'image', title: '图片组件', description: 'Image 图片展示', component: DemoImage },
      { id: 'card-collapsible', title: '可折叠卡片', description: 'Card collapsible 收起/展开', component: DemoCardCollapsible },
      { id: 'icons', title: '图标组件', description: 'Icon 图标库', component: DemoIcons },
      { id: 'color-picker', title: '颜色选择器', description: 'ColorPicker 选色', component: DemoColorPicker },
      { id: 'box-v2', title: 'Box 布局', description: 'BoxV2 布局系统', component: BoxV2Examples },
    ]
  },
  {
    id: 'crud',
    title: 'CRUD 页面',
    demos: [
      { id: 'detail-page', title: '详情页面', description: 'DetailPage 详情展示', component: DemoDetailPage },
      { id: 'curd-api-detail', title: 'CRUD API 示例', description: '完整 CRUD 操作演示', component: CurdApiDetail },
    ]
  },
  {
    id: 'utility',
    title: '工具与临时',
    demos: [
      { id: 'tmp', title: '临时测试', description: 'Tmp 开发测试用', component: DemoTmp },
    ]
  }
];

// Flatten all demos for easy lookup
export const allDemos: DemoItem[] = demoRegistry.flatMap(cat => cat.demos);

export function getDemoById(id: string): DemoItem | undefined {
  return allDemos.find(demo => demo.id === id);
}

// Get default demo (first one)
export function getDefaultDemo(): DemoItem {
  return demoRegistry[0].demos[0];
}
