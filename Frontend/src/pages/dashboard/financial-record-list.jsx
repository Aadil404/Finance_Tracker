import { useMemo, useState } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useTable, useSortBy } from "react-table";


const EditableCell = ({
    value: initialValue,
    row,
    column,
    updateRecord,
    editable,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        setIsEditing(false);
        updateRecord(row.index, column.id, value)
    }

    return (
      <div
        onClick={() => {
          editable && setIsEditing(true);
        }}
        style={{cursor: editable? "pointer" : "default"}}
      >
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            autoFocus
            onBlur={onBlur}
            style={{ width: "100%" }}
          />
        ) : typeof value === "string" ? (
          value
        ) : (
          value.toString()
        )}
      </div>
    );
  };

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();

  const updateCellRecord = (rowIndex, columnId, value) => {
    const id = records[rowIndex]?._id;
    updateRecord(id ?? "", {...records[rowIndex], [columnId]: value});

  }


  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props) => (
            <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
            <EditableCell {...props} updateRecord={updateCellRecord} editable={false} />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({row}) => (
          <button className="button-delete" onClick={() => deleteRecord(row.original._id ?? "")}>
            Delete
          </button>

        ),
      },
    ],
    [records]
  );


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: records},useSortBy);

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => {
            const { key: hgKey, ...hgProps } = hg.getHeaderGroupProps();
            return (
              <tr key={hgKey} {...hgProps}>
                {hg.headers.map((column) => {
                  const { key: colKey, ...colProps } = column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <th key={colKey} {...colProps}>
                      {column.render("Header")}
                      {column.isSorted && <span>{column.isSortedDesc ?  " ▲" : " ▼"}</span>}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
          
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            const { key: rowKey, ...rowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...rowProps}>
                {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                    return(
                        <td key={cellKey} {...cellProps}>
                            {cell.render("Cell")}
                        </td>
                    )
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
