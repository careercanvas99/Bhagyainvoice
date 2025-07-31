
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Printer, Download, RefreshCw, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function InvoicePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: '', quantity: 1, price: 0 },
  ]);

  useEffect(() => {
    setIsMounted(true);
    setInvoiceNumber(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    setInvoiceDate(new Date().toLocaleDateString('en-CA'));
  }, []);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: keyof Omit<Item, 'id'>, value: string | number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculations = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);
    const gst = subtotal * 0.18;
    const grandTotal = subtotal + gst;
    return { subtotal, gst, grandTotal };
  }, [items]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const handleReset = () => {
    setCustomerName("");
    setItems([{ id: 1, name: '', quantity: 1, price: 0 }]);
    setInvoiceNumber(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    toast({
      title: "Form Reset",
      description: "The invoice form has been cleared.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const generateInvoiceHTML = () => {
    const itemsHTML = items
      .map(
        (item) => `
      <tr class="item-row">
        <td>${item.name || '-'}</td>
        <td class="text-right">${item.quantity}</td>
        <td class="text-right">${formatCurrency(Number(item.price))}</td>
        <td class="text-right">${formatCurrency(Number(item.quantity) * Number(item.price))}</td>
      </tr>`
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invoice ${invoiceNumber}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
              body { font-family: 'Inter', sans-serif; margin: 0; padding: 2rem; background-color: #ffffff; color: #111827; }
              .container { max-width: 800px; margin: auto; background: #fff; padding: 2rem; border-radius: 0.5rem; }
              .header { text-align: center; margin-bottom: 2rem; }
              .header h1 { font-size: 2rem; color: #111827; margin: 0; }
              .header p { color: #4b5563; margin: 0; }
              .details { display: flex; justify-content: space-between; margin-bottom: 2rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; }
              .details div { display: flex; flex-direction: column; }
              .details strong { margin-bottom: 0.25rem; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
              th, td { padding: 0.75rem 1rem; border-bottom: 1px solid #e5e7eb; }
              th { background-color: #f9fafb; text-align: left; font-weight: 600; }
              .text-right { text-align: right; }
              .totals { display: flex; justify-content: flex-end; }
              .totals-table { width: 100%; max-width: 300px; }
              .totals-table tr td:first-child { font-weight: 500; }
              .grand-total { font-size: 1.125rem; font-weight: 700; border-top: 2px solid #111827; }
              .footer { text-align: center; margin-top: 2rem; color: #6b7280; font-size: 0.875rem; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Bhagya Groups</h1>
                  <p>Beeramguda</p>
              </div>
              <div class="details">
                  <div>
                      <strong>Billed to:</strong>
                      <span>${customerName || 'N/A'}</span>
                  </div>
                  <div>
                      <strong>Invoice Number:</strong>
                      <span>${invoiceNumber}</span>
                      <strong>Invoice Date:</strong>
                      <span>${invoiceDate}</span>
                  </div>
              </div>
              <table>
                  <thead>
                      <tr>
                          <th>Item Description</th>
                          <th class="text-right">Qty</th>
                          <th class="text-right">Price</th>
                          <th class="text-right">Total</th>
                      </tr>
                  </thead>
                  <tbody>${itemsHTML}</tbody>
              </table>
              <div class="totals">
                  <table class="totals-table">
                      <tbody>
                          <tr><td>Subtotal</td><td class="text-right">${formatCurrency(calculations.subtotal)}</td></tr>
                          <tr><td>GST (18%)</td><td class="text-right">${formatCurrency(calculations.gst)}</td></tr>
                          <tr class="grand-total"><td>Grand Total</td><td class="text-right">${formatCurrency(calculations.grandTotal)}</td></tr>
                      </tbody>
                  </table>
              </div>
              <div class="footer">
                  <p>Thank you for your business!</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };

  const handleDownload = () => {
    const htmlContent = generateInvoiceHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: `Invoice ${invoiceNumber}.html is downloading.`,
    });
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-body">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center no-print">
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-headline font-bold">Bhagya Invoice Generator</h1>
          </div>
          <p className="text-muted-foreground mt-2">Create and manage your invoices with ease.</p>
        </header>

        <Card className="max-w-4xl mx-auto invoice-card shadow-lg">
          <CardHeader className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div>
                <CardTitle className="text-3xl font-bold font-headline text-primary">Bhagya Groups</CardTitle>
                <CardDescription>Beeramguda</CardDescription>
              </div>
              <div className="grid gap-2 text-sm w-full sm:w-auto">
                <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                  <Label htmlFor="invoice-number" className="font-semibold">Invoice #</Label>
                  <Input id="invoice-number" value={invoiceNumber} readOnly className="font-mono bg-muted/50"/>
                </div>
                 <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                  <Label htmlFor="invoice-date" className="font-semibold">Date</Label>
                  <Input id="invoice-date" type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
                </div>
              </div>
            </div>
             <Separator className="my-4"/>
            <div className="grid gap-2">
              <Label htmlFor="customer-name" className="font-semibold text-base">Bill To:</Label>
              <Input id="customer-name" placeholder="Enter Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} className="text-base" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="min-w-[250px] p-6">Item Description</TableHead>
                    <TableHead className="w-[100px] text-right p-6">Quantity</TableHead>
                    <TableHead className="w-[120px] text-right p-6">Price</TableHead>
                    <TableHead className="w-[120px] text-right p-6">Total</TableHead>
                    <TableHead className="w-[50px] p-6 no-print"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="p-2">
                        <Input 
                          placeholder="Item name" 
                          value={item.name}
                          onChange={e => handleItemChange(item.id, 'name', e.target.value)}
                          className="border-0 focus-visible:ring-1 bg-transparent"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input 
                          type="number" 
                          min="1"
                          className="text-right border-0 focus-visible:ring-1 bg-transparent"
                          value={item.quantity}
                          onChange={e => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </TableCell>
                      <TableCell className="p-2">
                         <Input 
                          type="number"
                          min="0"
                          className="text-right border-0 focus-visible:ring-1 bg-transparent"
                          placeholder="0.00"
                          value={item.price}
                          onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </TableCell>
                      <TableCell className="text-right font-medium p-6">
                        {formatCurrency(Number(item.quantity) * Number(item.price))}
                      </TableCell>
                      <TableCell className="no-print p-2">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} aria-label="Remove item">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="px-6 py-4 no-print">
              <Button variant="outline" size="sm" onClick={handleAddItem}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
            <Separator />
            <div className="flex justify-end p-6">
              <div className="w-full max-w-xs space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(calculations.subtotal)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium">{formatCurrency(calculations.gst)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="font-headline">Grand Total</span>
                  <span className="text-primary">{formatCurrency(calculations.grandTotal)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end space-x-2 p-6 bg-muted/50 border-t no-print">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button onClick={handleDownload} className="shadow-md">
              <Download className="mr-2 h-4 w-4" /> Download Invoice
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
