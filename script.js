function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  const translateBtn = document.createElement("button");
  translateBtn.textContent = "Translate";
  translateBtn.onclick = () => translateTask(li);

  li.appendChild(translateBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}

async function translateTask(taskElement) {
  const originalText = taskElement.childNodes[0].textContent;

  const res = await fetch(`https://libretranslate.de/translate`, {
    method: "POST",
    body: JSON.stringify({
      q: originalText,
      source: "en",
      target: "es", // Spanish, change if needed
      format: "text"
    }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();
  taskElement.childNodes[0].textContent = data.translatedText + " ";
}
