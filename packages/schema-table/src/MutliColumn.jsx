export default function MutliColumn(context) {
  const { itemColumn } = context.props

  const ElTableColumnDefaultSlot = (scope) => {
    return (
      <span>{ scope.row[scope.column.property] }</span>
    )
  }

  const children = Array.isArray(itemColumn.children) && itemColumn.children.map(t => {
    return (
      <MutliColumn
        item-column={t}
        scopedSlots={{
          default(scope) {
            console.log("scope", scope)
            return ElTableColumnDefaultSlot(scope)
          }
        }}
      >
      </MutliColumn>
    )
  })

  return (
    <el-table-column
      label={itemColumn.label}
      prop={itemColumn.prop}
      { ...(itemColumn.attrs || {}) }
      scopedSlots={{
        default(scope) {
          return ElTableColumnDefaultSlot(scope)
        }
      }}
    >
      { children }
    </el-table-column>
  )
}