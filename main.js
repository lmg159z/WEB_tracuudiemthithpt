

const app = document.querySelector("#content");
var er = 0;
var setLanguages = true;
var languages = {};
var vi = {};
var data = {};

function getScores() {
  const sbd = document.querySelector("#fromSBD_in").value;
  const urlAPI = `https://lmg159z.github.io/json/${sbd}.json`;
  if (sbd.length === 8) {
    fetch(urlAPI)
      .then(x => x.json())
      .then(y => checkLanguage(y));
  } else {
    if (er <= 3) {
      alert("Sai Số Báo Danh Rồi Kìa :v");
      er = er + 1;
    } else {
      alert("Có Nhiêu cũng không xong");
    }
  }
}

function checkLanguage(responseData) {
  data = responseData;
  fetch("./info/language/sub.json")
    .then(x => x.json())
    .then(y => {
      const codeLanguage = data.maNgoaiNgu;
      vi = y.vi;
      switch (codeLanguage) {
        case 'N1':
          languages = y.en;
          break;
        case 'N2':
          languages = y.ru;
          break;
        case 'N3':
          languages = y.fr;
          break;
        case 'N4':
          languages = y.zh;
          break;
        case 'N5':
          languages = y.de;
          break;
        case 'N6':
          languages = y.ja;
          break;
        case 'N7':
          languages = y.ko;
          break;
        default:
          languages = y.vi;
      }
      render(languages, data, vi, setLanguages);
    });
}

function render(language, data, vi, set) {
  const currentLanguage = set ? language : vi;
  const tableScore = `
    <tr>
      <td>Đơn Vị</td>
      <td>Sở GD&DT Hà Nội</td>
    </tr>
    <tr>
      <td>${currentLanguage.SBD}</td>
      <td>${data.SBD != null ? data.SBD : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.toan}</td>
      <td>${data.toan != null ? data.toan : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.van}</td>
      <td>${data.van != null ? data.van : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.tin}</td>
      <td>${data.tin != null ? data.tin : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.ngoaiNgu}</td>
      <td>${data.ngoaiNgu != null ? data.ngoaiNgu : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.ly}</td>
      <td>${data.ly != null ? data.ly : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.hoa}</td>
      <td>${data.hoa != null ? data.hoa : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.sinh}</td>
      <td>${data.sinh != null ? data.sinh : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.su}</td>
      <td>${data.su != null ? data.su : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.dia}</td>
      <td>${data.dia != null ? data.dia : ""}</td>
    </tr>
    <tr>
      <td>${currentLanguage.GDKT_PL}</td>
      <td>${data.GDKTPL != null ? data.GDKTPL : ""}</td>
    </tr>
  `;

  let THM = "";
  data.THMs.forEach(value => {
    THM += `
      <div class="subjectCombination_su">
        <span>${value.THM}: ${currentLanguage[value.mon[0]]}, ${currentLanguage[value.mon[1]]}, ${currentLanguage[value.mon[2]]}</span>
        <h3>${value.diem}</h3>
      </div>`;
  });

  const htmls = `
    <div class="scores">
      <table class="scores_score">
        ${tableScore}
      </table>
      <div class="subjectCombination">
        ${THM}
      </div>
    </div>
    <div style="${data.ngoaiNgu ? "" :"display:none"}"class="content_translation">
      <button onclick="toggleLanguage()" class="content_translation-btn fa-duotone fa-solid fa-language" type="submit"></button>
    </div>`;

  app.innerHTML = htmls;
}

function toggleLanguage() {
  setLanguages = !setLanguages;
  render(languages, data, vi, setLanguages);
}

// Call getScores on some event, e.g., a button click
// document.querySelector("#fetchButton").addEventListener("click", getScores);


