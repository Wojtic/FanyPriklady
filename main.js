// Default export is a4 paper, portrait, using millimeters for units
window.jsPDF = window.jspdf.jsPDF;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const pocetInput = document.getElementById("pocet");
const operaceInput = document.getElementById("operace");
const maximumInput = document.getElementById("maximum");
const zaporneInput = document.getElementById("zaporne");
const zbytekInput = document.getElementById("zbytek");

function generate() {
  const doc = new jsPDF();

  switch (operaceInput.value) {
    case "scitani":
      for (let i = 0; i < pocetInput.value; i++) {
        let vysledek = getRandomInt(2, parseInt(maximumInput.value) + 1);
        let prvni = getRandomInt(1, vysledek);
        let druhe = vysledek - prvni;
        if (zaporneInput.checked && Math.random() > 0.5) {
          if (Math.random() > 0.5) prvni *= -1;
          else druhe *= -1;
          vysledek = prvni + druhe;
        }
        doc.text(
          `${prvni} + ${druhe < 0 ? `(${druhe})` : druhe} = ${vysledek}`,
          10 + 65 * Math.floor(i / 14),
          10 + 10 * (i % 14)
        );
        doc.text(
          `${prvni} + ${druhe < 0 ? `(${druhe})` : druhe} =`,
          10 + 65 * Math.floor(i / 14),
          155 + 10 * (i % 14)
        );
      }
      break;
    case "odcitani":
      for (let i = 0; i < pocetInput.value; i++) {
        let vetsi = getRandomInt(2, parseInt(maximumInput.value) + 1);
        let mensi = getRandomInt(1, vetsi);
        if (zaporneInput.checked && Math.random() > 0.5) {
          let a = vetsi;
          vetsi = mensi;
          mensi = a;
        }
        doc.text(
          vetsi + " - " + mensi + " = " + (vetsi - mensi),
          10 + 65 * Math.floor(i / 14),
          10 + 10 * (i % 14)
        );
        doc.text(
          vetsi + " - " + mensi + " = ",
          10 + 65 * Math.floor(i / 14),
          155 + 10 * (i % 14)
        );
      }
      break;
    case "nasobeni":
      for (let i = 0; i < pocetInput.value; i++) {
        let vysledek = getRandomInt(4, parseInt(maximumInput.value) + 1);
        let prvni = getRandomInt(1, vysledek / 2);
        let druhe = Math.floor(vysledek / prvni);
        vysledek = prvni * druhe;
        doc.text(
          prvni + " × " + druhe + " = " + vysledek,
          10 + 65 * Math.floor(i / 14),
          10 + 10 * (i % 14)
        );
        doc.text(
          prvni + " × " + druhe + " = ",
          10 + 65 * Math.floor(i / 14),
          155 + 10 * (i % 14)
        );
      }
      break;
    case "deleni":
      for (let i = 0; i < pocetInput.value; i++) {
        let delenec = getRandomInt(4, parseInt(maximumInput.value) + 1);
        let delitel = getRandomInt(2, delenec / 2);
        let vysledek = Math.floor(delenec / delitel);
        let zbytek;
        if (zbytekInput.checked) {
          zbytek = delenec - delitel * vysledek;
        } else {
          delenec = vysledek * delitel;
        }
        doc.text(
          delenec +
            " ÷ " +
            delitel +
            " = " +
            vysledek +
            (zbytekInput.checked ? " zb. " + zbytek : ""),
          10 + 65 * Math.floor(i / 14),
          10 + 10 * (i % 14)
        );
        doc.text(
          delenec +
            " ÷ " +
            delitel +
            " =       " +
            (zbytekInput.checked ? " zb. " : ""),
          10 + 65 * Math.floor(i / 14),
          155 + 10 * (i % 14)
        );
      }
      break;
    default:
      break;
  }

  doc.save("priklady.pdf");
}
