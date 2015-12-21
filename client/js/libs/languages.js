import 'codemirror/mode/coffeescript/coffeescript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/haml/haml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/nginx/nginx';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/gfm/gfm';

export const langs = [
  {mode: '', label: 'Plain Text', mime: 'text/plain'},
  {mode: 'coffeescript', label: 'CoffeScript', mime: 'text/x-coffeescript'},
  {mode: 'css', label: 'Scss', mime: 'text/x-scss'},
  {mode: 'css', label: 'Css', mime: 'text/css'},
  {mode: 'gfm', label: 'markdown', mime: 'text/x-markdown'},
  {mode: 'haml', label: 'HAML', mime: 'text/x-haml'},
  {mode: 'htmlmixed', label: 'HTML', mime: 'text/html'},
  {mode: 'css', label: 'LESS', mime: 'text/x-less'},
  {mode: 'javascript', label: 'JavaScript', mime: 'text/javascript'},
  {mode: 'javascript', label: 'JSON', mime: 'application/json'},
  {mode: 'nginx', label: 'Nginx', mime: 'text/nginx'},
  {mode: 'ruby', label: 'Ruby', mime: 'text/x-ruby'},
  {mode: 'sql', label: 'SQL', mime: 'text/x-sql'},
  {mode: 'yaml', label: 'YAMP', mime: 'text/x-yaml'}
];

export function modeFromMime (mime) {
  const filtered = langs.filter(function (l) {return l.mime === mime;});
  return filtered.length ? filtered[0].mode : '';
}
