# Mobile App Interface Design: HTML to PDF Converter

## 1. Screen List
- **Home / Editor Screen**: Main dashboard where users can choose templates (Invoice, Resume, Report, Custom), write or edit HTML code, and trigger PDF generation.
- **Preview & History Screen**: Displays generated PDFs list, allows sharing, downloading, and quick preview.

## 2. Primary Content and Functionality
- **Template Selector**: Quick presets for common documents (Invoice, Resume, Simple Report).
- **HTML Code Editor**: Text input area with syntax support for custom HTML/CSS editing.
- **Generate & Share Actions**: One-tap PDF generation using `expo-print` and system share sheet (`expo-sharing`).
- **History List**: Local storage list of previously generated PDF files for easy re-sharing.

## 3. Key User Flows
1. **Quick Generate**: User opens app → Selects "Invoice" template → Taps "Generate PDF" → App builds PDF and opens system share sheet.
2. **Custom HTML**: User taps "Custom" → Pastes custom HTML & CSS → Taps "Generate PDF" → Views success modal & shares.

## 4. Color Choices
- **Brand Primary**: Professional Tech Blue (`#0a7ea4` / `#2563eb`)
- **Background**: Clean White / Dark Gray (`#ffffff` / `#151718`)
- **Surface**: Light Gray / Slate (`#f8fafc` / `#1e293b`)
- **Accent**: Emerald Green (`#22c55e`) for success feedback.
