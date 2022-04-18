<!--
 * @Author: 王鑫
 * @Description: 表单组件
 * @Date: 2022-04-08 14:24:24
-->
<template>
  <div class="table_component clearfix hover_color">
    <el-table
      :data="props.data"
      :show-header="props.showHeader"
      :border="props.border"
      :max-height="tableHeight"
      v-loading="props.loading"
      :class="props.className"
      tooltip-effect="dark"
      element-loading-text="给我一点时间"
      fit
      :show-summary="props.showSummary"
      :default-sort="props.defaultSort"
      :highlight-current-row="false"
      style="width: 100%"
      @select="select"
      @row-contextmenu="testrightClick"
      @row-dblclick="rowdblclick"
      @row-click="rowClick"
      @selection-change="onSelectionChange"
      @cell-click="cellClick"
      @sort-change="sortChange"
      :span-method="props.objectSpanMethod"
      :height="props.rowHeight"
      :row-class-name="props.rowClassName"
      ref="eltable"
    >
      <el-table-column
        class="check-all"
        label="全选"
        width="35"
        type="selection"
        fixed="left"
        v-if="isShowCheckBox"
      ></el-table-column>
      <el-table-column
        label="编号"
        type="index"
        width="55"
        class-name="index_class"
        v-if="isShowIndex"
        fixed="left"
      ></el-table-column>
      <el-table-column label=" " width="20" v-if="isShowNull"></el-table-column>
      <!-- 使用v-for遍历 -->
      <template v-for="(colConfig, index) in colConfigs">
        <!-- slot 添加自定义配置项 -->
        <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
        <!-- component 特殊处理某一项 -->
        <el-table-column
          v-else
          :key="index"
          v-bind="colConfig"
          :show-overflow-tooltip="!Boolean(colConfig.maxLength)"
        >
          <template v-if="colConfig.headTip" #header>
            <span>{{ colConfig.label }}</span>
            <HelpTip :tip="colConfig.headTip" />
          </template>
          <template v-if="colConfig.prop" v-slot="{ row }">
            <template
              v-if="
                row[colConfig.prop] !== null &&
                row[colConfig.prop] !== undefined &&
                row[colConfig.prop] !== ''
              "
            >
              <el-tooltip
                v-if="
                  colConfig.maxLength && row[colConfig.prop].toString().length > colConfig.maxLength
                "
                popper-class="table-popper"
                :content="row[colConfig.prop]"
                placement="top-end"
                effect="dark"
              >
                <span :style="{ color: colConfig.isNum ? '#4880ff' : '#354268' }">{{
                  `${row[colConfig.prop].toString().substring(0, colConfig.maxLength)}...`
                }}</span>
              </el-tooltip>
              <template v-else>
                <span :style="{ color: colConfig.isNum ? '#4880ff' : '#354268' }">{{
                  row[colConfig.prop]
                }}</span></template
              >
            </template>
            <template v-else style="color: #777777">—</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 全选框 -->
    <div
      v-if="isShowCheckBox && showSelectAll && total > 0"
      style="top: calc(100% - 26px)"
      class="check-all"
    >
      <el-checkbox v-model="allChecked" @change="selectAll">全选</el-checkbox>
      <span>
        <span>当前已选</span>
        <span class="check-num"> {{ checkedNum || 0 }} </span>
        <span>条</span>
      </span>
    </div>
    <!-- 分页 -->
    <el-pagination
      v-if="props.pageCount"
      ref="pagination"
      class="pagination"
      background
      :pager-count="props.pagerCount"
      :layout="props.layout"
      :total="props.total"
      :currentPage="props.currentPage"
      :page-size="props.pageSize"
      :page-sizes="props.pageSizes"
      :page-count="props.pageCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    ></el-pagination>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
