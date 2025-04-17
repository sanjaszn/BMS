class Customer {
    static existingAccounts = new Set()
  
    constructor({ name, email, phone, dob, account, deposit, password, conpassword }) {
      this.name = this.sanitizeInput(name, "name")
      this.email = email
      this.phone = this.sanitizeInput(phone, "phone")
      this.dob = dob
      this.account = account
      this.deposit = Number.parseFloat(deposit) || 0
      this.password = password
      this.conpassword = conpassword
      this.accountNumber = this.genAccountNum()
      this.joinedDate = new Date().toLocaleDateString("en-GB")
      this.status = "Active" // Default status
    }
  
    sanitizeInput(input, type) {
      if (type === "name") {
        return input.trim().replace(/[^A-Za-z\s]/g, "")
      } else if (type === "phone") {
        return input.trim().replace(/[^\d+\-()\s]/g, "")
      } else {
        return input.trim()
      }
    }
  
    genAccountNum() {
      let accountNumber
      do {
        accountNumber = Math.floor(100000000 + Math.random() * 999999999)
      } while (Customer.existingAccounts.has(accountNumber))
  
      Customer.existingAccounts.add(accountNumber)
      return accountNumber
    }
  }
  
  class CustomerForm {
    constructor() {
      this.customers = []
      this.sidePanel = document.getElementById("customerModal")
      this.showBtn = document.getElementById("addUserBtn")
      this.cancelBtn = document.getElementById("cancelCustomer")
      this.customerTable = document.querySelector(".customer-table tbody")
      this.form = document.getElementById("customerForm")
  
      this.init()
      this.loadSampleData()
    }
  
    init() {
      this.showBtn.addEventListener("click", () => this.openSidePanel())
      this.cancelBtn.addEventListener("click", () => this.closeSidePanel())
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
  
      // Add sort functionality
      const sortSelect = document.getElementById("sortOptions")
      if (sortSelect) {
        sortSelect.addEventListener("change", () => this.handleSort(sortSelect.value))
      }
  
      // Ensure the Manage Customers link in the sidebar is active
      this.setActiveNavLink()
  
      // Close side panel when clicking outside
      document.addEventListener("click", (e) => {
        if (
          this.sidePanel.classList.contains("active") &&
          !this.sidePanel.contains(e.target) &&
          e.target !== this.showBtn
        ) {
          this.closeSidePanel()
        }
      })
  
      // Prevent clicks inside the side panel from closing it
      this.sidePanel.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    }
  
    openSidePanel() {
      this.sidePanel.style.display = "block"
      // Use setTimeout to ensure the display change takes effect before adding the active class
      setTimeout(() => {
        this.sidePanel.classList.add("active")
      }, 10)
    }
  
    closeSidePanel() {
      this.sidePanel.classList.remove("active")
      // Wait for the transition to complete before hiding the panel
      setTimeout(() => {
        this.sidePanel.style.display = "none"
      }, 300)
    }
  
    handleSubmit(e) {
      e.preventDefault()
  
      const formData = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        phone: document.getElementById("phoneInput").value,
        dob: document.getElementById("dobInput").value,
        account: document.getElementById("accountTypeInput").value,
        deposit: document.getElementById("depositInput").value,
        password: document.getElementById("passwordInput").value,
        conpassword: document.getElementById("confirmPasswordInput").value,
      }
  
      const customer = new Customer(formData)
      this.customers.push(customer)
      this.updateCustomerTable()
      this.form.reset()
      this.closeSidePanel()
    }
  
    updateCustomerTable() {
      this.customerTable.innerHTML = this.customers
        .map(
          (customer) => `
        <tr>
          <td><img src="profile.jpg" class="avatar"> ${customer.name}</td>
          <td>${customer.email || "N/A"}</td>
          <td>${customer.account}</td>
          <td>${customer.accountNumber}</td>
          <td>KSH${customer.deposit.toFixed(2)}</td>
          <td><span class="status-badge active">${customer.status}</span></td>
          <td>${customer.joinedDate}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        </tr>
      `,
        )
        .join("")
  
      // Add event listeners to the edit and delete buttons
      const editButtons = document.querySelectorAll(".edit-btn")
      const deleteButtons = document.querySelectorAll(".delete-btn")
  
      editButtons.forEach((button, index) => {
        button.addEventListener("click", () => this.editCustomer(index))
      })
  
      deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => this.deleteCustomer(index))
      })
    }
  
    editCustomer(index) {
      // In a real application, you would populate the form with the customer data
      console.log(`Editing customer at index ${index}`)
      // For now, just log the action
    }
  
    deleteCustomer(index) {
      // In a real application, you would confirm before deleting
      console.log(`Deleting customer at index ${index}`)
      this.customers.splice(index, 1)
      this.updateCustomerTable()
    }
  
    loadSampleData() {
      // Add some sample customers
      const sampleCustomers = [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "123-456-7890",
          dob: "1985-05-15",
          account: "savings",
          deposit: "5000",
          password: "password",
          conpassword: "password",
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "987-654-3210",
          dob: "1990-10-20",
          account: "checking",
          deposit: "3500",
          password: "password",
          conpassword: "password",
        },
        {
          name: "Robert Johnson",
          email: "robert.j@example.com",
          phone: "555-123-4567",
          dob: "1978-03-25",
          account: "business",
          deposit: "10000",
          password: "password",
          conpassword: "password",
        },
      ]
  
      sampleCustomers.forEach((data) => {
        const customer = new Customer(data)
        this.customers.push(customer)
      })
  
      this.updateCustomerTable()
    }
  
    handleSort(sortOption) {
      console.log(`Sorting by ${sortOption}`)
  
      if (sortOption === "name") {
        this.customers.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortOption === "date") {
        // This is a simple sort by date string, which works for the format we're using
        this.customers.sort((a, b) => a.joinedDate.localeCompare(b.joinedDate))
      } else if (sortOption === "balance") {
        this.customers.sort((a, b) => b.deposit - a.deposit)
      }
  
      this.updateCustomerTable()
    }
  
    setActiveNavLink() {
      // Make sure the Manage Customers link in the sidebar is active
      const customersLink = document.querySelector('.nav-menu li a[href="manage_customers.html"]')
      if (customersLink) {
        customersLink.classList.add("active")
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new CustomerForm()
  })
  