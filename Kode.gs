// ID Spreadsheet tujuan penyimpanan
const SPREADSHEET_ID = "1vMyt0xOXp7oBTMcbg518QZytxI-ma6TmyR-osCczmZY";

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Ujian Online Limit Matematika');
}

// Fungsi untuk menyimpan hasil ujian ke Google Sheets
function simpanHasil(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('Hasil Ujian');
    
    // Buat sheet baru jika belum ada
    if (!sheet) {
      sheet = ss.insertSheet('Hasil Ujian');
      sheet.appendRow(['Waktu', 'Kelas', 'Nama', 'NISN', 'Nilai (0-100)', 'Jumlah Benar']);
    }
    
    sheet.appendRow([
      new Date(),
      data.kelas,
      data.nama,
      "'" + data.nisn, // Tanda petik agar NISN tetap format teks/nomor
      data.nilai,
      data.jumlahBenar + " / 12"
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, message: error.toString() };
  }
}
