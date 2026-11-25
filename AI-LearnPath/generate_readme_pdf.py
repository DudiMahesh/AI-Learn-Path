import os
import subprocess
import markdown

readme_path = os.path.join(os.path.dirname(__file__), "README.md")
html_path = os.path.join(os.path.dirname(__file__), "README_printable.html")
pdf_path = os.path.join(os.path.dirname(__file__), "AI_LearnPath_README.pdf")

with open(readme_path, "r", encoding="utf-8") as f:
    md_content = f.read()

# Convert markdown to html with rich extensions
html_body = markdown.markdown(
    md_content,
    extensions=['tables', 'fenced_code', 'toc', 'nl2br']
)

# Professional CSS template designed specifically for high quality PDF output
html_document = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI LearnPath — Project Documentation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

    @page {{
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
    }}

    *, *::before, *::after {{
      box-sizing: border-box;
    }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.65;
      color: #1e293b;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }}

    /* Title & Header Banner */
    .doc-header {{
      border-bottom: 2px solid #10b981;
      padding-bottom: 20px;
      margin-bottom: 25px;
    }}

    .badge-bar {{
      margin-bottom: 14px;
      line-height: 2.2;
    }}

    .badge {{
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 10px;
      margin-right: 8px;
      border-radius: 9999px;
      background-color: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }}

    h1 {{
      font-size: 26px;
      font-weight: 900;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 8px;
      letter-spacing: -0.025em;
    }}

    h2 {{
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 30px;
      margin-bottom: 14px;
      letter-spacing: -0.02em;
      page-break-after: avoid;
    }}

    h3 {{
      font-size: 14.5px;
      font-weight: 700;
      color: #1e293b;
      margin-top: 20px;
      margin-bottom: 10px;
      page-break-after: avoid;
    }}

    h4 {{
      font-size: 13px;
      font-weight: 600;
      color: #334155;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }}

    p {{
      margin-top: 0;
      margin-bottom: 12px;
      color: #334155;
    }}

    /* Blockquotes */
    blockquote {{
      margin: 15px 0;
      padding: 10px 16px;
      border-left: 4px solid #10b981;
      background-color: #f8fafc;
      border-radius: 0 8px 8px 0;
      color: #047857;
      font-weight: 500;
      font-style: italic;
    }}

    blockquote p {{
      margin: 0;
      color: inherit;
    }}

    /* Tables */
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 18px 0;
      font-size: 11.5px;
      page-break-inside: avoid;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }}

    th {{
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      text-align: left;
      padding: 9px 12px;
      border: 1px solid #cbd5e1;
    }}

    td {{
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }}

    tr:nth-child(even) {{
      background-color: #f8fafc;
    }}

    /* Code Blocks & Inlines */
    code {{
      font-family: 'JetBrains Mono', Consolas, Monaco, "Courier New", monospace;
      font-size: 11.5px;
      padding: 2px 6px;
      background-color: #f1f5f9;
      color: #0f766e;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }}

    pre {{
      font-family: 'JetBrains Mono', Consolas, Monaco, "Courier New", monospace;
      font-size: 11px;
      background-color: #0f172a;
      color: #e2e8f0;
      padding: 14px 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 16px 0;
      line-height: 1.5;
      page-break-inside: avoid;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
    }}

    pre code {{
      background: none;
      color: inherit;
      padding: 0;
      border: none;
      font-size: inherit;
    }}

    /* Lists */
    ul, ol {{
      margin-top: 0;
      margin-bottom: 14px;
      padding-left: 22px;
    }}

    li {{
      margin-bottom: 4px;
      color: #334155;
    }}

    /* Horizontal Rules */
    hr {{
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 24px 0;
    }}

    /* Links */
    a {{
      color: #059669;
      text-decoration: none;
      font-weight: 500;
    }}

    /* Print specifics */
    @media print {{
      body {{
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }}
      pre, table {{
        page-break-inside: avoid;
      }}
      h2, h3 {{
        page-break-after: avoid;
      }}
    }}
  </style>
</head>
<body>
  <div class="doc-header">
    <div class="badge-bar">
      <span class="badge">MCA Final Year Project</span>
      <span class="badge">AI / EdTech Platform</span>
      <span class="badge">Official Technical Specification</span>
    </div>
  </div>

  <div class="markdown-body">
    {html_body}
  </div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_document)

print(f"Generated HTML at: {html_path}")

# Generate PDF using PyMuPDF (Story layout)
try:
    import pymupdf
    print("Generating PDF via PyMuPDF Story...")
    
    story = pymupdf.Story(html=html_document)
    writer = pymupdf.DocumentWriter(pdf_path)
    rect = pymupdf.paper_rect("a4")
    margin_x = 42
    margin_top = 40
    margin_bottom = 45
    where = pymupdf.Rect(margin_x, margin_top, rect.width - margin_x, rect.height - margin_bottom)
    
    more = 1
    page_count = 0
    while more and page_count < 300:
        page_count += 1
        dev = writer.begin_page(rect)
        more, _ = story.place(where)
        story.draw(dev)
        writer.end_page()
    writer.close()

    # Add page numbers and running footer to all pages
    doc = pymupdf.open(pdf_path)
    total_pages = doc.page_count
    for i, page in enumerate(doc):
        p_rect = page.rect
        footer_y = p_rect.height - 24
        
        # Subtle horizontal separator rule
        page.draw_line(
            pymupdf.Point(margin_x, footer_y - 8),
            pymupdf.Point(p_rect.width - margin_x, footer_y - 8),
            color=(0.88, 0.91, 0.94),
            width=0.75
        )
        
        # Left footer label
        page.insert_text(
            pymupdf.Point(margin_x, footer_y + 4),
            "AI LearnPath · Project Technical Specification",
            fontsize=8.5,
            fontname="helv",
            color=(0.4, 0.45, 0.5)
        )
        
        # Right footer page numbering
        page_label = f"Page {i + 1} of {total_pages}"
        text_len = pymupdf.get_text_length(page_label, fontname="helv", fontsize=8.5)
        page.insert_text(
            pymupdf.Point(p_rect.width - margin_x - text_len, footer_y + 4),
            page_label,
            fontsize=8.5,
            fontname="helv",
            color=(0.4, 0.45, 0.5)
        )
    
    pdf_bytes = doc.tobytes()
    doc.close()
    
    with open(pdf_path, "wb") as f:
        f.write(pdf_bytes)
        
    size_kb = round(os.path.getsize(pdf_path) / 1024, 1)
    print(f"SUCCESS: PDF created successfully at {pdf_path} ({size_kb} KB, {total_pages} pages)")

except Exception as e:
    print(f"PyMuPDF generation encountered an error: {e}")
    # Fallback to Edge if available
    edge_paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]
    edge_exe = next((p for p in edge_paths if os.path.exists(p)), None)
    if edge_exe:
        print("Falling back to Edge print-to-pdf...")
        cmd = [
            edge_exe,
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            html_path
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 0:
            size_kb = round(os.path.getsize(pdf_path) / 1024, 1)
            print(f"SUCCESS: PDF created successfully via Edge at {pdf_path} ({size_kb} KB)")
        else:
            print("Edge fallback failed:", result.stderr)
