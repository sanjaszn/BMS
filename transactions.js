// --- Transaction Class ---
class Transaction {
    constructor({ accountNumber, transactionType, toAccount, amount, description }) {
      this.id = 'TXN' + Math.floor(1000 + Math.random() * 9000);
      this.date = new Date().toISOString().split('T')[0];
      this.accountNumber = accountNumber;
      this.customer = "John Doe"; // placeholder for now
      this.type = transactionType;
      this.toAccount = toAccount || null;
      this.amount = parseFloat(amount);
      this.status = "Success";
      this.description = description || "";
    }
  }
  
  // --- Transaction Form Controller ---
  class TransactionForm {
    constructor() {
      this.transactions = [];
      this.sidePanel = document.getElementById('transactionModal');
      this.showBtn = document.getElementById('newTransactionBtn');
      this.cancelBtn = document.getElementById('cancelTransaction');
      this.transactionTable = document.querySelector('.transaction-table tbody');
      this.form = document.getElementById('transactionForm');
      this.toAccountField = document.getElementById('toAccountField');
      this.transactionTypeSelect = document.getElementById('transactionType');
  
      this.init();
      this.loadInitialData();
    }
  
    init() {
      this.showBtn.addEventListener('click', () => this.openSidePanel());
      this.cancelBtn.addEventListener('click', () => this.closeSidePanel());
      this.transactionTypeSelect.addEventListener('change', () => this.toggleTransferField());
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      
      // Add sort functionality
      const sortSelect = document.getElementById('sortOptions');
      if (sortSelect) {
        sortSelect.addEventListener('change', () => this.handleSort(sortSelect.value));
      }
      
      // Ensure the Transactions link in the sidebar is active
      this.setActiveNavLink();
      
      // Close side panel when clicking outside
      document.addEventListener('click', (e) => {
        if (this.sidePanel.classList.contains('active') && 
            !this.sidePanel.contains(e.target) && 
            e.target !== this.showBtn) {
          this.closeSidePanel();
        }
      });
      
      // Prevent clicks inside the side panel from closing it
      this.sidePanel.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
    
    openSidePanel() {
      this.sidePanel.style.display = 'block';
      // Use setTimeout to ensure the display change takes effect before adding the active class
      setTimeout(() => {
        this.sidePanel.classList.add('active');
      }, 10);
    }
    
    closeSidePanel() {
      this.sidePanel.classList.remove('active');
      // Wait for the transition to complete before hiding the panel
      setTimeout(() => {
        this.sidePanel.style.display = 'none';
      }, 300);
    }
  
    toggleTransferField() {
      const type = this.transactionTypeSelect.value;
      this.toAccountField.style.display = type === 'transfer' ? 'block' : 'none';
    }
  
    handleSubmit(e) {
      e.preventDefault();
  
      const formData = {
        accountNumber: document.getElementById('accountNumber').value,
        transactionType: document.getElementById('transactionType').value,
        toAccount: document.getElementById('toAccount').value,
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value
      };
  
      const transaction = new Transaction(formData);
      this.transactions.push(transaction);
      this.updateTransactionTable();
      this.form.reset();
      this.closeSidePanel();
    }
  
    updateTransactionTable() {
      this.transactionTable.innerHTML = this.transactions.map(txn => `
        <tr>
          <td>${txn.id}</td>
          <td>${txn.date}</td>
          <td>${txn.customer}</td>
          <td>${txn.accountNumber}</td>
          <td>${txn.type}</td>
          <td>$${txn.amount.toFixed(2)}</td>
          <td><span class="status-badge success">${txn.status}</span></td>
          <td>
            <button class="view-btn">View</button>
          </td>
        </tr>
      `).join('');
    }
    
    loadInitialData() {
      // Add the example transaction from the original HTML
      const initialTransaction = {
        accountNumber: "1234567890",
        transactionType: "Deposit",
        amount: "1000",
        description: "Initial deposit"
      };
      
      const transaction = new Transaction(initialTransaction);
      transaction.id = "TXN7004"; // Set a specific ID to match the screenshot
      transaction.date = "2025-04-14"; // Set a specific date to match the screenshot
      this.transactions.push(transaction);
      this.updateTransactionTable();
    }
    
    handleSort(sortOption) {
      console.log(`Sorting by ${sortOption}`);
      // In a real application, you would sort the data based on the selected option
      
      // Simple example sorting
      if (sortOption === 'latest') {
        this.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortOption === 'oldest') {
        this.transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sortOption === 'amount') {
        this.transactions.sort((a, b) => b.amount - a.amount);
      }
      
      this.updateTransactionTable();
    }
    
    setActiveNavLink() {
      // Make sure the Transactions link in the sidebar is active
      const transactionsLink = document.querySelector('.nav-menu li a[href="transactions.html"]');
      if (transactionsLink) {
        transactionsLink.classList.add('active');
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new TransactionForm();
  });