const props = defineProps({
  objectSpanMethod: {
    type: Function,
    default: null
  },
  // 排序
  defaultSort: {
    type: Object,
    default: () => ({})
  },
  // 表头
  colConfigs: {
    type: Array,
    default: function () {
      return []
    }
  },
  // 表格数据
  data: {
    type: Array,
    default: function () {
      return []
    }
  },
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: true
  },
  showSummary: {
    type: Boolean,
    default: false
  },
  // 固定表头的表格
  rowHeight: {
    type: String,
    default: null
  },
  // 是否带有纵向边框
  border: {
    type: Boolean,
    default: false
  },
  // 是否需要设置最大高度,弹窗中的table会用到 默认false
  isSetHeight: {
    type: Boolean,
    default: false
  },
  // loading效果
  loading: {
    type: Boolean,
    default: false
  },
  // 表格类名
  className: {
    type: String,
    default: ''
  },
  // 列表是否可选择
  isShowCheckBox: {
    type: Boolean,
    default: false
  },
  // width:{
  //   type: String,
  //   default: ""
  // },
  // 列表是否显示序号
  isShowIndex: {
    type: Boolean,
    default: false
  },
  // 是否需要右键
  isrightEvent: {
    type: Boolean,
    default: false
  },
  // 是否需要双击
  isrowdblEvent: {
    type: Boolean,
    default: false
  },
  // 是否需要点击单元格
  iscellClick: {
    type: Boolean,
    default: false
  },
  // 当前页
  currentPage: {
    type: Number,
    default: 1
  },
  // 每页条数
  pageSize: {
    type: Number,
    default: 10
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  // 总页数
  pageCount: {
    type: Number,
    default: 0
  },
  // 最大页码按钮数
  pagerCount: {
    type: Number,
    default: 7
  },
  // 排除的高度，用于计算表格最大高度
  exceptHeight: {
    type: [Number, String],
    default: 0
  },
  // 是否显示全选
  showSelectAll: {
    type: Boolean,
    default: false
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40, 50]
  },
  isShowNull: {
    type: Boolean,
    default: true
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  rowClassName: {
    type: Function,
    default: function () {}
  }
})
const emit = defineEmits([
  'rightEvent',
  'rowdblEvent',
  'select',
  'selection-change',
  'cellClick',
  'sortChange',
  'prevClick',
  'nextClick',
  'handleSizeChange',
  'handleCurrentChange',
  'rowClickEvent',
  ''
])
let tableHeight: number | null = null
let allChecked = false // 全选按钮
let checkedNum = 0 // 所选数
let selection: any[] = []// 选中项列表
const eltable: any = ref(null)

const testrightClick = (row: any, column: any, event: { cancelBubble: boolean }) => {
  if (props.isrightEvent) {
    event.cancelBubble = true
    const params = {
      row: row,
      column: column,
      event: event
    }
    emit('rightEvent', params)
  }
}
const rowdblclick = (row: any, column: any, event: any) => {
  emit('rowdblEvent', row, column, event)
}
const rowClick = (row: any, column: any, event: any) => {
  emit('rowClickEvent', row, column, event)
}
const select = (selection: any, row: any) => {
  emit('select', selection, row)
}
const selectAll = (allChecked: any) => {
  checkedNum = allChecked ? props.total : selection.length
  if (!(allChecked && selection.length === props.data.length)) {
    eltable.value.toggleAllSelection()
  } else {
    onSelectionChange(selection)
  }
}
const onSelectionChange = (_selection: any[]) => {
  selection = _selection
  if (selection.length < props.data.length) {
    allChecked = false
  }
  checkedNum = allChecked ? props.total : selection.length
  emit('selection-change', selection, allChecked)
}
const cellClick = (row: any, column: any, cell: any) => {
  emit('cellClick', row, column, cell)
}
const sortChange = (data: any) => {
  emit('sortChange', data)
}
const prevClick = (val: number) => {
  emit('prevClick', val)
}
const nextClick = (val: number) => {
  emit('nextClick', val)
}
const handleSizeChange = (val: number) => {
  emit('handleSizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emit('handleCurrentChange', val)
}
/**
 * 窗口缩放
 */
const onResize = () => {
  if (!props.isSetHeight) {
    tableHeight =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      260 -
      parseInt(props.exceptHeight.toString())
  }
}

onResize()
window.addEventListener('resize', onResize)
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>
<style lang="scss" scoped>
.table_component {
  position: relative;
  font-size: 14px;
  :deep(.el-table th.is-leaf) {
    border: none;
  }
  .check-all {
    position: absolute;
    left: 9px;
    > .el-checkbox {
      font-weight: 400;
      margin: 0 16px 0 0;
    }
    .check-num {
      color: rgba(1, 200, 179, 1);
    }
  }
  .el-pagination {
    margin-top: 20px;
    margin-right: 24px;
    float: right;
    font-weight: 400;
  }
}
.hover_color ::v-deep {
  // 鼠标悬停背景色
  .el-table__expanded-cell {
    td {
      background-color: #f8f9ff;
    }
    .el-table__header tr th {
      background: #f8f9ff;
      border-bottom: 1px solid #ebeef5;
    }
  }
  .el-table__header {
    background-color: #f8f9ff !important;
  }
  .el-table__body tr .hover-row > td {
    background-color: #f8f9ff;
  }
}
</style>
<style lang="scss">
.table-popper {
  max-width: 350px;
  line-height: 22px;
}
.el-table tr {
  .el-table__expanded-cell {
    // 样式覆盖
    padding: 0;
  }
}
// 折叠的列表隐藏箭头 && 不能折叠
.hide-expand .el-table__expand-column .cell {
  display: none;
}
</style>
