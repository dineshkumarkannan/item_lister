let items = [
  { id: crypto.randomUUID(), name: "item 1" },
  { id: crypto.randomUUID(), name: "item 2" },
  { id: crypto.randomUUID(), name: "item 3" },
  { id: crypto.randomUUID(), name: "item 4" },
  { id: crypto.randomUUID(), name: "item 5" },
  { id: crypto.randomUUID(), name: "item 6" },
];

const form = document.querySelector("#item-form");
const listItemContainer = document.querySelector("#list-item-container");
const itemInput = document.querySelector("#item-input");
const MAX_ITEMS = 10;

// Render all items from the array
function renderItems(itemsArray) {
  if (items.length === 0) {
    listItemContainer.innerHTML = `
        <li class="text-xl text-gray-400" role="status" aria-live="polite" tabindex="0">
            No items available.
        </li>
    `;
    return;
  }
  listItemContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  itemsArray.forEach((item) => {
    fragment.appendChild(constructListItemDOM(item));
  });
  listItemContainer.appendChild(fragment);
}

// Create a single list item element
function constructListItemDOM(item) {
  const li = document.createElement("li");
  li.className =
    "item py-4 px-2 border border-neutral-200 flex justify-between items-center";
  li.setAttribute("role", "listitem");
  li.dataset.id = item.id;

  // Item text
  const div = document.createElement("div");
  div.textContent = item.name;
  div.className = "flex-1";

  // Delete button
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className =
    "ml-4 px-2 py-1 bg-gray-200 text-white rounded hover:bg-gray-300 hover:cursor-pointer focus:outline focus:bg-gray-300";
  btn.setAttribute("aria-label", `Delete ${item.name}`);
  btn.innerHTML = "🗑️";

  li.appendChild(div);
  li.appendChild(btn);
  return li;
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (items.length >= MAX_ITEMS) {
    alert("Items reach the count.");
    return;
  }
  const value = itemInput.value.trim();
  if (!value) {
    itemInput.focus();
    return;
  }
  // Prevent duplicate items (case-insensitive)
  if (
    items.some(
      (existing) => existing.name.toLowerCase() === value.toLowerCase()
    )
  ) {
    alert("Item already exists.");
    itemInput.value = "";
    itemInput.focus();
    return;
  }
  items.push({ id: crypto.randomUUID(), name: value });
  renderItems(items);
  form.reset();
  itemInput.focus();
});

// Event delegation for delete
listItemContainer.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
    const li = event.target.closest("li");
    const id = li.dataset.id;
    items = items.filter((item) => item.id !== id);
    renderItems(items);
  }
});

// Initial render on page load
window.addEventListener("DOMContentLoaded", () => {
  renderItems(items);
});
