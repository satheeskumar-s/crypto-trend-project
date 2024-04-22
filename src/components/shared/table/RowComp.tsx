import { GridColDef } from '@mui/x-data-grid';
import { defaultLoadingRowCount } from '../../../config/pagination';

export const sampleRowFromColumn = (
  columns: Array<GridColDef>,
  rowCount = defaultLoadingRowCount
) => {
  const rows: Array<{ id: string; [field: string]: string }> = [];

  Array.from({ length: rowCount }).map((_, eachNum) => {
    const row: { id: string; [field: string]: string } = {
      id: `id-${eachNum}`,
    };

    // columns.map((eachCol) => {
    //   row[eachCol.field] = ``;
    // });

    rows.push(row);
  });

  return rows;
};
