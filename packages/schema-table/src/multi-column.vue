<script>
export default {
  name: "MultiColumn",
  functional: true,
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  render(h, ctx) {
    const { item } = ctx.props;
    const CellContent = ctx.parent.cellContent;
    const children =
      item.children && Array.isArray(item.children) && item.children.length > 0
        ? item.children.map((child) =>
            h("mutli-column", {
              attrs: { item: child },
              scopedSlots: {
                default(props) {
                  if (CellContent) {
                    return CellContent.call(ctx, h, {
                      row: props.row,
                      $index: props.$index,
                      label: props.column.label,
                      prop: props.column.property,
                    });
                  }
                  return h("span", [props.row[props.column.property]]);
                },
              },
            })
          )
        : null;
    return h(
      "el-table-column",
      {
        attrs: {
          label: item.label,
          prop: item.prop,
          ...(item.attrs || {}),
        },
        scopedSlots: {
          default(props) {
            if (CellContent) {
              return CellContent.call(ctx, h, {
                row: props.row,
                $index: props.$index,
                label: props.column.label,
                prop: props.column.property,
              });
            }
            return h("span", [props.row[props.column.property]]);
          },
        },
      },
      children
    );
  },
};
</script>
