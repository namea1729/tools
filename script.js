
document.getElementById(`generateButton`).addEventListener(`click`, generate);

function generate() {

  const input =
    document.getElementById(`input`).value;

  let baseUrl =
    document.getElementById(`baseUrl`).value;

  if (!baseUrl.endsWith(`/`)) {
    baseUrl += `/`;
  }

  const lines = input.split(`\n`);

  let rows = ``;

  rows += `<tr>`;
  rows += `<td style='min-height:1em'>&nbsp;</td>`;
  rows += `</tr>`;

  rows += `<tr>`;
  rows += `<td><a href='${baseUrl}'><i>.</i></a></td>`;
  rows += `<td><i>directory</i></td>`;
  rows += `</tr>`;

  rows += `<tr>`;
  rows += `<td><a href='../'><i>..</i></a></td>`;
  rows += `<td><i>directory</i></td>`;
  rows += `</tr>`;

  for (const line of lines) {

    const match = line.match(
      /^\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}\s(?:AM|PM)\s+(<DIR>|[\d,]+)\s+(.+)$/
    );

    if (!match) {
      continue;
    }

    const type = match[1];
    const name = match[2].trim();

    if (name === `.` || name === `..`) {
      continue;
    }

    const isDir = type === `<DIR>`;

    let href = baseUrl + name;

    if (isDir) {
      href += `/`;
    }

    rows += `<tr>`;
    rows += `<td><a href='` + href + `'>` + name + `</a></td>`;
    rows += `<td>` + (isDir ? `directory` : `file`) + `</td>`;
    rows += `</tr>`;
  }

  let html = ``;

  html += `<!doctype html>\n`;
  html += `<html lang='en'>\n`;
  html += `<head>\n`;
  html += `  <meta charset='UTF-8'>\n`;
  html += `  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n`;
  html += `  <title>Redirecting</title>\n`;
  html += `  <meta http-equiv='refresh' content='9999; url=/tfmsa/home'>\n`;
  html += `</head>\n`;

  html += `<body>\n`;

  html += `  <h6>`;
  html += `Click <a href='/tfmsa/home' target='_self'>here</a>, to return home.`;
  html += `</h6>\n`;

  html += `  <h3>Index of ` + baseUrl + `</h3>\n`;

  html += `  <table>\n`;

  html += `    <thead>\n`;
  html += `      <tr>\n`;
  html += `        <td style='min-width:60vw'><b>Name:</b></td>\n`;
  html += `        <td><b>Type:</b></td>\n`;
  html += `      </tr>\n`;
  html += `    </thead>\n`;

  html += `    <tbody>\n`;
  html += rows + `\n`;
  html += `    </tbody>\n`;

  html += `  </table>\n`;

  html += `</body>\n`;
  html += `</html>`;

  document.getElementById(`output`).value = html;
}
