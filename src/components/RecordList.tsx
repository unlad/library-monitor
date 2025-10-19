import { useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Chip } from "@heroui/chip"
import { Tooltip } from "@heroui/tooltip"
import { Pagination } from "@heroui/pagination"

import { Log } from "@/hooks/interceptor"

export type RecordListProps = {
    columns: { key: string, label: string }[]
    logs: Log[]
}

export function RecordList({ columns, logs }: RecordListProps) {
    const [page, setPage] = useState(1);
  
    const rowsPerPage = 10;
    const pages = Math.ceil(logs.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return logs.slice(start, end);
    }, [page, logs]);

    return <Table
        topContent={
            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        }
    >
        <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>

        <TableBody items={items} emptyContent="Waiting for logs...">
            {(item) => (
            <TableRow key={item.timestamp}>
                {(key) => {
                let value = getKeyValue(item, key)
                if (key == "success") {
                    return <TableCell>
                    <Chip variant="shadow" color={value ? "success" : "danger"}>
                        {value ? "Success" : "Failed"}
                    </Chip>
                    </TableCell>
                } else if (key == "timestamp") {
                    return <TableCell>
                        {new Date(value).toLocaleTimeString()}
                    </TableCell>
                } else if (key == "remarks") {
                    if (value) {
                    return <TableCell>
                        <Tooltip color="foreground" content={value}>
                        ?
                        </Tooltip>
                    </TableCell>
                    } else return <TableCell>{null}</TableCell>
                } else return <TableCell>{value}</TableCell>
                }}
            </TableRow>
            )}
        </TableBody>
    </Table>
}