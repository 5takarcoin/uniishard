import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { tableStyleType } from "@/utils/types";

export default function SelectExistingTable({
  currentTable,
  setCurrentTable,
  tables,
}: {
  currentTable: tableStyleType | null;
  setCurrentTable: React.Dispatch<React.SetStateAction<tableStyleType | null>>;
  tables: tableStyleType[];
}) {
  return (
    <Select
      value={currentTable?.name || undefined}
      onValueChange={(value) => {
        const selectedTable = tables.find((table) => table.name === value);
        setCurrentTable(selectedTable || null);
      }}
    >
      <SelectTrigger id="popup-select-trigger" className="w-32">
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent position="popper">
        {tables.map((table: tableStyleType, i: number) => (
          <SelectItem key={i} value={table.name}>
            {table.name}
            {table._id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
