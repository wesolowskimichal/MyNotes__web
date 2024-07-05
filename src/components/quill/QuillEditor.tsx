import { useCallback, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import './quillCustomStyles.css'

Quill.register('modules/imageResize', ImageResize)

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ align: [] }],
    ['link', 'image'],
    ['clean'] // remove formatting button
  ],
  imageResize: {
    // Image resize options
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
    handles: {
      corners: {
        radius: 8,
        color: '#cd9cfc',
        backgroundColor: 'white',
        borderColor: '#cd9cfc'
      },
      edges: {
        radius: 8,
        color: '#cd9cfc',
        backgroundColor: 'white',
        borderColor: '#cd9cfc'
      }
    },
    displayStyles: {
      backgroundColor: 'black',
      borderColor: '#cd9cfc',
      borderRadius: '8px',
      border: '2px solid #cd9cfc'
    },
    toolbarStyles: {
      backgroundColor: '#cd9cfc',
      color: '#cd9cfc',
      borderRadius: '8px'
    },
    handleStyles: {
      backgroundColor: '#cd9cfc',
      border: '2px solid #cd9cfc'
    }
  }
}

const formats = [
  'font',
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'direction',
  'align',
  'link',
  'image'
]

const QuillEditor = () => {
  const [text, setText] = useState('')

  const handleTextChange = useCallback(
    (value: string) => {
      setText(value)
    },
    [setText]
  )

  return <ReactQuill value={text} onChange={handleTextChange} modules={modules} formats={formats} />
}

export default QuillEditor
