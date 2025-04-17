/**
 * Customer Support System
 * Class-based implementation for managing customer support tickets
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the customer support system
    const supportSystem = new CustomerSupportSystem()
    supportSystem.initialize()
  })
  
  /**
   * Main class that orchestrates the entire customer support system
   */
  class CustomerSupportSystem {
    constructor() {
      // Initialize managers
      this.ticketManager = new TicketManager()
      this.uiManager = new UIManager(this.ticketManager)
      this.modalManager = new ModalManager(this.ticketManager)
    }
  
    
    //Initialize the system and set up event handlers
    initialize() {
      // Load initial data
      this.ticketManager.loadTickets()
      this.ticketManager.loadCustomers()
      this.ticketManager.loadAgents()
      this.ticketManager.updateStats()
  
      // Set up UI interactions
      this.uiManager.setupSearch()
      this.uiManager.setupFilters()
      this.uiManager.setupViewToggle()
      this.uiManager.setupPagination()
  
      // Set up modals
      this.modalManager.setupModals()
      this.modalManager.setupNewTicket()
  
      // Set up sidebar functionality
      this.uiManager.setupSidebar()
  
      // Set up sidebar navigation highlight
      this.uiManager.setupSidebarNavHighlight()
    }
  }
  
  /**
   * Manages ticket data and operations
   */
  class TicketManager {
    constructor() {
      this.tickets = []
      this.customers = []
      this.agents = []
    }
  
    /**
     * Load tickets from the server (simulated)
     */
    loadTickets() {
      const ticketsListBody = document.getElementById("ticketsListBody")
      const ticketsGrid = document.getElementById("ticketsGrid")
      const ticketsLoader = document.getElementById("ticketsLoader")
  
      // Simulate API call with setTimeout
      setTimeout(() => {
        ticketsLoader.style.display = "none"
  
        // Sample data - in a real app, this would come from your API
        this.tickets = [
          {
            id: "TKT-1001",
            customer: {
              id: "C-1001",
              name: "John Smith",
              email: "john.smith@example.com",
              initials: "JS",
            },
            subject: "Unable to access online banking",
            category: "online",
            priority: "high",
            status: "open",
            date: "2023-04-15T09:30:00",
            assignedTo: "Ayakino Nori",
            description:
              "I've been trying to log in to my online banking account for the past two days but keep getting an error message saying 'Invalid credentials'. I've reset my password twice but still can't get in.",
            messages: [
              {
                id: 1,
                type: "customer",
                sender: "John Smith",
                content:
                  "I've been trying to log in to my online banking account for the past two days but keep getting an error message saying 'Invalid credentials'. I've reset my password twice but still can't get in.",
                time: "2023-04-15T09:30:00",
              },
            ],
          },
          {
            id: "TKT-1002",
            customer: {
              id: "C-1042",
              name: "Sarah Johnson",
              email: "sarah.j@example.com",
              initials: "SJ",
            },
            subject: "Unauthorized transaction on my account",
            category: "transaction",
            priority: "high",
            status: "in-progress",
            date: "2023-04-14T14:15:00",
            assignedTo: "Ayakino Nori",
            description:
              "I noticed a transaction of $250 that I didn't authorize on my checking account yesterday. I need this investigated and the money returned to my account as soon as possible.",
            messages: [
              {
                id: 1,
                type: "customer",
                sender: "Sarah Johnson",
                content:
                  "I noticed a transaction of $250 that I didn't authorize on my checking account yesterday. I need this investigated and the money returned to my account as soon as possible.",
                time: "2023-04-14T14:15:00",
              },
              {
                id: 2,
                type: "agent",
                sender: "Ayakino Nori",
                content:
                  "I'm sorry to hear about this unauthorized transaction. I've initiated an investigation and placed a temporary hold on your account to prevent further unauthorized access. Could you please provide the exact date and merchant name of the transaction?",
                time: "2023-04-14T15:30:00",
              },
              {
                id: 3,
                type: "customer",
                sender: "Sarah Johnson",
                content:
                  "The transaction was on April 13th to a merchant called 'TechGadgets Online'. I've never shopped there before.",
                time: "2023-04-14T16:05:00",
              },
              {
                id: 4,
                type: "system",
                sender: "System",
                content: "Ticket status changed from 'Open' to 'In Progress'",
                time: "2023-04-14T16:10:00",
              },
            ],
          },
          {
            id: "TKT-1003",
            customer: {
              id: "C-1078",
              name: "Michael Chen",
              email: "m.chen@example.com",
              initials: "MC",
            },
            subject: "Question about loan application process",
            category: "loan",
            priority: "medium",
            status: "open",
            date: "2023-04-14T11:20:00",
            assignedTo: "Unassigned",
            description:
              "I'm interested in applying for a home loan but I'm not sure about the documentation required. Could you provide a list of all the documents I need to prepare?",
            messages: [
              {
                id: 1,
                type: "customer",
                sender: "Michael Chen",
                content:
                  "I'm interested in applying for a home loan but I'm not sure about the documentation required. Could you provide a list of all the documents I need to prepare?",
                time: "2023-04-14T11:20:00",
              },
            ],
          },
          {
            id: "TKT-1004",
            customer: {
              id: "C-1015",
              name: "Emily Wilson",
              email: "emily.w@example.com",
              initials: "EW",
            },
            subject: "Mobile app keeps crashing",
            category: "mobile",
            priority: "medium",
            status: "open",
            date: "2023-04-13T16:45:00",
            assignedTo: "Unassigned",
            description:
              "The mobile banking app keeps crashing whenever I try to view my transaction history. I'm using an iPhone 13 with the latest iOS update and the latest version of your app.",
            messages: [
              {
                id: 1,
                type: "customer",
                sender: "Emily Wilson",
                content:
                  "The mobile banking app keeps crashing whenever I try to view my transaction history. I'm using an iPhone 13 with the latest iOS update and the latest version of your app.",
                time: "2023-04-13T16:45:00",
              },
            ],
          },
          {
            id: "TKT-1005",
            customer: {
              id: "C-1023",
              name: "David Brown",
              email: "d.brown@example.com",
              initials: "DB",
            },
            subject: "Need to update contact information",
            category: "account",
            priority: "low",
            status: "resolved",
            date: "2023-04-12T10:30:00",
            assignedTo: "Ayakino Nori",
            description:
              "I recently moved to a new address and need to update my contact information. I also have a new phone number.",
            messages: [
              {
                id: 1,
                type: "customer",
                sender: "David Brown",
                content:
                  "I recently moved to a new address and need to update my contact information. I also have a new phone number.",
                time: "2023-04-12T10:30:00",
              },
              {
                id: 2,
                type: "agent",
                sender: "Ayakino Nori",
                content:
                  "I'd be happy to help you update your contact information. For security purposes, could you please provide your account number and the last 4 digits of your SSN?",
                time: "2023-04-12T11:15:00",
              },
              {
                id: 3,
                type: "customer",
                sender: "David Brown",
                content: "My account number is 12345678 and the last 4 digits of my SSN are 5678.",
                time: "2023-04-12T11:30:00",
              },
              {
                id: 4,
                type: "agent",
                sender: "Ayakino Nori",
                content:
                  "Thank you for verifying your identity. I've updated your address and phone number in our system. Is there anything else you need help with today?",
                time: "2023-04-12T11:45:00",
              },
              {
                id: 5,
                type: "customer",
                sender: "David Brown",
                content: "No, that's all. Thank you for your help!",
                time: "2023-04-12T12:00:00",
              },
              {
                id: 6,
                type: "system",
                sender: "System",
                content: "Ticket status changed from 'In Progress' to 'Resolved'",
                time: "2023-04-12T12:05:00",
              },
            ],
          },
          {
            id: "TKT-1006",
            customer: {
              id: "C-1056",
              name: "Robert Taylor",
              email: "r.taylor@example.com",
              initials: "RT",
            },
            subject: "Credit card payment not showing up",
            category: "card",
            priority: "medium",
            status: "closed",
            date: "2023-04-10T09:15:00",
            assignedTo: "Ayakino Nori",
            description:
              "I made a payment on my credit card three days ago, but it's still not showing up in my account. The money has been deducted from my checking account.",
            messages: [
              {
                id: 1,
                type: "customer",
                sender: "Robert Taylor",
                content:
                  "I made a payment on my credit card three days ago, but it's still not showing up in my account. The money has been deducted from my checking account.",
                time: "2023-04-10T09:15:00",
              },
              {
                id: 2,
                type: "agent",
                sender: "Ayakino Nori",
                content:
                  "I understand your concern about the payment not showing up. Sometimes there can be a processing delay. Could you please provide the date of the payment and the amount?",
                time: "2023-04-10T10:00:00",
              },
              {
                id: 3,
                type: "customer",
                sender: "Robert Taylor",
                content: "I made the payment on April 7th for $500.",
                time: "2023-04-10T10:30:00",
              },
              {
                id: 4,
                type: "agent",
                sender: "Ayakino Nori",
                content:
                  "Thank you for that information. I've checked our system and can see that the payment is in processing. It should be posted to your account by the end of today. I'll make a note to follow up and ensure it posts correctly.",
                time: "2023-04-10T11:00:00",
              },
              {
                id: 5,
                type: "system",
                sender: "System",
                content: "Ticket status changed from 'Open' to 'In Progress'",
                time: "2023-04-10T11:05:00",
              },
              {
                id: 6,
                type: "agent",
                sender: "Ayakino Nori",
                content:
                  "Good news! I've confirmed that your payment of $500 has now been posted to your credit card account. Is there anything else you need assistance with?",
                time: "2023-04-11T09:30:00",
              },
              {
                id: 7,
                type: "customer",
                sender: "Robert Taylor",
                content: "I can see the payment now. Thank you for your help!",
                time: "2023-04-11T10:15:00",
              },
              {
                id: 8,
                type: "system",
                sender: "System",
                content: "Ticket status changed from 'In Progress' to 'Resolved'",
                time: "2023-04-11T10:20:00",
              },
              {
                id: 9,
                type: "system",
                sender: "System",
                content: "Ticket status changed from 'Resolved' to 'Closed'",
                time: "2023-04-13T10:20:00",
              },
            ],
          },
        ]
  
        // Render tickets in list view
        this.tickets.forEach((ticket) => {
          const ticketRow = this.createTicketRow(ticket)
          ticketsListBody.appendChild(ticketRow)
        })
  
        // Render tickets in grid view
        this.tickets.forEach((ticket) => {
          const ticketCard = this.createTicketCard(ticket)
          ticketsGrid.appendChild(ticketCard)
        })
  
        // Update pagination
        this.updatePagination(1, Math.ceil(this.tickets.length / 10))
      }, 1000) // Simulate 1 second loading time
    }
  
    /**
     * Load customers for the new ticket form
     */
    loadCustomers() {
      const customerSelect = document.getElementById("customerSelect")
  
      // Sample customers data
      this.customers = [
        { id: "C-1001", name: "John Smith" },
        { id: "C-1042", name: "Sarah Johnson" },
        { id: "C-1078", name: "Michael Chen" },
        { id: "C-1015", name: "Emily Wilson" },
        { id: "C-1023", name: "David Brown" },
        { id: "C-1056", name: "Robert Taylor" },
      ]
  
      // Add options to select
      this.customers.forEach((customer) => {
        const option = document.createElement("option")
        option.value = customer.id
        option.textContent = `${customer.name} (${customer.id})`
        customerSelect.appendChild(option)
      })
    }
  
    /**
     * Load agents for the new ticket form
     */
    loadAgents() {
      const assigneeSelect = document.getElementById("assigneeSelect")
  
      // Sample agents data
      this.agents = [
        { id: "A-1001", name: "Ayakino Nori" },
        { id: "A-1002", name: "Jane Wilson" },
        { id: "A-1003", name: "Mark Davis" },
      ]
  
      // Add options to select
      this.agents.forEach((agent) => {
        const option = document.createElement("option")
        option.value = agent.id
        option.textContent = agent.name
        assigneeSelect.appendChild(option)
      })
    }
  
    /**
     * Update dashboard stats
     */
    updateStats() {
      // In a real app, these would be calculated from actual data
      document.getElementById("openTicketsCount").textContent = "3"
      document.getElementById("inProgressCount").textContent = "1"
      document.getElementById("resolvedCount").textContent = "2"
      document.getElementById("avgResponseTime").textContent = "1.5h"
    }
  
    /**
     * Create a ticket row for list view
     * @param {Object} ticket - The ticket data
     * @returns {HTMLElement} - The ticket row element
     */
    createTicketRow(ticket) {
      const ticketRow = document.createElement("div")
      ticketRow.className = "ticket-row"
      ticketRow.setAttribute("data-ticket-id", ticket.id)
  
      // Format date
      const formattedDate = this.formatDate(ticket.date)
  
      // Priority and status classes
      const priorityClass = `priority-${ticket.priority}`
      const statusClass = `status-${ticket.status}`
  
      // Format category
      const categoryMap = {
        account: "Account Issues",
        transaction: "Transaction Problems",
        loan: "Loan Inquiries",
        card: "Card Services",
        online: "Online Banking",
        mobile: "Mobile App",
        other: "Other",
      }
  
      ticketRow.innerHTML = `
          <div class="ticket-col ticket-id">${ticket.id}</div>
          <div class="ticket-col customer">${ticket.customer.name}</div>
          <div class="ticket-col subject">${ticket.subject}</div>
          <div class="ticket-col category">${categoryMap[ticket.category] || ticket.category}</div>
          <div class="ticket-col priority"><span class="priority-badge ${priorityClass}">${this.capitalizeFirstLetter(ticket.priority)}</span></div>
          <div class="ticket-col status"><span class="status-badge ${statusClass}">${this.formatStatus(ticket.status)}</span></div>
          <div class="ticket-col date">${formattedDate}</div>
          <div class="ticket-col assigned">${ticket.assignedTo}</div>
      `
  
      // Add click event to open ticket details
      ticketRow.addEventListener("click", () => {
        this.openTicketModal(ticket)
      })
  
      return ticketRow
    }
  
    /**
     * Create a ticket card for grid view
     * @param {Object} ticket - The ticket data
     * @returns {HTMLElement} - The ticket card element
     */
    createTicketCard(ticket) {
      const ticketCard = document.createElement("div")
      ticketCard.className = "ticket-card"
      ticketCard.setAttribute("data-ticket-id", ticket.id)
  
      // Format date
      const formattedDate = this.formatDate(ticket.date)
  
      // Priority and status classes
      const priorityClass = `priority-${ticket.priority}`
      const statusClass = `status-${ticket.status}`
  
      ticketCard.innerHTML = `
          <div class="ticket-card-header">
              <div class="ticket-card-id">${ticket.id}</div>
              <div class="ticket-card-date">${formattedDate}</div>
          </div>
          <div class="ticket-card-subject">${ticket.subject}</div>
          <div class="ticket-card-customer">
              <div class="customer-avatar">${ticket.customer.initials}</div>
              <div class="customer-info">
                  <div class="customer-name">${ticket.customer.name}</div>
                  <div class="customer-email">${ticket.customer.email}</div>
              </div>
          </div>
          <div class="ticket-card-footer">
              <div class="ticket-card-category">${this.capitalizeFirstLetter(ticket.category)}</div>
              <div class="ticket-card-badges">
                  <span class="priority-badge ${priorityClass}">${this.capitalizeFirstLetter(ticket.priority)}</span>
                  <span class="status-badge ${statusClass}">${this.formatStatus(ticket.status)}</span>
              </div>
          </div>
      `
  
      // Add click event to open ticket details
      ticketCard.addEventListener("click", () => {
        this.openTicketModal(ticket)
      })
  
      return ticketCard
    }
  
    /**
     * Update pagination UI
     * @param {number} currentPage - The current page number
     * @param {number} totalPages - The total number of pages
     */
    updatePagination(currentPage, totalPages) {
      document.getElementById("currentPage").textContent = currentPage
      document.getElementById("totalPages").textContent = totalPages
  
      // Enable/disable buttons
      document.getElementById("prevPage").disabled = currentPage === 1
      document.getElementById("nextPage").disabled = currentPage === totalPages
    }
  
    /**
     * Open ticket details modal
     * @param {Object} ticket - The ticket data
     */
    openTicketModal(ticket) {
      const modal = document.getElementById("ticketModal")
      const ticketDetails = document.getElementById("ticketDetails")
      const ticketActions = document.getElementById("ticketActions")
  
      // Clear previous content
      ticketDetails.innerHTML = ""
      ticketActions.innerHTML = ""
  
      // Format category
      const categoryMap = {
        account: "Account Issues",
        transaction: "Transaction Problems",
        loan: "Loan Inquiries",
        card: "Card Services",
        online: "Online Banking",
        mobile: "Mobile App",
        other: "Other",
      }
  
      // Priority and status classes
      const priorityClass = `priority-${ticket.priority}`
      const statusClass = `status-${ticket.status}`
  
      // Build the modal content
      ticketDetails.innerHTML = `
          <div class="ticket-detail-header">
              <div>
                  <div class="ticket-detail-id">${ticket.id}</div>
                  <div class="ticket-detail-subject">${ticket.subject}</div>
                  <div class="ticket-detail-badges">
                      <span class="priority-badge ${priorityClass}">${this.capitalizeFirstLetter(ticket.priority)}</span>
                      <span class="status-badge ${statusClass}">${this.formatStatus(ticket.status)}</span>
                  </div>
              </div>
          </div>
          
          <div class="ticket-detail-info">
              <div class="detail-group">
                  <div class="detail-label">Customer</div>
                  <div class="detail-value">${ticket.customer.name}</div>
              </div>
              <div class="detail-group">
                  <div class="detail-label">Customer ID</div>
                  <div class="detail-value">${ticket.customer.id}</div>
              </div>
              <div class="detail-group">
                  <div class="detail-label">Email</div>
                  <div class="detail-value">${ticket.customer.email}</div>
              </div>
              <div class="detail-group">
                  <div class="detail-label">Category</div>
                  <div class="detail-value">${categoryMap[ticket.category] || ticket.category}</div>
              </div>
              <div class="detail-group">
                  <div class="detail-label">Date Created</div>
                  <div class="detail-value">${this.formatDate(ticket.date)}</div>
              </div>
              <div class="detail-group">
                  <div class="detail-label">Assigned To</div>
                  <div class="detail-value">${ticket.assignedTo}</div>
              </div>
          </div>
          
          <div class="ticket-description">
              <h4>Description</h4>
              <div class="description-content">${ticket.description}</div>
          </div>
          
          <div class="conversation-section">
              <h4>Conversation <span class="message-count">${ticket.messages.length}</span></h4>
              <div class="conversation">
                  ${ticket.messages.map((message) => this.createMessageHTML(message)).join("")}
              </div>
          </div>
          
          ${
            ticket.status !== "closed"
              ? `
          <div class="reply-section">
              <h4>Reply</h4>
              <div class="reply-actions">
                  <button class="reply-type active" data-type="public">Public Reply</button>
                  <button class="reply-type" data-type="internal">Internal Note</button>
              </div>
              <textarea class="reply-textarea" placeholder="Type your reply here..."></textarea>
              <div class="reply-footer">
                  <div class="reply-options">
                      <select class="status-select">
                          <option value="">Keep Status</option>
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                      </select>
                  </div>
                  <button class="btn btn-primary" id="sendReplyBtn">Send Reply</button>
              </div>
          </div>
          `
              : ""
          }
      `
  
      // Add action buttons based on ticket status
      if (ticket.status === "open") {
        ticketActions.innerHTML = `
              <button class="btn btn-outline" id="assignToMeBtn">Assign to Me</button>
              <button class="btn btn-primary" id="startWorkingBtn">Start Working</button>
          `
      } else if (ticket.status === "in-progress") {
        ticketActions.innerHTML = `
              <button class="btn btn-outline" id="escalateBtn">Escalate</button>
              <button class="btn btn-primary" id="resolveBtn">Mark as Resolved</button>
          `
      } else if (ticket.status === "resolved") {
        ticketActions.innerHTML = `
              <button class="btn btn-outline" id="reopenBtn">Reopen</button>
              <button class="btn btn-primary" id="closeBtn">Close Ticket</button>
          `
      } else if (ticket.status === "closed") {
        ticketActions.innerHTML = `
              <button class="btn btn-outline" id="reopenBtn">Reopen</button>
              <button class="btn btn-primary" id="createFollowUpBtn">Create Follow-Up</button>
          `
      }
  
      // Add event listeners to buttons
      if (ticket.status === "open") {
        document.getElementById("assignToMeBtn").addEventListener("click", () => {
          this.assignTicketToMe(ticket.id)
        })
        document.getElementById("startWorkingBtn").addEventListener("click", () => {
          this.startWorkingOnTicket(ticket.id)
        })
      } else if (ticket.status === "in-progress") {
        document.getElementById("escalateBtn").addEventListener("click", () => {
          this.escalateTicket(ticket.id)
        })
        document.getElementById("resolveBtn").addEventListener("click", () => {
          this.resolveTicket(ticket.id)
        })
      } else if (ticket.status === "resolved") {
        document.getElementById("reopenBtn").addEventListener("click", () => {
          this.reopenTicket(ticket.id)
        })
        document.getElementById("closeBtn").addEventListener("click", () => {
          this.closeTicket(ticket.id)
        })
      } else if (ticket.status === "closed") {
        document.getElementById("reopenBtn").addEventListener("click", () => {
          this.reopenTicket(ticket.id)
        })
        document.getElementById("createFollowUpBtn").addEventListener("click", () => {
          this.createFollowUp(ticket.id)
        })
      }
  
      // Add event listener to send reply button if ticket is not closed
      if (ticket.status !== "closed") {
        document.getElementById("sendReplyBtn").addEventListener("click", () => {
          this.sendReply(ticket.id)
        })
  
        // Add event listeners to reply type buttons
        const replyTypeButtons = document.querySelectorAll(".reply-type")
        replyTypeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            replyTypeButtons.forEach((btn) => btn.classList.remove("active"))
            button.classList.add("active")
          })
        })
      }
  
      // Show the modal
      modal.style.display = "block"
    }
  
    /**
     * Create HTML for a message
     * @param {Object} message - The message data
     * @returns {string} - HTML string for the message
     */
    createMessageHTML(message) {
      const formattedTime = this.formatTime(message.time)
  
      return `
        <div class="message ${message.type}">
            <div class="message-avatar">${this.getInitials(message.sender)}</div>
            <div class="message-content">
                <div class="message-header">
                    <div class="message-sender">${message.sender}</div>
                    <div class="message-time">${formattedTime}</div>
                </div>
                <div class="message-body">${message.content}</div>
            </div>
        </div>
      `
    }
  
    /**
     * Assign ticket to the current user
     * @param {string} ticketId - The ticket ID
     */
    assignTicketToMe(ticketId) {
      console.log(`Assigning ticket ${ticketId} to me`)
      alert(`Ticket ${ticketId} has been assigned to you.`)
      document.getElementById("ticketModal").style.display = "none"
    }
  
    /**
     * Start working on a ticket
     * @param {string} ticketId - The ticket ID
     */
    startWorkingOnTicket(ticketId) {
      console.log(`Starting work on ticket ${ticketId}`)
      alert(`Ticket ${ticketId} status changed to In Progress.`)
      document.getElementById("ticketModal").style.display = "none"
    }
  
    /**
     * Escalate a ticket
     * @param {string} ticketId - The ticket ID
     */
    escalateTicket(ticketId) {
      console.log(`Escalating ticket ${ticketId}`)
      alert(`Ticket ${ticketId} has been escalated.`)
      document.getElementById("ticketModal").style.display = "none"
    }
  
    /**
     * Resolve a ticket
     * @param {string} ticketId - The ticket ID
     */
    resolveTicket(ticketId) {
      console.log(`Resolving ticket ${ticketId}`)
      alert(`Ticket ${ticketId} has been marked as Resolved.`)
      document.getElementById("ticketModal").style.display = "none"
    }
  
    /**
     * Reopen a ticket
     * @param {string} ticketId - The ticket ID
     */
    reopenTicket(ticketId) {
      console.log(`Reopening ticket ${ticketId}`)
      alert(`Ticket ${ticketId} has been reopened.`)
      document.getElementById("ticketModal").style.display = "none"
    }
  
    /**
     * Close a ticket
     * @param {string} ticketId - The ticket ID
     */
    closeTicket(ticketId) {
      console.log(`Closing ticket ${ticketId}`)
      alert(`Ticket ${ticketId} has been closed.`)
      document.getElementById("ticketModal").style.display = "none"
    }
  
    /**
     * Create a follow-up ticket
     * @param {string} ticketId - The ticket ID
     */
    createFollowUp(ticketId) {
      console.log(`Creating follow-up for ticket ${ticketId}`)
      alert(`Follow-up ticket created for ${ticketId}.`)
      document.getElementById("ticketModal").style.display = "none"
    }
  
    /**
     * Send a reply to a ticket
     * @param {string} ticketId - The ticket ID
     */
    sendReply(ticketId) {
      const replyText = document.querySelector(".reply-textarea").value
      const replyType = document.querySelector(".reply-type.active").getAttribute("data-type")
      const statusChange = document.querySelector(".status-select").value
  
      if (!replyText.trim()) {
        alert("Please enter a reply before sending.")
        return
      }
  
      console.log(`Sending ${replyType} reply to ticket ${ticketId}: ${replyText}`)
  
      if (statusChange) {
        console.log(`Changing ticket status to ${statusChange}`)
      }
  
      alert("Reply sent successfully!")
      document.getElementById("ticketModal").style.display = "none"
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
     * Format time string
     * @param {string} dateString - The date string to format
     * @returns {string} - Formatted time string
     */
    formatTime(dateString) {
      const options = { hour: "2-digit", minute: "2-digit" }
      return new Date(dateString).toLocaleTimeString(undefined, options)
    }
  
    /**
     * Capitalize first letter of a string
     * @param {string} string - The string to capitalize
     * @returns {string} - Capitalized string
     */
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
    /**
     * Format status string
     * @param {string} status - The status string to format
     * @returns {string} - Formatted status string
     */
    formatStatus(status) {
      if (status === "in-progress") {
        return "In Progress"
      }
      return this.capitalizeFirstLetter(status)
    }
  
    /**
     * Get initials from a name
     * @param {string} name - The name to get initials from
     * @returns {string} - Initials
     */
    getInitials(name) {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2)
    }
  }
  
  /**
   * Manages UI interactions
   */
  class UIManager {
    constructor(ticketManager) {
      this.ticketManager = ticketManager
    }
  
    //Set up search functionality
    
    setupSearch() {
      const searchInput = document.getElementById("ticketSearch")
  
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase()
        this.filterTickets(searchTerm)
      })
    }
  
    /**
     * Filter tickets based on search term
     * @param {string} searchTerm - The search term
     */
    filterTickets(searchTerm) {
      const ticketRows = document.querySelectorAll(".ticket-row")
      const ticketCards = document.querySelectorAll(".ticket-card")
  
      // Filter list view
      ticketRows.forEach((row) => {
        const ticketId = row.querySelector(".ticket-id").textContent.toLowerCase()
        const customerName = row.querySelector(".customer").textContent.toLowerCase()
        const subject = row.querySelector(".subject").textContent.toLowerCase()
  
        if (ticketId.includes(searchTerm) || customerName.includes(searchTerm) || subject.includes(searchTerm)) {
          row.style.display = "flex"
        } else {
          row.style.display = "none"
        }
      })
  
      // Filter grid view
      ticketCards.forEach((card) => {
        const ticketId = card.querySelector(".ticket-card-id").textContent.toLowerCase()
        const customerName = card.querySelector(".customer-name").textContent.toLowerCase()
        const subject = card.querySelector(".ticket-card-subject").textContent.toLowerCase()
  
        if (ticketId.includes(searchTerm) || customerName.includes(searchTerm) || subject.includes(searchTerm)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }
  
    /**
     * Set up filters
     */
    setupFilters() {
      const priorityFilter = document.getElementById("priorityFilter")
      const statusFilter = document.getElementById("statusFilter")
  
      priorityFilter.addEventListener("change", () => this.applyFilters())
      statusFilter.addEventListener("change", () => this.applyFilters())
    }
  
    /**
     * Apply filters to tickets
     */
    applyFilters() {
      const priorityFilter = document.getElementById("priorityFilter").value
      const statusFilter = document.getElementById("statusFilter").value
  
      const ticketRows = document.querySelectorAll(".ticket-row")
      const ticketCards = document.querySelectorAll(".ticket-card")
  
      // Filter list view
      ticketRows.forEach((row) => {
        const priority = row.querySelector(".priority-badge").textContent.toLowerCase()
        const status = row.querySelector(".status-badge").textContent.toLowerCase().replace(" ", "-")
  
        const priorityMatch = priorityFilter === "all" || priority === priorityFilter
        const statusMatch = statusFilter === "all" || status === statusFilter
  
        if (priorityMatch && statusMatch) {
          row.style.display = "flex"
        } else {
          row.style.display = "none"
        }
      })
  
      // Filter grid view
      ticketCards.forEach((card) => {
        const priority = card.querySelector(".priority-badge").textContent.toLowerCase()
        const status = card.querySelector(".status-badge").textContent.toLowerCase().replace(" ", "-")
  
        const priorityMatch = priorityFilter === "all" || priority === priorityFilter
        const statusMatch = statusFilter === "all" || status === statusFilter
  
        if (priorityMatch && statusMatch) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }
  
    /**
     * Set up view toggle
     */
    setupViewToggle() {
      const viewButtons = document.querySelectorAll(".view-btn")
      const ticketsList = document.getElementById("ticketsList")
      const ticketsGrid = document.getElementById("ticketsGrid")
  
      viewButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons
          viewButtons.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          button.classList.add("active")
  
          // Toggle view
          const viewType = button.getAttribute("data-view")
          if (viewType === "list") {
            ticketsList.classList.add("view-active")
            ticketsGrid.classList.remove("view-active")
          } else {
            ticketsList.classList.remove("view-active")
            ticketsGrid.classList.add("view-active")
          }
        })
      })
    }
  
    /**
     * Set up pagination
     */
    setupPagination() {
      const prevPageBtn = document.getElementById("prevPage")
      const nextPageBtn = document.getElementById("nextPage")
  
      prevPageBtn.addEventListener("click", () => {
        const currentPage = Number.parseInt(document.getElementById("currentPage").textContent)
        if (currentPage > 1) {
          this.ticketManager.updatePagination(
            currentPage - 1,
            Number.parseInt(document.getElementById("totalPages").textContent),
          )
        }
      })
  
      nextPageBtn.addEventListener("click", () => {
        const currentPage = Number.parseInt(document.getElementById("currentPage").textContent)
        const totalPages = Number.parseInt(document.getElementById("totalPages").textContent)
        if (currentPage < totalPages) {
          this.ticketManager.updatePagination(currentPage + 1, totalPages)
        }
      })
    }
  
    /**
     * Set up sidebar toggle functionality
     */
    setupSidebar() {
      const sidebarToggle = document.getElementById("sidebarToggle")
      const sidebar = document.querySelector(".sidebar")
  
      // Check if sidebar state is stored in localStorage
      const sidebarCollapsed = localStorage.getItem("sidebarCollapsed") === "true"
  
      // Initialize sidebar state
      if (sidebarCollapsed) {
        sidebar.classList.add("collapsed")
        sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>'
      }
  
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed")
  
        // Update toggle icon
        if (sidebar.classList.contains("collapsed")) {
          sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>'
          localStorage.setItem("sidebarCollapsed", "true")
        } else {
          sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>'
          localStorage.setItem("sidebarCollapsed", "false")
        }
      })
  
      // Handle responsive behavior
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          if (!sidebar.classList.contains("collapsed")) {
            sidebar.classList.add("collapsed")
            sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>'
          }
        }
      }
  
      // Initial check
      handleResize()
  
      // Listen for window resize
      window.addEventListener("resize", handleResize)
    }
  
    /**
     * Set up sidebar navigation highlight effect
     */
    setupSidebarNavHighlight() {
      const navLinks = document.querySelectorAll(".nav-menu li a")
  
      navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          // Remove any existing clicked classes
          navLinks.forEach((l) => l.classList.remove("clicked"))
  
          // Add clicked class to the clicked link
          this.classList.add("clicked")
  
          // Set a timeout to remove the class after the animation completes
          setTimeout(() => {
            this.classList.remove("clicked")
          }, 500)
        })
      })
    }
  }
  
  /**
   * Manages modal interactions
   */
  class ModalManager {
    constructor(ticketManager) {
      this.ticketManager = ticketManager
    }
  
    /**
     * Set up modals
     */
    setupModals() {
      const ticketModal = document.getElementById("ticketModal")
      const newTicketModal = document.getElementById("newTicketModal")
      const closeButtons = document.querySelectorAll(".close-modal")
  
      // Close modals when clicking the X
      closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          ticketModal.style.display = "none"
          newTicketModal.style.display = "none"
        })
      })
  
      // Close modals when clicking outside
      window.addEventListener("click", (event) => {
        if (event.target === ticketModal) {
          ticketModal.style.display = "none"
        }
        if (event.target === newTicketModal) {
          newTicketModal.style.display = "none"
        }
      })
    }
  
    /**
     * Set up new ticket functionality
     */
    setupNewTicket() {
      const newTicketBtn = document.getElementById("newTicketBtn")
      const newTicketModal = document.getElementById("newTicketModal")
      const createTicketBtn = document.getElementById("createTicketBtn")
      const cancelTicketBtn = document.getElementById("cancelTicketBtn")
  
      // Open new ticket modal
      newTicketBtn.addEventListener("click", () => {
        newTicketModal.style.display = "block"
      })
  
      // Cancel new ticket
      cancelTicketBtn.addEventListener("click", () => {
        newTicketModal.style.display = "none"
      })
  
      // Create new ticket
      createTicketBtn.addEventListener("click", () => {
        const form = document.getElementById("newTicketForm")
  
        // Check form validity
        if (form.checkValidity()) {
          // In a real app, you would send this data to your backend
          const ticketData = {
            customerId: document.getElementById("customerSelect").value,
            subject: document.getElementById("ticketSubject").value,
            category: document.getElementById("ticketCategory").value,
            priority: document.getElementById("ticketPriority").value,
            description: document.getElementById("ticketDescription").value,
            assignee: document.getElementById("assigneeSelect").value,
          }
  
          console.log("Creating new ticket:", ticketData)
  
          // Show success message and close modal
          alert("Ticket created successfully!")
          newTicketModal.style.display = "none"
  
          // Reset form
          form.reset()
  
          // In a real app, you would refresh the tickets list
        } else {
          // Trigger HTML5 validation
          form.reportValidity()
        }
      })
    }
  }
  