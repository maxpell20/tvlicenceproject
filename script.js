let answers = {1:null,2:null,3:null};

function setAnswer(question, value){
  answers[question] = value;

  document.querySelectorAll(`#q${question}-yes, #q${question}-no`)
    .forEach(btn => btn.classList.remove("selected"));

  document
    .getElementById(`q${question}-${value ? "yes":"no"}`)
    .classList.add("selected");

  checkCompletion();
}

function checkCompletion(){
  if(Object.values(answers).includes(null)) return;

  const questions = document.getElementById("questions");
  const resultDiv = document.getElementById("result");
  const resultActions = document.getElementById("result-actions");

  questions.classList.add("hidden");

  if(answers[1] === true || answers[2] === true){
    resultDiv.textContent =
      "You are likely required to have a TV Licence.";
    resultDiv.className = "result required";
  } else {
    resultDiv.textContent =
      "You are unlikely to require a TV Licence.";
    resultDiv.className = "result not-required";
  }

  resultDiv.classList.remove("hidden");
  resultActions.classList.remove("hidden");
}

function restart(){
  answers = {1:null,2:null,3:null};

  document.querySelectorAll("button")
    .forEach(btn => btn.classList.remove("selected"));

  document.getElementById("questions").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("result-actions").classList.add("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function sharePage() {
  const shareData = {
    title: "TV Licence Calculator UK",
    text: "Check if you need a TV Licence in the UK.",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    navigator.clipboard.writeText(shareData.url);
    alert("Link copied to clipboard");
  }
}