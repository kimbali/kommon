function downloadPDF(pdfUrl) {
  const link = document.createElement('a');
  link.href = pdfUrl;

  link.setAttribute('download', 'file.pdf');
  link.style.display = 'none';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export default downloadPDF;
