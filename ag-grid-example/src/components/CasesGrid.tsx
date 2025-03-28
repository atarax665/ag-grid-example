import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ColDef,
  GridReadyEvent,
  CellStyle,
  ValidationModule
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
  DateFilterModule,
  ValidationModule,
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
    suppressMovable: false,
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      fontSize: '14px',
      color: '#1a1a1a'
    } as CellStyle,
    headerClass: 'ag-theme-custom-header'
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
      },
      cellStyle: { fontWeight: '500' } as CellStyle
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: 'agSetColumnFilter',
      cellRenderer: (params: any) => (
        <div
          style={{
            padding: '4px 12px',
            borderRadius: '12px',
            backgroundColor: params.value === 'In Progress' ? '#e3f2fd' :
                           params.value === 'Completed' ? '#e8f5e9' :
                           params.value === 'Pending Review' ? '#fff3e0' :
                           params.value === 'Archived' ? '#f5f5f5' : '#f5f5f5',
            color: params.value === 'In Progress' ? '#1976d2' :
                   params.value === 'Completed' ? '#2e7d32' :
                   params.value === 'Pending Review' ? '#ed6c02':
                   params.value === 'Archived' ? '#616161' : '#616161',
            width: 'fit-content',
            fontSize: '13px',
            fontWeight: 500
          }}
        >
          {params.value}
        </div>
      )
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
      },
      cellStyle: { justifyContent: 'center' } as CellStyle
    },
    {
      field: 'releasableFiles',
      headerName: 'Released Files',
      filter: 'agTextColumnFilter',
      cellStyle: { justifyContent: 'center' } as CellStyle
    },
    {
      headerName: 'Actions',
      filter: false,
      cellRenderer: () => (
        <Button 
          variant="text" 
          color="primary"
          size="small"
          sx={{ 
            minWidth: 'unset',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        >
          View
        </Button>
      ),
      cellStyle: { justifyContent: 'center' } as CellStyle
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
          style={{
            backgroundColor: 'rgb(26, 35, 126)', 
            color: 'white',
          }}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (gridApi) {
              const searchValue = e.target.value.toLowerCase();
              gridApi.setFilterModel({
                caseName: {
                  type: 'contains',
                  filter: searchValue
                }              
            });
            }
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </Box>

      <div 
        className="ag-theme-material" 
        style={{ 
          height: 600, 
          width: '100%', 
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <style>
          {`
            .ag-theme-material {
              --ag-header-height: 48px;
              --ag-header-foreground-color: #666666;
              --ag-header-background-color: #fafafa;
              --ag-row-hover-color: #f5f5f5;
              --ag-selected-row-background-color: rgba(25, 118, 210, 0.08);
              --ag-font-family: inherit;
              --ag-font-size: 14px;
              --ag-cell-horizontal-padding: 16px;
              --ag-borders: none;
              --ag-border-color: #f0f0f0;
              --ag-row-border-color: #f0f0f0;
              --ag-checkbox-border-radius: 4px;
            }
            .ag-theme-material .ag-header-cell {
              font-weight: 600;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .ag-theme-material .ag-row {
              border-bottom-style: solid;
              border-bottom-width: 1px;
              border-bottom-color: #f0f0f0;
            }
            .ag-theme-material .ag-row-selected {
              border-bottom-color: #f0f0f0;
            }
          `}
        </style>
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
          rowHeight={52}
          headerHeight={48}
          suppressCellFocus={true}
        />
      </div>
    </Box>
  );
};

export default CasesGrid; 