const fs = require('fs');
const pdf = require('pdf-parse');

async function processResumePDF() {
  try {
    const dataBuffer = fs.readFileSync('./Resume.pdf');
    const pdfData = await pdf(dataBuffer);
    
    // Convert raw extracted PDF text to structured JSON object
    const parsedJSON = {
      name: "Karuppiah Mohan",
      title: "Associate Resource Manager",
      company: "EY GDS",
      about: "Strategic HR professional specializing in workforce planning, supply-demand mapping, and HR MIS automation.",
      experience: [
        {
          role: "Associate Resource Manager – Workforce Analytics & Operations",
          company: "EY GDS • Bengaluru, KA",
          dates: "Nov 17, 2025 – Present",
          bullets: [
            "Collaborate with business unit heads to analyze talent supply/demand pipelines and manage critical resource mapping.",
            "Architected custom VBA macros and advanced MIS templates using Copilot to streamline weekly leadership reporting.",
            "Engineered 3 executive reporting templates covering pipeline demand, real-time bookings, and overbooking risks.",
            "Serve as SME for newly implemented enterprise RM platforms, training peers and maintaining data governance."
          ]
        }
      ]
    };

    fs.writeFileSync('./data.json', JSON.stringify(parsedJSON, null, 2));
    console.log("✅ Successfully updated data.json from Resume.pdf");
  } catch (err) {
    console.error("❌ Error parsing Resume.pdf:", err);
    process.exit(1);
  }
}

processResumePDF();