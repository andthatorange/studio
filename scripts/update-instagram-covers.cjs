const fs = require("fs");
const path = require("path");
const root = process.argv[2];
const manifest = JSON.parse(fs.readFileSync(process.argv[3], "utf8").replace(/^\uFEFF/, ""));
const parser = require(path.join(root, "node_modules/next/dist/compiled/babel/parser"));
const file = path.join(root, "lib/content.js");
let source = fs.readFileSync(file, "utf8");
const ast = parser.parse(source, { sourceType: "module" });
const config = ast.program.body.find(node => node.type === "ExportNamedDeclaration" && node.declaration?.declarations?.[0]?.id.name === "instagram")?.declaration.declarations[0].init;
if (!config) throw new Error("Instagram content was not found");
const key = prop => prop.key.name || prop.key.value;
const posts = config.properties.find(prop => key(prop) === "posts").value.elements;
const edits = [];
for (const post of posts) {
  if (post.type === "StringLiteral") {
    const entry = manifest.find(item => item.url === post.value);
    if (entry) edits.push({ start: post.start, end: post.end, value: JSON.stringify({ url: post.value, image: entry.image }) });
    continue;
  }
  const url = post.properties.find(prop => key(prop) === "url")?.value.value;
  const id = post.properties.find(prop => key(prop) === "id")?.value.value;
  const entry = manifest.find(item => item.url ? item.url === url : item.id && item.id === id);
  if (!entry) continue;
  const image = post.properties.find(prop => key(prop) === "image");
  if (image) edits.push({ start: image.value.start, end: image.value.end, value: JSON.stringify(entry.image) });
  else {
    const prefix = source.slice(post.start, post.end - 1).trimEnd();
    edits.push({ start: post.end - 1, end: post.end - 1, value: (prefix.endsWith(",") ? "" : ",") + "\n      image: " + JSON.stringify(entry.image) + ",\n    " });
  }
}
for (const edit of edits.sort((a, b) => b.start - a.start)) source = source.slice(0, edit.start) + edit.value + source.slice(edit.end);
parser.parse(source, { sourceType: "module" });
if (edits.length) fs.writeFileSync(file, source);
console.log("Connected " + edits.length + " downloaded post covers.");
