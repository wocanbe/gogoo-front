import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
import 'codemirror/mode/javascript/javascript.js'
function creatCode (ele, type) {
  return CodeMirror.fromTextArea(ele, {
    mode: type,
    tabSize: 2,
    theme: 'ayu-dark',
    lineNumbers: true,
    line: true,
    autoRefresh: true,
    styleActiveLine: true,
    matchBrackets: true
  })
}
export default creatCode