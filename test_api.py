"""
Test script to demonstrate the Experience Detection API

Run the server first:
    python app/main.py

Then run this test script in another terminal:
    python test_api.py
"""

import requests
import os

BASE_URL = "http://localhost:8000"

# ====================================
# TEST 1: Health Check
# ====================================

def test_health_check():
    print("\n" + "="*50)
    print("TEST 1: Health Check")
    print("="*50)
    response = requests.get(f"{BASE_URL}/health")
    print(response.json())

# ====================================
# TEST 2: API Info
# ====================================

def test_api_info():
    print("\n" + "="*50)
    print("TEST 2: API Info")
    print("="*50)
    response = requests.get(f"{BASE_URL}/info")
    print(response.json())

# ====================================
# TEST 3: Upload TXT Resume
# ====================================

def test_txt_resume():
    print("\n" + "="*50)
    print("TEST 3: Upload TXT Resume")
    print("="*50)

    # Create a sample resume
    sample_resume = """
    John Doe
    Email: john@example.com
    Phone: +91-9876543210

    EXPERIENCE

    Senior Python Developer at TechCorp
    Duration: 3 years

    Full Stack Developer at StartupXYZ
    Duration: one year and six months

    Junior Developer at WebServices Inc
    Duration: 2 to 3 years

    Internship at DataSystems
    Duration: 10 months
    """

    # Write to temporary file
    with open("sample_resume.txt", "w") as f:
        f.write(sample_resume)

    # Upload file
    with open("sample_resume.txt", "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/detect-experience", files=files)

    print(response.json())

    # Clean up
    os.remove("sample_resume.txt")

# ====================================
# TEST 4: Root Endpoint
# ====================================

def test_root():
    print("\n" + "="*50)
    print("TEST 4: Root Endpoint")
    print("="*50)
    response = requests.get(BASE_URL)
    print(response.json())

# ====================================
# Main Test Runner
# ====================================

if __name__ == "__main__":
    try:
        test_health_check()
        test_api_info()
        test_root()
        test_txt_resume()

        print("\n" + "="*50)
        print("✓ All tests passed!")
        print("="*50)

    except requests.exceptions.ConnectionError:
        print("\n❌ Cannot connect to server!")
        print("Make sure to run: python app/main.py")
    except Exception as e:
        print(f"\n❌ Error: {e}")
