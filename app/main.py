from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import PyPDF2
import docx
import io
from experience import extract_experience, best_experience

# Initialize FastAPI app
app = FastAPI(
    title="Resume Experience Detection API",
    description="Upload resume and detect years of experience",
    version="1.0.0"
)

# ====================================
# Helper Function: Extract Text from PDF
# ====================================

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading PDF: {str(e)}"
        )

# ====================================
# Helper Function: Extract Text from DOCX
# ====================================

def extract_text_from_docx(file_content: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        doc = docx.Document(io.BytesIO(file_content))
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading DOCX: {str(e)}"
        )

# ====================================
# Helper Function: Extract Text from TXT
# ====================================

def extract_text_from_txt(file_content: bytes) -> str:
    """Extract text from TXT file"""
    try:
        return file_content.decode('utf-8')
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading TXT: {str(e)}"
        )

# ====================================
# Helper Function: Get Text Based on File Type
# ====================================

def extract_text_from_file(
    filename: str,
    file_content: bytes
) -> str:
    """Extract text from file based on extension"""
    filename_lower = filename.lower()

    if filename_lower.endswith('.pdf'):
        return extract_text_from_pdf(file_content)

    elif filename_lower.endswith('.docx'):
        return extract_text_from_docx(file_content)

    elif filename_lower.endswith('.txt'):
        return extract_text_from_txt(file_content)

    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload PDF, DOCX, or TXT"
        )

# ====================================
# ENDPOINT 1: Extract Experience
# ====================================

@app.post("/detect-experience")
async def detect_experience(file: UploadFile = File(...)):
    """
    Upload a resume file and detect experience.

    Supported formats: PDF, DOCX, TXT

    Returns:
    - all_experience: List of all detected experience values
    - best_experience: Best/highest experience match
    - file_name: Uploaded file name
    """

    # Read file content
    try:
        file_content = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading file: {str(e)}"
        )

    # Extract text from file
    resume_text = extract_text_from_file(file.filename, file_content)

    # Detect experience
    all_experience = extract_experience(resume_text)
    best_exp = best_experience(resume_text)

    return JSONResponse({
        "status": "success",
        "file_name": file.filename,
        "all_experience": all_experience,
        "best_experience": best_exp,
        "resume_snippet": resume_text[:500]  # First 500 chars for debugging
    })

# ====================================
# ENDPOINT 2: Health Check
# ====================================

@app.get("/health")
async def health_check():
    """Check if API is running"""
    return JSONResponse({
        "status": "healthy",
        "message": "Resume Experience Detection API is running"
    })

# ====================================
# ENDPOINT 3: API Info
# ====================================

@app.get("/info")
async def api_info():
    """Get API information"""
    return JSONResponse({
        "api_name": "Resume Experience Detection API",
        "version": "1.0.0",
        "description": "Detects years of experience from uploaded resumes",
        "supported_formats": ["PDF", "DOCX", "TXT"],
        "endpoints": {
            "/detect-experience": "POST - Upload resume and detect experience",
            "/health": "GET - Health check",
            "/info": "GET - API information",
            "/docs": "GET - Interactive API documentation"
        }
    })

# ====================================
# ROOT ENDPOINT
# ====================================

@app.get("/")
async def root():
    """Welcome message"""
    return JSONResponse({
        "message": "Welcome to Resume Experience Detection API",
        "visit": "http://localhost:8000/docs for API documentation"
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
