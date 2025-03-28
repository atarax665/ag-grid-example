import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ColDef,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Case } from '../types/Case';
import { Box, Button, TextField, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

// Register AG Grid Modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule
]);

interface CasesGridProps {
  cases: Case[];
}

const dateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    if (!cellValue) return -1;
    const cellDate = new Date(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) return 0;
    if (cellDate < filterLocalDateAtMidnight) return -1;
    if (cellDate > filterLocalDateAtMidnight) return 1;
    return 0;
  }
};

const CasesGrid: React.FC<CasesGridProps> = ({ cases }) => {
  const [gridApi, setGridApi] = useState<any>(null);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
  }), []);

  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: 'caseName',
      headerName: 'Case Name',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains', 'equals', 'startsWith', 'endsWith'],
        defaultOption: 'contains'
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: 'agSetColumnFilter'
    },
    {
      field: 'created',
      headerName: 'Created',
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams,
      valueFormatter: (params) => 
        params.value ? new Date(params.value).toLocaleDateString() : ''
    },
    {
      field: 'due',
      headerName: 'Due',
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams,
      valueFormatter: (params) => 
        params.value ? new Date(params.value).toLocaleDateString() : '-'
    },
    {
      field: 'totalFiles',
      headerName: 'Total Files',
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'lessThan', 'greaterThan']
      }
    },
    {
      field: 'releasableFiles',
      headerName: 'Releasable Files',
      filter: 'agTextColumnFilter'
    },
    {
      headerName: 'Actions',
      filter: false,
      floatingFilter: false,
      cellRenderer: () => (
        <Button variant="text" color="primary">
          View
        </Button>
      )
    }
  ], []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Cases
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Create New
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => gridApi?.setQuickFilter(e.target.value)}
          sx={{ width: 300 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </Box>

      <div className="ag-theme-material" style={{ height: 600, width: '100%', border: '1px solid rgba(0,0,0,0.12)' }}>
        <AgGridReact
          modules={[ClientSideRowModelModule, TextFilterModule, NumberFilterModule, DateFilterModule]}
          rowData={cases}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
        />
      </div>
    </Box>
  );
};

export default CasesGrid; 