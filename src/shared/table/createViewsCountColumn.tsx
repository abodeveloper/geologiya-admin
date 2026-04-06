import { ColumnDef } from "@tanstack/react-table";

type WithViewsCount = { views_count?: number };

export function createViewsCountColumn<T extends WithViewsCount>(
  t: (key: string) => string
): ColumnDef<T> {
  return {
    accessorKey: "views_count",
    header: t("Views"),
    cell: ({ row }) => {
      const count = row.original.views_count;
      const n = Number(count);
      if (count == null || Number.isNaN(n)) {
        return <div className="text-muted-foreground tabular-nums">-</div>;
      }
      return (
        <div className="whitespace-nowrap font-medium tabular-nums">
          {n.toLocaleString()}
        </div>
      );
    },
  };
}
