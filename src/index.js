document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guestlist");
  const guestList = document.getElementById("list");
  const nameInput = document.getElementById("guestName");
  const categoryInput = document.getElementById("category");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const guestName = nameInput.value.trim();
   const category = document.querySelector('input[name="category"]:checked').value;


    if (!guestName) return;

    const currentGuests = guestList.querySelectorAll("li").length;
    if (currentGuests >= 10) {
      alert("Guest list is full! Max 10 guests allowed.");
      return;
    }

    if (currentGuests > 0) {
      const hr = document.createElement("hr");
      hr.classList.add("guest-line");
      guestList.appendChild(hr);
    }

    const li = document.createElement("li");

    li.innerHTML = 
    ` <span class="guest-name attending">${guestName}</span>
      <span class="category-tag ${category.toLowerCase()}">${category}</span>
       <label class="switch">
    <input type="checkbox" class="rsvp-toggle" checked>
    <span class="slider"></span>
  </label>
  <span class="rsvp-status">Attending</span>
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
      <span class="timestamp">${new Date().toLocaleTimeString()}</span>
    `;

    guestList.appendChild(li);
    nameInput.value = "";
  });

  guestList.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    const nameSpan = li.querySelector(".guest-name");

    if (e.target.classList.contains("remove")) {
      const previous = li.previousElementSibling;
      if (previous && previous.tagName === "HR") {
        previous.remove();
      }
      li.remove();
    }

    if (e.target.classList.contains("rsvp-toggle")) {
        const li = e.target.closest("li");
  const nameSpan = li.querySelector(".guest-name");
  const statusSpan = li.querySelector(".rsvp-status");

  if (e.target.checked) {
    nameSpan.classList.add("attending");
    nameSpan.classList.remove("not-attending");
    statusSpan.textContent = "Attending";
  } else {
    nameSpan.classList.remove("attending");
    nameSpan.classList.add("not-attending");
    statusSpan.textContent = "Not Attending";
  }
}

    if (e.target.classList.contains("edit")) {
      const newName = prompt("Edit guest name:", nameSpan.textContent);
      if (newName) nameSpan.textContent = newName.trim();
    }
  });
});
