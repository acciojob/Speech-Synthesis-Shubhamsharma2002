// Your script here.
msg.text = document.querySelector('[name="text"]').value;

// Populate voices
function populateVoices() {
  voices = this.getVoices();

  if (voices.length === 0) {
    voicesDropdown.innerHTML = '<option value="">No Voices Available</option>';
    return;
  }

  voicesDropdown.innerHTML = voices
    .map(
      voice =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
}

// Speak / Stop
function speak(startOver = true) {
  if (!msg.text.trim()) return;

  speechSynthesis.cancel();

  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);

  // Restart speech if already speaking
  if (speechSynthesis.speaking) {
    speak();
  }
}

function setOption() {
  msg[this.name] = this.value;

  // Update while speaking
  if (speechSynthesis.speaking) {
    speak();
  }
}

// Load available voices
speechSynthesis.addEventListener("voiceschanged", populateVoices);

// Voice selection
voicesDropdown.addEventListener("change", setVoice);

// Rate, Pitch and Text changes
options.forEach(option =>
  option.addEventListener("change", setOption)
);

options.forEach(option =>
  option.addEventListener("input", setOption)
);

// Speak button
speakButton.addEventListener("click", () => {
  msg.text = document.querySelector('[name="text"]').value;
  speak();
});

// Stop button
stopButton.addEventListener("click", () => {
  speechSynthesis.cancel();
});
