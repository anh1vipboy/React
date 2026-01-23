"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  fieldName: string;
}

export default function TinyMCEEditor({
  value,
  onChange,
  label,
  fieldName,
}: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <Editor
        apiKey="rfzxmdpo7czdv01j2lem6i2hxx25dqnw1ss4nnbfd3ns614b"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value || ""}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            // Core editing features
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            // Premium features (trial until Jan 28, 2026)
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
          uploadcare_public_key: 'ebac1a51589bbc65e05a',
          language: 'vi',
          content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
          referrerpolicy: 'origin',
        }}
      />
    </div>
  );
}
