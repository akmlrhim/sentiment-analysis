const inputText = document.getElementById("inputText");
const inputError = document.getElementById("inputError");
const predictBtn = document.querySelector('button[onclick="handlePredict()"]');

function isStringInput(value) {
  return typeof value === "string" && /^[\p{L}\p{N}\s.,!?'"()\-:;@#%&/\\]*$/u.test(value.trim());
}

function validateInput() {
  const value = inputText.value.trim();
  if (!value) {
    inputError.textContent = "Ulasan wajib diisi dan hanya boleh berupa teks.";
    inputError.classList.remove("hidden");
    return false;
  }
  if (!isStringInput(value)) {
    inputError.textContent = "Input hanya boleh berupa teks (tanpa karakter khusus aneh).";
    inputError.classList.remove("hidden");
    return false;
  }
  inputError.classList.add("hidden");
  return true;
}

predictBtn.addEventListener("click", function (e) {
  if (!validateInput()) {
    e.preventDefault();
    return false;
  }
});

inputText.addEventListener("input", validateInput);
