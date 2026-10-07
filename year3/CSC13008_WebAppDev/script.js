const members = {
  a: {
    name: "Nguyễn Văn A",
    role: "Frontend Developer",
    initials: "NA",
    accent: "#FF7F50",
    tagline: "Đam mê xây dựng giao diện thân thiện với người dùng.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Responsive Design"],
    interests: ["UI Animation", "Accessibility", "Web Performance"],
    projects: [
      { name: "Portfolio cá nhân", description: "Trang web giới thiệu bản thân, làm bằng HTML/CSS/JS thuần.", url: "https://github.com/nguyenvana/portfolio", label: "github.com/nguyenvana/portfolio" },
      { name: "Todo App", description: "Ứng dụng quản lý công việc đơn giản, dùng React.", url: "https://github.com/nguyenvana/todo-app", label: "github.com/nguyenvana/todo-app" }
    ]
  },
  b: {
    name: "Trần Thị B",
    role: "UI/UX Designer",
    initials: "TB",
    accent: "#4A90E2",
    tagline: "Thiết kế trải nghiệm đơn giản nhưng hiệu quả.",
    skills: ["Figma", "Adobe XD", "HTML", "CSS", "User Research"],
    interests: ["Design System", "Prototyping", "Micro-interactions"],
    projects: [
      { name: "Redesign trang đăng nhập", description: "Cải thiện luồng đăng nhập cho một ứng dụng học tập.", url: "https://behance.net/tranthib/login-redesign", label: "behance.net/tranthib/login-redesign" },
      { name: "Mobile App cho sinh viên", description: "Thiết kế UI cho ứng dụng quản lý lịch học.", url: "https://behance.net/tranthib/student-app", label: "behance.net/tranthib/student-app" }
    ]
  },
  c: {
    name: "Lê Văn C",
    role: "Backend Developer",
    initials: "LC",
    accent: "#FFD700",
    tagline: "Xây dựng hệ thống ổn định, dễ mở rộng.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST API"],
    interests: ["System Design", "DevOps", "Open Source"],
    projects: [
      { name: "API quản lý sinh viên", description: "REST API với pagination, search, sort.", url: "https://github.com/levanc/student-api", label: "github.com/levanc/student-api" },
      { name: "Chat app realtime", description: "Ứng dụng chat dùng WebSocket.", url: "https://github.com/levanc/chat-app", label: "github.com/levanc/chat-app" }
    ]
  }
};

const dialog = document.querySelector(".profile-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeButton = document.querySelector(".dialog-close");
let returnFocusTo = null;

function renderProfile(member) {
  const skills = member.skills.map((skill) => `<li>${skill}</li>`).join("");
  const interests = member.interests.map((interest) => `<li>${interest}</li>`).join("");
  const projects = member.projects.map((project) => `
    <article class="project-card">
      <h4>${project.name}</h4>
      <p>${project.description}</p>
      <a href="${project.url}" target="_blank" rel="noreferrer">${project.label}<span class="visually-hidden"> (mở trong tab mới)</span></a>
    </article>
  `).join("");

  dialogContent.innerHTML = `
    <header class="profile-header">
      <div class="profile-avatar" aria-hidden="true">${member.initials}</div>
      <div>
        <p class="eyebrow"><span aria-hidden="true">✳</span> Thành viên Nhóm 3</p>
        <h2 id="dialog-title">${member.name}</h2>
        <p class="profile-role">${member.role}</p>
      </div>
    </header>
    <p class="profile-tagline">“${member.tagline}”</p>
    <div class="profile-details">
      <section aria-labelledby="skills-title"><h3 id="skills-title">Kỹ năng</h3><ul class="chip-list">${skills}</ul></section>
      <section aria-labelledby="interests-title"><h3 id="interests-title">Sở thích / Mối quan tâm</h3><ul class="chip-list">${interests}</ul></section>
      <section aria-labelledby="projects-title"><h3 id="projects-title">Dự án tiêu biểu</h3><div class="project-list">${projects}</div></section>
    </div>
  `;
  dialog.style.setProperty("--accent", member.accent);
}

document.querySelectorAll(".member-node").forEach((button) => {
  button.addEventListener("click", () => {
    const member = members[button.dataset.member];
    if (!member) return;
    returnFocusTo = button;
    renderProfile(member);
    dialog.showModal();
    closeButton.focus();
  });
});

const triangleStage = document.querySelector(".triangle-stage");
document.querySelectorAll(".member-vertex").forEach((vertex) => {
  vertex.addEventListener("pointerenter", () => triangleStage.classList.add("is-active"));
  vertex.addEventListener("pointerleave", () => {
    if (!vertex.matches(":focus-within")) triangleStage.classList.remove("is-active");
  });
  vertex.addEventListener("focusin", () => triangleStage.classList.add("is-active"));
  vertex.addEventListener("focusout", () => {
    if (!vertex.matches(":hover")) triangleStage.classList.remove("is-active");
  });
});

closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  const insideDialog = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  if (!insideDialog) dialog.close();
});
dialog.addEventListener("close", () => {
  if (returnFocusTo?.isConnected) returnFocusTo.focus();
});

document.querySelectorAll("[data-scroll-to]").forEach((control) => {
  control.addEventListener("click", () => {
    const destination = document.getElementById(control.dataset.scrollTo);
    destination?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
