import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
export default function ResultsPage() {
  const location = useLocation();

  const navigate = useNavigate();

  const requirements =
    location.state?.requirements ||
    "No project blueprint generated.";

    const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(requirements);
    alert("Blueprint copied to clipboard!");
  } catch (err) {
    console.error(err);
    alert("Failed to copy blueprint.");
  }
};

const downloadPDF = () => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height; // A4 height is ~297mm
  const margin = 15;
  const topMargin = 20;
  const bottomMargin = 20;
  const maxLineWidth = 180;
  const lineHeight = 6; // in mm

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ProjectForge AI Blueprint", margin, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const lines = doc.splitTextToSize(requirements, maxLineWidth);
  let y = 30; // Start below the title

  for (let i = 0; i < lines.length; i++) {
    // If the next line exceeds the page limit, add a new page and reset y
    if (y + lineHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = topMargin;
    }
    doc.text(lines[i], margin, y);
    y += lineHeight;
  }

  doc.save("ProjectForge_Blueprint.pdf");
};



  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "white",
        padding: "clamp(16px, 4vw, 40px)",
      }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Generated Blueprint</h1>
          <button className="btn-secondary px-4 py-2" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          <button onClick={copyToClipboard} className="btn-primary px-5 py-3 font-semibold">
            📋 Copy Blueprint
          </button>

          <button onClick={downloadPDF} className="btn-secondary px-5 py-3 font-semibold">
            📄 Download PDF
          </button>

          <button onClick={() => navigate("/")} className="btn-secondary px-5 py-3 font-semibold">
            🔄 Generate Another Project
          </button>
        </div>

        <div className="results-card mt-5">
          <ReactMarkdown>{requirements}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}