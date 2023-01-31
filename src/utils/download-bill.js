import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function downloadBill(docDefinition) {
  const date = new Date();

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake
    .createPdf({ content: docDefinition, pageMargins: [60, 60, 60, 60] })
    .download(`my-preview-bill-${date.toISOString().split('T')[0]}.pdf`);
}

export default downloadBill;
