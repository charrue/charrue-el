const fs = require("fs")
const path = require("path")
const STYLE_DIST_PATH = path.resolve(__dirname, "../dist/styles/index.css")

const LayoutPackageStyleDistPath = [
  path.resolve(__dirname, "../../layout/index.css"),
  path.resolve(__dirname, "../../layout-next/index.css"),
]

if (!fs.existsSync(STYLE_DIST_PATH)) {
  console.log(`[layout-internal] ${STYLE_DIST_PATH} not exists`)
  return
}

const cssContent = fs.readFileSync(STYLE_DIST_PATH, "utf-8")

LayoutPackageStyleDistPath.forEach((filePath) => {
  try {
    fs.writeFileSync(filePath, cssContent, "utf-8")
  } catch(e) {
    console.log(`[layout-internal] synchronize style file failed`)
  }
})
console.log(`[layout-internal] synchronize style file success`)
