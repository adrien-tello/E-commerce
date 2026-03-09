// Agro_Medicine Platform Logic

// Initial Data Simulation
const diseasesData = [
  {
    id: 1,
    name: "Malaria",
    category: "Immune",
    bodySystem: "immune",
    severity: "high",
    overview: "A disease caused by a plasmodium parasite, transmitted by the bite of infected mosquitoes.",
    symptoms: ["High fever", "Chills", "Headache", "Nausea"],
    ingredients: ["Cinchona bark", "Artemisia annua (Sweet Wormwood)", "Ginger root"],
    preparation: [
      "Grind the dried Cinchona bark into a fine powder.",
      "Boil 10g of powder in 500ml of water for 15 minutes.",
      "Add a slice of fresh ginger root for flavor and digestive support.",
      "Strain through a clean cloth.",
    ],
    dosage: "Drink 150ml three times daily after meals for 7 days.",
    warnings: "Do not exceed stated dose. Avoid during pregnancy unless specifically advised.",
    doctor: "Dr. Kofi Mensah",
    reviewedDate: "Oct 12, 2025",
  },
  {
    id: 2,
    name: "Chronic Cough",
    category: "Respiratory",
    bodySystem: "respiratory",
    severity: "medium",
    overview: "A persistent cough lasting more than 8 weeks, often caused by inflammation or irritation.",
    symptoms: ["Persistent coughing", "Sore throat", "Chest tightness"],
    ingredients: ["Raw honey", "Lemon", "Garlic cloves", "Thyme"],
    preparation: [
      "Crush 3 cloves of fresh garlic.",
      "Mix with 4 tablespoons of raw honey and juice from half a lemon.",
      "Infuse with fresh thyme sprigs for 2 hours.",
      "Store in a glass jar.",
    ],
    dosage: "Take 1 tablespoon every 4 hours.",
    warnings: "Not suitable for children under 1 year old due to honey content.",
    doctor: "Dr. Amara Okoro",
    reviewedDate: "Dec 05, 2025",
  },
]

// State Management
let currentDiseases = [...diseasesData]
let currentRole = "user" // 'user' or 'doctor'

// DOM Elements
const diseasesGrid = document.getElementById("diseases-grid")
const searchInput = document.getElementById("disease-search")
const systemFilter = document.getElementById("body-system-filter")
const treatmentModal = document.getElementById("treatment-modal")
const modalBody = document.getElementById("modal-body")
const closeModal = document.querySelector(".close-modal")
const treatmentForm = document.getElementById("treatment-form")

const userRoleBtn = document.getElementById("user-role-btn")
const doctorRoleBtn = document.getElementById("doctor-role-btn")
const dashboardSection = document.getElementById("dashboard")
const directorySection = document.getElementById("directory")
const heroSection = document.querySelector(".hero")

// --- Initialization ---
function init() {
  renderDiseases(currentDiseases)
  setupEventListeners()
}

// --- Functions ---

function renderDiseases(data) {
  diseasesGrid.innerHTML = ""

  if (data.length === 0) {
    diseasesGrid.innerHTML = '<p class="no-results">No diseases found matching your criteria.</p>'
    return
  }

  data.forEach((disease) => {
    const card = document.createElement("div")
    card.className = "disease-card"
    card.innerHTML = `
            <span class="card-category">${disease.category}</span>
            <h3>${disease.name}</h3>
            <span class="severity ${disease.severity}">${disease.severity.toUpperCase()} SEVERITY</span>
            <p class="excerpt">${disease.overview.substring(0, 80)}...</p>
            <a href="#" class="view-btn" data-id="${disease.id}">View Treatment</a>
        `

    card.addEventListener("click", () => showTreatmentDetails(disease.id))
    diseasesGrid.appendChild(card)
  })
}

