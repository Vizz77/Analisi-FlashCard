import Papa from 'papaparse';

export const parseCSV = (csvContent) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvContent, {
      delimiter: ";", // The file uses semicolons
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.replace('# ', '').trim(), // Handle "# Fronte;Retro"
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn("CSV Parsing Errors:", results.errors);
        }
        // Filter out empty rows or rows without both sides
        const cards = results.data.filter(row => row.Fronte && row.Retro).map((row, index) => ({
            id: index,
            front: row.Fronte,
            back: row.Retro
        }));
        resolve(cards);
      },
      error: (err) => {
        reject(err);
      }
    });
  });
};
