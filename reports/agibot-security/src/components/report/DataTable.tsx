import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableColumn<T extends string> = {
  key: T;
  header: string;
  widthClass?: string;
};

export function DataTable<T extends string>({
  columns,
  rows,
  caption,
  source,
}: {
  columns: DataTableColumn<T>[];
  rows: Record<T, string>[];
  caption?: string;
  source?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          {caption ? <caption className="caption-bottom p-3 text-left text-xs text-foreground/60">{caption}</caption> : null}
          <TableHeader>
            <TableRow className="bg-[color-mix(in_oklch,white_4%,transparent)]">
              {columns.map((c) => (
                <TableHead key={c.key} className={c.widthClass ?? "whitespace-nowrap"}>
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, idx) => (
              <TableRow key={idx}>
                {columns.map((c) => (
                  <TableCell key={c.key} className="align-middle whitespace-normal break-words leading-relaxed">
                    {r[c.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {source ? (
        <div className="border-t border-border p-3 text-xs text-foreground/60">{source}</div>
      ) : null}
    </div>
  );
}
