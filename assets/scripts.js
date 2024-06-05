var words = [
  ["that","love","love","love","cupid","cupid","cupid","it","it","he","she","it","it","this","love","love","love","this","this","cupid","the app", "he","she","love","love","as such, it","hereunder","probably"],
  ["was","was","was","was","was","was","is","is","is","uses","uses","is","is","is","became","became","disputes","meets", "guarantees", "meets", "links"],
  ["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","the","the","the","the","the","the","the","no","the","the","the","the","the","the","the","the","the","the","the","no","no"],
  ["user's","user's","match's","user's","user's","match's","user's","romantic's","romantic's","hot","hot","hot","user's","user's","user's","date's","date's","date's","date's","romantic's","date's","date's","date's","date's","date's","date's","date's","telephone's","member's","member's","romantic's","friend's","swipe's","friend's","swipe's","match's","match's","match's","user's","romantic's","romantic's"],
  ["available","available","sexual","pornographic","digital","electronic","careful","bonafide","adult","adult","dissatisfied","hidden","daunting","dishonest","eligible","failing","intangible","malicious","nefarious","sexual","tangible","non-exclusive","physical","premium","physical","objectionable","insulting","physical","inaccurate","virtual","virtual","inappropriate","instant","shy","shy","single","intellectual","sorry","invalid","text messages","kind","kind","strong","new","old","perpetual","pornographic","public","confidential","confidential","reasonable","explicit","explicit","explicit","explicit","special","special","special","substantial","unsolicited"],
  ["and","so","so","and","and","and","and","and","and","but","but","and","and","and","and","and","and","and","and","and","and","but"],
  ["compatible","convenient","embarrassed","engaging","extreme","obscene","graphic","hard","obscene","comfortable","corrupt","improper","effective","indecent","emotional","emotional","emotional","meta","meta","unaltered","personal","private","prohibited","reliable","respectful","sensitive","sensitive","uninterrupted","uninterrupted"], 
  ["avoidance","relationship","relationship","need","belief","mouthful","avoidance","subscription","data","contract","game","game","game","experience","mumbo jumbo","experience","data","avoidance","discovery","everything","Trojan horse","wish","date","death","service","interaction","interaction","interaction","contact","wish","Trojan horse","connection","connection","humour","humour","moral right","moral right","violence","vulnerability","trial","vulnerability","limitation","trial","connection","connection","connection","connection","loss","service","everything","interest","wish","everything","everything","interest","visit","activity","agreement","agreement","announcement","announcement","beginning","change","creation","creation","closure","closure", "conflict","damage","deadline","decision","decision","demand","destination","development","development","display","doubt","emergency","enjoyment","expectation","Trojan horse","joint venture","language","liability","mischief","language","moment","moment","need","need","offer","offer","belief","opportunity","partnership"]
];

var seperator = "A";
var poemContainer = document.getElementById("poem");
var poemClick = document.getElementById("poem-container");
saveButton = document.getElementById("button");

if (document.attachEvent) {
  poemClick.attatchEvent("onclick", generatePoemCode);
} else {
  poemClick.addEventListener("click", generatePoemCode);
}

checkUrlValue();

function checkUrlValue() {
  var urlGet = getUrlValue("p");
  if (urlGet) {
    processUrl(urlGet);
  } else {
    poemContainer.innerHTML = '<a class="click heart-rollover">click <br>to <br>generate</a>';
  }
}

function getUrlValue(varSearch) {
  var searchString = window.location.search.substring(1);
  var variableArray = searchString.split('&');
  for (var i = 0; i < variableArray.length; i++) {
    var keyValuePair = variableArray[i].split('=');
    if (keyValuePair[0] == varSearch) {
      return keyValuePair[1];
    }
  }
}

