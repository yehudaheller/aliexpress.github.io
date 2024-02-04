// Your product data will be loaded dynamically from the Excel file
let productsData = [];

// Function to render products based on filters
function renderProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product['Product Image Url']}" alt="${product['Product Name']}">
            <h3>${product['Product Name']}</h3>
            <p>Price: ${product['SalePrice']}</p>
            <p>Orders: ${product['Orders']}</p>
            <p>Discount: ${product['Discount(%)']}</p>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Function to filter products based on user input
function filterProducts() {
    const maxPrice = parseFloat(document.getElementById('priceFilter').value) || Infinity;
    const minOrders = parseInt(document.getElementById('ordersFilter').value) || 0;
    const minDiscount = parseFloat(document.getElementById('discountFilter').value) || 0;

    const filteredProducts = productsData.filter(product => {
        const price = parseFloat(product['SalePrice'].replace('USD ', ''));
        const orders = parseInt(product['Orders']);
        const discount = parseFloat(product['Discount(%)']);

        return price <= maxPrice && orders >= minOrders && discount >= minDiscount;
    });

    renderProducts(filteredProducts);
}

// Function to load Excel file and convert it to JSON
function loadExcelFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xls';

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assuming the first sheet contains your data
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                productsData = XLSX.utils.sheet_to_json(firstSheet);

                // Render the products
                renderProducts(productsData);
            };

            reader.readAsArrayBuffer(file);
        }
    });

    fileInput.click();
}

// Call the function to load the Excel file when the page loads
window.onload = loadExcelFile;
