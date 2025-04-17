/**
 * Loan Processing System
 * Class-based implementation for managing loan requests
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the loan processing system
    const loanSystem = new LoanProcessingSystem()
    loanSystem.initialize()
  })
  
  /**
   * Main class that orchestrates the entire loan processing system
   */
  class LoanProcessingSystem {
    constructor() {
      // Initialize managers
      this.loanManager = new LoanManager()
      this.uiManager = new UIManager(this.loanManager)
      this.modalManager = new ModalManager(this.loanManager)
    }
  
    /**
     * Initialize the system and set up event handlers
     */
    initialize() {
      // Set up tab navigation
      this.uiManager.setupTabs()
  
      // Load initial data
      this.loanManager.loadPendingLoans()
      this.loanManager.loadApprovedLoans()
      this.loanManager.loadRejectedLoans()
      this.loanManager.loadLoanHistory()
  
      // Set up search functionality
      this.uiManager.setupSearch()
  
      // Set up status filter
      this.uiManager.setupStatusFilter()
  
      // Set up date filter for history
      this.uiManager.setupDateFilter()
  
      // Set up modal functionality
      this.modalManager.setupModal()
    }
  }
  
  /**
   * Manages loan data and operations
   */
  class LoanManager {
    constructor() {
      this.pendingLoans = []
      this.approvedLoans = []
      this.rejectedLoans = []
      this.allLoans = []
    }
  
    /**
     * Load pending loans from the server (simulated)
     */
    loadPendingLoans() {
      const pendingLoansContainer = document.getElementById("pendingLoans")
      const pendingLoader = document.getElementById("pendingLoader")
  
      // Simulate API call with setTimeout
      setTimeout(() => {
        pendingLoader.style.display = "none"
  
        // Sample data - in a real app, this would come from your API
        this.pendingLoans = [
          {
            id: "L-2023-04-15",
            date: "2023-04-15",
            customer: {
              id: "C-1001",
              name: "John Smith",
              initials: "JS",
            },
            amount: "$15,000",
            term: "36 months",
            purpose: "Home Renovation",
            status: "pending",
            interestRate: "5.25%",
            monthlyPayment: "$450",
            creditScore: 720,
          },
          {
            id: "L-2023-04-12",
            date: "2023-04-12",
            customer: {
              id: "C-1042",
              name: "Sarah Johnson",
              initials: "SJ",
            },
            amount: "$8,500",
            term: "24 months",
            purpose: "Debt Consolidation",
            status: "pending",
            interestRate: "6.75%",
            monthlyPayment: "$380",
            creditScore: 680,
          },
          {
            id: "L-2023-04-10",
            date: "2023-04-10",
            customer: {
              id: "C-1078",
              name: "Michael Chen",
              initials: "MC",
            },
            amount: "$25,000",
            term: "48 months",
            purpose: "Business Expansion",
            status: "pending",
            interestRate: "4.90%",
            monthlyPayment: "$575",
            creditScore: 760,
          },
        ]
  
        // Update the count
        document.getElementById("pendingCount").textContent = this.pendingLoans.length
  
        // Render the loans
        this.pendingLoans.forEach((loan) => {
          const loanCard = this.createLoanCard(loan)
          pendingLoansContainer.appendChild(loanCard)
        })
      }, 1000) // Simulate 1 second loading time
    }
  
    /**
     * Load approved loans from the server (simulated)
     */
    loadApprovedLoans() {
      const approvedLoansContainer = document.getElementById("approvedLoans")
  
      // Sample data
      this.approvedLoans = [
        {
          id: "L-2023-04-05",
          date: "2023-04-05",
          customer: {
            id: "C-1015",
            name: "Emily Wilson",
            initials: "EW",
          },
          amount: "$12,000",
          term: "36 months",
          purpose: "Car Purchase",
          status: "approved",
          interestRate: "4.50%",
          monthlyPayment: "$355",
          creditScore: 745,
          approvedDate: "2023-04-08",
          approvedBy: "Ayakino Nori",
        },
        {
          id: "L-2023-04-02",
          date: "2023-04-02",
          customer: {
            id: "C-1023",
            name: "David Brown",
            initials: "DB",
          },
          amount: "$5,000",
          term: "12 months",
          purpose: "Education",
          status: "approved",
          interestRate: "3.75%",
          monthlyPayment: "$430",
          creditScore: 790,
          approvedDate: "2023-04-04",
          approvedBy: "Ayakino Nori",
        },
      ]
  
      // Update the count
      document.getElementById("approvedCount").textContent = this.approvedLoans.length
  
      // Render the loans
      this.approvedLoans.forEach((loan) => {
        const loanCard = this.createLoanCard(loan)
        approvedLoansContainer.appendChild(loanCard)
      })
    }
  
    /**
     * Load rejected loans from the server (simulated)
     */
    loadRejectedLoans() {
      const rejectedLoansContainer = document.getElementById("rejectedLoans")
  
      // Sample data
      this.rejectedLoans = [
        {
          id: "L-2023-04-03",
          date: "2023-04-03",
          customer: {
            id: "C-1056",
            name: "Robert Taylor",
            initials: "RT",
          },
          amount: "$30,000",
          term: "60 months",
          purpose: "Investment",
          status: "rejected",
          interestRate: "7.25%",
          monthlyPayment: "$600",
          creditScore: 580,
          rejectedDate: "2023-04-06",
          rejectedBy: "Ayakino Nori",
          rejectionReason: "Low credit score and high debt-to-income ratio",
        },
      ]
  
      // Update the count
      document.getElementById("rejectedCount").textContent = this.rejectedLoans.length
  
      // Render the loans
      this.rejectedLoans.forEach((loan) => {
        const loanCard = this.createLoanCard(loan)
        rejectedLoansContainer.appendChild(loanCard)
      })
    }
  
    /**
     * Load loan history from the server (simulated)
     */
    loadLoanHistory() {
      const loanHistoryContainer = document.getElementById("loanHistory")
  
      // Combine all loans for history
      this.allLoans = [
        // Pending loans
        ...this.pendingLoans,
        // Approved loans
        ...this.approvedLoans,
        // Rejected loans
        ...this.rejectedLoans,
      ]
  
      // If allLoans is empty (because the other loads are async), use sample data
      if (this.allLoans.length === 0) {
        this.allLoans = [
          // Pending loans
          {
            id: "L-2023-04-15",
            date: "2023-04-15",
            customer: {
              id: "C-1001",
              name: "John Smith",
              initials: "JS",
            },
            amount: "$15,000",
            term: "36 months",
            purpose: "Home Renovation",
            status: "pending",
            interestRate: "5.25%",
            monthlyPayment: "$450",
            creditScore: 720,
          },
          {
            id: "L-2023-04-12",
            date: "2023-04-12",
            customer: {
              id: "C-1042",
              name: "Sarah Johnson",
              initials: "SJ",
            },
            amount: "$8,500",
            term: "24 months",
            purpose: "Debt Consolidation",
            status: "pending",
            interestRate: "6.75%",
            monthlyPayment: "$380",
            creditScore: 680,
          },
          {
            id: "L-2023-04-10",
            date: "2023-04-10",
            customer: {
              id: "C-1078",
              name: "Michael Chen",
              initials: "MC",
            },
            amount: "$25,000",
            term: "48 months",
            purpose: "Business Expansion",
            status: "pending",
            interestRate: "4.90%",
            monthlyPayment: "$575",
            creditScore: 760,
          },
          // Approved loans
          {
            id: "L-2023-04-05",
            date: "2023-04-05",
            customer: {
              id: "C-1015",
              name: "Emily Wilson",
              initials: "EW",
            },
            amount: "$12,000",
            term: "36 months",
            purpose: "Car Purchase",
            status: "approved",
            interestRate: "4.50%",
            monthlyPayment: "$355",
            creditScore: 745,
            approvedDate: "2023-04-08",
            approvedBy: "Ayakino Nori",
          },
          {
            id: "L-2023-04-02",
            date: "2023-04-02",
            customer: {
              id: "C-1023",
              name: "David Brown",
              initials: "DB",
            },
            amount: "$5,000",
            term: "12 months",
            purpose: "Education",
            status: "approved",
            interestRate: "3.75%",
            monthlyPayment: "$430",
            creditScore: 790,
            approvedDate: "2023-04-04",
            approvedBy: "Ayakino Nori",
          },
          // Rejected loans
          {
            id: "L-2023-04-03",
            date: "2023-04-03",
            customer: {
              id: "C-1056",
              name: "Robert Taylor",
              initials: "RT",
            },
            amount: "$30,000",
            term: "60 months",
            purpose: "Investment",
            status: "rejected",
            interestRate: "7.25%",
            monthlyPayment: "$600",
            creditScore: 580,
            rejectedDate: "2023-04-06",
            rejectedBy: "Ayakino Nori",
            rejectionReason: "Low credit score and high debt-to-income ratio",
          },
        ]
      }
  
      // Update the count
      document.getElementById("historyCount").textContent = this.allLoans.length
  
      // Render the loans
      this.allLoans.forEach((loan) => {
        const loanCard = this.createLoanCard(loan)
        loanCard.setAttribute("data-date", loan.date)
        loanHistoryContainer.appendChild(loanCard)
      })
    }
  
    /**
     * Create a loan card element
     * @param {Object} loan - The loan data
     * @returns {HTMLElement} - The loan card element
     */
    createLoanCard(loan) {
      const loanCard = document.createElement("div")
      loanCard.className = "loan-card"
      loanCard.setAttribute("data-loan-id", loan.id)
  
      // Status class
      let statusClass = ""
      switch (loan.status) {
        case "pending":
          statusClass = "status-pending"
          break
        case "approved":
          statusClass = "status-approved"
          break
        case "rejected":
          statusClass = "status-rejected"
          break
      }
  
      loanCard.innerHTML = `
        <div class="loan-card-header">
            <div class="loan-id">${loan.id}</div>
            <div class="loan-date">${this.formatDate(loan.date)}</div>
        </div>
        <div class="loan-customer">
            <div class="customer-avatar">${loan.customer.initials}</div>
            <div class="customer-info">
                <div class="customer-name">${loan.customer.name}</div>
                <div class="customer-id">${loan.customer.id}</div>
            </div>
            <div class="loan-status ${statusClass}">${this.capitalizeFirstLetter(loan.status)}</div>
        </div>
        <div class="loan-details">
            <div class="loan-detail">
                <div class="detail-label">Amount</div>
                <div class="detail-value">${loan.amount}</div>
            </div>
            <div class="loan-detail">
                <div class="detail-label">Term</div>
                <div class="detail-value">${loan.term}</div>
            </div>
            <div class="loan-detail">
                <div class="detail-label">Purpose</div>
                <div class="detail-value">${loan.purpose}</div>
            </div>
        </div>
      `
  
      // Add click event to open modal with loan details
      loanCard.addEventListener("click", () => {
        this.openLoanModal(loan)
      })
  
      return loanCard
    }
  
    /**
     * Open loan modal with details
     * @param {Object} loan - The loan data
     */
    openLoanModal(loan) {
      const modal = document.getElementById("loanModal")
      const loanDetails = document.getElementById("loanDetails")
      const modalActions = document.getElementById("modalActions")
  
      // Clear previous content
      loanDetails.innerHTML = ""
      modalActions.innerHTML = ""
  
      // Create credit score rating
      let creditScoreRating = ""
      let creditScoreClass = ""
  
      if (loan.creditScore < 580) {
        creditScoreRating = "Poor"
        creditScoreClass = "score-poor"
      } else if (loan.creditScore < 670) {
        creditScoreRating = "Fair"
        creditScoreClass = "score-fair"
      } else if (loan.creditScore < 740) {
        creditScoreRating = "Good"
        creditScoreClass = "score-good"
      } else {
        creditScoreRating = "Excellent"
        creditScoreClass = "score-excellent"
      }
  
      // Build the modal content
      loanDetails.innerHTML = `
        <div class="detail-section">
            <h4>Loan Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-item-label">Loan ID</div>
                    <div class="detail-item-value">${loan.id}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Application Date</div>
                    <div class="detail-item-value">${this.formatDate(loan.date)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Status</div>
                    <div class="detail-item-value">
                        <span class="loan-status ${
                          loan.status === "pending"
                            ? "status-pending"
                            : loan.status === "approved"
                              ? "status-approved"
                              : "status-rejected"
                        }">
                            ${this.capitalizeFirstLetter(loan.status)}
                        </span>
                    </div>
                </div>
                ${
                  loan.approvedDate
                    ? `
                <div class="detail-item">
                    <div class="detail-item-label">Approved Date</div>
                    <div class="detail-item-value">${this.formatDate(loan.approvedDate)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Approved By</div>
                    <div class="detail-item-value">${loan.approvedBy}</div>
                </div>
                `
                    : ""
                }
                ${
                  loan.rejectedDate
                    ? `
                <div class="detail-item">
                    <div class="detail-item-label">Rejected Date</div>
                    <div class="detail-item-value">${this.formatDate(loan.rejectedDate)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Rejected By</div>
                    <div class="detail-item-value">${loan.rejectedBy}</div>
                </div>
                `
                    : ""
                }
            </div>
        </div>
        
        <div class="detail-section">
            <h4>Customer Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-item-label">Customer Name</div>
                    <div class="detail-item-value">${loan.customer.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Customer ID</div>
                    <div class="detail-item-value">${loan.customer.id}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Credit Score</div>
                    <div class="detail-item-value">${loan.creditScore} (${creditScoreRating})</div>
                </div>
            </div>
            
            <div class="credit-score">
                <div class="score-value">${loan.creditScore}</div>
                <div class="score-bar">
                    <div class="score-fill ${creditScoreClass}"></div>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>Loan Details</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-item-label">Loan Amount</div>
                    <div class="detail-item-value">${loan.amount}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Term</div>
                    <div class="detail-item-value">${loan.term}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Purpose</div>
                    <div class="detail-item-value">${loan.purpose}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Interest Rate</div>
                    <div class="detail-item-value">${loan.interestRate}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Monthly Payment</div>
                    <div class="detail-item-value">${loan.monthlyPayment}</div>
                </div>
            </div>
        </div>
        
        ${
          loan.rejectionReason
            ? `
        <div class="detail-section">
            <h4>Rejection Reason</h4>
            <p>${loan.rejectionReason}</p>
        </div>
        `
            : ""
        }
        
        ${
          loan.status === "pending"
            ? `
        <div class="notes-section">
            <h4>Notes</h4>
            <textarea id="loanNotes" placeholder="Add notes about this loan application..."></textarea>
        </div>
        `
            : ""
        }
      `
  
      // Add action buttons based on loan status
      if (loan.status === "pending") {
        modalActions.innerHTML = `
            <button class="btn btn-success" id="approveBtn">Approve Loan</button>
            <button class="btn btn-danger" id="rejectBtn">Reject Loan</button>
            <button class="btn btn-outline" id="requestInfoBtn">Request More Info</button>
        `
  
        // Add event listeners to buttons
        document.getElementById("approveBtn").addEventListener("click", () => {
          this.approveLoan(loan.id)
        })
  
        document.getElementById("rejectBtn").addEventListener("click", () => {
          this.rejectLoan(loan.id)
        })
  
        document.getElementById("requestInfoBtn").addEventListener("click", () => {
          this.requestMoreInfo(loan.id)
        })
      } else if (loan.status === "approved") {
        modalActions.innerHTML = `
            <button class="btn btn-primary" id="viewDetailsBtn">View Payment Schedule</button>
            <button class="btn btn-outline" id="printBtn">Print Approval</button>
        `
  
        // Add event listeners
        document.getElementById("viewDetailsBtn").addEventListener("click", () => {
          this.viewPaymentSchedule(loan.id)
        })
  
        document.getElementById("printBtn").addEventListener("click", () => {
          this.printApproval(loan.id)
        })
      } else if (loan.status === "rejected") {
        modalActions.innerHTML = `
            <button class="btn btn-primary" id="reconsiderBtn">Reconsider Application</button>
            <button class="btn btn-outline" id="printBtn">Print Rejection</button>
        `
  
        // Add event listeners
        document.getElementById("reconsiderBtn").addEventListener("click", () => {
          this.reconsiderApplication(loan.id)
        })
  
        document.getElementById("printBtn").addEventListener("click", () => {
          this.printRejection(loan.id)
        })
      }
  
      // Show the modal
      modal.style.display = "block"
    }
  
    /**
     * Approve a loan
     * @param {string} loanId - The loan ID
     */
    approveLoan(loanId) {
      const notes = document.getElementById("loanNotes").value
  
      // In a real application, you would send this to your backend
      console.log(`Approving loan ${loanId} with notes: ${notes}`)
  
      // For demo purposes, we'll just show an alert and close the modal
      alert(`Loan ${loanId} has been approved successfully!`)
      document.getElementById("loanModal").style.display = "none"
  
      // Refresh the loan lists (in a real app, this would be an API call)
      this.refreshLoanLists()
    }
  
    /**
     * Reject a loan
     * @param {string} loanId - The loan ID
     */
    rejectLoan(loanId) {
      const notes = document.getElementById("loanNotes").value
  
      // In a real application, you would send this to your backend
      console.log(`Rejecting loan ${loanId} with notes: ${notes}`)
  
      // For demo purposes, we'll just show an alert and close the modal
      alert(`Loan ${loanId} has been rejected.`)
      document.getElementById("loanModal").style.display = "none"
  
      // Refresh the loan lists
      this.refreshLoanLists()
    }
  
    /**
     * Request more information for a loan
     * @param {string} loanId - The loan ID
     */
    requestMoreInfo(loanId) {
      const notes = document.getElementById("loanNotes").value
  
      // In a real application, you would send this to your backend
      console.log(`Requesting more info for loan ${loanId}: ${notes}`)
  
      // For demo purposes, we'll just show an alert and close the modal
      alert(`Additional information has been requested for loan ${loanId}.`)
      document.getElementById("loanModal").style.display = "none"
    }
  
    /**
     * View payment schedule for a loan
     * @param {string} loanId - The loan ID
     */
    viewPaymentSchedule(loanId) {
      // In a real application, this would open a payment schedule view
      alert(`Viewing payment schedule for loan ${loanId}`)
    }
  
    /**
     * Print approval for a loan
     * @param {string} loanId - The loan ID
     */
    printApproval(loanId) {
      // In a real application, this would generate a PDF or print view
      alert(`Printing approval for loan ${loanId}`)
    }
  
    /**
     * Reconsider a rejected loan application
     * @param {string} loanId - The loan ID
     */
    reconsiderApplication(loanId) {
      // In a real application, this would change the loan status back to pending
      alert(`Reconsidering application for loan ${loanId}`)
      document.getElementById("loanModal").style.display = "none"
  
      // Refresh the loan lists
      this.refreshLoanLists()
    }
  
    /**
     * Print rejection for a loan
     * @param {string} loanId - The loan ID
     */
    printRejection(loanId) {
      // In a real application, this would generate a PDF or print view
      alert(`Printing rejection for loan ${loanId}`)
    }
  
    /**
     * Refresh all loan lists
     */
    refreshLoanLists() {
      // Clear existing loans
      document.getElementById("pendingLoans").innerHTML =
        '<div class="loader" id="pendingLoader"><i class="fas fa-spinner fa-spin"></i><span>Loading loan requests...</span></div>'
      document.getElementById("approvedLoans").innerHTML = ""
      document.getElementById("rejectedLoans").innerHTML = ""
      document.getElementById("loanHistory").innerHTML = ""
  
      // Reload loans
      this.loadPendingLoans()
      this.loadApprovedLoans()
      this.loadRejectedLoans()
      this.loadLoanHistory()
    }
  
    /**
     * Filter loans by date range
     * @param {string} startDate - Start date string
     * @param {string} endDate - End date string
     */
    filterLoansByDate(startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59) // Include the entire end day
  
      const loanCards = document.querySelectorAll("#loanHistory .loan-card")
  
      loanCards.forEach((card) => {
        const loanDateStr = card.getAttribute("data-date")
        const loanDate = new Date(loanDateStr)
  
        if (loanDate >= start && loanDate <= end) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }
  
    /**
     * Format date string
     * @param {string} dateString - The date string to format
     * @returns {string} - Formatted date string
     */
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  
    /**
     * Capitalize first letter of a string
     * @param {string} string - The string to capitalize
     * @returns {string} - Capitalized string
     */
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
  
  /**
   * Manages UI interactions
   */
  class UIManager {
    constructor(loanManager) {
      this.loanManager = loanManager
    }
  
    /**
     * Set up tab navigation
     */
    setupTabs() {
      const tabButtons = document.querySelectorAll(".tab-btn")
      const tabContents = document.querySelectorAll(".tab-content")
  
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons and contents
          tabButtons.forEach((btn) => btn.classList.remove("active"))
          tabContents.forEach((content) => content.classList.remove("active"))
  
          // Add active class to clicked button and corresponding content
          button.classList.add("active")
          const tabId = button.getAttribute("data-tab")
          document.getElementById(tabId).classList.add("active")
        })
      })
    }
  
    /**
     * Set up search functionality
     */
    setupSearch() {
      const searchInput = document.getElementById("searchInput")
  
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase()
        this.filterLoans(searchTerm)
      })
    }
  
    /**
     * Filter loans based on search term
     * @param {string} searchTerm - The search term
     */
    filterLoans(searchTerm) {
      const loanCards = document.querySelectorAll(".loan-card")
  
      loanCards.forEach((card) => {
        const customerName = card.querySelector(".customer-name").textContent.toLowerCase()
        const loanId = card.querySelector(".loan-id").textContent.toLowerCase()
        const loanAmount = card.querySelector(".detail-value").textContent.toLowerCase()
  
        if (customerName.includes(searchTerm) || loanId.includes(searchTerm) || loanAmount.includes(searchTerm)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }
  
    /**
     * Set up status filter
     */
    setupStatusFilter() {
      const statusFilter = document.getElementById("statusFilter")
  
      statusFilter.addEventListener("change", () => {
        const selectedStatus = statusFilter.value
  
        // If "all" is selected, show the current active tab
        if (selectedStatus === "all") {
          const activeTab = document.querySelector(".tab-btn.active").getAttribute("data-tab")
          document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
          document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))
  
          document.querySelector(`[data-tab="${activeTab}"]`).classList.add("active")
          document.getElementById(activeTab).classList.add("active")
          return
        }
  
        // Otherwise, switch to the selected status tab
        document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
        document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))
  
        document.querySelector(`[data-tab="${selectedStatus}"]`).classList.add("active")
        document.getElementById(selectedStatus).classList.add("active")
      })
    }
  
    /**
     * Set up date filter for history
     */
    setupDateFilter() {
      const applyDateFilter = document.getElementById("applyDateFilter")
  
      applyDateFilter.addEventListener("click", () => {
        const startDate = document.getElementById("startDate").value
        const endDate = document.getElementById("endDate").value
  
        if (startDate && endDate) {
          this.loanManager.filterLoansByDate(startDate, endDate)
        } else {
          alert("Please select both start and end dates")
        }
      })
    }
  }
  
  /**
   * Manages modal interactions
   */
  class ModalManager {
    constructor(loanManager) {
      this.loanManager = loanManager
    }
  
    /**
     * Set up modal functionality
     */
    setupModal() {
      const modal = document.getElementById("loanModal")
      const closeModal = document.querySelector(".close-modal")
  
      // Close modal when clicking the X
      closeModal.addEventListener("click", () => {
        modal.style.display = "none"
      })
  
      // Close modal when clicking outside
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none"
        }
      })
    }
  }
  