function showTreatmentDetails(id) {
  const disease = diseasesData.find((d) => d.id === id)
  if (!disease) return

  modalBody.innerHTML = `
        <div class="treatment-header">
            <span class="treatment-badge">${disease.category}</span>
            <h1>${disease.name}</h1>
            <p>${disease.overview}</p>
        </div>

        <div class="treatment-section">
            <h3>Symptoms</h3>
            <ul class="symptoms-list">
                ${disease.symptoms.map((s) => `<li>${s}</li>`).join("")}
            </ul>
        </div>

        <div class="treatment-section">
            <h3>Herbal Ingredients</h3>
            <div class="ingredients-list">
                ${disease.ingredients.map((i) => `<span>🌿 ${i}</span>`).join(", ")}
            </div>
        </div>

        <div class="timeline">
            <h3>Preparation Steps</h3>
            ${disease.preparation
              .map(
                (step, index) => `
                <div class="step">
                    <div class="step-num">${index + 1}</div>
                    <div class="step-text">${step}</div>
                </div>
            `,
              )
              .join("")}
        </div>

        <div class="treatment-section">
            <h3>Dosage & Usage</h3>
            <p>${disease.dosage}</p>
        </div>

        <div class="warnings">
            <h3>⚠️ Safety Warnings</h3>
            <p>${disease.warnings}</p>
        </div>

        <div class="doctor-info">
            <div class="doctor-avatar"></div>
            <div>
                <p><strong>${disease.doctor}</strong> <span class="verify-badge">Verified Doctor ✓</span></p>
                <p style="font-size: 12px; color: #888;">Last reviewed: ${disease.reviewedDate}</p>
            </div>
        </div>
    `

  treatmentModal.classList.remove("hidden")
  document.body.style.overflow = "hidden" // Prevent scroll
}

function setupEventListeners() {
  // Search & Filter
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase()
    filterData(term, systemFilter.value)
  })

  systemFilter.addEventListener("change", (e) => {
    filterData(searchInput.value.toLowerCase(), e.target.value)
  })

  // Modal Close
  closeModal.addEventListener("click", () => {
    treatmentModal.classList.add("hidden")
    document.body.style.overflow = "auto"
  })

  window.addEventListener("click", (e) => {
    if (e.target === treatmentModal) {
      treatmentModal.classList.add("hidden")
      document.body.style.overflow = "auto"
    }
  })

  // Role Switching
  userRoleBtn.addEventListener("click", () => switchRole("user"))
  doctorRoleBtn.addEventListener("click", () => switchRole("doctor"))

  // Form Submission
  treatmentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleFormSubmission()
  })
}

function filterData(term, system) {
  currentDiseases = diseasesData.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(term) ||
      d.overview.toLowerCase().includes(term) ||
      d.symptoms.some((s) => s.toLowerCase().includes(term))

    const matchesSystem = system === "all" || d.bodySystem === system

    return matchesSearch && matchesSystem
  })
  renderDiseases(currentDiseases)
}

function switchRole(role) {
  currentRole = role
  userRoleBtn.classList.toggle("active", role === "user")
  doctorRoleBtn.classList.toggle("active", role === "doctor")

  if (role === "doctor") {
    dashboardSection.classList.remove("hidden")
    directorySection.classList.add("hidden")
    heroSection.classList.add("hidden")
  } else {
    dashboardSection.classList.add("hidden")
    directorySection.classList.remove("hidden")
    heroSection.classList.remove("hidden")
  }
}

function handleFormSubmission() {
  const newDisease = {
    id: diseasesData.length + 1,
    name: document.getElementById("form-disease-name").value,
    category: "Custom",
    bodySystem: document.getElementById("form-body-system").value,
    severity: "medium",
    overview: "Locally uploaded treatment protocol.",
    symptoms: ["Contact doctor for full details"],
    ingredients: document.getElementById("form-ingredients").value.split(","),
    preparation: document.getElementById("form-preparation").value.split("\n"),
    dosage: document.getElementById("form-dosage").value,
    warnings: document.getElementById("form-warnings").value,
    doctor: "Verified Doctor",
    reviewedDate: new Date().toLocaleDateString(),
  }

  diseasesData.push(newDisease)
  alert("Treatment uploaded successfully (simulated)! Switch to User View to see it.")
  treatmentForm.reset()
  switchRole("user")
  renderDiseases(diseasesData)
}

// Start app
init()