function generatePoemCode() {
  var poemCode = [...Array(words.length)];
  poemCode = poemCode.map((x, index) => Math.floor(Math.random() * (words[index].length)));
  var fontSize = [...Array(8)];
  fontSize = fontSize.map(x => Math.floor(Math.random() * 9) + 1);
  var marginLeft = [...Array(8)];
  marginLeft = marginLeft.map(x => Math.floor(Math.random() * 10));
  applyUrlVar(poemCode, fontSize, marginLeft);
  generatePoemWords(poemCode, fontSize, marginLeft);
}

function applyUrlVar(poemCode, fontSize, marginLeft) {
  var layoutCode = Number(fontSize.join("") + marginLeft.join(""));
  var allPoemCode = [...poemCode, layoutCode];
  var poemCodeJoined = allPoemCode.map(x => x.toString(36)).join(seperator);
  var urlString = "?p=" + poemCodeJoined;
  var stateObj = { sweet: "nothings" };
  history.replaceState(stateObj, "replace state", urlString);
}

function generatePoemWords(poemCode, fontSize, marginLeft) {
  var poemWords = poemCode.map((x, index) => words[index][x]);
  console.log(poemWords.join(" ")); // keep
  //var poemHtml = poemWords.map((x, index) => '<span class="word" style="font-size: ' + (3.75 * (fontSize[index] - 1) + 10) + 'px; margin-left: ' + (marginLeft[index] * 5) + 'px;">' + x + '</span>').join("");
  var poemHtml = poemWords.map((x, index) => '<span class="word size-' + fontSize[index] + ' margin-' + marginLeft[index] + '"><span class="inner">' + x + '</span></span>').join("");
  poemContainer.innerHTML = poemHtml;
  saveButton.style.display = "block";
}

function processUrl(url) {
  var poemCode = url.split(seperator).map(x => parseInt(x, 36));
  var layoutCode = poemCode[8].toString();
  poemCode.splice(-1, 1);
  layoutCode = layoutCode.split("");
  var fontSize = layoutCode.slice(0, 8);
  var marginLeft = layoutCode.slice(8, 16);
  if (poemCode.length == words.length) {
    var verify = true;
    for (var i = 0; i < (poemCode.length); i++) {
      if (poemCode[i] >= words[i].length) {
        verify = false;
          break;
        }
    }
  }
  if (verify == true) {
    generatePoemWords(poemCode, fontSize, marginLeft);
  } else {
    console.log("Url variable did not verify. Generating new poem.")
    generatePoemCode();
  }
}

// about/window
var aboutContainer = document.getElementById("about-container");
var buttonA = document.getElementById("button-about");
var buttonB = document.getElementById("button-back");

if (document.attachEvent) {
  buttonA.attatchEvent("onclick", buttonAbout);
} else {
  buttonA.addEventListener("click", buttonAbout);
}

if (document.attachEvent) {
  buttonB.attatchEvent("onclick", buttonBack);
} else {
  buttonB.addEventListener("click", buttonBack);
}

function buttonAbout() {
  aboutContainer.style.display = "block";
  poemClick.className = "mob-hidden";
}

function buttonBack() {
  aboutContainer.style.display = "";
  poemClick.className = "";
}





// image save test

if (document.attachEvent) {
  saveButton.attatchEvent("onclick", buttonClick);
} else {
  saveButton.addEventListener("click", buttonClick);
}

function buttonClick() {
  exportImage(1080, 1080, 2);
}

function exportImage(height, width, scale) {
  width = Number(width) || 1080;
  height = Number(height) || 1080;
  scale = Number(scale) || 2;
  var widthScale = width/scale;
  var heightScale = height/scale;

  var props = {
    width: width, 
    height: height, 
    style: {
      'transform': 'scale('+scale+')',
      'transform-origin': 'top left', 
      'width': ''+widthScale+'px',
      'height': ''+heightScale+'px'
    }
  }
  domtoimage.toBlob(document.getElementById('poem-container'), props).then(function (blob) {
    window.saveAs(blob, 'sweet-nothings.png');
  });
}

