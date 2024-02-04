let productsData = [];

function renderProducts(products) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        // Customize the product card display as per your needs
        productDiv.innerHTML = `
            <img src="${product['Product Image Url']}" alt="${product['Product Name']}">
            <h3>${product['Product Name']}</h3>
            <p>Price: ${product['SalePrice']}</p>
            <p>Orders: ${product['Orders']}</p>
            <p>Discount: ${product['Discount(%)']}</p>
        `;

        productsDiv.appendChild(productDiv);
    });
}

function filterProducts() {
    const maxPrice = document.getElementById('price').value;
    const minOrders = document.getElementById('orders').value;
    const minDiscount = document.getElementById('discount').value;

    const filteredProducts = productsData.filter(product => {
        return (
            (!maxPrice || parseFloat(product['SalePrice']) <= parseFloat(maxPrice)) &&
            (!minOrders || parseInt(product['Orders']) >= parseInt(minOrders)) &&
            (!minDiscount || parseFloat(product['Discount(%)']) >= parseFloat(minDiscount))
        );
    });

    renderProducts(filteredProducts);
}

function loadExcelFile() {
    const fileName = 'items.xls';

    fetch(fileName)
        .then(response => response.arrayBuffer())
        .then(data => {
            return XlsxPopulate.fromDataAsync(data);
        })
        .then(workbook => {
            const firstSheet = workbook.sheet(0);
            productsData = firstSheet.usedRange().value();

            renderProducts(productsData);
        })
        .catch(error => console.error('Error loading Excel file:', error));
}

window.onload = loadExcelFile;
