import { useMemo } from "react";
import PropTypes from "prop-types";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

const TableContent = ({
  renderCell,
  headerColumns,
  items,
  page,
  setPage,
  sortDescriptor,
  setSortDescriptor,
  totalPage,
}) => {
  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider", "text-xs", "sm:text-sm"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "text-xs",
        "sm:text-sm",
      ],
    }),
    []
  );

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden">
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectionMode="none"
        topContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No results found"} items={items}>
          {(item) => (
            <TableRow key={item.id} className="border-b-1 border-gray-200">
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalPage > 1 && (
        <div className="mt-5 py-2 px-2 flex justify-center items-center ">
          <Pagination
            showControls
            color="primary"
            page={page}
            total={totalPage}
            className="bg-white border-none"
            variant="flat"
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

TableContent.propTypes = {
  renderCell: PropTypes.func.isRequired,
  headerColumns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
    })
  ).isRequired,
  items: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  sortDescriptor: PropTypes.shape({
    column: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["ascending", "descending"]).isRequired,
  }).isRequired,
  setSortDescriptor: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
};

export default TableContent;
