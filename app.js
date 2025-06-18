function tokenize(text) {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

function predict(text) {
  const tokens = tokenize(text);
  const classes = Object.keys(model.class_prob);
  const score = {};

  classes.forEach((cls) => {
    let logProb = Math.log(model.class_prob[cls]);

    tokens.forEach((token) => {
      const tokenProb = model.cond_prob[cls][token] || 1e-6;
      logProb += Math.log(tokenProb);
    });

    score[cls] = logProb;
  });

  const label = Object.entries(score).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  return { label, score };
}

function handlePredict() {
  const text = document.getElementById("inputText").value;
  const result = predict(text);

  document.getElementById("label").innerText = result.label;
  document.getElementById("scoreJson").innerText = JSON.stringify(result.score, null, 2);
  document.getElementById("result").classList.remove("hidden");
}
