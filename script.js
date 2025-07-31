document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const customerNameInput = document.getElementById('customerName');
    const invoiceDateInput = document.getElementById('invoiceDate');
    const invoiceNumberInput = document.getElementById('invoiceNumber');
    const itemTableBody = document.getElementById('itemTableBody');
    const addItemBtn = document.getElementById('addItemBtn');
    const subtotalDisplay = document.getElementById('subtotalDisplay');
    const gstDisplay = document.getElementById('gstDisplay');
    const grandTotalDisplay = document.getElementById('grandTotalDisplay');
    const generateInvoiceBtn = document.getElementById('generateInvoiceBtn');
    const downloadInvoiceBtn = document.getElementById('downloadInvoiceBtn');
    const resetBtn = document.getElementById('resetBtn');
    const invoicePreview = document.getElementById('invoicePreview');

    const GST_RATE = 0.18; // 18% GST

    /**
     * Initializes the invoice form with today's date and a generated invoice number.
     */
    function initializeForm() {
        // Set today's date
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        invoiceDateInput.value = `${yyyy}-${mm}-${dd}`;

        // Set the invoice number to start from INV-BG-001
        invoiceNumberInput.value = `INV-BG-001`;

        // Add the first item row
        addItemRow();
        calculateTotals();
    }

    /**
     * Creates and appends a new item row to the item table.
     */
    function addItemRow() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" class="item-name" placeholder="Item Name" required></td>
            <td><input type="number" class="item-quantity" value="1" min="1" required></td>
            <td><input type="number" class="item-price" value="0.00" min="0" step="0.01" required></td>
            <td><input type="number" class="item-discount" value="0" min="0" max="100" step="0.01"></td>
            <td><span class="item-total">₹ 0.00</span></td>
            <td><button class="remove-item-btn">Remove</button></td>
        `;

        itemTableBody.appendChild(row);

        // Add event listeners for the new row's inputs and remove button
        const quantityInput = row.querySelector('.item-quantity');
        const priceInput = row.querySelector('.item-price');
        const discountInput = row.querySelector('.item-discount');
        const removeBtn = row.querySelector('.remove-item-btn');

        quantityInput.addEventListener('input', calculateTotals);
        priceInput.addEventListener('input', calculateTotals);
        discountInput.addEventListener('input', calculateTotals);
        removeBtn.addEventListener('click', () => {
            row.remove();
            calculateTotals();
            // If all rows are removed, add one back to prevent empty table
            if (itemTableBody.children.length === 0) {
                addItemRow();
            }
        });

        // Focus on the new item name input for better UX
        row.querySelector('.item-name').focus();
    }

    /**
     * Calculates subtotal, GST, and grand total based on current item entries.
     * Updates the display elements.
     */
    function calculateTotals() {
        let subtotal = 0;
        const itemRows = itemTableBody.querySelectorAll('tr');

        itemRows.forEach(row => {
            const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const discount = parseFloat(row.querySelector('.item-discount').value) || 0;

            let itemTotal = quantity * price;
            // Apply discount
            if (discount > 0) {
                itemTotal -= itemTotal * (discount / 100);
            }

            row.querySelector('.item-total').textContent = `₹ ${itemTotal.toFixed(2)}`;
            subtotal += itemTotal;
        });

        const gst = subtotal * GST_RATE;
        const grandTotal = subtotal + gst;

        subtotalDisplay.textContent = `₹ ${subtotal.toFixed(2)}`;
        gstDisplay.textContent = `₹ ${gst.toFixed(2)}`;
        grandTotalDisplay.textContent = `₹ ${grandTotal.toFixed(2)}`;
    }

    /**
     * Generates the HTML content for the invoice preview.
     */
    function generateInvoiceContent() {
        const customerName = customerNameInput.value.trim();
        const invoiceDate = invoiceDateInput.value;
        const invoiceNumber = invoiceNumberInput.value;
        const subtotal = subtotalDisplay.textContent;
        const gst = gstDisplay.textContent;
        const grandTotal = grandTotalDisplay.textContent;

        if (!customerName) {
            alert('Please enter Customer Name before generating invoice.');
            return '';
        }

        let itemsHtml = '';
        const itemRows = itemTableBody.querySelectorAll('tr');
        let hasValidItem = false; // Flag to check if at least one valid item exists

        itemRows.forEach(row => {
            const itemName = row.querySelector('.item-name').value.trim();
            const quantity = parseFloat(row.querySelector('.item-quantity').value);
            const price = parseFloat(row.querySelector('.item-price').value);
            const discount = parseFloat(row.querySelector('.item-discount').value);

            // Only include items that have a name, positive quantity, and non-negative price
            if (itemName && quantity > 0 && price >= 0) {
                hasValidItem = true;
                let itemTotal = quantity * price;
                if (discount > 0) {
                    itemTotal -= itemTotal * (discount / 100);
                }
                itemTotal = itemTotal.toFixed(2);

                itemsHtml += `
                    <tr>
                        <td>${itemName}</td>
                        <td>${quantity}</td>
                        <td>₹ ${price.toFixed(2)}</td>
                        <td>${discount.toFixed(2)}%</td>
                        <td>₹ ${itemTotal}</td>
                    </tr>
                `;
            }
        });

        if (!hasValidItem) {
            alert('Please add at least one valid item (with name, quantity > 0, and price >= 0) before generating invoice.');
            return '';
        }

        const invoiceHtml = `
            <div class="invoice-document">
                <div class="invoice-header">
                    <h2>Invoice</h2>
                    <p><strong>Bhagya Groups</strong></p>
                    <p>Beeramguda, Telangana, India</p>
                    <p>Date: ${invoiceDate}</p>
                    <p>Invoice No: ${invoiceNumber}</p>
                </div>

                <div class="invoice-customer-details">
                    <h3>Bill To:</h3>
                    <p><strong>${customerName}</strong></p>
                </div>

                <table class="invoice-items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <div class="invoice-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span class="amount">${subtotal}</span>
                    </div>
                    <div class="summary-row">
                        <span>GST (18%):</span>
                        <span class="amount">${gst}</span>
                    </div>
                    <div class="summary-row grand-total-row">
                        <span>Grand Total:</span>
                        <span class="amount">${grandTotal}</span>
                    </div>
                </div>

                <div class="invoice-footer">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        `;
        return invoiceHtml;
    }

    /**
     * Displays the generated invoice in the preview area.
     */
    function handleGenerateInvoice() {
        const content = generateInvoiceContent();
        if (content) {
            invoicePreview.innerHTML = content;
            invoicePreview.classList.remove('hidden');
        } else {
            invoicePreview.classList.add('hidden');
        }
    }

    /**
     * Downloads the generated invoice as an HTML file.
     */
    function handleDownloadInvoice() {
        const invoiceContent = generateInvoiceContent();
        if (!invoiceContent) {
            return; // Exit if invoice content is empty due to validation
        }

        const fullHtmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invoice - ${invoiceNumberInput.value}</title>
                <style>
                    /* Inline styles for the downloaded HTML to ensure consistent rendering */
                    body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; color: #333; }
                    .invoice-document {
                        width: 100%; max-width: 700px; margin: 0 auto; padding: 30px;
                        border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
                    }
                    .invoice-header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #eee; }
                    .invoice-header h2 { font-size: 2.5em; color: #2c3e50; margin-bottom: 10px; }
                    .invoice-header p { margin: 5px 0; font-size: 1em; color: #555; }
                    .invoice-customer-details { margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
                    .invoice-customer-details h3 { font-size: 1.3em; color: #2c3e50; margin-bottom: 10px; }
                    .invoice-customer-details p { margin: 5px 0; }
                    .invoice-items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    .invoice-items-table th, .invoice-items-table td {
                        border: 1px solid #ddd; padding: 12px; text-align: left;
                    }
                    .invoice-items-table th { background-color: #f8f8f8; font-weight: 600; color: #555; }
                    /* Adjust column widths for downloaded invoice table */
                    .invoice-items-table th:nth-child(1), .invoice-items-table td:nth-child(1) { width: 30%; } /* Item */
                    .invoice-items-table th:nth-child(2), .invoice-items-table td:nth-child(2) { width: 15%; } /* Qty */
                    .invoice-items-table th:nth-child(3), .invoice-items-table td:nth-child(3) { width: 20%; } /* Price */
                    .invoice-items-table th:nth-child(4), .invoice-items-table td:nth-child(4) { width: 15%; } /* Discount */
                    .invoice-items-table th:nth-child(5), .invoice-items-table td:nth-child(5) { width: 20%; } /* Total */

                    .invoice-summary { width: 100%; max-width: 300px; margin-left: auto; }
                    .invoice-summary .summary-row {
                        display: flex; justify-content: space-between; padding: 8px 0; font-size: 1.1em;
                    }
                    .invoice-summary .summary-row:not(:last-child) { border-bottom: 1px dashed #eee; }
                    .invoice-summary .grand-total-row {
                        font-size: 1.3em; font-weight: 700; color: #2c3e50; padding-top: 15px; border-top: 2px solid #e0e0e0;
                    }
                    .invoice-summary .amount { font-weight: 600; color: #4a90e2; }
                    .invoice-footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #777; }
                    .invoice-footer p { margin: 5px 0; }
                </style>
            </head>
            <body>
                ${invoiceContent}
            </body>
            </html>
        `;

        const blob = new Blob([fullHtmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoiceNumberInput.value}-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Resets all form fields and hides the invoice preview.
     */
    function handleResetForm() {
        customerNameInput.value = '';
        itemTableBody.innerHTML = ''; // Clear all item rows
        invoicePreview.innerHTML = '';
        invoicePreview.classList.add('hidden');
        initializeForm(); // Re-initialize with a fresh state
    }

    // Event Listeners
    addItemBtn.addEventListener('click', addItemRow);
    generateInvoiceBtn.addEventListener('click', handleGenerateInvoice);
    downloadInvoiceBtn.addEventListener('click', handleDownloadInvoice);
    resetBtn.addEventListener('click', handleResetForm);

    // Initial form setup when the page loads
    initializeForm();
});

// Custom alert function to avoid window.alert in iframe environments
function alert(message) {
    const existingAlert = document.getElementById('customAlert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.id = 'customAlert';
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        padding: 25px;
        z-index: 1000;
        text-align: center;
        max-width: 350px;
        width: 90%;
        font-family: 'Inter', sans-serif;
        color: #333;
    `;

    const messageP = document.createElement('p');
    messageP.textContent = message;
    messageP.style.cssText = 'margin-bottom: 20px; font-size: 1.1em;';
    alertDiv.appendChild(messageP);

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.cssText = `
        background-color: #4a90e2;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s ease;
    `;
    okButton.onmouseover = () => okButton.style.backgroundColor = '#357ABD';
    okButton.onmouseout = () => okButton.style.backgroundColor = '#4a90e2';

    okButton.onclick = () => alertDiv.remove();
    alertDiv.appendChild(okButton);

    document.body.appendChild(alertDiv);
}
