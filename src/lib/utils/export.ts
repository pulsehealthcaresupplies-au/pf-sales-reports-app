import * as ExcelJS from 'exceljs';

export interface ExportData {
  headers: string[];
  rows: (string | number)[][];
  title?: string;
}

/**
 * Export data to CSV format
 */
export function exportToCSV(data: ExportData): void {
  const { headers, rows, title } = data;
  
  // Create CSV content
  let csvContent = '';
  
  // Add title if provided
  if (title) {
    csvContent += `${title}\n\n`;
  }
  
  // Add headers
  csvContent += headers.join(',') + '\n';
  
  // Add rows
  rows.forEach((row) => {
    csvContent += row.map((cell) => {
      // Escape commas and quotes in cell values
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(',') + '\n';
  });
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${title || 'export'}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export data to Excel (XLSX) format
 */
export async function exportToExcel(data: ExportData): Promise<void> {
  const { headers, rows, title } = data;
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(title || 'Sheet1');
  
  // Add title row if provided
  if (title) {
    worksheet.mergeCells(1, 1, 1, headers.length);
    worksheet.getCell(1, 1).value = title;
    worksheet.getCell(1, 1).font = { size: 16, bold: true };
    worksheet.getCell(1, 1).alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.addRow([]); // Empty row
  }
  
  // Add headers
  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' },
  };
  
  // Add data rows
  rows.forEach((row) => {
    worksheet.addRow(row);
  });
  
  // Auto-size columns
  worksheet.columns.forEach((column) => {
    if (column.header) {
      column.width = Math.max(15, column.header.toString().length + 2);
    }
  });
  
  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${title || 'export'}_${new Date().toISOString().split('T')[0]}.xlsx`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
