
 const selector = `body > app-root > app-base > div > div > div > div 
    > app-forms > div > div > div > div > form > ul > li:nth-child(2) > a`;


// pagina  principal sm
const panel = document.querySelector("#e1de7a44-7292-4d1d-975f-7231b8f5fd39_panel");

const labels = [...panel.querySelectorAll("span")]
  .filter(span => span.textContent.includes("*"))
  .map(span => span.textContent.trim());

console.log(labels);

// Novacviones pag.1
const panel = document.querySelector("#62c08137-795d-4813-be3e-371472224abc_panel");

const labels = [...panel.querySelectorAll("span")]
  .filter(span => span.textContent.includes("*"))
  .map(span => span.textContent.trim());

console.log(labels);
