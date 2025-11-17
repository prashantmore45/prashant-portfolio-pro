// backend/admin/admin.js
const API = "/admin-api";
const token = localStorage.getItem("admin_token");

if (!token && !location.pathname.endsWith("/login.html")) {
  // redirect to login if not logged in
  location.href = "/admin/login.html";
}

// helper to call admin api
async function adminFetch(path, opts = {}) {
  opts.headers = opts.headers || {};
  opts.headers.Authorization = "Bearer " + token;
  const res = await fetch(API + path, opts);
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("admin_token");
    location.href = "/admin/login.html";
    throw new Error("Unauthorized");
  }
  return res.json();
}

async function loadDashboard() {
  try {
    const v = await adminFetch("/visitors");
    document.getElementById("visitorsCount").innerText = v.total || 0;

    const messages = await adminFetch("/messages");
    document.getElementById("totalMessages").innerText = messages.length;

    const tbody = document.querySelector("#messagesTable tbody");
    tbody.innerHTML = "";
    messages.forEach(m => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${m.id}</td>
        <td>${m.name}</td>
        <td>${m.email}</td>
        <td>${m.message}</td>
        <td>${m.date || ""}</td>
        <td><button class="actionBtn" data-id="${m.id}">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });

    // bind delete buttons
    tbody.querySelectorAll(".actionBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (!confirm("Delete message id " + id + " ?")) return;
        await adminFetch("/messages/" + id, { method: "DELETE" });
        loadDashboard();
      });
    });

  } catch (err) {
    console.error(err);
  }
}

if (location.pathname.endsWith("/dashboard.html")) {
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("admin_token");
    location.href = "/admin/login.html";
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    // navigate to export URL (browser will download CSV)
    window.location = API + "/export";
  });

  loadDashboard();
}
