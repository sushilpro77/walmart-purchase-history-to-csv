// This will automatically download the CSV file
// Place downloaded CSV file with jar file

const orderInfoCard = document.querySelector('[data-testid="orderInfoCard"]');
const resultCSV = extractDataFromHTML(orderInfoCard);

// Create a Blob containing the CSV data
const blob = new Blob([resultCSV], { type: 'text/csv' });

// Create a download link
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'data.csv';
link.textContent = 'Download CSV';

// Append the link to the body
document.body.appendChild(link);
link.click();
document.body.removeChild(link);



function extractDataFromHTML(htmlElement) {
  const categoryAccordions = htmlElement.querySelectorAll('[data-testid^="category-accordion-"]');

  const dataArray = ["Title,Image,Laxman,Pradip,Prashant,Rajiv,Sushil,Price"]; // Include the title in the header

  Array.from(categoryAccordions).forEach(categoryAccordion => {
      const pb0Divs = categoryAccordion.querySelectorAll('.pb0');

      Array.from(pb0Divs).forEach(pb0Div => {
          let productName = pb0Div.querySelector('[data-testid="productName"]').textContent.trim();
          // Remove commas from the product name
          productName = productName.replace(/,/g, '');
          
          const priceText = pb0Div.querySelector('.column3').textContent.trim().replace('$', '');
          const price = parseFloat(priceText);

          // Get the image URL
          const imageUrl = pb0Div.querySelector('.relative img').getAttribute('src').split('?')[0];;

          // Replace zero '0' with an empty string
          const formattedPrice = price === 0 ? '' : price;

          // Create a row with product name as the first element, price as the last element, and others as empty values
          const row = `"${productName}","${imageUrl}",1,1,1,1,1,${formattedPrice}`;
          dataArray.push(row);
      });
  });

  return dataArray.join('\n'); // Join the rows with newline character
}